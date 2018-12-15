
var preQuestionsMessages = [
    "<h1>\
    Pre Game Questions\
    </h1>\
    <p> Next you will have to answer some questions</p>\
    ",
    "<h1>\
    Pre Game Questions\
    </h1>\
    <p>Tiago Rbot is a robot made by pal robotics.\
    It has:</p>\
    <ul>\
    <li>A lidar for helping him to localise himself inside the room</li>\
    <li>A mobile base for moving inside the room</li>\
    <li>A mobile head with a RGB camera used for viewing and scanning the enviroment</li>\
    </ul>\
    <button onclick='pre_questions_page_answer_click(1)'>Apasa 1</button>\
    <button onclick='pre_questions_page_answer_click(2)'>Apasa 2</button>\
    ",
    "<h1>\
    Pre Game Questions\
    </h1>\
    <p>Tiago Rbot is a robot made by pal robotics.\
    It has:</p>\
    <ul>\
    <li>A lidar for helping him to localise himself inside the room</li>\
    <li>A mobile base for moving inside the room</li>\
    <li>A mobile head with a RGB camera used for viewing and scanning the enviroment</li>\
    </ul>\
    <button onclick='pre_questions_page_answer_click(1)'>Apasa 1</button>\
    <button onclick='pre_questions_page_answer_click(2)'>Apasa 2</button>\
    "
];

var preQuestionsIndex = 0;
var last_pre_questions_element = null;
var pre_questions_answers = {};

function pre_questions_page_answer_click(arg) {
    console.log(arg);
    var temp_answ = {
        'time' : 1,
        'answer' : arg
    }
    pre_questions_answers[preQuestionsIndex] = temp_answ;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "AnswerButtonPressed",
        'type' : "PreQuestionsPage",
        'Question' : preQuestionsIndex,
        'Answer' : arg
    }
    experiment_index = experiment_index + 1;
    pre_questions_page_change_question();
}

function pre_questions_page_enter() {
    preQuestionsIndex = 0;
    pre_questions_answers = [];
    last_pre_questions_element = document.createElement('div');
    last_pre_questions_element.innerHTML = preQuestionsMessages[preQuestionsIndex];
    document.getElementById("pre_questions_page_text").appendChild(last_pre_questions_element);
    document.getElementById("pre_questions_page").hidden = false;
    document.getElementById("pre_questions_page_next_btn_div").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "PreQuestionsPage"
    }
    experiment_index = experiment_index + 1;
}

function pre_questions_page_exit() {
    preQuestionsIndex = 0;
    pre_questions_answers = [];
    document.getElementById("pre_questions_page_text").removeChild(last_pre_questions_element);
    document.getElementById("pre_questions_page_next_btn_div").hidden = false;
    document.getElementById("pre_questions_page").hidden = true;
}

function pre_questions_page_change_question() {
    preQuestionsIndex = preQuestionsIndex + 1;
    if(preQuestionsIndex == preQuestionsMessages.length) {
        console.log(pre_questions_answers);
        changeState("task_info_page");
    } else {
        document.getElementById("pre_questions_page_text").removeChild(last_pre_questions_element);
        last_pre_questions_element = document.createElement('div');
        last_pre_questions_element.innerHTML = preQuestionsMessages[preQuestionsIndex];
        document.getElementById("pre_questions_page_text").appendChild(last_pre_questions_element);
        document.getElementById("pre_questions_page_next_btn_div").hidden = true;
    }
}

function pre_questions_page_next_btn_click() {
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "NextButtonPressed",
        'type' : "PreQuestionsPage"
    }
    experiment_index = experiment_index + 1;
    pre_questions_page_change_question();
}

