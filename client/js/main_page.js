
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
var main_page_has_intervene_result = false;
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
        "COFFEE TABLE" : false,
        "COUCH" : false,
        "BED" : false,
        "CHAIR" : false,
        "XBOX" : false
    },
    2:{
        "COFFEE TABLE" : false,
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
        "COFFEE TABLE" : false,
        "COUCH" : false,
        "LIVING ROOM" : false,
        "CHAIR" : false,
        "TV" : false
    },
    3:{
        "COFFEE TABLE" : false,
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
        "COFFEE TABLE" : true,
        "COUCH" : true,
        "LIVING ROOM" : true,
        "CHAIR" : true,
        "TV" : true
    },
    3:{
        "COFFEE TABLE" : true,
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
var main_page_current_task_fail = null;
var main_page_current_task_interventions = {
    "MOVE_BASE" : false,
    "MOVE_HEAD_AND_SCAN" : false,
    "CALCULATE_RESULT" : false
}
var main_page_robot_img_1_viewer = null;
var main_page_robot_img_2_viewer = null;
var main_page_last_robot_div = null;
var main_page_last_room_div = null;
var main_page_robot_pose = null;
var main_page_last_robot_pose = null;

function main_page_enter() {
    document.getElementById("main_page").hidden = false;
    if(main_page_first_time) {
        main_page_first_time = false;
        main_page_init();
    }
    if(main_page_last_robot_div != null) {
        document.getElementById(main_page_last_robot_div).hidden = true;
    }
    if(main_page_last_room_div != null) {
        document.getElementById(main_page_last_room_div).hidden = true;
    }
    document.getElementById("main_page_rgb_robot_img_center").hidden = false;
    main_page_last_robot_div = "main_page_rgb_robot_img_center";
    document.getElementById("main_page_rgb_room_img_center").hidden = false;
    main_page_last_room_div = "main_page_rgb_room_img_center";

    //main_page_chose_task();
}

function main_page_viewer_pose(moving_time, destination) {
    if(moving_time > 15) {
        main_page_last_robot_pose = {
            x : main_page_robot_pose.x,
            y : main_page_robot_pose.y
        }
    } else {
        if(destination == 2) {
            main_page_robot_pose.x = main_page_last_robot_pose.x + ((-0.3 - main_page_last_robot_pose.x) / 15) * moving_time;
            main_page_robot_pose.y = main_page_last_robot_pose.y + ((0.0 - main_page_last_robot_pose.y) / 15) * moving_time;
        } else {
            main_page_robot_pose.x = main_page_last_robot_pose.x + ((-0.4 - main_page_last_robot_pose.x) / 15) * moving_time;
            main_page_robot_pose.y = main_page_last_robot_pose.y + ((1.2 - main_page_last_robot_pose.y) / 15) * moving_time;
        }
        setTimeout(function(){
            main_page_viewer_pose(moving_time + 1, destination);
        }, 1000);

    }
}

function main_page_init() {
    
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "MainPage"
    }
    experiment_index = experiment_index + 1;


   var g_1 = new createjs.Graphics();
   g_1.setStrokeStyle(0);
   g_1.beginStroke(createjs.Graphics.getRGB(0,0,255));
   g_1.beginFill(createjs.Graphics.getRGB(0,0,255));
   g_1.drawRect(0,0,1,1);
   var s_1 = new createjs.Shape(g_1);
   s_1.scaleX = 0.15;
   s_1.scaleY = 0.2;
   s_1.x = -0.3;
   s_1.y = 0.0;
   s_1.rotation = 0;
   viewer.addObject(s_1);

   var g_2 = new createjs.Graphics();
   g_2.setStrokeStyle(0);
   g_2.beginStroke(createjs.Graphics.getRGB(255,0,0));
   g_2.beginFill(createjs.Graphics.getRGB(255,0,0));
   g_2.drawRect(0,0,1,1);
   var s_2 = new createjs.Shape(g_2);
   s_2.scaleX = 0.15;
   s_2.scaleY = 0.2;
   s_2.x = -0.4;
   s_2.y = 1.2;
   s_2.rotation = 0;
   viewer.addObject(s_2);

   var g_3 = new createjs.Graphics();
   g_3.setStrokeStyle(0);
   g_3.beginStroke(createjs.Graphics.getRGB(0,255,0));
   g_3.beginFill(createjs.Graphics.getRGB(0,255,0));
   g_3.drawRect(0,0,1,1);
   var s_3 = new createjs.Shape(g_3);
   s_3.scaleX = 0.10;
   s_3.scaleY = 0.10;
   s_3.x = -0.3;
   s_3.y = 0.3;
   s_3.rotation = 0;
   main_page_robot_pose = s_3;
   viewer.addObject(main_page_robot_pose);
   main_page_last_robot_pose = {
       x : main_page_robot_pose.x,
       y : main_page_robot_pose.y
   }
   /*
    Setare hartă
    */
    viewer.scene.scaleX = 60;
    viewer.scene.scaleY = 30;
    viewer.scene.x = 140;
    viewer.scene.y = 60;
    viewer.scene.children[2].scaleY = 0.02
    viewer.scene.children[2].scaleX = 0.01
    viewer.removeObject(viewer.scene.children[2])

    headLeftRightSlider = $("#main_page_task_intervetion_head_left_right_slider").bootstrapSlider(
        {
            min : -120,
            max : 120,
            step : 1,
            ticks: [-120, 0, 120],
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
        if (main_page_current_task == 1) {
            main_page_robot_img_1_viewer.setYaw(head_x);
        } else if (main_page_current_task == 2) {
            main_page_robot_img_2_viewer.setYaw(head_x);
        } else if (main_page_current_task == 3) {
            if(main_page_task_3_move_task == 1) {
                main_page_robot_img_1_viewer.setYaw(head_x);
            } else {
                main_page_robot_img_2_viewer.setYaw(head_x);
            }
        }
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
            min : -50,
            max : 50,
            step : 1,
            ticks: [-50, 0, 50],
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
        head_y = event.value * -1;
        var valueToSend = head_y *-1;
        console.log(valueToSend);
        if (main_page_current_task == 1) {
            main_page_robot_img_1_viewer.setPitch(head_y);
        } else if (main_page_current_task == 2) {
            main_page_robot_img_2_viewer.setPitch(head_y);
        } else if (main_page_current_task == 3) {
            if(main_page_task_3_move_task == 1) {
                main_page_robot_img_1_viewer.setPitch(head_y);
            } else {
                main_page_robot_img_2_viewer.setPitch(head_y);
            }
        }
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
    
    main_page_current_state = "CHOSE_TASK"

    document.getElementById("main_page_task_intervetion_move_base_arrows_up_buttton").disabled = true;
    document.getElementById("main_page_task_intervetion_move_base_arrows_left_buttton").disabled = true;
    document.getElementById("main_page_task_intervetion_move_base_arrows_down_buttton").disabled = true;
    document.getElementById("main_page_task_intervetion_move_base_arrows_right_buttton").disabled = true;
    

    document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_finish_intervention_button_div").hidden = true;
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = true;
    //document.getElementById("main_page_info_header").innerHTML = "Chose a task";
    document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Chose a task";
    document.getElementById("main_page_timer").innerHTML = "Timer:" + "No timer";
    //TODO: random chose a task after timeout


    if(main_page_cond2 == 0) {
        document.getElementById("main_page_chat_interface").hidden = true;
    } else {
        insertChat("you", "Text me if anything", 0);
    }

    main_page_total_score = 0;
    document.getElementById("main_page_total_score").innerHTML = "Total Score:" + main_page_total_score;

    //: image and shit
    //main_page_cond3 = 1;//1-4
    document.getElementById("main_page_rgb_robot_img_center").src = "/img/cond_" + main_page_cond3 + "/robot_center.jpg";
    /*
    main_page_robot_img_1_viewer = pannellum.viewer('main_page_rgb_robot_img_1', {
        "panorama": "/img/cond_" + main_page_cond3 + "/1.JPG",
        "autoLoad": true,
        "showControls": false,
        "haov": 230,
        "vaov": 120,
        "minYaw" : -90,
        "maxYaw" : 90,
        "minPitch" : -50,
        "maxPitch" : 50,
        "keyboardZoom" : false,
        "mouseZoom" : false,
        "draggable" : false,
        "disableKeyboardCtrl" : true
    });
    main_page_robot_img_2_viewer = pannellum.viewer('main_page_rgb_robot_img_2', {
        "panorama": "/img/cond_" + main_page_cond3 + "/2.JPG",
        "autoLoad": true,
        "showControls": false,
        "haov": 230,
        "vaov": 120,
        "minYaw" : -90,
        "maxYaw" : 90,
        "minPitch" : -50,
        "maxPitch" : 50,
        "keyboardZoom" : false,
        "mouseZoom" : false,
        "draggable" : false,
        "disableKeyboardCtrl" : true
    });
    */
    document.getElementById("main_page_rgb_room_img_center").src = "/img/cond_" + main_page_cond3 + "/room_center.jpg";
    document.getElementById("main_page_rgb_room_img_1").src = "/img/cond_" + main_page_cond3 + "/room_1.jpg";
    document.getElementById("main_page_rgb_room_img_2").src = "/img/cond_" + main_page_cond3 + "/room_2.jpg";

    var w2 = window;
    var d2 = document;
    var e2 = d2.documentElement;
    var g2 = d2.getElementsByTagName('body')[0];
    var x2 = w2.innerWidth || e2.clientWidth || g2.clientWidth;
    var y2 = w2.innerHeight|| e2.clientHeight|| g2.clientHeight;
    var video = null;
    var source = null;
    video = document.getElementById('main_page_robot_video_1');
    source = document.createElement('source');
    source.setAttribute('src', '/video/robot_' + main_page_cond3 + "_1.mp4");
    video.appendChild(source);
    video.width = (x2-15)/2 - 15;
    video.height = ( (y2-10)*3)/10 - 10;
    video = document.getElementById('main_page_robot_video_2');
    source = document.createElement('source');
    source.setAttribute('src', '/video/robot_' + main_page_cond3 + "_2.mp4");
    video.appendChild(source);
    video = document.getElementById('main_page_robot_video_3');
    source = document.createElement('source');
    source.setAttribute('src', '/video/robot_' + main_page_cond3 + "_3.mp4");
    video.appendChild(source);
    video = document.getElementById('main_page_room_video_1');
    source = document.createElement('source');
    source.setAttribute('src', '/video/room_' + main_page_cond3 + "_1.mp4");
    video.appendChild(source);
    video = document.getElementById('main_page_room_video_2');
    source = document.createElement('source');
    source.setAttribute('src', '/video/room_' + main_page_cond3 + "_2.mp4");
    video.appendChild(source);
    video = document.getElementById('main_page_room_video_3');
    source = document.createElement('source');
    source.setAttribute('src', '/video/room_' + main_page_cond3 + "_3.mp4");
    video.appendChild(source);

    swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: false,
        progressSteps: ['1', '2', '3', '4', '5', '6', '7', '8'],
        allowOutsideClick: false,
        width : "80%",
      }).queue([
        {
          title: 'UI',
          type: "info",
          html: main_page_info_page_1_html
        },
        {
            title: 'Middle',
            type: "info",
            html: main_page_info_page_2_html
        },
        {
            title: 'Right',
            type: "info",
            html: main_page_info_page_3_html
        },
        {
            title: 'Left',
            type: "info",
            html: main_page_info_page_4_html
        },
        {
            title: 'Left-Up',
            type: "info",
            html: main_page_info_page_5_html
        },
        {
            title: 'Left-Down',
            type: "info",
            html: main_page_info_page_6_html
        },
        {
            title: 'Tasks and Score',
            type: "info",
            html: main_page_info_page_7_html
        },
        {
            title: 'Buttons',
            type: "info",
            html: main_page_info_page_8_html
        }
      ]).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
            //main_page_chose_task();
        } else if (result.value) {
            //main_page_chose_task();
        }
      });
}

