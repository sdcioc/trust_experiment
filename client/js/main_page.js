
var headLeftRightSlider = null;
var headUpDownSlider = null;
var torsoUpDownSlider = null;
var head_x = 0;
var head_y = 0;
var torso_y = 0.2;
var main_page_current_state = null;
var main_page_current_task = null;
var main_page_tasks = {
    1:0,
    2:0,
    3:0
}
var autonomous_move = null;
var autonomous_head = null;
var autonomous_result = null;


var main_page_first_time = true;
var main_page_has_intervine_result = false;
var main_page_real_task = {
    1:1,
    2:3,
    3:2
}
var main_page_false_task = {
    1:1,
    2:3,
    3:2
}

var main_page_task_3_move_task = null;
var main_page_task_3_scans = {
    1:{
        "COFEE TABLE" : false,
        "COUCH" : false,
        "BED" : false,
        "CHAIR" : false,
        "XBOX" : false
    },
    2:{
        "COFEE TABLE" : false,
        "COUCH" : false,
        "BED" : false,
        "CHAIR" : false,
        "XBOX" : false
    }
};

var main_page_current_task_head_task = null;
var main_page_current_task_scans_remained = null;

var main_page_tasks_objects_detection = {
    1:{
        "PLANT" : false
    },
    2:{
        "COFEE TABLE" : false,
        "COUCH" : false,
        "LIVING ROOM" : false,
        "CHAIR" : false,
        "TV" : false
    },
    3:{
        "COFEE TABLE" : false,
        "COUCH" : false,
        "BED" : false,
        "CHAIR" : false,
        "XBOX" : false
    }
}


var main_page_tasks_objects_detection_correct = {
    1:{
        "PLANT" : true
    },
    2:{
        "COFEE TABLE" : true,
        "COUCH" : true,
        "LIVING ROOM" : true,
        "CHAIR" : true,
        "TV" : true
    },
    3:{
        "COFEE TABLE" : true,
        "COUCH" : true,
        "BED" : true,
        "CHAIR" : true,
        "XBOX" : false
    }
}

var main_page_robot_poi_pose = {
    "x" : 0,
    "y" : 0,
    "z" : 0
}

var main_page_total_score = null;
var main_page_current_task_score = null;
var main_page_current_task_interventions = {
    "MOVE_BASE" : false,
    "MOVE_HEAD_AND_SCAN" : false,
    "CALCULATE_RESULT" : false
}


function main_page_enter() {
    document.getElementById("main_page").hidden = false;
    if(main_page_first_time) {
        main_page_first_time = false;
        main_page_init();
    }
}

