#! /usr/bin/python
import rospy
import json
import math
import std_msgs.msg
import sensor_msgs.msg
import cv2
import cv_bridge
import geometry_msgs.msg
import trajectory_msgs.msg


class RosbagManager:
	#constructor
    def __init__(self):
        self.rate = rospy.Rate(1);
        self.image_robot_pub = rospy.Publisher(
                    '/xtion/rgb/image_raw',
                        sensor_msgs.msg.Image,
                        latch=True, queue_size=5);
        self.image_room_pub = rospy.Publisher(
                    '/camera/rgb/image_raw',
                        sensor_msgs.msg.Image,
                        latch=True, queue_size=5);
        self.amcl_pose_pub = rospy.Publisher(
                    '/amcl_pose',
                        geometry_msgs.msg.PoseWithCovarianceStamped,
                        latch=True, queue_size=5);
        self.robot_web_pose_pub = rospy.Publisher(
                    '/robot_pose_web',
                        geometry_msgs.msg.Pose,
                        latch=True, queue_size=5);
        self.cvBridge = cv_bridge.CvBridge();
        self.cv_image_robot = cv2.imread('/home/ubuntu/test_robot.jpg');
        self.robot_sensor_image = self.cvBridge.cv2_to_imgmsg(self.cv_image_robot, "bgr8");
        self.cv_image_room = cv2.imread('/home/ubuntu/test_room.jpg');
        self.room_sensor_image = self.cvBridge.cv2_to_imgmsg(self.cv_image_room, "bgr8");
        self.amcl_pose = geometry_msgs.msg.PoseWithCovarianceStamped();
        self.robot_web_pose = geometry_msgs.msg.Pose();
        self.headx = 0;
        self.heady = 0;
        rospy.sleep(2);
        rospy.Subscriber("/move_base_simple/goal", geometry_msgs.msg.PoseStamped, self.move_callback);
        rospy.Subscriber("/head_controller/command", trajectory_msgs.msg.JointTrajectory, self.head_callback);
        

    def move_callback(self, reply):
        #reply.pose (position, orietation)
        #self.amcl_pose.pose.pose (position, orietation)
        print "Am primit comanda de move"
        print reply
        self.amcl_pose.pose.pose.position = reply.pose.position;
        self.amcl_pose.pose.pose.orientation = reply.pose.orientation;
        self.robot_web_pose.position = reply.pose.position;
        self.robot_web_pose.orientation = reply.pose.orientation;
    
    def head_callback(self, reply):
        #reply.points[0].positions[0]
        print "Am primit comanda de head"
        print reply
        self.headx = reply.points[0].positions[0];
        self.heady = reply.points[0].positions[1];
        
    def loop(self):
        while not rospy.is_shutdown():
            self.amcl_pose_pub.publish(self.amcl_pose);
            self.rate.sleep();
            self.robot_web_pose_pub.publish(self.robot_web_pose);
            self.rate.sleep();
            self.image_robot_pub.publish(self.robot_sensor_image);
            self.rate.sleep();
            self.image_room_pub.publish(self.room_sensor_image);
            self.rate.sleep();
        

if __name__ == '__main__':
    rospy.init_node('robot_simulate_node', anonymous=True);
    try:
        rospy.loginfo("[ROBOT] STARTED");
        my_logic_manager = RosbagManager();
        my_logic_manager.loop();
    except KeyboardInterrupt:
        pass;