function main_page_exit() {
    document.getElementById("main_page").hidden = true;
}

function main_page_feedback() {
    main_page_last_robot_pose = {
        x : -0.3,
        y : 0.3

    }
    main_page_robot_pose.x = -0.3;
    main_page_robot_pose.y = 0.3;
    //changeState("post_questions_page");

    swal({
        allowOutsideClick: false,
        width : "80%",
        type: 'question',
        showConfirmButton : true,
        title: 'To what extent do you trust Tiago in doing the tasks right now ?',
        input: 'radio',
        inputOptions: {
            "1" : "To an Extremely Small Extent",
            "2" : "To a Very Small Extent",
            "3" : "To a Small Extent",
            "4" : "To a Moderate Extent",
            "5" : "To a Large Extent",
            "6" : "To a Very Large Extent",
            "7" : "To an Extremely Large Extent"
        },
        showCancelButton: false,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose something!'
            }
        },
        onBeforeOpen: () => {
            if(main_page_last_robot_div != null) {
                document.getElementById(main_page_last_robot_div).hidden = true;
            }
            if(main_page_last_room_div != null) {
                document.getElementById(main_page_last_room_div).hidden = true;
            }
            document.getElementById("main_page_rgb_robot_img_center").hidden = false;
            main_page_last_robot_div = "main_page_rgb_robot_img_center";
            document.getElementById("main_page_rgb_room_img_center").hidden = false;
            main_page_last_room_div = "main_page_rgb_room_img_center";
        }
    }).then((result) => {
        console.log("ce rezulta este:", result.value);
        post_questions_trust_value = Number.parseInt(result.value);
        main_page_prepare_for_next_task();
    });
}