function main_page_init() {
    
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "MainPage"
    }
    experiment_index = experiment_index + 1;

   var colors = {
       1 : createjs.Graphics.getRGB(0,255,0),
       2 : createjs.Graphics.getRGB(255,255,0),
       3 : createjs.Graphics.getRGB(255,0,0),
       4 : createjs.Graphics.getRGB(0,0,255)
   }

   var g_3 = new createjs.Graphics();
   g_3.setStrokeStyle(0);
   g_3.beginStroke(colors[main_page_false_task[3]]);
   g_3.beginFill(colors[main_page_false_task[3]]);
   g_3.drawRect(0,0,1,1);
   var s_3 = new createjs.Shape(g_3);
   s_3.scaleX = 0.5;
   s_3.scaleY = 0.4;
   s_3.x = 3.1;
   s_3.y = -1.2;
   s_3.rotation = 7;
   viewer.addObject(s_3);



   var g_2 = new createjs.Graphics();
   g_2.setStrokeStyle(0);
   g_2.beginStroke(colors[main_page_false_task[2]]);
   g_2.beginFill(colors[main_page_false_task[2]]);
   g_2.drawRect(0,0,1,1);
   var s_2 = new createjs.Shape(g_2);
   s_2.scaleX = 0.2;
   s_2.scaleY = 0.4;
   s_2.x = 3.2;
   s_2.y = 0.9;
   s_2.rotation = 10;
   viewer.addObject(s_2);



   var g_1 = new createjs.Graphics();
   g_1.setStrokeStyle(0);
   g_1.beginStroke(colors[main_page_false_task[1]]);
   g_1.beginFill(colors[main_page_false_task[1]]);
   g_1.drawRect(0,0,1,1);
   var s_1 = new createjs.Shape(g_1);
   s_1.scaleX = 0.3;
   s_1.scaleY = 0.25;
   s_1.x = 1.2;
   s_1.y = 0.85;
   s_1.rotation = 5;
   viewer.addObject(s_1);


   var g_4 = new createjs.Graphics();
   g_4.setStrokeStyle(0);
   g_4.beginStroke(colors[main_page_false_task[4]]);
   g_4.beginFill(colors[main_page_false_task[4]]);
   g_4.drawRect(0,0,1,1);
   var s_4 = new createjs.Shape(g_4);
   s_4.scaleX = 0.5;
   s_4.scaleY = 0.3;
   s_4.x = 0.95;
   s_4.y = -1.4;
   s_4.rotation = 8;
   viewer.addObject(s_4);

    /*
    Setare hartă
    */
    viewer.scene.scaleX = 70;
    viewer.scene.scaleY = 60;
    viewer.scene.x = 150;
    viewer.scene.y = 110;
    viewer.scene.children[2].scaleY = 0.01
    viewer.scene.children[2].scaleX = 0.01

    headLeftRightSlider = $("#main_page_task_intervetion_head_left_right_slider").bootstrapSlider(
        {
            min : -1.3,
            max : 1.3,
            step : 0.1,
            ticks: [-1.3, 0, 1.3],
            ticks_positions: [0, 50, 100],
            ticks_labels: ['Left', 'Center', 'Right'],
            tooltip : 'hide',
            selection : 'none',
            value : head_x
        }
    );
    headLeftRightSlider.on("slideStop", function(event) {
        head_x = event.value;
        var valueToSend = head_x;
        console.log(valueToSend);
        var message_dict = {
            'type' : "head_move",
            'task' : main_page_current_task,
            'headx' : head_x,
            'heady' : head_y
        }
        var request = new ROSLIB.ServiceRequest({
            a : JSON.stringify(message_dict)
        });
    
        robot_web_service_trust_client.callService(request, function(result) {
            console.log('Result for service call on '
            + robot_web_service_trust_client.name
            + ': '
            + result);
        });
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadMovedLR",
            'type' : "MainPage",
            'task' : main_page_current_task,
            'headx' : head_x,
            'heady' : head_y
        }
        experiment_index = experiment_index + 1;
    })
    headUpDownSlider = $("#main_page_task_intervetion_head_up_down_slider").bootstrapSlider(
        {
            min : -0.8,
            max : 1,
            step : 0.1,
            ticks: [-0.8, 0, 1],
            ticks_positions: [0, 50, 100],
            ticks_labels: ['Up', 'Center', 'Down'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : false,
            selection : 'none',
            value : head_y
        }
    );
    headUpDownSlider.on("slideStop", function(event) {
        head_y = event.value;
        var valueToSend = head_y *-1;
        console.log(valueToSend);
        var message_dict = {
            'type' : "head_move",
            'task' : main_page_current_task,
            'headx' : head_x,
            'heady' : head_y
        }
        var request = new ROSLIB.ServiceRequest({
            a : JSON.stringify(message_dict)
        });

        robot_web_service_trust_client.callService(request, function(result) {
            console.log('Result for service call on '
            + robot_web_service_trust_client.name
            + ': '
            + result);
        });
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadMovedUD",
            'type' : "MainPage",
            'task' : main_page_current_task,
            'headx' : head_x,
            'heady' : head_y
        }
        experiment_index = experiment_index + 1;
    })
    torsoUpDownSlider = $("#main_page_task_intervetion_torso_up_down_slider").bootstrapSlider(
        {
            min : -0.40,
            max : 0,
            step : 0.05,
            ticks: [-0.4, -0.2, 0],
            ticks_positions: [0, 50, 100],
            ticks_labels: ['Up', 'Center', 'Down'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : false,
            selection : 'none',
            value : torso_y,
            enabled : false
        }
    );
    torsoUpDownSlider.on("slideStop", function(event) {
        torso_y = event.value;
        var valueToSend = torso_y * -1;
        console.log(valueToSend);
    })
    main_page_current_state = "CHOSE_TASK"

    document.getElementById("main_page_task_intervetion_move_base_arrows_up_buttton").disabled = true;
    document.getElementById("main_page_task_intervetion_move_base_arrows_left_buttton").disabled = true;
    document.getElementById("main_page_task_intervetion_move_base_arrows_down_buttton").disabled = true;
    document.getElementById("main_page_task_intervetion_move_base_arrows_right_buttton").disabled = true;
    
    //TODO : image real times
    robot_image_topic.subscribe(function(message) {
        //document.getElementById("main_page_rgb_robot_img").src = "data:image/jpg;base64," + message.data;
    });
    room_image_topic.subscribe(function(message) {
        document.getElementById("main_page_rgb_room_img").src = "data:image/jpg;base64," + message.data;
    });

    var w2 = window,
    d2 = document,
    e2 = d2.documentElement,
    g2 = d2.getElementsByTagName('body')[0],
    x2 = w2.innerWidth || e2.clientWidth || g2.clientWidth,
    y2 = w2.innerHeight|| e2.clientHeight|| g2.clientHeight;
	var robot_image_viewer = new MJPEGCANVAS.Viewer({
		divID: 'main_page_rgb_robot_div',
		host: window.location.hostname,
        port: 8000,
		width: (x2-15)/2 -15 ,
        height: ( (y2-10)*3)/10 -10,
        //quality: 40,
		// topic: '/kinect2/k2_rgb_sd/image'
	    topic: '/xtion/rgb/image_raw'
	});

    document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    document.getElementById("main_page_info_header").innerHTML = "Chose a task";
    //TODO: random chose a task after timeout


    //TODO: pentru când nu avem chat să marim poz3le
    if(main_page_cond2 == 0) {
        document.getElementById("main_page_chat_interface").hidden = true;
    }

    main_page_total_score = 0;
    document.getElementById("main_page_total_score").innerHTML = "Current Score:" + main_page_total_score;
}

