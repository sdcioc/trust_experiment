
var tiagoInfoMessages = [
    "<h1>\
    Tiago Robot\
    </h1>\
    <p>Tiago Robot is a robot made by pal robotics.\
    It has:</p>\
    <ul>\
    <li>A lidar for helping him to localise himself inside the room</li>\
    <li>A mobile base for moving inside the room</li>\
    <li>A mobile head with a RGB camera used for viewing and scanning the enviroment</li>\
    </ul>\
    <img src='img/tiago.png' class='rounded float-right' height='200' width='200'>\
    "
];
var tiagoInfoIndex = 0;
var last_tiago_info_element = null;

function tiago_info_page_enter() {
    tiagoInfoIndex = 0;
    last_tiago_info_element = document.createElement('div');
    last_tiago_info_element.innerHTML = tiagoInfoMessages[tiagoInfoIndex];
    document.getElementById("tiago_info_page_text").appendChild(last_tiago_info_element);
    document.getElementById("tiago_info_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "TiagoInfoPage"
    }
    experiment_index = experiment_index + 1;
}

function tiago_info_page_exit() {
    tiagoInfoIndex = 0;
    document.getElementById("tiago_info_page_text").removeChild(last_tiago_info_element);
    document.getElementById("tiago_info_page").hidden = true;
}

function tiago_info_page_next_btn_click() {
    tiagoInfoIndex = tiagoInfoIndex + 1;
    if(tiagoInfoIndex == tiagoInfoMessages.length) {
        changeState("task_info_page");
    } else {
        document.getElementById("tiago_info_page_text").removeChild(last_tiago_info_element);
        last_tiago_info_element = document.createElement('div');
        last_tiago_info_element.innerHTML = tiagoInfoMessages[tiagoInfoIndex];
        document.getElementById("tiago_info_page_text").appendChild(last_tiago_info_element);
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "NextButtonPressed",
            'type' : "TiagoInfoPage"
        }
        experiment_index = experiment_index + 1;
    }
}