function main_page_prepare_for_next_task() {
    /*
    TODO: salvare date analiza
    */
   feedback_values[feedback_index] = {
        'COM' : main_page_cond2,
        'D' : task_info_difficulty_values[main_page_current_task],
        'IM' : main_page_current_task_interventions["MOVE_BASE"],
        'IH' : main_page_current_task_interventions["MOVE_HEAD_AND_SCAN"],
        'IR' : main_page_current_task_interventions["CALCULATE_RESULT"],
        'F' : main_page_current_task_fail,
        'P' : main_page_current_task_score,
        'TK' : post_questions_trust_value,
        'S' : main_page_cond1,
        'W' : main_page_cond3,
        'Task' : main_page_current_task,
        "NM" : chat_number_of_messages
    }
    feedback_index = feedback_index + 1;
    var local_sem = false;
    if(main_page_tasks[main_page_real_task[1]] == 0) {
        local_sem = true;
    }
    if(main_page_tasks[main_page_real_task[2]] == 0) {
        local_sem = true;
    }
    if(main_page_tasks[main_page_real_task[3]] == 0) {
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

        //document.getElementById("main_page_info_header").innerHTML = "Chose a task";
        document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Chose a task";
        document.getElementById("main_page_timer").innerHTML = "Timer:" + "No timer";
        document.getElementById("main_page_chose_task_btn").disabled = false;
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
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = true;
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
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = true;
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
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = true;
    var result_success;
    result_success = false;
    var room_type = null;
    if (main_page_has_intervene_result) {
        if(main_page_current_task == 1) {
            main_page_tasks_objects_detection[main_page_current_task]["PLANT"] = document.getElementById("main_page_task_intervetion_scan_task_1_has_object").checked;
        } else if(main_page_current_task == 2) {
            room_type = document.getElementById("main_page_task_intervetion_scan_task_2_room").value;
        } else if(main_page_current_task == 3) {
            main_page_tasks_objects_detection[main_page_current_task]["COFFEE TABLE"] = document.getElementById("main_page_task_intervetion_scan_task_3_has_object_1").checked;
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
                if( (main_page_tasks_objects_detection[main_page_current_task]['COFFEE TABLE']) &&
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
    // verificare răspunsuri
    if(main_page_current_task == 1) {
        result_success = main_page_tasks_objects_detection[main_page_current_task]["PLANT"];
    } else if(main_page_current_task == 2) {
        if(room_type =='Livingroom') {
            result_success = true;
        }
    } else if(main_page_current_task == 3) {
        if( (main_page_tasks_objects_detection[main_page_current_task]['COFFEE TABLE']) &&
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
    
    console.log("e cu succes treaba1:", result_success);
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "VerifyResult",
        'type' : "MainPage",
        'task' : main_page_current_task,
        'has_intervene' : main_page_has_intervene_result,
        'result_success' : result_success,
        'answers' : main_page_tasks_objects_detection[main_page_current_task]
    }
    experiment_index = experiment_index + 1;
    main_page_has_intervene_result = false;
    console.log("e cu succes treaba2:", result_success);
    if(result_success == true) {
        main_page_tasks[main_page_current_task] = 1;
        main_page_my_swal("CALCULATE_RESULT", true);
    } else {
        main_page_tasks[main_page_current_task] = 2;
        main_page_my_swal("CALCULATE_RESULT", false);
    }
}

function main_page_move_base_timer(arg) {
    if(arg == 0) {
        var html_text = "Tiago thinks that it has arrived corectly. If you trust him press 'Trust Tiago', if not press 'Have a intervention' and help Tiago"; 
        swal({
            html: html_text,
            allowOutsideClick: false,
            width : "80%",
            type: 'question',
            showConfirmButton : true,
            confirmButtonText: 'Trust Tiago',
            showCancelButton: true,
            cancelButtonText: 'Have an intervention',
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    main_page_intervention();
                } else {
                    main_page_verify_move_base_arive();
                }
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            });

    } else {
        setTimeout(function(){
            if(autonomous_move) {
                //document.getElementById("main_page_info_header").innerHTML = "The robot moves trough rooms. In " + (arg-1) + " seconds  you can intervene by pressing intervene button";
                document.getElementById("main_page_timer").innerHTML = "Timer:" + (arg-1) + "s";
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
                //document.getElementById("main_page_info_header").innerHTML = "You control the robot. You have " + (arg-1) + " seconds to move him";
                document.getElementById("main_page_timer").innerHTML = "Timer:" + (arg-1) + "s";
                main_page_move_base_manual_timer(arg-1);
            }
        }, 1000);
    }
}

function main_page_move_head_timer(arg) {
    if(arg == 0) {
        var html_text = "Tiago thinks that it has finished scanning the room. If you trust him press 'Trust Tiago', if not press 'Have a intervention' and help Tiago"; 
        swal({
            html: html_text,
            allowOutsideClick: false,
            width : "80%",
            type: 'question',
            showConfirmButton : true,
            confirmButtonText: 'Trust Tiago',
            showCancelButton: true,
            cancelButtonText: 'Have an intervention',
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    main_page_intervention();
                } else {
                    main_page_verify_move_head();
                }
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            });
    } else {
        setTimeout(function(){
            if(autonomous_head) {
                //document.getElementById("main_page_info_header").innerHTML = "The robot moves its head to see the table. In " + (arg-1) + " seconds  you can intervene by pressing intervene button";
                document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Scaning the room";
                document.getElementById("main_page_timer").innerHTML = "Timer:" + (arg-1) + "s";
                main_page_move_head_timer(arg-1);
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
                //document.getElementById("main_page_info_header").innerHTML = "You control the robot. You have " + (arg-1) + " seconds to move its head. You have " + (main_page_current_task_scans_remained) + " scans remained";
                document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Scaning the room";
                document.getElementById("main_page_timer").innerHTML = "Timer:" + (arg-1) + "s";
                main_page_move_head_manual_timer(arg-1);
            }
        }, 1000);
    }
}


function main_page_result_timer(arg) {
    if(arg == 0) {
        var html_text = "Tiago thinks that it has finished calculating the results. If you trust him press 'Trust Tiago', if not press 'Have a intervention' and help Tiago"; 
        swal({
            html: html_text,
            allowOutsideClick: false,
            width : "80%",
            type: 'question',
            showConfirmButton : true,
            confirmButtonText: 'Trust Tiago',
            showCancelButton: true,
            cancelButtonText: 'Have an intervention',
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    main_page_intervention();
                } else {
                    main_page_verify_result();
                }
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            });
    } else {
        setTimeout(function(){
            if(autonomous_result) {
                //document.getElementById("main_page_info_header").innerHTML = "The robot calculates the result. In " + (arg-1) + " seconds  you can intervene by pressing intervene button";
                document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Calculate the results";
                document.getElementById("main_page_timer").innerHTML = "Timer:" + (arg-1) + "s";
                main_page_result_timer(arg-1);
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
                //document.getElementById("main_page_info_header").innerHTML = "You control the answer for result. You have " + (arg-1) + " seconds to complete the result form";
                document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Calculate the results";
                document.getElementById("main_page_timer").innerHTML = "Timer:" + (arg-1) + "s";
                main_page_result_manual_timer(arg-1);
            }
        }, 1000);
    }
}

function main_page_intervention() {
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = true;
    if(main_page_current_state == "MOVE_BASE") {
        autonomous_move = false;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "MoveIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        //document.getElementById("main_page_task_intervetion_move_base_arrows").hidden = false;
        //document.getElementById("main_page_task_intervetion_move_base_arrows_up_buttton").disabled = false;
        //document.getElementById("main_page_task_intervetion_move_base_arrows_left_buttton").disabled = false;
        //document.getElementById("main_page_task_intervetion_move_base_arrows_down_buttton").disabled = false;
        //document.getElementById("main_page_task_intervetion_move_base_arrows_right_buttton").disabled = false;
        main_page_current_task_interventions["MOVE_BASE"] = true;
        main_page_move_base_manual_timer(20);
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
        head_x = 0;
        head_y = 0;
        headLeftRightSlider.bootstrapSlider("relayout")
        headUpDownSlider.bootstrapSlider("relayout")
        headLeftRightSlider.bootstrapSlider("setValue", head_x);
        headUpDownSlider.bootstrapSlider("setValue", head_y);
        if (main_page_current_task == 1) {
            main_page_robot_img_1_viewer.setPitch(head_y);
        } else if (main_page_current_task == 2) {
            main_page_robot_img_2_viewer.setPitch(head_y);
        } else if (main_page_current_task == 3) {
            if(main_page_task_3_move_task == 1) {
                main_page_robot_img_1_viewer.setPitch(head_y);
            } else {
                main_page_robot_img_2_viewer.setPitch(head_y);
            }
        }

        if (main_page_current_task == 1) {
            main_page_robot_img_1_viewer.setYaw(head_x);
        } else if (main_page_current_task == 2) {
            main_page_robot_img_2_viewer.setYaw(head_x);
        } else if (main_page_current_task == 3) {
            if(main_page_task_3_move_task == 1) {
                main_page_robot_img_1_viewer.setYaw(head_x);
            } else {
                main_page_robot_img_2_viewer.setYaw(head_x);
            }
        }
        main_page_move_head_manual_timer(50);
        document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = false;
        document.getElementById("main_page_task_intervetion_finish_intervention_button_div").hidden = false;
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
        document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = false;
        document.getElementById("main_page_task_intervetion_finish_intervention_button_div").hidden = false;
    }
}

function main_page_finish_intervention() {
    document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_finish_intervention_button_div").hidden = true;
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
        // enable scan button
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
        main_page_has_intervene_result = true;
        main_page_verify_result();
    }
    //document.getElementById("main_page_task_intervetion_intervention_btn").disabled = false;
    //document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = false;
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
        // disable scan button
        document.getElementById("main_page_task_intervetion_head_sliders_div_buttton").disabled = true;
    }
    if (main_page_current_task_scans_remained > -1) {
        var local_panorama_viewr = null;
        var local_room = null;
        if (main_page_current_task == 1) {
            local_panorama_viewr = main_page_robot_img_1_viewer;
            local_room = 1;
        } else if (main_page_current_task == 2) {
            local_panorama_viewr = main_page_robot_img_2_viewer;
            local_room = 2;
        } else if (main_page_current_task == 3) {
            if(main_page_task_3_move_task == 1) {
                local_panorama_viewr = main_page_robot_img_1_viewer;
                local_room = 1;
            } else {
                local_panorama_viewr = main_page_robot_img_2_viewer;
                local_room = 2;
            }
        }
        var requestDict = {
            type : "Scan",
            room : local_room,
            service : "",
            yaw : local_panorama_viewr.getYaw(),
            pitch : local_panorama_viewr.getPitch()
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
            //: do something with the result
        });
    }
}