function main_page_exit() {
    document.getElementById("main_page").hidden = true;
}

function main_page_start_task(arg) {
    console.log(arg);
    main_page_current_task = main_page_real_task[arg];
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "TaskStarted",
        'type' : "MainPage",
        'task' : main_page_current_task
    }
    experiment_index = experiment_index + 1;
    main_page_current_state = "MOVE_BASE";
    document.getElementById("main_page_task_intervetion_task_1").disabled = true;
    document.getElementById("main_page_task_intervetion_task_2").disabled = true;
    document.getElementById("main_page_task_intervetion_task_3").disabled = true;
    main_page_tasks[main_page_current_task] = 3;
    autonomous_move = true;
    autonomous_head = true;
    autonomous_result = true;
    var message_dict = {
        'type' : "move_task",
        'task' : main_page_current_task
    }

    if (main_page_current_task == 3) {
        main_page_task_3_move_task = 1;
        message_dict['subtype'] = main_page_task_3_move_task;
    }

    var request = new ROSLIB.ServiceRequest({
        a : JSON.stringify(message_dict)
    });

    robot_web_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_web_service_trust_client.name
        + ': '
        + result);
    });
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = false;
    main_page_move_base_timer(50);

    document.getElementById("main_page_info_header").innerHTML = "The robot moves trough rooms, In 50 seconds you can intervine by pressing intervine button";
    main_page_current_task_score = 7;
    main_page_current_task_interventions = {
        "MOVE_BASE" : false,
        "MOVE_HEAD_AND_SCAN" : false,
        "CALCULATE_RESULT" : false
    }
}

function main_page_feedback() {
    changeState("post_questions_page");
}


function main_page_prepare_for_next_task() {
    var local_sem = false;
    if(main_page_tasks[main_page_false_task[1]] == 0) {
        document.getElementById("main_page_task_intervetion_task_1").disabled = false;
        local_sem = true;
    }
    if(main_page_tasks[main_page_false_task[2]] == 0) {
        document.getElementById("main_page_task_intervetion_task_2").disabled = false;
        local_sem = true;
    }
    if(main_page_tasks[main_page_false_task[3]] == 0) {
        document.getElementById("main_page_task_intervetion_task_3").disabled = false;
        local_sem = true;
    }
    if(local_sem) {
        main_page_current_state = "CHOSE_TASK";
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "SelectNewTask",
            'type' : "MainPage"
        }
        experiment_index = experiment_index + 1;

        document.getElementById("main_page_info_header").innerHTML = "Chose a task";
    } else {
        main_page_current_state = "EXPERIMENT_FINISHED"
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "Experiemntfinished",
            'type' : "MainPage"
        }
        experiment_index = experiment_index + 1;
        changeState("thank_you_page");
    }
}

