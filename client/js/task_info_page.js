
var task_info_page_tasks_text = {
    1 : "For this task you and Tiago must find if there is any plant in room 1. At the start of the task Tiago has to move\
        to a point in front of the room 1, shown with red on the map. After Tiago will move his head to scan the room and\
        calculate te result for the task",
    2 : "For this task you and Tiago must find what type of room is room 2. At the start of the task Tiago has to move\
        to a point in front of the room 2, shown with blue on the map. After Tiago will move his head to scan the room and\
        calculate te result for the task",
    3 : "For this task you and Tiago must find if the next objects: coffe table, couch, chair, bed and Xbox are in the two rooms. At the start of the task Tiago has to move\
        to a point in front of the room 1, shown with red on the map. Tiago will move his head to scan the room. After Tiago has to move\
        to a point in front of the room 2, shown with blue on the map. After Tiago will move his head to scan the room and\
        calculate te result for the task"
}
var taskInfoIndex = 1;
var last_task_info_element = null;
var task_info_difficulty_values = {
    1 : 0.5,
    2 : 0.5,
    3 : 0.5
}
var task_info_page_task_1_slider = null;
var task_info_page_task_2_slider = null;
var task_info_page_task_3_slider = null;

function task_info_page_enter() {
    document.getElementById("task_info_page").hidden = false;
    document.getElementById("task_info_page_task_1_text").innerHTML = "<h4>Task 1<h4>" + task_info_page_tasks_text[main_page_real_task[1]];
    document.getElementById("task_info_page_task_2_text").innerHTML = "<h4>Task 2<h4>" + task_info_page_tasks_text[main_page_real_task[2]];
    document.getElementById("task_info_page_task_3_text").innerHTML = "<h4>Task 3<h4>" + task_info_page_tasks_text[main_page_real_task[3]];
    document.getElementById("task_info_page_text_" + taskInfoIndex).hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "TaskInfoPage"
    }
    experiment_index = experiment_index + 1;


    task_info_page_task_1_slider = $("#task_info_page_task_1_slider").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.25, 0.5, 0.75, 1],
            ticks_positions: [0, 25, 50, 75, 100],
            ticks_labels: ['Very easy', 'Easy', 'Neutral', 'Difficult', 'Very difficult'],
            tooltip : 'hide',
            selection : 'none',
            value : 0.5
        }
    );
    task_info_page_task_1_slider.on("slideStop", function(event) {
        task_info_difficulty_values[1] = event.value;
    })

    task_info_page_task_2_slider = $("#task_info_page_task_2_slider").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.25, 0.5, 0.75, 1],
            ticks_positions: [0, 25, 50, 75, 100],
            ticks_labels: ['Very easy', 'Easy', 'Neutral', 'Difficult', 'Very difficult'],
            tooltip : 'hide',
            selection : 'none',
            value : 0.5
        }
    );
    task_info_page_task_2_slider.on("slideStop", function(event) {
        task_info_difficulty_values[2] = event.value;
    })

    task_info_page_task_3_slider = $("#task_info_page_task_3_slider").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.25, 0.5, 0.75, 1],
            ticks_positions: [0, 25, 50, 75, 100],
            ticks_labels: ['Very easy', 'Easy', 'Neutral', 'Difficult', 'Very difficult'],
            tooltip : 'hide',
            selection : 'none',
            value : 0.5
        }
    );
    task_info_page_task_3_slider.on("slideStop", function(event) {
        task_info_difficulty_values[3] = event.value;
    })
}

function task_info_page_exit() {
    document.getElementById("task_info_page").hidden = true;
}

function task_info_page_next_btn_click() {
    taskInfoIndex = taskInfoIndex + 1;
    if(taskInfoIndex == 3) {
        changeState("pre_questions_page");
    } else {
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "NextButtonPressed",
            'type' : "TaskInfoPage"
        }
        experiment_index = experiment_index + 1;
        document.getElementById("task_info_page_text_" + (taskInfoIndex-1)).hidden = true;
        document.getElementById("task_info_page_text_" + taskInfoIndex).hidden = false;
    }
}


function task_info_page_task_submit (task_number) {
    console.log("Valoarea de difiicultate este", task_info_difficulty_values[task_number]);
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "TaskInfoSubmmitDificulty",
        'type' : "TaskInfoPage",
        'task' : main_page_false_task[task_number],
        'value' : task_info_difficulty_values[task_number]
    }
    experiment_index = experiment_index + 1;
    task_info_page_next_btn_click();
}