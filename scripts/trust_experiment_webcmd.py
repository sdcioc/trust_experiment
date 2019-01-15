#! /usr/bin/python
import rospy
import json
import math


import std_msgs.msg
import geometry_msgs.msg
import trajectory_msgs.msg
from trust_package.srv import *

def convert_POIPosition_MapPosition(position):
	#tipul de mesaj pentru map
	pos = geometry_msgs.msg.PoseStamped();
	#harta pe care are loc pozitionarea si directia
	pos.header.frame_id = 'map';
	pos.pose.position.x = position[0];
	pos.pose.position.y = position[1];
	#pos.pose.orientation.z = math.sin(position[2] / 2.0);
	pos.pose.orientation.w = math.cos(position[2] / 2.0);
	return pos;

#intrare geometry_msgs.msg.PoseStamped (vector3 position, vector3 orientation)
def convert_MapPosition_POIPosition(position):
        x = position.position.x;
        y = position.position.y;
        w = 2 * math.acos(position.orientation.w);
        return (x, y, w);

def convert_POIName_RosparamName(poi_name):
	prefix = '/mmap/poi/submap_0/';
	if not poi_name.startswith(prefix):
		poi_name = prefix + poi_name;
	return poi_name;

#returneaza pozitia pe harta a punctului de interes
def get_poi_position(poi_name):
    print "[INFO] getting position for poi {}".format(poi_name) 
    poi_name = convert_POIName_RosparamName(poi_name)
    try:
        poi = rospy.get_param(poi_name)
        if not poi:
            return None
        if len(poi[2:]) != 3:
            return None
        position = convert_POIPosition_MapPosition(poi[2:])
        return position
    except KeyError:
        return None
# clasa ce se ocupa de logica de inregistrare a rosbackurilor
class TrustWebServerClass:
	#constructor
    def __init__(self):
        self.rate = rospy.Rate(10);
        # starea modulului
        self.state = "STOP";

        self.move_pub = rospy.Publisher(
                    '/move_base_simple/goal',
                        geometry_msgs.msg.PoseStamped,
                        latch=True, queue_size=5);
        self.head_pub = rospy.Publisher(
                    '/head_controller/command',
                        trajectory_msgs.msg.JointTrajectory,
                        latch=True, queue_size=5);
        
        self.head_positions = {
            "1" : [1.3, 0],
            "2" : [0, 0],
            "3" : [-1.3, 0],
            "4" : [0, 0]
        }
        #conotrul ce reprezinta numarul experimentului
        self.contor = 0;
        self.service = None;
        self.SPEED = 0.3;
        rospy.sleep(2);

    def start_service(self):
        self.server = rospy.Service('trust_web_server', TrustServer, self.trust_web_callback);

    # calbbackul pentru comenzi (setez dinainte contorul ca sa nu inceapa sa inregistreze pe vechiul contor)
    def trust_web_callback(self, req):
        print "A primit" + req.a;
        my_dict = json.loads(req.a)
        responseDict = {}
        responseDict["type"] = my_dict["type"];
        responseDict["name"] = "Fail";
        if(my_dict["type"] == "head_task"):
            print "HEAD_TASK"
            head_msg = trajectory_msgs.msg.JointTrajectory();
            head_point1 = trajectory_msgs.msg.JointTrajectoryPoint();
            head_point1.velocities = [];
            head_point1.accelerations = [];
            head_point1.effort = [];
            head_point1.time_from_start = rospy.Time.now();
            head_point1.time_from_start.secs = 0;
            head_point1.time_from_start.nsecs = 100000000;
            head_point1.positions = [self.head_positions[str(my_dict["task"])][0], self.head_positions[str(my_dict["task"])][1]];
            head_msg.joint_names = ['head_1_joint', 'head_2_joint'];
            h = std_msgs.msg.Header();
            h.stamp = rospy.Time.now();
            h.stamp.secs = 0;
            h.stamp.nsecs = 0;
            head_msg.header = h;
            head_msg.points.append(head_point1);
            self.head_pub.publish(head_msg);
            self.rate.sleep();
            responseDict["name"] = "Success";
        elif(my_dict["type"] == "head_move"):
            print "HEAD_MOVE"
            head_msg = trajectory_msgs.msg.JointTrajectory();
            head_point1 = trajectory_msgs.msg.JointTrajectoryPoint();
            head_point1.velocities = [];
            head_point1.accelerations = [];
            head_point1.effort = [];
            head_point1.time_from_start = rospy.Time.now();
            head_point1.time_from_start.secs = 0;
            head_point1.time_from_start.nsecs = 100000000;
            head_point1.positions = [my_dict["headx"], my_dict["heady"]];
            head_msg.joint_names = ['head_1_joint', 'head_2_joint'];
            h = std_msgs.msg.Header();
            h.stamp = rospy.Time.now();
            h.stamp.secs = 0;
            h.stamp.nsecs = 0;
            head_msg.header = h;
            head_msg.points.append(head_point1);
            self.head_pub.publish(head_msg);
            self.rate.sleep();
            responseDict["name"] = "Success";
        elif(my_dict["type"] == "move_task"):
            print "MOVE_TASK"
            if(my_dict["task"] == 1):
                self.move_pub.publish(get_poi_position("poi_bedroom"));
            if(my_dict["task"] == 2):
                self.move_pub.publish(get_poi_position("poi_livingroom"));
            if(my_dict["task"] == 3):
                if(my_dict["type"] == 1):
                    self.move_pub.publish(get_poi_position("poi_bedroom"));
                else:
                    self.move_pub.publish(get_poi_position("poi_livingroom"));
            self.rate.sleep();
            responseDict["name"] = "Success";
        elif(my_dict["type"] == "base_move"):
            print "BASE_MOVE"
            reply = rospy.wait_for_message(
            '/amcl_pose',
            geometry_msgs.msg.PoseWithCovarianceStamped, 3);
            current_poi_position = convert_MapPosition_POIPosition(reply.pose.pose);
            #TODO: de calculat ianinte si in spate si rotatia mai complicat paote folosesc functia de conversie
            if(my_dict["name"] == "FORWARD"):
                new_poi_position =  (current_poi_position[0]+self.SPEED * math.cos(current_poi_position[2]), current_poi_position[1]+self.SPEED * math.sin(current_poi_position[2]), current_poi_position[2]);
            elif(my_dict["name"] == "BACK"):
                new_poi_position =  (current_poi_position[0]-math.cos(current_poi_position[2]), current_poi_position[1]-math.sin(current_poi_position[2]), current_poi_position[2]);
            elif(my_dict["name"] == "LEFT"):
                new_poi_position =  (current_poi_position[0], current_poi_position[1], current_poi_position[2]+0.3);
            elif(my_dict["name"] == "RIGHT"):
                new_poi_position =  (current_poi_position[0], current_poi_position[1], current_poi_position[2]-0.3);
            else:
                new_poi_position =  (current_poi_position[0], current_poi_position[1], current_poi_position[2]);
            request_position = convert_POIPosition_MapPosition(new_poi_position);
            self.move_pub.publish(request_position);
            self.rate.sleep();
            responseDict["name"] = "Success";
        else:
            print "MESAJ ERONAT"
        return TrustServerResponse(json.dumps(responseDict));

if __name__ == '__main__':
    rospy.init_node('bibpoli_rosbag_node', anonymous=True);
    try:
        rospy.loginfo("[BIBPOLI_ROSBAG] STARTED");
        TrustWebServerInstance = TrustWebServerClass();
        TrustWebServerInstance.start_service();
        rospy.spin();
    except KeyboardInterrupt:
        pass;