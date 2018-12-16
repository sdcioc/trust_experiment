

var currentState = null;

function init() {
    document.getElementById("login_page").hidden = true;
    document.getElementById("experiment_info_page").hidden = true;
    document.getElementById("tiago_info_page").hidden = true;
    document.getElementById("pre_questions_page").hidden = true;
    document.getElementById("task_info_page").hidden = true;
    document.getElementById("main_page").hidden = true;
    document.getElementById("post_questions_page").hidden = true;
    document.getElementById("thank_you_page").hidden = true;

    document.getElementById("login_page").my_enter = login_page_enter;
    document.getElementById("experiment_info_page").my_enter = experiment_info_page_enter;
    document.getElementById("tiago_info_page").my_enter = tiago_info_page_enter;
    document.getElementById("pre_questions_page").my_enter = pre_questions_page_enter;
    document.getElementById("task_info_page").my_enter = task_info_page_enter;
    document.getElementById("main_page").my_enter = main_page_enter;
    document.getElementById("post_questions_page").my_enter = post_questions_page_enter;
    document.getElementById("thank_you_page").my_enter = thank_you_page_enter;



    document.getElementById("login_page").my_exit = login_page_exit;
    document.getElementById("experiment_info_page").my_exit = experiment_info_page_exit;
    document.getElementById("tiago_info_page").my_exit = tiago_info_page_exit;
    document.getElementById("pre_questions_page").my_exit = pre_questions_page_exit;
    document.getElementById("task_info_page").my_exit = task_info_page_exit;
    document.getElementById("main_page").my_exit = main_page_exit;
    document.getElementById("post_questions_page").my_exit = post_questions_page_exit;
    document.getElementById("thank_you_page").my_exit = thank_you_page_exit;

    $("#chat_text_to_send").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            chat_send_message_button_click();
        }
    });

    currentState = "main_page";
    document.getElementById(currentState).my_enter();


}

function changeState(toState) {
    document.getElementById(currentState).my_exit();
    document.getElementById(toState).my_enter();
    currentState = toState;
}