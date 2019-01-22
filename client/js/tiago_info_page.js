
function tiago_info_page_enter() {
    document.getElementById("tiago_info_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "TiagoInfoPage"
    }
    experiment_index = experiment_index + 1;
}

function tiago_info_page_exit() {
    document.getElementById("tiago_info_page").hidden = true;
}

function tiago_info_page_next_btn_click() {
    if(tiagoInfoIndex == tiagoInfoMessages.length) {
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