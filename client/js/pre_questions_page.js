
var preQuestionsIndex = 0;
var pre_questions_answers = {};
var pre_questions_trust_feedback_slider = null;
var pre_questions_trust_value = null;

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
    preQuestionsIndex = 1;
    pre_questions_answers = [];
    document.getElementById("pre_questions_page").hidden = false;
    document.getElementById("pre_questions_page_text_" + preQuestionsIndex).hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "PreQuestionsPage"
    }
    experiment_index = experiment_index + 1;


    pre_questions_trust_feedback_slider = $("#pre_questions_page_feedback_slider").bootstrapSlider(
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
    pre_questions_trust_feedback_slider.on("slideStop", function(event) {
        pre_questions_trust_value = event.value;
    })
}

function pre_questions_page_exit() {
    preQuestionsIndex = 0;
    pre_questions_answers = [];
    document.getElementById("pre_questions_page").hidden = true;
}

function pre_questions_page_change_question() {
    preQuestionsIndex = preQuestionsIndex + 1;
    if(preQuestionsIndex == 3) {
        console.log(pre_questions_answers);
        changeState("task_info_page");
    } else {
        document.getElementById("pre_questions_page_text_" + (preQuestionsIndex-1)).hidden = true;
        document.getElementById("pre_questions_page_text_" + preQuestionsIndex).hidden = false;
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

function pre_questions_submit_feedback () {
    console.log("Valoarea de trsut este", pre_questions_trust_value);
    trust_values.push({
        "type" : "pre",
        "value" : pre_questions_trust_value
    })
    pre_questions_page_answer_click(pre_questions_trust_value);
}