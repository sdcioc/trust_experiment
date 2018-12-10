#! /usr/bin/python
import rospy
import json

from trust_package.srv import *

def trust_server_client(x):

    rospy.wait_for_service('trust_server');
    
    try:
        trust_client = rospy.ServiceProxy('trust_server', TrustServer);
        
        # simplified style
        resp1 = trust_client(x);

        # formal style
        resp2 = trust_client.call(TrustServerRequest(x));

        print resp1
        print resp2
    except rospy.ServiceException, e:
        print "Service call failed: %s"%e

if __name__ == "__main__":
    requestDict = {
        "type" :  "Test",
        "name" : "test",
        "task" : "tesT"
    };
    print trust_server_client(json.dumps(requestDict));