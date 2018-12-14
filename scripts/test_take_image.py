
#! /usr/bin/python

import rospy
import cv2
import cv_bridge

import sensor_msgs.msg


if __name__ == '__main__':
    rospy.init_node('trust_image_node', anonymous=True);
    try:
        rospy.loginfo("[TRUST] STARTED");
        cvBridge = cv_bridge.CvBridge();
        reply = rospy.wait_for_message(
                        'xtion/rgb/image_rect_color',
                        sensor_msgs.msg.Image, 3);
        frame = cvBridge.imgmsg_to_cv2(reply, 'bgr8');
        cv2.imwrite("/home/ubuntu/test.jpg", frame);
        rospy.spin();
    except KeyboardInterrupt:
        pass;