function main_page_verify_move_base_arive() {
    var requestDict = {
        type : "VerifyMove",
        task : main_page_current_task
    }
    if (main_page_current_task == 3) {
        requestDict['subtype'] = main_page_task_3_move_task;
    }
    var request = new ROSLIB.ServiceRequest({
        a : JSON.stringify(requestDict)
    });

    robot_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_service_trust_client.name
        + ': '
        + result);
        var response = JSON.parse(result.response);
        var move_base_success = true;
        if(response["name"]=="Success") {
            move_base_success = true;
        } else {
            move_base_success = false;
        }
        console.log(result.response);
        if(move_base_success) {
            experiment_events[experiment_index] = {
                'dateString' : new Date().toJSON(),
                'name' : "MoveSuccesfull",
                'type' : "MainPage",
                'task' : main_page_current_task
            }
            experiment_index = experiment_index + 1;
            main_page_my_swal("MOVE_BASE", true);
        } else {
            main_page_tasks[main_page_current_task] = 2;
            main_page_my_swal("MOVE_BASE", false);
        }
    });
}

function main_page_verify_move_head() {
    var move_head_success = true;

    //move head straight after :P
    var message_dict = {
        'type' : "head_task",
        'task' : 4
    }
    var request = new ROSLIB.ServiceRequest({
        a : JSON.stringify(message_dict)
    });

    robot_web_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_web_service_trust_client.name
        + ': '
        + result);
    });

    if(move_head_success) {
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadSuccessful",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        main_page_my_swal("MOVE_HEAD_AND_SCAN", true);
    } else {
        main_page_tasks[main_page_current_task] = 2;
        main_page_my_swal("MOVE_HEAD_AND_SCAN", false);
    }
}


function main_page_verify_result() {
    var result_success = false;
    var room_type = null;
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    if (main_page_has_intervine_result) {
        if(main_page_current_task == 1) {
            main_page_tasks_objects_detection[main_page_current_task]["PLANT"] = document.getElementById("main_page_task_intervetion_scan_task_1_has_object").checked;
        } else if(main_page_current_task == 2) {
            room_type = document.getElementById("main_page_task_intervetion_scan_task_2_room").value;
        } else if(main_page_current_task == 3) {
            main_page_tasks_objects_detection[main_page_current_task]["COFEE TABLE"] = document.getElementById("main_page_task_intervetion_scan_task_3_has_object_1").checked;
            main_page_tasks_objects_detection[main_page_current_task]["COUCH"] = document.getElementById("main_page_task_intervetion_scan_task_3_has_object_2").checked;
            main_page_tasks_objects_detection[main_page_current_task]["BED"] = document.getElementById("main_page_task_intervetion_scan_task_3_has_object_3").checked;
            main_page_tasks_objects_detection[main_page_current_task]["CHAIR"] = document.getElementById("main_page_task_intervetion_scan_task_3_has_object_4").checked;
            main_page_tasks_objects_detection[main_page_current_task]["XBOX"] = document.getElementById("main_page_task_intervetion_scan_task_3_has_object_5").checked;
        } else {
            console.log("EROARE")
        }
    } else {
        if(main_page_current_task == 1) {
            console.log("TASK 1 rezultat automat")
        } else if(main_page_current_task == 2) {
            if(main_page_tasks_objects_detection[main_page_current_task]['LIVING ROOM']) {
                room_type = 'Livingroom';
            } else {
                if( (main_page_tasks_objects_detection[main_page_current_task]['COFEE TABLE']) &&
                (main_page_tasks_objects_detection[main_page_current_task]['COUCH']) &&
                (main_page_tasks_objects_detection[main_page_current_task]['CHAIR'])&&
                (main_page_tasks_objects_detection[main_page_current_task]['TV'])
                ) {
                    room_type = 'Livingroom';
                }
            }
        } else if(main_page_current_task == 3) {
            for (x in main_page_task_3_scans[1]) {
                if(main_page_task_3_scans[1][x]) {
                    main_page_tasks_objects_detection[3][x] = true;
                }
            }
            for (x in main_page_task_3_scans[2]) {
                if(main_page_task_3_scans[2][x]) {
                    main_page_tasks_objects_detection[3][x] = true;
                }
            }
        } else {
            console.log("EROARE")
        }

    }
    //TODO verificare răspunsuri
    if(main_page_current_task == 1) {
        result_success = main_page_tasks_objects_detection[main_page_current_task]["PLANT"];
    } else if(main_page_current_task == 2) {
        if(room_type =='Livingroom') {
            result_success = true;
        }
    } else if(main_page_current_task == 3) {
        if( (main_page_tasks_objects_detection[main_page_current_task]['COFEE TABLE']) &&
        (main_page_tasks_objects_detection[main_page_current_task]['COUCH']) &&
        (main_page_tasks_objects_detection[main_page_current_task]['BED']) &&
        (main_page_tasks_objects_detection[main_page_current_task]['CHAIR'])&&
        (main_page_tasks_objects_detection[main_page_current_task]['XBOX']==false)
        ) {
            result_success = true;
        }
    } else {
        console.log("EROARE")
    }
    
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "VerifyResult",
        'type' : "MainPage",
        'task' : main_page_current_task,
        'has_intervine' : main_page_has_intervine_result,
        'result_success' : result_success,
        'answers' : main_page_tasks_objects_detection[main_page_current_task]
    }
    experiment_index = experiment_index + 1;
    main_page_has_intervine_result = false;
    if(result_success) {
        main_page_tasks[main_page_current_task] = 1;
        main_page_my_swal("CALCULATE_RESULT", true);
    } else {
        main_page_tasks[main_page_current_task] = 2;
        main_page_my_swal("CALCULATE_RESULT", false);
    }
}

