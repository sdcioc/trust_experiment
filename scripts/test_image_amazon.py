#! /usr/bin/python

import math
import cv2
import boto3
import os
import json


if __name__ == '__main__':
    amazon_vision_client = boto3.client("rekognition","us-west-2");
    dirpath = "/home/ubuntu/photos";
    dirlist = os.listdir(dirpath);
    for filename in dirlist:
        cv_image = cv2.imread(dirpath + "/" + filename);
        ret, jpeg = cv2.imencode('.jpg', cv_image);
        response = amazon_vision_client.detect_labels(Image={'Bytes': jpeg.tobytes()},MaxLabels=123,MinConfidence=50);
        objs = [];
        #print response
        for obj in response["Labels"]:
            print obj["Name"];
            objs.append(obj);
        with open("/home/ubuntu/result_photos" + "/" + filename + ".amazon.json", 'w') as fp:
            json.dump(objs, fp)