function main_page_move_head_task() {
    main_page_current_task_head_task = main_page_current_task_head_task + 1;

    if(autonomous_head == true) {
        var local_panorama_viewr = null;
        var local_room = null;
        if (main_page_current_task == 1) {
            local_panorama_viewr = main_page_robot_img_1_viewer;
            local_room = 1;
        } else if (main_page_current_task == 2) {
            local_panorama_viewr = main_page_robot_img_2_viewer;
            local_room = 2;
        } else if (main_page_current_task == 3) {
            if(main_page_task_3_move_task == 1) {
                local_panorama_viewr = main_page_robot_img_1_viewer;
                local_room = 1;
            } else {
                local_panorama_viewr = main_page_robot_img_2_viewer;
                local_room = 2;
            }
        }

        if (main_page_current_task_head_task == 1) {
            local_panorama_viewr.setYaw(0);
            local_panorama_viewr.setPitch(0);
        } else if (main_page_current_task_head_task == 2) {
            local_panorama_viewr.setYaw(120);
            local_panorama_viewr.setPitch(0);
        } else if (main_page_current_task_head_task == 3) {
            local_panorama_viewr.setYaw(-120);
            local_panorama_viewr.setPitch(0);
        } else if (main_page_current_task_head_task == 4) {
            local_panorama_viewr.setYaw(0);
            local_panorama_viewr.setPitch(0);
        }
        

        if(main_page_current_task_head_task < 4) {
            setTimeout(function() {
                if(autonomous_head == true) {
                    var requestDict = {
                        type : "Scan",
                        room : local_room,
                        service : "",
                        yaw : local_panorama_viewr.getYaw(),
                        pitch : local_panorama_viewr.getPitch()
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
                                //: do something with the result
                                main_page_move_head_task();
                            }
                        });
    
                    }
                }
            }, 3000);   
        }
    }

}
function main_page_load_pannellum(arg) {
    if(arg == 1) {
        main_page_robot_img_1_viewer = pannellum.viewer('main_page_rgb_robot_img_1', {
            "panorama": "/img/cond_" + main_page_cond3 + "/1.JPG",
            "autoLoad": true,
            "showControls": false,
            "keyboardZoom" : false,
            "mouseZoom" : false,
            "draggable" : false,
            "disableKeyboardCtrl" : true,
            "haov": 280,
            "vaov": 100,
            "minYaw" : -120,
            "maxYaw" : 120,
            "minPitch" : -50,
            "maxPitch" : 50
        });
    } else {
        main_page_robot_img_2_viewer = pannellum.viewer('main_page_rgb_robot_img_2', {
            "panorama": "/img/cond_" + main_page_cond3 + "/2.JPG",
            "autoLoad": true,
            "showControls": false,
            "keyboardZoom" : false,
            "mouseZoom" : false,
            "draggable" : false,
            "disableKeyboardCtrl" : true,
            "haov": 280,
            "vaov": 100,
            "minYaw" : -120,
            "maxYaw" : 120,
            "minPitch" : -50,
            "maxPitch" : 50
        });
    }
}

