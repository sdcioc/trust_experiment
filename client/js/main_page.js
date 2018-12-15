
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
    3:0,
    4:0
}
var autonomous_move = null;
var autonomous_head = null;
var autonomous_scan = null;

var main_page_task1_correct_answer = 5;
var main_page_task2_correct_answer = true;
var main_page_task3_correct_answer = 7;
var main_page_task4_correct_answer_obj_1 = true;
var main_page_task4_correct_answer_obj_2 = false;
var main_page_task4_correct_answer_obj_3 = true;
var main_page_task4_correct_answer_obj_4 = true;
var main_page_first_time = true;
var main_page_has_intervine_scan = false;
var main_page_scan_service_response = null;
var main_page_real_task = {
    1:4,
    2:3,
    3:2,
    4:1
}
var main_page_false_task = {
    1:4,
    2:3,
    3:2,
    4:1
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


    viewer.scene.scaleX = 70;
    viewer.scene.scaleY = 60;
    viewer.scene.x = 150;
    viewer.scene.y = 100;
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
        var valueToSend = head_x * -1;
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
        var valueToSend = head_y;
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
    
    robot_image_topic.subscribe(function(message) {
        document.getElementById("main_page_rgb_robot_img").src = "data:image/jpg;base64," + message.data;
    });
    room_image_topic.subscribe(function(message) {
        document.getElementById("main_page_rgb_room_img").src = "data:image/jpg;base64," + message.data;
    });


    document.getElementById("main_page_task_intervetion_finish_intervention_btn").disabled = true;
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    document.getElementById("main_page_info_header").innerHTML = "<h1>Chose a task</h1>";
    //TODO: random chose a task after timeout
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
    document.getElementById("main_page_task_intervetion_task_4").disabled = true;
    main_page_tasks[main_page_current_task] = 3;
    autonomous_move = true;
    autonomous_head = true;
    autonomous_scan = true;
    var message_dict = {
        'type' : "move_task",
        'task' : main_page_current_task
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

    document.getElementById("main_page_info_header").innerHTML = "The robot moves to the table, In 50 seconds you can intervine by pressing intervine button";
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
    if(main_page_tasks[main_page_false_task[4]] == 0) {
        document.getElementById("main_page_task_intervetion_task_4").disabled = false;
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
    var request = new ROSLIB.ServiceRequest({
        a : JSON.stringify(requestDict)
    });

    robot_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_service_trust_client.name
        + ': '
        + result);
        //TODO: pune ressult in move_base_success
        /*
        var response = JSON.parse(result.response);
        if(response["name"]=="Success") {
            move_base_success = true;
        } else {
            move_base_success = false;
        }
        */
        console.log(result.response);
        var move_base_success = true;
        if(move_base_success) {
            main_page_current_state = "MOVE_HEAD";
            experiment_events[experiment_index] = {
                'dateString' : new Date().toJSON(),
                'name' : "MoveSuccesfull",
                'type' : "MainPage",
                'task' : main_page_current_task
            }
            experiment_index = experiment_index + 1;
            var message_dict = {
                'type' : "head_task",
                'task' : main_page_current_task
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
            main_page_move_head_timer(30);
        } else {
            main_page_tasks[main_page_current_task] = 2;
            main_page_feedback()
        }
    });
}

function main_page_verify_move_head() {
    var move_head_success = true;
    if(move_head_success) {
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadSuccessful",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        main_page_current_state = "SCAN_ONJECT";
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
        });
        main_page_scan_timer(30);
        
    } else {
        main_page_tasks[main_page_current_task] = 2;
        main_page_feedback()
    }
}