function main_page_move_base_timer(arg) {
    if(arg == 0) {
        main_page_verify_move_base_arive();
    } else {
        setTimeout(function(){
            if(autonomous_move) {
                document.getElementById("main_page_info_header").innerHTML = "The robot moves trough rooms. In " + (arg-1) + " seconds  you can intervine by pressing intervine button";
                main_page_move_base_timer(arg-1);
            }
        }, 1000);
    }
}


function main_page_move_base_manual_timer(arg) {
    if(arg == 0) {
        main_page_finish_intervention();
    } else {
        setTimeout(function(){
            if(autonomous_move==false) {
                main_page_move_base_manual_timer(arg-1);
                document.getElementById("main_page_info_header").innerHTML = "You control the robot. You have " + (arg-1) + " seconds to move him";
            }
        }, 1000);
    }
}

function main_page_move_head_timer(arg) {
    if(arg == 0) {
        main_page_verify_move_head();
    } else {
        setTimeout(function(){
            if(autonomous_head) {
                main_page_move_head_timer(arg-1);
                document.getElementById("main_page_info_header").innerHTML = "The robot moves its head to see the table. In " + (arg-1) + " seconds  you can intervine by pressing intervine button";
            }
        }, 1000);
    }
}


function main_page_move_head_manual_timer(arg) {
    if(arg == 0) {
        main_page_finish_intervention();
    } else {
        setTimeout(function(){
            if(autonomous_head==false) {
                main_page_move_head_manual_timer(arg-1);

                document.getElementById("main_page_info_header").innerHTML = "You control the robot. You have " + (arg-1) + " seconds to move its head. You have " + (main_page_current_task_scans_remained) + " scans remained";
            }
        }, 1000);
    }
}


function main_page_result_timer(arg) {
    if(arg == 0) {
        main_page_verify_result();
    } else {
        setTimeout(function(){
            if(autonomous_result) {
                main_page_result_timer(arg-1);
                document.getElementById("main_page_info_header").innerHTML = "The robot calculates the result. In " + (arg-1) + " seconds  you can intervine by pressing intervine button";
            }
        }, 1000);
    }
}


function main_page_result_manual_timer(arg) {
    if(arg == 0) {
        main_page_finish_intervention();
    } else {
        setTimeout(function(){
            if(autonomous_result==false) {
                main_page_result_manual_timer(arg-1);
                document.getElementById("main_page_info_header").innerHTML = "You control the answer for result. You have " + (arg-1) + " seconds to complete the result form";
            }
        }, 1000);
    }
}

function main_page_intervention() {
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    if(main_page_current_state == "MOVE_BASE") {
        autonomous_move = false;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "MoveIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_move_base_arrows").hidden = false;
        document.getElementById("main_page_task_intervetion_move_base_arrows_up_buttton").disabled = false;
        document.getElementById("main_page_task_intervetion_move_base_arrows_left_buttton").disabled = false;
        document.getElementById("main_page_task_intervetion_move_base_arrows_down_buttton").disabled = false;
        document.getElementById("main_page_task_intervetion_move_base_arrows_right_buttton").disabled = false;
        main_page_current_task_interventions["MOVE_BASE"] = true;
        main_page_move_base_manual_timer(120);
    }
    else if(main_page_current_state == "MOVE_HEAD_AND_SCAN") {
        autonomous_head = false;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        if (main_page_current_task == 3) {
            for (x in main_page_task_3_scans[main_page_task_3_move_task]) {
                main_page_task_3_scans[main_page_task_3_move_task][x] = false;
            }
        } else {
            for (x in main_page_tasks_objects_detection[main_page_current_task]) {
                main_page_tasks_objects_detection[main_page_current_task][x] = false;
            }
        }
        main_page_current_task_scans_remained = 3;
        document.getElementById("main_page_task_intervetion_head_sliders_div").hidden = false;
        main_page_current_task_interventions["MOVE_HEAD_AND_SCAN"] = true;
        main_page_move_head_manual_timer(60);
    }
    else if(main_page_current_state == "CALCULATE_RESULT") {
        autonomous_result = false;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "ResultIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_scan").hidden = false;
        document.getElementById("main_page_task_intervetion_scan_task_"+main_page_current_task).hidden = false;
        main_page_current_task_interventions["CALCULATE_RESULT"] = true;
        main_page_result_manual_timer(30);
    }
    document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = false;
}

