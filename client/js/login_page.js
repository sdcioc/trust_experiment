
function login_page_enter() {
    document.getElementById("login_page_user").value = "";
    document.getElementById("login_page_password").value = "";
    document.getElementById("login_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "LoginPage"
    }
    experiment_index = experiment_index + 1;
}

function login_page_exit() {
    document.getElementById("login_page").hidden = true;
}

function login_page_login_btn_click() {
    var username = document.getElementById("login_page_user").value;
    var password = document.getElementById("login_page_password").value;
    console.log("login presed user:" + username + " password:" + password);
    /*
    TODO: verify login
    Use: document.getElementById("login_page_text").innerText
    */
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "NextButtonPressed",
        'type' : "LoginPage"
    }
    experiment_index = experiment_index + 1;
    changeState("experiment_info_page");
}