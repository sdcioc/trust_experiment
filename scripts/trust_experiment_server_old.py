#! /usr/bin/python
import rospy
import json
import math
from google.cloud import vision
import boto3
import cv2
#import dlib
import cv_bridge
import random
import time


import geometry_msgs.msg
import std_msgs.msg
import sensor_msgs.msg
from trust_package.srv import *
"""
taskArangement = [
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],

    [2, 1, 3, 4],
    [2, 1, 4, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 1, 3],
    [2, 4, 3, 1],

    [3, 2, 1, 4],
    [3, 2, 4, 1],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 4, 2, 1],
    [3, 4, 1, 2],

    [4, 2, 3, 1],
    [4, 2, 1, 3],
    [4, 3, 2, 1],
    [4, 3, 1, 2],
    [4, 1, 2, 3],
    [4, 1, 3, 2],
]
"""
taskArangement = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 2, 1],
    [3, 1, 2]
]
class TrustServerClass:
	#constructor
    def __init__(self):
        self.cvBridge = cv_bridge.CvBridge();
        self.google_vision_client = vision.ImageAnnotatorClient();
        self.DISTANCE_ERROR = 0.6;
        self.server = None;
        self.amazon_vision_client = boto3.client("rekognition","us-west-2");

    def start_service(self):
        self.server = rospy.Service('trust_server', TrustServer, self.trust_callback);

    def get_distance(self, point1, point2):
        x1 = point1.position.x;
        y1 = point1.position.y;
        x2 = point2.pose.position.x;
        y2 = point2.pose.position.y;
        return math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));


    def convert_POIPosition_MapPosition(self, position):
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
    def convert_MapPosition_POIPosition(self, position):
            x = position.position.x;
            y = position.position.y;
            w = 2 * math.acos(position.orientation.w);
            return (x, y, w);

    def convert_POIName_RosparamName(self, poi_name):
        prefix = '/mmap/poi/submap_0/';
        if not poi_name.startswith(prefix):
            poi_name = prefix + poi_name;
        return poi_name;

    #returneaza pozitia pe harta a punctului de interes
    def get_poi_position(self, poi_name):
        print "[INFO] getting position for poi {}".format(poi_name) 
        poi_name = self.convert_POIName_RosparamName(poi_name)
        try:
            poi = rospy.get_param(poi_name)
            if not poi:
                return None
            if len(poi[2:]) != 3:
                return None
            position = self.convert_POIPosition_MapPosition(poi[2:])
            return position
        except KeyError:
            return None

    def trust_callback(self, req):
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
            #username = "dan";
            password = "dan";
            #if( (requestDict["username"] == username) and (requestDict["password"] == password) ):
            if(requestDict["password"] == password):
                responseDict["name"] = "Success";
                #TODO: TESTING
                #responseDict["cond1"] = 0;
                #responseDict["cond2"] = 1;
                #index_ar = 0;
                responseDict["username"] = "u" + str(int(time.time()));
                responseDict["cond1"] = random.randint(0, 1);
                responseDict["cond2"] = random.randint(0, 2);
                index_ar = random.randint(0, 5);
                responseDict["main_page_real_task"] =  {
                    1 : taskArangement[index_ar][0],
                    2 : taskArangement[index_ar][1],
                    3 : taskArangement[index_ar][2]
                };
            else:
                responseDict["name"] = "Fail";
        elif (requestDict["type"] == "VerifyMove"):
            print "VerifyMove"
            responseDict["type"] = "VerifyMove";
            try:
                reply = rospy.wait_for_message(
                '/amcl_pose',
                geometry_msgs.msg.PoseWithCovarianceStamped, 3);
                if(requestDict["task"] == 1):
                    current_distance = self.get_distance(reply.pose.pose, self.get_poi_position("poi_bedroom"));
                if(requestDict["task"] == 2):
                    current_distance = self.get_distance(reply.pose.pose, self.get_poi_position("poi_livingroom"));
                if(requestDict["task"] == 3):
                    if(requestDict["subtype"] == 1):
                        current_distance = self.get_distance(reply.pose.pose, self.get_poi_position("poi_bedroom"));
                    else:
                        current_distance = self.get_distance(reply.pose.pose, self.get_poi_position("poi_livingroom"));
                if (current_distance < self.DISTANCE_ERROR):
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
                            sensor_msgs.msg.Image, 3);
            frame = self.cvBridge.imgmsg_to_cv2(reply, 'bgr8');
            ret, jpeg = cv2.imencode('.jpg', frame);
            if(requestDict["service"] == "google"):
                image = vision.types.Image(content=jpeg.tobytes());
                response = self.google_vision_client.object_localization(image=image);
                print response
                responseDict["result"] = []
                for obj in response.localized_object_annotations:
                    responseDict["result"].append(obj.name);
                    print obj.name;
                    #for vertex in obj.bounding_poly.normalized_vertices:
                    #    print(' - ({}, {})'.format(vertex.x, vertex.y))
                responseDict["name"] = "Result";
                responseDict["response"] = "Success";
            elif (requestDict["service"] == "amazon"):
                response = self.amazon_vision_client.detect_labels(Image={'Bytes': jpeg.tobytes()},MaxLabels=123,MinConfidence=50);
                print response
                responseDict["result"] = []
                for obj in response["Labels"]:
                    responseDict["result"].append(obj["Name"]);
                    print obj["Name"];
                responseDict["name"] = "Result";
                responseDict["response"] = "Success";
            else:
                responseDict["name"] = "NotImplementedService";
                responseDict["response"] = "Fail";
        elif (requestDict["type"] == "FEEDBACK"):
            print "FEEDBACK"
            with open("/home/ubuntu/result_files" + "/" + requestDict["user"] + ".feedback.json", 'w') as fp:
                json.dump(requestDict["results"], fp);
        elif (requestDict["type"] == "EVENTS"):
            print "FEEDBACK"
            with open("/home/ubuntu/result_files" + "/" + requestDict["user"] + ".events.json", 'w') as fp:
                json.dump(requestDict["results"], fp);

        else:
            print "NotImplemented"
            responseDict["type"] = "NotImplemented";
            responseDict["name"] = "Fail";

        return TrustServerResponse(json.dumps(responseDict));

def trust_server_server():
    rospy.init_node("trust_server_server");
    TrustServerInstace = TrustServerClass();
    TrustServerInstace.start_service();
    # spin() keeps Python from exiting until node is shutdown
    rospy.spin();

if __name__ == "__main__":
    trust_server_server();