function main_page_my_swal(type, success) {
    if(type == "MOVE_BASE") {
        if(success == true) {
            swal({
            title: 'Moving Successful',
            html: 'Robot has arrived in the room. Next it will scan the room',
            allowOutsideClick: false,
            width : "50%",
            type: 'success',
            confirmButtonText: 'OK!'
            }).then((result) => {

                main_page_current_state = "MOVE_HEAD_AND_SCAN";
                main_page_current_task_head_task = 0;
                if(main_page_last_robot_div != null) {
                    document.getElementById(main_page_last_robot_div).hidden = true;
                }
                if(main_page_last_room_div != null) {
                    document.getElementById(main_page_last_room_div).hidden = true;
                }
                if (main_page_current_task == 1) {
                    console.log("ai intrat pe caz 1 la head")
                    document.getElementById("main_page_rgb_robot_img_1").hidden = false;
                    main_page_last_robot_div = "main_page_rgb_robot_img_1";
                    document.getElementById("main_page_rgb_room_img_1").hidden = false;
                    main_page_last_room_div = "main_page_rgb_room_img_1";
                    main_page_load_pannellum(1);
                    main_page_load_pannellum(1);
                    setTimeout(function(){
                        main_page_load_pannellum(1);
                    }, 1000);
                } else if (main_page_current_task == 2) {
                    document.getElementById("main_page_rgb_robot_img_2").hidden = false;
                    main_page_last_robot_div = "main_page_rgb_robot_img_2";
                    document.getElementById("main_page_rgb_room_img_2").hidden = false;
                    main_page_last_room_div = "main_page_rgb_room_img_2";
                    main_page_load_pannellum(2);
                    main_page_load_pannellum(2);
                    setTimeout(function(){
                        main_page_load_pannellum(2);
                    }, 1000);
                } else if (main_page_current_task == 3) {
                    if(main_page_task_3_move_task == 1) {
                        document.getElementById("main_page_rgb_robot_img_1").hidden = false;
                        main_page_last_robot_div = "main_page_rgb_robot_img_1";
                        document.getElementById("main_page_rgb_room_img_1").hidden = false;
                        main_page_last_room_div = "main_page_rgb_room_img_1";
                        main_page_load_pannellum(1);
                        main_page_load_pannellum(1);
                        setTimeout(function(){
                            main_page_load_pannellum(1);
                        }, 1000);
                    } else {
                        document.getElementById("main_page_rgb_robot_img_2").hidden = false;
                        main_page_last_robot_div = "main_page_rgb_robot_img_2";
                        document.getElementById("main_page_rgb_room_img_2").hidden = false;
                        main_page_last_room_div = "main_page_rgb_room_img_2";
                        main_page_load_pannellum(2);
                        main_page_load_pannellum(2);
                        setTimeout(function(){
                            main_page_load_pannellum(2);
                        }, 1000);
                    }
                }
                setTimeout(function(){
                    main_page_move_head_task();
                }, 2000);
                
                main_page_move_head_timer(20);
                document.getElementById("main_page_task_intervetion_intervention_btn").disabled = false;
                document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = false;
            });
            
        } else {
            main_page_current_task_score = main_page_current_task_score - 8;
            main_page_current_task_fail = 1;
            main_page_total_score = main_page_total_score + main_page_current_task_score;
            document.getElementById("main_page_total_score").innerHTML = "Total Score:" + main_page_total_score;
            swal({
            title: 'Task Failed',
            html: 'Robot has failed to arrive at the task. Next please complete' +
                  ' the feedback.Your score for this task is:' + main_page_current_task_score +
                  ' Your total score is:' + main_page_total_score,
            allowOutsideClick: false,
            width : "50%",
            type: 'error',
            confirmButtonText: 'OK!'
            }).then((result) => {
                main_page_feedback()
            });
        }
    } else if (type == "MOVE_HEAD_AND_SCAN") {
        if(success == true) {
            swal({
                title: 'Scanning Successful',
                html: 'Robot has scan the room. Next it will calculate the results',
                allowOutsideClick: false,
                width : "50%",
                type: 'success',
                confirmButtonText: 'OK!'
                }).then((result) => {
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
                        if(main_page_last_robot_div != null) {
                            document.getElementById(main_page_last_robot_div).hidden = true;
                        }
                        if(main_page_last_room_div != null) {
                            document.getElementById(main_page_last_room_div).hidden = true;
                        }
                        document.getElementById("main_page_robot_video_3").hidden = false;
                        main_page_last_robot_div = "main_page_robot_video_3";
                        document.getElementById("main_page_room_video_3").hidden = false;
                        main_page_last_room_div = "main_page_room_video_3";
                        document.getElementById('main_page_robot_video_3').play();
                        document.getElementById('main_page_room_video_3').play();
                        main_page_current_state = "MOVE_BASE";
                        main_page_viewer_pose(0, 2);
                        main_page_move_base_timer(25);
                    
                        //document.getElementById("main_page_info_header").innerHTML = "The robot moves trough rooms, In 25 seconds you can intervene by pressing intervene button";
                        document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Moving to Room 2";
                        document.getElementById("main_page_timer").innerHTML = "Timer:" + "25s";
                    } else {
                        main_page_current_state = "CALCULATE_RESULT";
                        main_page_result_timer(15);
                    }
                    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = false;
                    document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = false;
                });
        } else {
            if(main_page_current_task_interventions["MOVE_BASE"]) {
                main_page_current_task_score = main_page_current_task_score - 2;
            }
            main_page_current_task_score = main_page_current_task_score - 5;
            main_page_total_score = main_page_total_score + main_page_current_task_score;
            main_page_current_task_fail = 2;
            document.getElementById("main_page_total_score").innerHTML = "Total Score:" + main_page_total_score;
            swal({
            title: 'Task Failed',
            html: 'Robot has failed to scan the room. Next please complete' +
                  ' the feedback.Your score for this task is:' + main_page_current_task_score +
                  ' Your total score is:' + main_page_total_score,
            allowOutsideClick: false,
            width : "50%",
            type: 'error',
            confirmButtonText: 'OK!'
            }).then((result) => {
                main_page_feedback()
            });

        }
    } else if (type == "CALCULATE_RESULT") {
        if(success == true) {
            if(main_page_current_task_interventions["MOVE_BASE"]) {
                main_page_current_task_score = main_page_current_task_score - 2;
            }
            if(main_page_current_task_interventions["MOVE_HEAD_AND_SCAN"]) {
                main_page_current_task_score = main_page_current_task_score - 1;
            }
            if(main_page_current_task_interventions["CALCULATE_RESULT"]) {
                main_page_current_task_score = main_page_current_task_score - 1;
            }
            main_page_total_score = main_page_total_score + main_page_current_task_score;
            document.getElementById("main_page_total_score").innerHTML = "Total Score:" + main_page_total_score;
            swal({
                title: 'Task Successful',
                html: 'Robot has completed the task. Next please complete' +
                      ' the feedback. Your score for this task is:' + main_page_current_task_score +
                      ' Your total score is:' + main_page_total_score,
                allowOutsideClick: false,
                width : "50%",
                type: 'success',
                confirmButtonText: 'OK!'
                }).then((result) => {
                    main_page_feedback()
                });
        } else {
            if(main_page_current_task_interventions["MOVE_BASE"]) {
                main_page_current_task_score = main_page_current_task_score - 2;
            }
            if(main_page_current_task_interventions["MOVE_HEAD_AND_SCAN"]) {
                main_page_current_task_score = main_page_current_task_score - 1;
            }
            main_page_current_task_score = main_page_current_task_score - 3;
            main_page_total_score = main_page_total_score + main_page_current_task_score;
            main_page_current_task_fail = 3;
            document.getElementById("main_page_total_score").innerHTML = "Total Score:" + main_page_total_score;
            swal({
            title: 'Task Failed',
            html: 'Robots scan results where bad for this task. Next please complete' +
                  ' the feedback. Your score for this task is:' + main_page_current_task_score +
                  ' Your total score is:' + main_page_total_score,
            allowOutsideClick: false,
            width : "50%",
            type: 'error',
            confirmButtonText: 'OK!'
            }).then((result) => {
                main_page_feedback()
            });
        }
    }
}



