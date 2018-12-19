#! /usr/bin/python

import math
import cv2
from google.cloud import vision
import os
import json




if __name__ == '__main__':
    google_vision_client = vision.ImageAnnotatorClient();
    dirpath = "/home/ubuntu/photos";
    dirlist = os.listdir(dirpath);
    for filename in dirlist:
        cv_image = cv2.imread(dirpath + "/" + filename);
        ret, jpeg = cv2.imencode('.jpg', cv_image);
        image = vision.types.Image(content=jpeg.tobytes());
        response = google_vision_client.object_localization(image=image);
        objs = [];
        #print response
        for obj in response.localized_object_annotations:
            print obj.name;
            objs.append(obj.name);
        with open("/home/ubuntu/result_photos" + "/" + filename + ".google.json", 'w') as fp:
            json.dump(objs, fp)