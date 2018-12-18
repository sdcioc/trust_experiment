#!/usr/bin/python
import rospy
import std_msgs.msg
import geometry_msgs.msg


class TrustWebPoseClass:
	#constructor
    def __init__(self):
        self.rate = rospy.Rate(10);

        self.robot_web_pose_pub = rospy.Publisher(
                    '/robot_pose_web',
                        geometry_msgs.msg.Pose,
                        latch=True, queue_size=5);
        self.robot_web_pose = geometry_msgs.msg.Pose();
        
        rospy.sleep(2);
        rospy.Subscriber("/amcl_pose", geometry_msgs.msg.PoseWithCovarianceStamped, self.pose_subscriber);

    def pose_subscriber(self, reply):
        self.robot_web_pose.position = reply.pose.pose.position;
        self.robot_web_pose.orientation = reply.pose.pose.orientation;
        self.robot_web_pose_pub.publish(self.robot_web_pose);
        self.rate.sleep();
        

if __name__ == '__main__':
    rospy.init_node('trust_pose_web', anonymous=True);
    try:
        rospy.loginfo("[BIBPOLI_ROSBAG] STARTED");
        my_logic_manager = TrustWebPoseClass();
        rospy.spin();
    except KeyboardInterrupt:
        pass;