function main_page_finish_intervention() {
    document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = true;
    if(main_page_current_state == "MOVE_BASE") {
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "MoveFinishedIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_move_base_arrows").hidden = true;
        autonomous_move = true;
        main_page_verify_move_base_arive();
    } else if (main_page_current_state == "MOVE_HEAD_AND_SCAN") {
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadFinishedIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_head_sliders_div").hidden = true;
        autonomous_head = true;
        //TODO enable scan button
        document.getElementById("main_page_task_intervetion_head_sliders_div_buttton").disabled = false;
        main_page_verify_move_head();
    } else if (main_page_current_state == "CALCULATE_RESULT") {
        autonomous_result = true;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "ResultFinishedInternvention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_scan").hidden = true;
        document.getElementById("main_page_task_intervetion_scan_task_"+main_page_current_task).hidden = true;
        main_page_has_intervine_result = true;
        main_page_verify_result();
    }
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = false;
}

function main_page_move_btn(arg) {
    var message_dict = {
        'type' : "base_move",
        'task' : main_page_current_task,
        'name' : ""
    }
    if(arg == 1) {
        message_dict['name'] = "FORWARD";
    } else if (arg == 2) {
        message_dict['name'] = "BACK";
    } else if (arg == 3) {
        message_dict['name'] = "LEFT";
    } else if (arg == 4) {
        message_dict['name'] = "RIGHT";
    } else {
        console.log("EROARE");
    }
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "ArrowButtonPressed",
        'type' : "MainPage",
        'task' : main_page_current_task,
        'direction' :  message_dict['name']
    }
    experiment_index = experiment_index + 1;
    var request = new ROSLIB.ServiceRequest({
        a : JSON.stringify(message_dict)
    });

    robot_web_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_web_service_trust_client.name
        + ': '
        + result);
    });
}

function main_page_scan_task() {
    main_page_current_task_scans_remained = main_page_current_task_scans_remained - 1;
    if (main_page_current_task_scans_remained < 1) {
        //TODO disable scan button
        document.getElementById("main_page_task_intervetion_head_sliders_div_buttton").disabled = true;
    }
    if (main_page_current_task_scans_remained > -1) {
        var requestDict = {
            type : "Scan",
            task : main_page_current_task,
            service : ""
        }
        if(main_page_cond1 == 0) {
            requestDict["service"] = "google";
        } else if (main_page_cond1 == 1) {
            requestDict["service"] = "amazon";
        } else {
            requestDict["service"] = "dlib";
        }
        var request = new ROSLIB.ServiceRequest({
            a : JSON.stringify(requestDict)
        });
    
        robot_service_trust_client.callService(request, function(result) {
            console.log('Result for service call on '
            + robot_service_trust_client.name
            + ': '
            + result);
            main_page_scan_service_response = JSON.parse(result.response);
            main_page_scan_service_response = main_page_scan_service_response.result;
            for (x in main_page_scan_service_response) {
                if(main_page_current_task == 3) {
                    if( main_page_scan_service_response[x].toUpperCase() in main_page_task_3_scans[main_page_task_3_move_task]) {
                        main_page_task_3_scans[main_page_task_3_move_task][main_page_scan_service_response[x].toUpperCase()] = true;
                    }

                } else {
                    if( main_page_scan_service_response[x].toUpperCase() in main_page_tasks_objects_detection[main_page_current_task]) {
                        main_page_tasks_objects_detection[main_page_current_task][main_page_scan_service_response[x].toUpperCase()] = true;
                    }
                }
            }
            //TODO: do something with the result
        });
    }
}


