
var task_info_page_tasks_text = {
    1 : "For this task you and TIAGo must find if there is any plant in Room 1. At the start of the task TIAGo has to move\
        to a specific point in Room 1, which is shown with red on the map. After that, TIAGo will move its head to scan the room and\
        to compute the result for the task.",
    2 : "For this task you and TIAGo must find what type of room is Room 2. At the start of the task TIAGo has to move\
        to a specific point in Room 2, shown with blue on the map. After that, TIAGo will move its head to scan the room and\
        to figure out the answer for this task. ",
    3 : "For this task you and TIAGo must find if the following objects are located in the two rooms: coffe table, couch, chair, bed and an Xbox. At the start of the task TIAGo has to move\
        to a specific point in Room 1, which is shown with red on the map. Then, TIAGo will move its head to scan the room. After that TIAGo has to move\
        to a point in Room 2, shown with blue on the map. Next, by moving its head, TIAGo will scan Room 2 and \
        will compute the answer for the task"
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
    taskInfoIndex = 1;
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
    if(taskInfoIndex == 5) {
        document.getElementById("task_info_page_text_" + (taskInfoIndex-1)).hidden = true;
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
        if(taskInfoIndex == 2) {
            task_info_page_task_2_slider.bootstrapSlider("relayout")
        } else if(taskInfoIndex == 3) {
            task_info_page_task_3_slider.bootstrapSlider("relayout")
        }
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