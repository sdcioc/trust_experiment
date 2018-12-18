
var postQuestionsIndex = 0;
var post_questions_answers = {};
var post_questions_trust_feedback_slider = null;
var post_questions_trust_value = null;

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
    postQuestionsIndex = 1;
    post_questions_answers = [];
    document.getElementById("post_questions_page").hidden = false;
    document.getElementById("post_questions_page_text_" + preQuestionsIndex).hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "PostQuestionsPage"
    }
    experiment_index = experiment_index + 1;


    post_questions_trust_feedback_slider = $("#post_questions_page_feedback_slider").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.5, 1],
            ticks_positions: [0, 50, 100],
            ticks_labels: ['Low', 'Medium', 'High'],
            tooltip : 'hide',
            selection : 'none',
            value : 0.5
        }
    );
    post_questions_trust_feedback_slider.on("slideStop", function(event) {
        post_questions_trust_value = event.value;
    })
}

function post_questions_page_exit() {
    postQuestionsIndex = 0;
    post_questions_answers = [];
    document.getElementById("post_questions_page").hidden = true;
}

function post_questions_page_change_question() {
    postQuestionsIndex = postQuestionsIndex + 1;
    if(postQuestionsIndex == postQuestionsMessages.length) {
        console.log(post_questions_answers);
        changeState("main_page");
        main_page_prepare_for_next_task();
    } else {
        document.getElementById("post_questions_page_text_" + (postQuestionsIndex-1)).hidden = true;
        document.getElementById("post_questions_page_text_" + postQuestionsIndex).hidden = false;
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

function post_questions_submit_feedback () {
    console.log("Valoarea de trsut este", post_questions_trust_value);
    trust_values.push({
        "type" : main_page_current_task,
        "value" : pre_questions_trust_value
    })
    post_questions_page_answer_click(post_questions_trust_value);
}