#! /usr/bin/python

import math
import cv2
from google.cloud import vision




if __name__ == '__main__':
    google_vision_client = vision.ImageAnnotatorClient();
    cv_image = cv2.imread('/home/ubuntu/test.jpg');
    ret, jpeg = cv2.imencode('.jpg', cv_image);
    image = vision.types.Image(content=jpeg.tobytes());
    response = google_vision_client.object_localization(image=image);
    #print response
    for obj in response.localized_object_annotations:
        print obj.name;