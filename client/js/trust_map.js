// ros-ul
//var ros;

//canvas care produs harta
var viewer;

//pozitia robotului de tip geometry_msgs/PoseStamped
var robot_pose;
//pozitia standului ensta de tip geometry_msgs/PoseStamped
var ensta_pose;

//serivicul pentru global planner pentru a obține path
var glonalPlannerService;
//path-ul de la robot la standul ensta
var ensta_path;


/*
Converteste datele din cadrul unui punct de interes in pozitie pe harta
*/
function convert_POIPosition_MapPosition(position)
{
    pos = {};
    pos.pose = {};
    pos.pose.position = {};
    pos.pose.orientation = {};
	pos.pose.position.x = position[2];
	pos.pose.position.y = position[3];
	pos.pose.orientation.z = Math.sin(position[4] / 2.0);
    pos.pose.orientation.w = Math.cos(position[4] / 2.0);
    return pos;
}

/*
functia de initializare
*/
function init_map() {
    /*
    modul de aflare a latimii si inaltimii paginii pentur toate browserele
    */
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    /*
    crearea view-ului pentru harta
    */
    viewer = new ROS2D.Viewer({
        divID: 'main_page_info_nav',
        width: (x-15)/2 - 15,
        height: ( (y-10)*3)/10 - 10
    });

    /*
    crearea unui obiect de harta
    */
    var nav = NAV2D.OccupancyGridClientNav({
        ros:        ros,
        rootObject: viewer.scene,
        viewer:     viewer
    });


    //viewer.scaleToDimensions(4, 5);
    //viewer.shift(1,2);
    /*
    Un topic pentru pozitia robotului
    alaturi de functia de callback ce actualizează poziția robotului

    pose_topic = new ROSLIB.Topic({
        ros:            ros,
        name:           '/robot_pose_web',
        messageType:    'geometry_msgs/Pose'
    });
    pose_topic.subscribe(function(msg) {
        robot_pose = msg;
    });
    */
    
}

