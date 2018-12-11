
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
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "NextButtonPressed",
        'type' : "LoginPage"
    }
    experiment_index = experiment_index + 1;
    var requestDict = {
        type : "Login",
        username : username,
        password : password
    }
    var request = new ROSLIB.ServiceRequest({
        a :JSON.stringify(requestDict)
    });

    robot_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_service_trust_client.name
        + ': '
        + result);
        //TODO:if result
        changeState("experiment_info_page");
    });
}