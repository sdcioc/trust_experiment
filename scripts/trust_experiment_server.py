#! /usr/bin/python
import rospy
import json
import math
from google.cloud import vision
import boto3
import cv2
#import dlib
import random
import time


import geometry_msgs.msg
import std_msgs.msg
import sensor_msgs.msg
from trust_package.srv import *

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
        self.google_vision_client = vision.ImageAnnotatorClient();
        self.DISTANCE_ERROR = 0.6;
        self.server = None;
        self.amazon_vision_client = boto3.client("rekognition","us-west-2");
        self.images = {
            1 : cv2.imread("/home/ubuntu/trust_project/catkin_ws/src/trust_experiment/client/img/cond_1/1.JPG"),
            2 : cv2.imread("/home/ubuntu/trust_project/catkin_ws/src/trust_experiment/client/img/cond_1/2.JPG")
        };

    def start_service(self):
        self.server = rospy.Service('trust_server', TrustServer, self.trust_callback);


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
            responseDict["name"] = "Success";
        elif (requestDict["type"] == "Scan"):
            print "Scan"
            responseDict["type"] = "Scan";
            frame = self.images[requestDict["room"]];
            #TODO de calculat ce parte din imagine iau
            w_index = requestDict["yaw"] + 120;
            h_index = requestDict["pitch"] + 50;
            width = frame[0].size/3;
            height = frame.size/frame[0].size;
            #width, height = frame.size;
            w_side = width / 6;
            h_side = height / 6;
            w_step = (w_side * 4) / 240;
            h_step = (h_side * 4) / 240;
            w_point = w_side + w_step * w_index;
            h_point = h_side + h_step * h_index;
            crop_img = frame[:, w_point-w_side:w_point+w_side];
            ret, jpeg = cv2.imencode('.jpg', crop_img);
            #ret, jpeg = cv2.imencode('.jpg', frame);
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