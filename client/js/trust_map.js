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
Calculeaza path-ul de la robot la stand-ul ensta
Daca este deja un path pe harta il sterge.
Creeaza un service request pentru global planner
ce contine ca sursa pozitia robotului si ca destinatie
pozitia standului ensta. Path-ul nou creat il adauga
la harta pentru afisare
*/
function calculate_path() {
    if (ensta_path != null && ensta_path != undefined) {
        viewer.removeObject(ensta_path);
    }
    ensta_path = new ROS2D.TraceShape({
        maxPoses: 0,
        strokeSize: 0.2
    });
    var req = new ROSLIB.ServiceRequest({
        start:  {
            header : {
            frame_id : '/map'
            },
            pose : robot_pose
        },
        goal: {
            header : {
            frame_id : '/map'
            },
            pose : ensta_pose
        }
    })

    glonalPlannerService.callService(req, function(result) {
        console.log("result from service status: " )
        console.log(result);
        for (var x in result.plan.poses) {
            console.log(x);
            ensta_path.addPose(result.plan.poses[x].pose);
        }
        viewer.addObject(ensta_path);
    });
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
        width: 200,
        height: 200
    });

    /*
    crearea unui obiect de harta
    */
    var nav = NAV2D.OccupancyGridClientNav({
        ros:        ros,
        rootObject: viewer.scene,
        viewer:     viewer,
        serverName: '/motv_identification_manager/nav_to_pose'
    });

    /*
    Declararea serviciului care oferta path-uri făcute de global planner
    */
    glonalPlannerService = new ROSLIB.Service({
        ros:            ros,
        name:           '/move_base/GlobalPlanner/make_plan',
        serviceType:    'nav_msgs/GetPlan'
    });

    /*
    Un topic pentru pozitia robotului
    alaturi de functia de callback ce actualizează poziția robotului
    */
    pose_topic = new ROSLIB.Topic({
        ros:            ros,
        name:           '/robot_pose_web',
        messageType:    'geometry_msgs/Pose'
    });
    pose_topic.subscribe(function(msg) {
        robot_pose = msg;
    });

    //imagina cu logo ensta de la stand
    ensta_image = new ROS2D.NavigationImage({
        size: 4.0,
        image: './img/ensta.png' 
    });
    viewer.addObject(ensta_image);

    /*
    parametrul ros ce contine punctul de interes ce reprezintă standul ensta
    */
    ensta_pose_param = new ROSLIB.Param({
        ros: ros,
        name: '/mmap/poi/submap_0/ensta'
    });

    /*
    Obtin datele de la punctul de interes si le convertez in pozitii pe harta
    setez imaginea cu logul ensta să fie deasupra stand-ului iar standul este
    reprezentat de un cerc, calculez de asemenea si pozitia standului in forma
    geometry_msgs/Pose pentru a putea folosit mai tarziu cu calcularea path-ului
    de la robot la stand
    */
    ensta_pose_param.get(function(value){
        ensta_position = convert_POIPosition_MapPosition(value);
        ensta_image.x = ensta_position.pose.position.x;
        ensta_image.y = -ensta_position.pose.position.y - 5;
        ensta_image.visible = true;
        ensta_image.rotation = -90;
        var g = new createjs.Graphics();
        g.setStrokeStyle(0);
        g.beginStroke(createjs.Graphics.getRGB(0,0,0));
        g.beginFill(createjs.Graphics.getRGB(255,0,0));
        g.drawCircle(0,0,1);
        var s = new createjs.Shape(g);
        s.x = ensta_position.pose.position.x;
        s.y = -ensta_position.pose.position.y;
        viewer.addObject(s);
        var positionVec3 = new ROSLIB.Vector3({x:ensta_position.pose.position.x, y:ensta_position.pose.position.y, z:0});
        var orientation = new ROSLIB.Quaternion({x:0, y:0, z:0, w:ensta_position.pose.orientation.w});
        ensta_pose = new ROSLIB.Pose({
            'position' : positionVec3,
            'orientation' : orientation
        });
    });
}

