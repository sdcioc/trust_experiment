
var tiagoInfoIndex = null;
function tiago_info_page_enter() {
    tiagoInfoIndex = 0;
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
    document.getElementById("tiago_info_page").hidden = true;
}

function tiago_info_page_next_btn_click() {
    tiagoInfoIndex = tiagoInfoIndex + 1;
    if(tiagoInfoIndex == 1) {
        changeState("task_info_page");
    } else {
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "NextButtonPressed",
            'type' : "TiagoInfoPage"
        }
        experiment_index = experiment_index + 1;
    }
}