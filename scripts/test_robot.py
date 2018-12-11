#! /usr/bin/python
import rospy
import json
import math
import std_msgs.msg
import sensor_msgs.msg
import cv2
import cv_bridge
import geometry_msgs.msg


class RosbagManager:
	#constructor
    def __init__(self):
        self.rate = rospy.Rate(1);
        self.image_pub = rospy.Publisher(
                    'xtion/rgb/image_rect_color',
                        sensor_msgs.msg.Image,
                        latch=True, queue_size=5);
        self.amcl_pose_pub = rospy.Publisher(
                    '/amcl_pose',
                        geometry_msgs.msg.PoseWithCovarianceStamped,
                        latch=True, queue_size=5);
        self.cvBridge = cv_bridge.CvBridge();
        self.cv_image = cv2.imread('/home/ubuntu/test.jpg');
        self.sensor_image = self.cvBridge.cv2_to_imgmsg(self.cv_image, "bgr8");
        self.amcl_pose = geometry_msgs.msg.PoseWithCovarianceStamped();
        rospy.sleep(2);
        

    def loop(self):
        while not rospy.is_shutdown():
            self.amcl_pose_pub.publish(self.amcl_pose);
            self.rate.sleep();
            self.image_pub.publish(self.sensor_image);
            self.rate.sleep();
        

if __name__ == '__main__':
    rospy.init_node('robot_simulate_node', anonymous=True);
    try:
        rospy.loginfo("[ROBOT] STARTED");
        my_logic_manager = RosbagManager();
        my_logic_manager.loop();
    except KeyboardInterrupt:
        pass;