function main_page_move_head_task() {
    main_page_current_task_head_task = main_page_current_task_head_task + 1;
    var message_dict = {
        'type' : "head_task",
        'task' : main_page_current_task_head_task
    }
    var request = new ROSLIB.ServiceRequest({
        a : JSON.stringify(message_dict)
    });

    if(autonomous_head == true) {
        robot_web_service_trust_client.callService(request, function(result) {
            console.log('Result for service call on '
            + robot_web_service_trust_client.name
            + ': '
            + result);

            if(main_page_current_task_head_task < 4) {
                setTimeout(function() {
                    if(autonomous_head == true) {
                        var requestDict = {
                            type : "Scan",
                            task : main_page_current_task,
                            service : ""
                        }
                        if(main_page_cond1 == 0) {
                            requestDict["service"] = "google";
                        } else if (main_page_cond1 == 1) {
                            requestDict["service"] = "amazon";
                        } else {
                            requestDict["service"] = "dlib";
                        }
                        var request = new ROSLIB.ServiceRequest({
                            a : JSON.stringify(requestDict)
                        });
                    
                        if(autonomous_head == true) {
                            robot_service_trust_client.callService(request, function(result) {
                                console.log('Result for service call on '
                                + robot_service_trust_client.name
                                + ': '
                                + result);
        
                                if(autonomous_head == true) {
                                    main_page_scan_service_response = JSON.parse(result.response);
                                    main_page_scan_service_response = main_page_scan_service_response.result;
                                    for (x in main_page_scan_service_response) {
                                        if(main_page_current_task == 3) {
                                            if( main_page_scan_service_response[x].toUpperCase() in main_page_task_3_scans[main_page_task_3_move_task]) {
                                                main_page_task_3_scans[main_page_task_3_move_task][main_page_scan_service_response[x].toUpperCase()] = true;
                                            }
                        
                                        } else {
                                            if( main_page_scan_service_response[x].toUpperCase() in main_page_tasks_objects_detection[main_page_current_task]) {
                                                main_page_tasks_objects_detection[main_page_current_task][main_page_scan_service_response[x].toUpperCase()] = true;
                                            }
                                        }
                                    }
                                    //TODO: do something with the result
                                    main_page_move_head_task();
                                }
                            });
        
                        }
                    }
                }, 3000);   
            }
        });
    }

}

