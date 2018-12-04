

var taskInfoMessages = [
    "<h1>\
    Tasks Info\
    </h1>\
    <p>Tiago Rbot is a robot made by pal robotics.\
    It has:</p>\
    <ul>\
    <li>A lidar for helping him to localise himself inside the room</li>\
    <li>A mobile base for moving inside the room</li>\
    <li>A mobile head with a RGB camera used for viewing and scanning the enviroment</li>\
    </ul>\
    "
];
var taskInfoIndex = 0;
var last_task_info_element = null;

function task_info_page_enter() {
    taskInfoIndex = 0;
    last_task_info_element = document.createElement('div');
    last_task_info_element.innerHTML = taskInfoMessages[taskInfoIndex];
    document.getElementById("task_info_page_text").appendChild(last_task_info_element);
    document.getElementById("task_info_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "TaskInfoPage"
    }
    experiment_index = experiment_index + 1;
}

function task_info_page_exit() {
    taskInfoIndex = 0;
    document.getElementById("task_info_page_text").removeChild(last_task_info_element);
    document.getElementById("task_info_page").hidden = true;
}

function task_info_page_next_btn_click() {
    taskInfoIndex = taskInfoIndex + 1;
    if(taskInfoIndex == taskInfoMessages.length) {
        changeState("main_page");
    } else {
        document.getElementById("task_info_page_text").removeChild(last_task_info_element);
        last_task_info_element = document.createElement('div');
        last_task_info_element.innerHTML = taskInfoMessages[taskInfoIndex];
        document.getElementById("task_info_page_text").appendChild(last_task_info_element);
        document.getElementById("task_info_page_text").innerText = taskInfoMessages[taskInfoIndex];
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "NextButtonPressed",
            'type' : "TaskInfoPage"
        }
        experiment_index = experiment_index + 1;
    }
}