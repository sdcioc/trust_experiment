
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

function main_page_enter() {
    document.getElementById("main_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "MainPage"
    }
    experiment_index = experiment_index + 1;

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
            value : head_x,
            enabled : false
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
        var message_to_publish = new ROSLIB.Message({
            data : JSON.stringify(message_dict)
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
        cmd_topic.publish(message_to_publish);
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
            value : head_y,
            enabled : false
        }
    );
    headUpDownSlider.on("slideStop", function(event) {
        head_y = event.value;
        var valueToSend = head_y * -1;
        console.log(valueToSend);
        var message_dict = {
            'type' : "head_move",
            'task' : main_page_current_task,
            'headx' : head_x,
            'heady' : head_y
        }
        var message_to_publish = new ROSLIB.Message({
            data : JSON.stringify(message_dict)
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
        cmd_topic.publish(message_to_publish);
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
    //TODO: de modificat cu subscriber
    document.getElementById("main_page_rgb_robot_img").src = "data:image/gif;base64,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";
    robot_image_topic.subscribe(function(message) {
        document.getElementById("main_page_rgb_robot_img").src = "data:image/jpg;base64," + message.data;
    });
}

function main_page_exit() {
    document.getElementById("main_page").hidden = true;
}

function main_page_start_task(arg) {
    console.log(arg);
    main_page_current_task = arg;
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
    main_page_tasks[arg] = 3;
    autonomous_move = true;
    autonomous_head = true;
    autonomous_scan = true;
    var message_dict = {
        'type' : "move_task",
        'task' : main_page_current_task
    }
    var message_to_publish = new ROSLIB.Message({
        data : JSON.stringify(message_dict)
    });
    cmd_topic.publish(message_to_publish);
    main_page_move_base_timer(50);
}

function main_page_prepare_for_next_task() {
    var local_sem = false;
    if(main_page_tasks[1] == 0) {
        document.getElementById("main_page_task_intervetion_task_1").disabled = false;
        local_sem = true;
    }
    if(main_page_tasks[2] == 0) {
        document.getElementById("main_page_task_intervetion_task_2").disabled = false;
        local_sem = true;
    }
    if(main_page_tasks[3] == 0) {
        document.getElementById("main_page_task_intervetion_task_3").disabled = false;
        local_sem = true;
    }
    if(main_page_tasks[4] == 0) {
        document.getElementById("main_page_task_intervetion_task_4").disabled = false;
        local_sem = true;
    }
    if(sem) {
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
    }
}

function main_page_verify_move_base_arive() {
    var requestDict = {
        type : "VerifyMove",
        task : main_page_current_task
    }
    var request = new ROSLIB.ServiceRequest({
        a : new ROSLIB.String(JSON.stringify(requestDict))
    });

    robot_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_service_trust_client.name
        + ': '
        + result);
        //TODO: pune ressult in move_base_success
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
            var message_to_publish = new ROSLIB.Message({
                data : JSON.stringify(message_dict)
            });
            cmd_topic.publish(message_to_publish);
            main_page_move_head_timer(30);
        } else {
            main_page_tasks[main_page_current_task] = 2;
            main_page_prepare_for_next_task()
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
            task : main_page_current_task
        }
        var request = new ROSLIB.ServiceRequest({
            a : new ROSLIB.String(JSON.stringify(requestDict))
        });
    
        robot_service_trust_client.callService(request, function(result) {
            console.log('Result for service call on '
            + robot_service_trust_client.name
            + ': '
            + result);
            //TODO: setarea valorin in functie de task pentru scan
        });
        
    } else {
        main_page_tasks[main_page_current_task] = 2;
        main_page_prepare_for_next_task()
    }
}


function main_page_verify_scan() {
    var scan_success = true;
    //TODO verificare daca a intervenit
    //TODO in functie de ce a ales
    //TODO add event
    if(main_page_current_task == 1) {
        if(document.getElementById("main_page_task_intervetion_scan_task_1_number").value != 5) {
            scan_success = false;
        }
    } else if(main_page_current_task == 2) {
        if(document.getElementById("main_page_task_intervetion_scan_task_2_has_object").value == false) {
            scan_success = false;
        }
    } else if(main_page_current_task == 3) {
        if(document.getElementById("main_page_task_intervetion_scan_task_3_number").value != 7) {
            scan_success = false;
        }
    } else if(main_page_current_task == 4) {
        if(document.getElementById("main_page_task_intervetion_scan_task_2_has_objec_1").value == false) {
            scan_success = false;
        }
        if(document.getElementById("main_page_task_intervetion_scan_task_2_has_object_2").value == true) {
            scan_success = false;
        }
        if(document.getElementById("main_page_task_intervetion_scan_task_2_has_object_3").value == false) {
            scan_success = false;
        }
        if(document.getElementById("main_page_task_intervetion_scan_task_2_has_object_4").value == false) {
            scan_success = false;
        }
    }
    if(scan_success) {
        main_page_tasks[main_page_current_task] = 1;
        main_page_prepare_for_next_task();
    } else {
        main_page_tasks[main_page_current_task] = 2;
        main_page_prepare_for_next_task()
    }
}

function main_page_move_base_timer(arg) {
    if(arg == 0) {
        main_page_verify_move_base_arive();
    } else {
        setTimeout(function(){
            if(autonomous_move) {
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
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "HeadIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_head_sliders_div").hidden = false;
        headLeftRightSlider.enable();
        headUpDownSlider.enable();
        main_page_move_head_manual_timer(60);
    }
    else if(main_page_current_state == "SCAN_ONJECT") {
        //TODO: in functie de task
        autonomous_scan = false;
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "ScanIntervention",
            'type' : "MainPage",
            'task' : main_page_current_task
        }
        experiment_index = experiment_index + 1;
        document.getElementById("main_page_task_intervetion_scan").hidden = false;
        document.getElementById("main_page_task_intervetion_scan_task_"+str(main_page_current_task)).hidden = false;
        main_page_scan_manual_timer(30);
    }
}

function main_page_finish_intervention() {
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
        headLeftRightSlider.disable();
        headUpDownSlider.disable();
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
        document.getElementById("main_page_task_intervetion_scan_task_"+str(main_page_current_task)).hidden = true;
        main_page_verify_scan();
    }
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
    var message_to_publish = new ROSLIB.Message({
        data : JSON.stringify(message_dict)
    });
    cmd_topic.publish(message_to_publish);
}