function main_page_chose_task() {
    var local_sem = false;
    var html_text = "<h2>Chose a task</h2>";
    //html_text = html_text + "<h3>Total Score:" + main_page_total_score + "</h3>";
    html_text = html_text + "<button id='main_page_swal_tasks_info_btn' class='btn btn-info'>Informations about interface</button>"

    if(main_page_tasks[main_page_real_task[1]] == 0) {
        html_text = html_text + "<h4>Task 1<h4>" + task_info_page_tasks_text[main_page_real_task[1]] + "<p></p>";
        html_text = html_text + "<button id='main_page_task_intervetion_task_1' class='btn btn-success'>Try task 1</button>"
        local_sem = true;
    } else {
        //html_text = html_text + "<button id='main_page_task_intervetion_task_21' class='btn btn-success' onclick='main_page_start_task2(1)' disabled>Task 1</button>"
    }

    if(main_page_tasks[main_page_real_task[2]] == 0) {
        html_text = html_text + "<h4>Task 2<h4>" + task_info_page_tasks_text[main_page_real_task[2]] + "<p></p>";
        html_text = html_text + "<button id='main_page_task_intervetion_task_2' class='btn btn-success'>Try task 2</button>"
        local_sem = true;
    } else {
        //html_text = html_text + "<button id='main_page_task_intervetion_task_2' class='btn btn-success' onclick='main_page_start_task2(2)' disabled>Task 2</button>"
    }

    if(main_page_tasks[main_page_real_task[3]] == 0) {
        html_text = html_text + "<h4>Task 3<h4>" + task_info_page_tasks_text[main_page_real_task[3]] + "<p></p>";
        html_text = html_text + "<button id='main_page_task_intervetion_task_3' class='btn btn-success'>Try task 3</button>"
        local_sem = true;
    } else {
        //html_text = html_text + "<button id='main_page_task_intervetion_task_3' class='btn btn-success' onclick='main_page_start_task2(3)' disabled>Task 3</button>"
    }
    if(local_sem) {
        main_page_current_state = "CHOSE_TASK";
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "SelectNewTask",
            'type' : "MainPage"
        }
        experiment_index = experiment_index + 1;

        swal({
            html: html_text,
            allowOutsideClick: false,
            width : "80%",
            //type: 'question',
            showConfirmButton : false,
            onBeforeOpen: () => {
                document.getElementById('main_page_swal_tasks_info_btn').onclick = function() {
                    main_page_swal_chose_task_info();
                };
                if (document.getElementById('main_page_task_intervetion_task_1')) {
                    document.getElementById('main_page_task_intervetion_task_1').onclick = function() {
                        main_page_start_task(1);
                    };
                }
                if (document.getElementById('main_page_task_intervetion_task_2')) {
                    document.getElementById('main_page_task_intervetion_task_2').onclick = function() {
                        main_page_start_task(2);
                    };
                }
                if (document.getElementById('main_page_task_intervetion_task_3')) {
                    document.getElementById('main_page_task_intervetion_task_3').onclick = function() {
                        main_page_start_task(3);
                    };
                }
            }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            });
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

function main_page_start_task(arg) {
    swal.close();
    document.getElementById("main_page_chose_task_btn").disabled = true;
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
    if(main_page_last_robot_div != null) {
        document.getElementById(main_page_last_robot_div).hidden = true;
    }
    if(main_page_last_room_div != null) {
        document.getElementById(main_page_last_room_div).hidden = true;
    }
    if (main_page_current_task == 1) {
        document.getElementById("main_page_robot_video_1").hidden = false;
        main_page_last_robot_div = "main_page_robot_video_1";
        document.getElementById("main_page_room_video_1").hidden = false;
        main_page_last_room_div = "main_page_room_video_1";
        document.getElementById('main_page_robot_video_1').play();
        document.getElementById('main_page_room_video_1').play();
        main_page_viewer_pose(0, 1);
        document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Moving to Room 1";
    } else if (main_page_current_task == 2) {
        document.getElementById("main_page_robot_video_2").hidden = false;
        main_page_last_robot_div = "main_page_robot_video_2";
        document.getElementById("main_page_room_video_2").hidden = false;
        main_page_last_room_div = "main_page_room_video_2";
        document.getElementById('main_page_robot_video_2').play();
        document.getElementById('main_page_room_video_2').play();
        document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Moving to Room 2";
        main_page_viewer_pose(0, 2);
    } else if (main_page_current_task == 3) {
        document.getElementById("main_page_robot_video_1").hidden = false;
        main_page_last_robot_div = "main_page_robot_video_1";
        document.getElementById("main_page_room_video_1").hidden = false;
        main_page_last_room_div = "main_page_room_video_1";
        document.getElementById('main_page_robot_video_1').play();
        document.getElementById('main_page_room_video_1').play();
        main_page_viewer_pose(0, 1);
        document.getElementById("main_page_task_robot_status").innerHTML = "Status:" + "Moving to Room 1";
    }
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = false;
    document.getElementById("main_page_task_intervetion_intervention_button_div").hidden = false;
    main_page_move_base_timer(20);

    //document.getElementById("main_page_info_header").innerHTML = "The robot moves trough rooms, In 50 seconds you can intervene by pressing intervene button";

    main_page_current_task_score = 7;
    main_page_current_task_fail = 0;
    main_page_current_task_interventions = {
        "MOVE_BASE" : false,
        "MOVE_HEAD_AND_SCAN" : false,
        "CALCULATE_RESULT" : false
    }
}

main_page_info_page_1_html = "<img src='img/info1_1.png' class='rounded' height='300' width='450'><p></p>" +
                            "<div style='text-align:left;font-size:large;'>" +
                            "The user interface is divided in three parts: left, middle, right" +
                            "</div>";
main_page_info_page_2_html = "<img src='img/info2.png' class='rounded' height='300' width='300'><p></p>" +
                            "<div style='text-align:left;font-size:large;'>" +
                            "Middle part is divided in three parts:<ul><li>Up - The robot rgb camera. You can see what the robot see" +
                            "</li><li>Middle - The Map. There are three squares on the map:<ul><li> The red one - Postion for Room 1" +
                            "</li><li>The blue one - Position of the Room 2</li><li>The green one - Current robot position on the map</li>" +
                            "</ul></li><li>Bottom - The upper camere where you can see the rooms and the robot</li></ul>" +
                            "</div>";
main_page_info_page_3_html = "";
main_page_info_page_3_1_html = "<div style='text-align:left;font-size:large;'>" +
                                "Right part is a blank space that has no use" +
                                "</div>";
main_page_info_page_3_2_html = "<img src='img/info3.png' class='rounded' height='300' width='300'><p></p>" +
                                "<div style='text-align:left;font-size:large;'>" +
                                "Right part is the place where you can chat with TIAGo. You can write messages in bottom" +
                                " text area. You can send them by pressing the blue button or the 'enter' key on keyboard" +
                                "</div>";
main_page_info_page_4_html = "<img src='img/info4.png' class='rounded' height='350' width='200'><p></p>" +
                            "<div style='text-align:left;font-size:large;'>" +
                             "Left part is divided in two: <ul><li>Up - Where are the buttons and informations about the" +
                             " current status </li> <li> Down - where you have the tools to help TIAGo when you want to " +
                             "have an intervention" +
                             "</div>";
main_page_info_page_5_html = "<img src='img/info5.png' class='rounded' height='200' width='200'><p></p>" +
                            "<div style='text-align:left;font-size:large;'>" +
                            "In the left-up part you have: <ul>" +
                            "<li> The finish experiment button - If you want to finish the experiment before doing" +
                            "all the tasks you can press this button </li>" +
                            "<li> The current score </li> <li> The timer - The time for this part of the task </li>" +
                            "<li> Status - The status of the robot during the task </li>" +
                            "<li> Chose a task button - When you want to start a new task just press this button </li>" +
                            "<li> Informations button - If you want informations about the interface and the experiment press this button </li>" +
                            "<li> Have an intervention button/Finish my intervention button - This button is use for starting/finishing a intervention </li></ul>" +
                            "</div>";
main_page_info_page_6_html = "<img src='img/info6.png' class='rounded' height='200' width='200'><p></p>" +
                            "<div style='text-align:left;font-size:large;'>" +
                            "The left-down part has different tools for helping TIAGo when is doing a task. If you" +
                            " have an intervention when TIAGo is moving you transmit that TIAGo is going in a wrong direction" +
                            " and TIAGo it will change its direction to the good one. If you have an intervention when TIAGo is" +
                            " scanning the romm you have 2 sliders that you can use to move TIAGo head and a scan button to scan" +
                            " the part of the room that you see on the RGB camera. You only have THREE scans, so use them carrefuly." +
                            " If you have an intervention when TIAGo is calculating the results you can tell him the results by checking" +
                            " the boxes with the objects you saw, or selecting the type of room, or selecting if the object exist in that room" +
                            "</div>";
main_page_info_page_7_html = "<table class='table table-striped'>\
                            <thead>\
                                <tr>\
                                <th scope='col'>Subtask result</th>\
                                <th scope='col'>Move to the room</th>\
                                <th scope='col'>Scan the room</th>\
                                <th scope='col'>Calculate the results</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                <th scope='row'>Success(TIAGo alone)</th>\
                                <td>0</td>\
                                <td>0</td>\
                                <td>0</td>\
                                </tr>\
                                <tr>\
                                <th scope='row'>Fail(TIAGo alone)</th>\
                                <td>-8</td>\
                                <td>-5</td>\
                                <td>-3</td>\
                                </tr>\
                                <tr>\
                                <th scope='row'>Success(TIAGo with intervention)</th>\
                                <td>-2</td>\
                                <td>-1</td>\
                                <td>-1</td>\
                                </tr>\
                                <tr>\
                                <th scope='row'>Fail(TIAGo with intervention)</th>\
                                <td>-8</td>\
                                <td>-5</td>\
                                <td>-3</td>\
                                </tr>\
                            </tbody>\
                            </table>" +
                            "<div style='text-align:left;font-size:large;'>" +
                            "The tasks have 3 parts: move to the room, scan the room and calcualte the results" +
                            "A task has 7 points, but you can receive less points if the task fails or you have a intervention" +
                            " to help TIAGo. You can have an intervetion o every part of the task. Ussualy a task done by TIAGo goes" + 
                            " like this: TIAGo is moving to the room point, When it arrive there it scan what it has on its RGB camera," +
                            " it move its head right and scan again, it move its head left and scan again, it moves its head back to the center" +
                            " and it starts calcualting the results." +
                            "</div>";
main_page_info_page_8_html = "<img src='img/info8.png' class='rounded' height='250' width='500'><p></p>" +
                            "<div style='text-align:left;font-size:large;'>" +
                            "During the experiment you can press differnt buttons. If you are not doing any task the best decision will be" +
                            " to press Chose a task button and chose a task to start. If you think at any moment that TIAGo is not doing right" +
                            " the task you can have an intervention by pressing have an intervention button. At the end of every part of a task" +
                            " you will be asked if you trust TIAGo that was done correctly the part of the task where if you want to have an intervention" +
                            " and help TIAGo to do the task succesfuly. After this you will get the answer if the part of the task has be done succesfully." +
                            " If one part of the task fails the entire task fails." +
                            "</div>";
function main_page_swal_chose_task_info() {
    console.log("de pus informatii")
    swal.close();
    swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        cancelButtonText: 'Chose Task',
        progressSteps: ['1', '2', '3', '4', '5', '6', '7', '8'],
        allowOutsideClick: false,
        width : "80%",
      }).queue([
        {
          title: 'UI',
          html: main_page_info_page_1_html
        },
        {
            title: 'Middle',
            html: main_page_info_page_2_html
        },
        {
            title: 'Right',
            html: main_page_info_page_3_html
        },
        {
            title: 'Left',
            html: main_page_info_page_4_html
        },
        {
            title: 'Left-Up',
            html: main_page_info_page_5_html
        },
        {
            title: 'Left-Down',
            html: main_page_info_page_6_html
        },
        {
            title: 'Tasks and Score',
            html: main_page_info_page_7_html
        },
        {
            title: 'Buttons',
            html: main_page_info_page_8_html
        }
      ]).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
            main_page_chose_task();
        } else if (result.value) {
            main_page_chose_task();
        }
      })

}

