#! /usr/bin/python
from trust_package.srv import *
import rospy
import json
import math
from google.cloud import vision
import cv2
import dlib
import cv_bridge


import geometry_msgs.msg
import std_msgs.msg
import sensor_msgs.msg


cvBridge = cv_bridge.CvBridge();
google_vision_client = vision.ImageAnnotatorClient();

def get_distance(point1, point2):
    x1 = point1.position.x;
    y1 = point1.position.y;
    x2 = point2.pose.position.x;
    y2 = point2.pose.position.y;
    return math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));


def convert_POIPosition_MapPosition(position):
	#tipul de mesaj pentru map
	pos = geometry_msgs.msg.PoseStamped();
	#harta pe care are loc pozitionarea si directia
	pos.header.frame_id = 'map';
	pos.pose.position.x = position[0];
	pos.pose.position.y = position[1];
	pos.pose.orientation.z = math.sin(position[2] / 2.0);
	pos.pose.orientation.w = math.cos(position[2] / 2.0);
	return pos;

#intrare geometry_msgs.msg.PoseStamped (vector3 position, vector3 orientation)
def convert_MapPosition_POIPosition(position):
        x = position.position.x;
        y = position.position.y;
        w = 2 * math.acos(position.orientation.w);
        return (x, y, w);

def convert_POIName_RosparamName(poi_name):
	prefix = '/mmap/poi/submap_0/';
	if not poi_name.startswith(prefix):
		poi_name = prefix + poi_name;
	return poi_name;

#returneaza pozitia pe harta a punctului de interes
def get_poi_position(poi_name):
    print "[INFO] getting position for poi {}".format(poi_name) 
    poi_name = convert_POIName_RosparamName(poi_name)
    try:
        poi = rospy.get_param(poi_name)
        if not poi:
            return None
        if len(poi[2:]) != 3:
            return None
        position = convert_POIPosition_MapPosition(poi[2:])
        return position
    except KeyError:
        return None

DISTANCE_ERROR = 0.6;
def trust_callback(req):
    print "A primit" + req.a;
    requestDict = json.loads(req.a);
    print requestDict;
    responseDict = {}
    if (requestDict["type"] == "Test"):
        print "Success"
        responseDict["type"] = "Test";
        responseDict["name"] = "Success";
    elif (requestDict["type"] == "Login"):
        print "Login"
        responseDict["type"] = "Login";
        username = "dan";
        password = "dan";
        if( (requestDict["username"] == username) and (requestDict["password"] == password) ):
            responseDict["name"] = "Success";
        else:
            responseDict["name"] = "Fail";
    elif (requestDict["type"] == "VerifyMove"):
        print "VerifyMove"
        responseDict["type"] = "VerifyMove";
        try:
            reply = rospy.wait_for_message(
            '/amcl_pose',
            geometry_msgs.msg.PoseWithCovarianceStamped, 3);
            current_distance = get_distance(reply.pose.pose, get_poi_position("task"+requestDict["task"]));
            if (current_distance < DISTANCE_ERROR):
                responseDict["name"] = "Success";
            else:
                responseDict["name"] = "Fail";
        except rospy.exceptions.ROSException:
            responseDict["name"] = "Fail";
    elif (requestDict["type"] == "Scan"):
        print "Scan"
        responseDict["type"] = "Scan";
        reply = rospy.wait_for_message(
                        'xtion/rgb/image_rect_color',
                        sensor_msgs.msg.Image, 1);
        frame = cvBridge.imgmsg_to_cv2(reply, 'bgr8');
        ret, jpeg = cv2.imencode('.jpg', frame);
        image = vision.types.Image(content=jpeg.tobytes());
        response = google_vision_client.object_localization(image=image);
        responseDict["name"] = "Result";
        responseDict["response"] = response;
    else:
        print "NotImplemented"
        responseDict["type"] = "NotImplemented";
        responseDict["name"] = "Fail";

    return TrustServerResponse(json.dumps(responseDict));

"""
def detect_labels(path):
    client = vision.ImageAnnotatorClient()

    # [START vision_python_migration_label_detection]
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')

    for label in labels:
        print(label.description)
"""

def trust_server_server():
    rospy.init_node("trust_server_server");
    s = rospy.Service('trust_server', TrustServer, trust_callback);

    # spin() keeps Python from exiting until node is shutdown
    rospy.spin();

if __name__ == "__main__":
    trust_server_server();