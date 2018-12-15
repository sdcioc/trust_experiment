

var postQuestionsMessages = [
    "<h1>\
    post Game Questions\
    </h1>\
    <p> Next you will have to answer some questions</p>\
    ",
    "<h1>\
    post Game Questions\
    </h1>\
    <p>Tiago Rbot is a robot made by pal robotics.\
    It has:</p>\
    <ul>\
    <li>A lidar for helping him to localise himself inside the room</li>\
    <li>A mobile base for moving inside the room</li>\
    <li>A mobile head with a RGB camera used for viewing and scanning the enviroment</li>\
    </ul>\
    <button onclick='post_questions_page_answer_click(1)'>Apasa 1</button>\
    <button onclick='post_questions_page_answer_click(2)'>Apasa 2</button>\
    ",
    "<h1>\
    post Game Questions\
    </h1>\
    <p>Tiago Rbot is a robot made by pal robotics.\
    It has:</p>\
    <ul>\
    <li>A lidar for helping him to localise himself inside the room</li>\
    <li>A mobile base for moving inside the room</li>\
    <li>A mobile head with a RGB camera used for viewing and scanning the enviroment</li>\
    </ul>\
    <button onclick='post_questions_page_answer_click(1)'>Apasa 1</button>\
    <button onclick='post_questions_page_answer_click(2)'>Apasa 2</button>\
    "];
var postQuestionsIndex = 0;
var last_post_questions_element = null;
var post_questions_answers = {};

function post_questions_page_answer_click(arg) {
    console.log(arg);
    var temp_answ = {
        'time' : 1,
        'answer' : arg
    }
    post_questions_answers[postQuestionsIndex] = temp_answ;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "AnswerButtonPressed",
        'type' : "PostQuestionsPage",
        'Question' : postQuestionsIndex,
        'Answer' : arg,
        'task' : main_page_current_task
    }
    experiment_index = experiment_index + 1;
    post_questions_page_change_question();
}

function post_questions_page_enter() {
    postQuestionsIndex = 0;
    post_questions_answers = [];
    last_post_questions_element = document.createElement('div');
    last_post_questions_element.innerHTML = postQuestionsMessages[postQuestionsIndex];
    document.getElementById("post_questions_page_text").appendChild(last_post_questions_element);
    document.getElementById("post_questions_page").hidden = false;
    document.getElementById("post_questions_page_next_btn_div").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "PostQuestionsPage"
    }
    experiment_index = experiment_index + 1;
}

function post_questions_page_exit() {
    postQuestionsIndex = 0;
    post_questions_answers = [];
    document.getElementById("post_questions_page_text").removeChild(last_post_questions_element);
    document.getElementById("post_questions_page_next_btn_div").hidden = false;
    document.getElementById("post_questions_page").hidden = true;
}

function post_questions_page_change_question() {
    postQuestionsIndex = postQuestionsIndex + 1;
    if(postQuestionsIndex == postQuestionsMessages.length) {
        console.log(post_questions_answers);
        main_page_prepare_for_next_task();
        changeState("main_page");
    } else {
        document.getElementById("post_questions_page_text").removeChild(last_post_questions_element);
        last_post_questions_element = document.createElement('div');
        last_post_questions_element.innerHTML = postQuestionsMessages[postQuestionsIndex];
        document.getElementById("post_questions_page_text").appendChild(last_post_questions_element);
        document.getElementById("post_questions_page_next_btn_div").hidden = true;
    }
}

function post_questions_page_next_btn_click() {
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "NextButtonpostssed",
        'type' : "postQuestionsPage"
    }
    experiment_index = experiment_index + 1;
    post_questions_page_change_question();
}