function main_page_verify_scan() {
    var scan_success = true;
    document.getElementById("main_page_task_intervetion_intervention_btn").disabled = true;
    if (main_page_has_intervine_scan) {
        if(main_page_current_task == 1) {
            if(document.getElementById("main_page_task_intervetion_scan_task_1_number").value != main_page_task1_correct_answer) {
                scan_success = false;
            }
        } else if(main_page_current_task == 2) {
            if(document.getElementById("main_page_task_intervetion_scan_task_2_has_object").value != main_page_task2_correct_answer) {
                scan_success = false;
            }
        } else if(main_page_current_task == 3) {
            if(document.getElementById("main_page_task_intervetion_scan_task_3_number").value != main_page_task3_correct_answer) {
                scan_success = false;
            }
        } else if(main_page_current_task == 4) {
            if(document.getElementById("main_page_task_intervetion_scan_task_4_has_object_1").value != main_page_task4_correct_answer_obj_1) {
                scan_success = false;
            }
            if(document.getElementById("main_page_task_intervetion_scan_task_4_has_object_2").value != main_page_task4_correct_answer_obj_2) {
                scan_success = false;
            }
            if(document.getElementById("main_page_task_intervetion_scan_task_4_has_object_3").value != main_page_task4_correct_answer_obj_3) {
                scan_success = false;
            }
            if(document.getElementById("main_page_task_intervetion_scan_task_4_has_object_4").value != main_page_task4_correct_answer_obj_4) {
                scan_success = false;
            }
        }
    } else {
        //TODO do something with main_page_scan_service_response
        if(main_page_current_task == 1) {
        } else if(main_page_current_task == 2) {
        } else if(main_page_current_task == 3) {
        } else if(main_page_current_task == 4) {
        }
        main_page_scan_service_response = null;
    }
    //TODO extra to event
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "VerifyScan",
        'type' : "MainPage",
        'task' : main_page_current_task,
        'has_intervine' : main_page_has_intervine_scan,
        'scan_success' : scan_success,
        'answers' : []
    }
    experiment_index = experiment_index + 1;
    main_page_has_intervine_scan = false;
    if(scan_success) {
        main_page_tasks[main_page_current_task] = 1;
        main_page_feedback();
    } else {
        main_page_tasks[main_page_current_task] = 2;
        main_page_feedback()
    }
}

function main_page_move_base_timer(arg) {
    if(arg == 0) {
        main_page_verify_move_base_arive();
    } else {
        setTimeout(function(){
            if(autonomous_move) {
                document.getElementById("main_page_info_header").innerHTML = "<h1>The robot moves to the table. In " + (arg-1) + " seconds  you can intervine by pressing intervine button</h1>";
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
            }
        }, 1000);
    }
}


function main_page_scan_timer(arg) {
    if(arg == 0) {
        main_page_verify_scan();
    } else {
        setTimeout(function(){
            if(autonomous_scan) {
                main_page_scan_timer(arg-1);
            }
        }, 1000);
    }
}


function main_page_scan_manual_timer(arg) {
    if(arg == 0) {
        main_page_finish_intervention();
    } else {
        setTimeout(function(){
            if(autonomous_scan==false) {
                main_page_scan_manual_timer(arg-1);
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
        main_page_move_base_manual_timer(120);
    }
    else if(main_page_current_state == "MOVE_HEAD") {
        autonomous_head = false;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_head_sliders_div").hidden = false;
        main_page_move_head_manual_timer(60);
    }
    else if(main_page_current_state == "SCAN_ONJECT") {
        autonomous_scan = false;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "ScanIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_scan").hidden = false;
        document.getElementById("main_page_task_intervetion_scan_task_"+main_page_current_task).hidden = false;
        main_page_scan_manual_timer(30);
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
    } else if (main_page_current_state == "MOVE_HEAD") {
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadFinishedIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_head_sliders_div").hidden = true;
        autonomous_head = true;
        main_page_verify_move_head();
    } else if (main_page_current_state == "SCAN_ONJECT") {
        autonomous_scan = true;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "ScanFinishedInternvention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_scan").hidden = true;
        document.getElementById("main_page_task_intervetion_scan_task_"+main_page_current_task).hidden = true;
        main_page_has_intervine_scan = true;
        main_page_verify_scan();
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