function main_page_info_button() {
    var html_text = "<div style='text-align:left;'>";
    if(main_page_cond2 == 0) {
        html_text = html_text + task_info_page_tasks_text[5][1];
    } else {
        html_text = html_text + task_info_page_tasks_text[5][0];
    }

    html_text = html_text + "</div>"
    html_text = html_text + "<h4>Task 1<h4>" + task_info_page_tasks_text[main_page_real_task[1]];
    html_text = html_text + "<h4>Task 2<h4>" + task_info_page_tasks_text[main_page_real_task[2]];
    html_text = html_text + "<h4>Task 3<h4>" + task_info_page_tasks_text[main_page_real_task[3]];

    swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3', '4', '5', '6', '7', '8'],
        allowOutsideClick: false,
        width : "80%",
      }).queue([
        {
          title: 'UI',
          html: main_page_info_page_1_html
        },
        {
            title: 'Middle',
            html: main_page_info_page_2_html
        },
        {
            title: 'Right',
            html: main_page_info_page_3_html
        },
        {
            title: 'Left',
            html: main_page_info_page_4_html
        },
        {
            title: 'Left-Up',
            html: main_page_info_page_5_html
        },
        {
            title: 'Left-Down',
            html: main_page_info_page_6_html
        },
        {
            title: 'Tasks and Score',
            html: main_page_info_page_7_html
        },
        {
            title: 'Buttons',
            html: main_page_info_page_8_html
        }
      ]).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
            //main_page_chose_task();
        } else if (result.value) {
            //main_page_chose_task();
        }
      })

}

function main_page_finish_experiment() {
    main_page_current_state = "EXPERIMENT_FINISHED"
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "Experiemntfinished",
        'type' : "MainPage"
    }
    experiment_index = experiment_index + 1;
    changeState("thank_you_page");
}