function main_page_my_swal(type, success) {
    var timerInterval = null;
    if(type == "MOVE_BASE") {
        if(success == true) {
            if(main_page_current_task_interventions["MOVE_BASE"]) {
                main_page_current_task_score = main_page_current_task_score - 2;
            }
            swal({
            title: 'Move Base Successful',
            html: 'Robot has arrived at the task. In <strong></strong> seconds it will move its head' +
                  'or press the Ok button to do it now.',
            timer: 4000,
            onBeforeOpen: () => {
                //swal.showLoading()
                timerInterval = setInterval(() => {
                    swal.getContent().querySelector('strong')
                    .textContent = (swal.getTimerLeft() / 1000)
                    .toFixed(0)
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            },
            allowOutsideClick: false,
            width : "50%",
            type: 'success',
            confirmButtonText: 'OK!'
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
                main_page_current_state = "MOVE_HEAD_AND_SCAN";
                main_page_current_task_head_task = 0;
                main_page_move_head_task();
                main_page_move_head_timer(30);
            });
            
        } else {
            main_page_current_task_score = main_page_current_task_score - 8;
            swal({
            title: 'Task Failed',
            html: 'Robot has failed to arrive at the task. In <strong></strong> seconds you will complete' +
                  ' the feedback or press the Ok button to do it now.Your score for this task is:' + main_page_current_task_score +
                  ' Your total score is:' + main_page_total_score,
            timer: 10000,
            onBeforeOpen: () => {
                //swal.showLoading()
                timerInterval = setInterval(() => {
                    swal.getContent().querySelector('strong')
                    .textContent = (swal.getTimerLeft() / 1000)
                    .toFixed(0)
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            },
            allowOutsideClick: false,
            width : "50%",
            type: 'error',
            confirmButtonText: 'OK!'
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
                main_page_feedback()
            });
        }
    } else if (type == "MOVE_HEAD_AND_SCAN") {
        if(success == true) {
            if(main_page_current_task_interventions["MOVE_HEAD_AND_SCAN"]) {
                main_page_current_task_score = main_page_current_task_score - 1;
            }
            swal({
                title: 'Move Head Successful',
                html: 'Robot has move his head for this task. In <strong></strong> seconds it will scan' +
                      'or press the Ok button to do it now.',
                timer: 4000,
                onBeforeOpen: () => {
                    //swal.showLoading()
                    timerInterval = setInterval(() => {
                        swal.getContent().querySelector('strong')
                        .textContent = (swal.getTimerLeft() / 1000)
                        .toFixed(0)
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                },
                allowOutsideClick: false,
                width : "50%",
                type: 'success',
                confirmButtonText: 'OK!'
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === swal.DismissReason.timer
                    ) {
                        console.log('I was closed by the timer')
                    }
                    if ( (main_page_current_task == 3) && (main_page_task_3_move_task == 1))
                    {
                        main_page_task_3_move_task = 2;
                        autonomous_move = true;
                        autonomous_head = true;
                        autonomous_result = true;
                        var message_dict = {
                            'type' : "move_task",
                            'task' : main_page_current_task,
                            'subtype' : main_page_task_3_move_task
                        }
                        var request = new ROSLIB.ServiceRequest({
                            a : JSON.stringify(message_dict)
                        });
                    
                        robot_web_service_trust_client.callService(request, function(result) {
                            console.log('Result for service call on '
                            + robot_web_service_trust_client.name
                            + ': '
                            + result);
                        });
                        main_page_move_base_timer(50);
                    
                        document.getElementById("main_page_info_header").innerHTML = "The robot moves trough rooms, In 50 seconds you can intervine by pressing intervine button";
                    } else {
                        main_page_current_state = "CALCULATE_RESULT";
                        main_page_result_timer(30);
                    }
                });
        } else {
            main_page_current_task_score = main_page_current_task_score - 5;
            swal({
            title: 'Task Failed',
            html: 'Robot has failed to move his head at the task. In <strong></strong> seconds you will complete' +
                  ' the feedback or press the Ok button to do it now.Your score for this task is:' + main_page_current_task_score +
                  ' Your total score is:' + main_page_total_score,
            timer: 10000,
            onBeforeOpen: () => {
                //swal.showLoading()
                timerInterval = setInterval(() => {
                    swal.getContent().querySelector('strong')
                    .textContent = (swal.getTimerLeft() / 1000)
                    .toFixed(0)
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            },
            allowOutsideClick: false,
            width : "50%",
            type: 'error',
            confirmButtonText: 'OK!'
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
                main_page_feedback()
            });

        }
    } else if (type == "CALCULATE_RESULT") {
        if(success == true) {
            if(main_page_current_task_interventions["CALCULATE_RESULT"]) {
                main_page_current_task_score = main_page_current_task_score - 1;
            }
            swal({
                title: 'Task Successful',
                html: 'Robot has completed the task. In <strong></strong> seconds you will complete' +
                      ' the feedback or press the Ok button to do it now.Your score for this task is:' + main_page_current_task_score +
                      ' Your total score is:' + main_page_total_score,
                timer: 10000,
                onBeforeOpen: () => {
                    //swal.showLoading()
                    timerInterval = setInterval(() => {
                        swal.getContent().querySelector('strong')
                        .textContent = (swal.getTimerLeft() / 1000)
                        .toFixed(0)
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                },
                allowOutsideClick: false,
                width : "50%",
                type: 'success',
                confirmButtonText: 'OK!'
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === swal.DismissReason.timer
                    ) {
                        console.log('I was closed by the timer')
                    }
                    main_page_feedback()
                });
        } else {
            main_page_current_task_score = main_page_current_task_score - 3;
            swal({
            title: 'Task Failed',
            html: 'Robots scan results where bad for this task. In <strong></strong> seconds you will complete' +
                  ' the feedback or press the Ok button to do it now. Your score for this task is:' + main_page_current_task_score +
                  ' Your total score is:' + main_page_total_score,
            timer: 10000,
            onBeforeOpen: () => {
                //swal.showLoading()
                timerInterval = setInterval(() => {
                    swal.getContent().querySelector('strong')
                    .textContent = (swal.getTimerLeft() / 1000)
                    .toFixed(0)
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            },
            allowOutsideClick: false,
            width : "50%",
            type: 'error',
            confirmButtonText: 'OK!'
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
                main_page_feedback()
            });
        }
        main_page_total_score = main_page_total_score + main_page_current_task_score;
        document.getElementById("main_page_total_score").innerHTML = "Current Score:" + main_page_total_score;
    }
}