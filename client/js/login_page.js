
var main_page_cond1 = null;
var main_page_cond2 = null;
var main_page_cond3 = null;
var current_user = null;
function login_page_enter() {
    document.getElementById("login_page_password").value = "";
    document.getElementById("login_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "LoginPage"
    }
    experiment_index = experiment_index + 1;
    //test_login();
}

function login_page_exit() {
    document.getElementById("login_page").hidden = true;
}

function login_page_login_btn_click() {
    //var username = document.getElementById("login_page_user").value;
    var password = document.getElementById("login_page_password").value;
    //console.log("login presed user:" + username + " password:" + password);
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "NextButtonPressed",
        'type' : "LoginPage"
    }
    experiment_index = experiment_index + 1;
    var requestDict = {
        type : "Login",
        //username : username,
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
        response = JSON.parse(result.response);
        console.log(response);
        if((response["name"] == "Success") && (response["type"] == "Login") ) {
            main_page_cond1 = response["cond1"];
            main_page_cond2 = response["cond2"];
            main_page_cond3 = response["cond3"];

            main_page_info_page_1_html = "<img src='img/info1_2.png' class='rounded float-right' height='300' width='450'>" +
            "The user interface is divided in three parts: left, middle, right";
            main_page_info_page_3_html = main_page_info_page_3_2_html;
            if(main_page_cond2 == 1) {
                chat_accessToken = chat_accessToken_reliable;
            } else if (main_page_cond2 == 2) {
                chat_accessToken = chat_accessToken_unreliable;
            } else {
                console.log("fara chat")
                main_page_info_page_1_html = "<img src='img/info1_1.png' class='rounded float-right' height='300' width='450'>" +
                            "The user interface is divided in three parts: left, middle, right";
                main_page_info_page_3_html = main_page_info_page_3_1_html;
            }

            main_page_real_task = response["main_page_real_task"];
            for(x in main_page_real_task) {
                main_page_false_task[main_page_real_task[x]] = x;
            }
            console.log(main_page_real_task);
            console.log(main_page_false_task);
            //current_user = username;
            current_user = response["username"];
            //changeState("experiment_info_page");
            changeState("main_page");
        } else {
            document.getElementById("login_page_text").innerHTML = "Fail Login, please try again";
        }
    });
}

function test_login() {
    main_page_cond1 = 0;
    main_page_cond2 = 1;
    main_page_cond3 = 1;

    if(main_page_cond2 == 1) {
        chat_accessToken = chat_accessToken_reliable;
    } else if (main_page_cond2 == 2) {
        chat_accessToken = chat_accessToken_unreliable;
    } else {
        console.log("fara chat")
    }

    main_page_real_task = {
        1:1,
        2:3,
        3:2
    }
    for(x in main_page_real_task) {
        main_page_false_task[main_page_real_task[x]] = x;
    }
    console.log(main_page_real_task);
    console.log(main_page_false_task);
    //current_user = username;
    current_user = "dan";
    changeState("main_page");

}