#! /usr/bin/python

import math
import cv2
import boto3


if __name__ == '__main__':
    amazon_vision_client = boto3.client("rekognition","us-west-2");
    cv_image = cv2.imread('/home/ubuntu/test.jpg');
    ret, jpeg = cv2.imencode('.jpg', cv_image);
    response = amazon_vision_client.detect_labels(Image={'Bytes': jpeg.tobytes()},MaxLabels=123,MinConfidence=50);
    #print response
    for obj in response["Labels"]:
        print obj["Name"];