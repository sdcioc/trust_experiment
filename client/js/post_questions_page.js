
var postQuestionsIndex = 0;
var post_questions_answers = {};
var post_questions_trust_feedback_slider = null;
var post_questions_trust_value = 0.5;

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
    document.getElementById("post_questions_page_text_" + postQuestionsIndex).hidden = false;
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
            ticks: [0, 0.17, 0.34, 0.5, 0.67, 0.84, 1],
            ticks_positions: [0, 17, 34, 50, 67, 84, 100],
            //ticks_labels: ['To an Extremely Small Extent', 'To a Very Small Extent', 'To a Small Extent', 'To a Moderate Extent', 'To a Large Extent', 'To a Very Large Extent', 'To an Extremely Large Extent'],
            ticks_labels: ['To an Extremely Large Extent', 'To a Very Large Extent', 'To a Large Extent', 'To a Moderate Extent', 'To a Small Extent', 'To a Very Small Extent', 'To an Extremely Small Extent'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : true,
            selection : 'none',
            value : 0.5
        }
    );
    post_questions_trust_feedback_slider.on("slideStop", function(event) {
        post_questions_trust_value = event.value;
    })
    post_questions_trust_feedback_slider.bootstrapSlider("relayout")
}

function post_questions_page_exit() {
    postQuestionsIndex = 0;
    post_questions_answers = [];
    document.getElementById("post_questions_page").hidden = true;
}

function post_questions_page_change_question() {
    postQuestionsIndex = postQuestionsIndex + 1;
    if(postQuestionsIndex == 3) {
        console.log(post_questions_answers);
        document.getElementById("post_questions_page_text_" + (postQuestionsIndex-1)).hidden = true;
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