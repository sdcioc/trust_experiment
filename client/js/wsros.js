var ros = new ROSLIB.Ros({
    url : 'ws://' + window.location.hostname+ ':9090'
});
var cmd_topic = null;
var events_topic = null;
var robot_feedback_topic = null;
var robot_service_trust_client = null;
var cmd_topic_contor = 0;

ros.on('connection', function() {
    console.log('Connected to websocket server.');
    cmd_topic = new ROSLIB.Topic({
        ros : ros,
        name : '/trust/web_cmd',
        messageType : 'std_msgs/String'
    });
    events_topic = new ROSLIB.Topic({
        ros : ros,
        name : '/trust/events',
        messageType : 'std_msgs/String'
    });
    robot_feedback_topic = new ROSLIB.Topic({
        ros : ros,
        name : '/trust/robot_feedback',
        messageType : 'std_msgs/String'
    });
    robot_service_trust_client = new ROSLIB.Service({
        ros : ros,
        name : '/trust_server',
        serviceType : 'trust_package/TrustServer'
    });
    robot_image_topic = new ROSLIB.Topic({
        ros : ros,
        name : '/trust_package/robot_base64image',
        messageType : 'std_msgs/String'
    });
    room_image_topic = new ROSLIB.Topic({
        ros : ros,
        name : '/trust_package/room_base64image',
        messageType : 'std_msgs/String'
    });
    init_map();
    main_page_init();
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

var experiment_events = {};
var experiment_index = 0;

// Publishing a Topic
// ------------------

/*
var cmdVel = new ROSLIB.Topic({
ros : ros,
name : '/cmd_vel',
messageType : 'geometry_msgs/Twist'
});

var twist = new ROSLIB.Message({
linear : {
    x : 0.1,
    y : 0.2,
    z : 0.3
},
angular : {
    x : -0.1,
    y : -0.2,
    z : -0.3
}
});
cmdVel.publish(twist);

// Subscribing to a Topic
// ----------------------

var listener = new ROSLIB.Topic({
ros : ros,
name : '/listener',
messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
console.log('Received message on ' + listener.name + ': ' + message.data);
listener.unsubscribe();
});

// Calling a service
// -----------------

var addTwoIntsClient = new ROSLIB.Service({
ros : ros,
name : '/add_two_ints',
serviceType : 'rospy_tutorials/AddTwoInts'
});

var request = new ROSLIB.ServiceRequest({
a : 1,
b : 2
});

addTwoIntsClient.callService(request, function(result) {
console.log('Result for service call on '
    + addTwoIntsClient.name
    + ': '
    + result.sum);
});

// Getting and setting a param value
// ---------------------------------

ros.getParams(function(params) {
console.log(params);
});

var maxVelX = new ROSLIB.Param({
ros : ros,
name : 'max_vel_y'
});

maxVelX.set(0.8);
maxVelX.get(function(value) {
console.log('MAX VAL: ' + value);
});
*/