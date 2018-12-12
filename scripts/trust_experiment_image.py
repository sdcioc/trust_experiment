
#! /usr/bin/python

import rospy
import json
import math
import cv2
import cv_bridge

import base64
import std_msgs.msg
import sensor_msgs.msg



# clasa ce se ocupa de logica de inregistrare a rosbackurilor
class RosbagManager:
	#constructor
    def __init__(self):
        self.rate = rospy.Rate(1);
        #conotrul ce reprezinta numarul experimentului
        self.contor = 0;
        
        self.new_robot_image_pub = rospy.Publisher(
                    '/trust_package/robot_base64image',
                        std_msgs.msg.String,
                        latch=True, queue_size=5);
        self.new_room_image_pub = rospy.Publisher(
                    '/trust_package/room_base64image',
                        std_msgs.msg.String,
                        latch=True, queue_size=5);
        self.cvBridge = cv_bridge.CvBridge();
        rospy.sleep(2);
        # un subscriber pentru comenzile de la sistemul central
        rospy.Subscriber("/throttle_camera/robot_image", sensor_msgs.msg.Image, self.image_robot_subscriber);
        rospy.Subscriber("/throttle_camera/room_image", sensor_msgs.msg.Image, self.image_room_subscriber);

    # calbbackul pentru comenzi (setez dinainte contorul ca sa nu inceapa sa inregistreze pe vechiul contor)
    def image_robot_subscriber(self, reply):
        frame = self.cvBridge.imgmsg_to_cv2(reply, 'bgr8');
        ret, jpeg = cv2.imencode('.jpg', frame);
        #image = jpeg.tobytes();
        jpg_as_text = base64.b64encode(jpeg);
        self.new_robot_image_pub.publish(jpg_as_text);
        self.rate.sleep();

    def image_room_subscriber(self, reply):
        frame = self.cvBridge.imgmsg_to_cv2(reply, 'bgr8');
        ret, jpeg = cv2.imencode('.jpg', frame);
        #image = jpeg.tobytes();
        jpg_as_text = base64.b64encode(jpeg);
        self.new_room_image_pub.publish(jpg_as_text);
        self.rate.sleep();
        

if __name__ == '__main__':
    rospy.init_node('trust_image_node', anonymous=True);
    try:
        rospy.loginfo("[TRUST] STARTED");
        my_logic_manager = RosbagManager();
        rospy.spin();
    except KeyboardInterrupt:
        pass;