
var preQuestionsIndex = 0;
var pre_questions_answers = {};
var pre_questions_trust_feedback_slider = null;
var pre_questions_trust_value = 0.5;
var pre_questions_knowledge_slider = null;
var pre_questions_knowledge_value = 0.5;
var pre_questions_count_slider = null;
var pre_questions_count_value = 0.5;
var pre_questions_friend_slider = null;
var pre_questions_friend_value = 0.5;
var pre_questions_cooperate_slider = null;
var pre_questions_cooperate_value = 0.5;

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
            ticks: [0, 0.17, 0.34, 0.5, 0.67, 0.84, 1],
            ticks_positions: [0, 17, 34, 50, 67, 84, 100],
            ticks_labels: ['To an Extremely Small Extent', 'To a Very Small Extent', 'To a Small Extent', 'To a Moderate Extent', 'To a Large Extent', 'To a Very Large Extent', 'To an Extremely Large Extent'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : true,
            selection : 'none',
            value : 0.5
        }
    );
    pre_questions_trust_feedback_slider.on("slideStop", function(event) {
        pre_questions_trust_value = event.value;
    })


    pre_questions_knowledge_slider = $("#pre_questions_page_knowledge_div").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.25, 0.5, 0.75, 1],
            ticks_positions: [0, 25, 50, 75, 100],
            //ticks_labels: ['Very poor', 'Poor', 'Acceptabily', 'Well', 'Very Well'],
            ticks_labels: ['Very Weel', 'Well', 'Acceptabily', 'Poor', 'Very Poor'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : true,
            selection : 'none',
            value : 0.5
        }
    );
    pre_questions_knowledge_slider.on("slideStop", function(event) {
        pre_questions_knowledge_value = event.value;
    })
    pre_questions_knowledge_slider.refresh();

    pre_questions_count_slider = $("#pre_questions_page_count_div").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.17, 0.34, 0.5, 0.67, 0.84, 1],
            ticks_positions: [0, 17, 34, 50, 67, 84, 100],
            ticks_labels: ['To an Extremely Small Extent', 'To a Very Small Extent', 'To a Small Extent', 'To a Moderate Extent', 'To a Large Extent', 'To a Very Large Extent', 'To an Extremely Large Extent'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : true,
            selection : 'none',
            value : 0.5
        }
    );
    pre_questions_count_slider.on("slideStop", function(event) {
        pre_questions_count_value = event.value;
    })

    pre_questions_friend_slider = $("#pre_questions_page_friend_div").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.17, 0.34, 0.5, 0.67, 0.84, 1],
            ticks_positions: [0, 17, 34, 50, 67, 84, 100],
            ticks_labels: ['To an Extremely Small Extent', 'To a Very Small Extent', 'To a Small Extent', 'To a Moderate Extent', 'To a Large Extent', 'To a Very Large Extent', 'To an Extremely Large Extent'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : true,
            selection : 'none',
            value : 0.5
        }
    );
    pre_questions_friend_slider.on("slideStop", function(event) {
        pre_questions_friend_value = event.value;
    })

    pre_questions_cooperate_slider = $("#pre_questions_page_cooperate_div").bootstrapSlider(
        {
            min : 0,
            max : 1,
            step : 0.05,
            ticks: [0, 0.17, 0.34, 0.5, 0.67, 0.84, 1],
            ticks_positions: [0, 17, 34, 50, 67, 84, 100],
            ticks_labels: ['To an Extremely Small Extent', 'To a Very Small Extent', 'To a Small Extent', 'To a Moderate Extent', 'To a Large Extent', 'To a Very Large Extent', 'To an Extremely Large Extent'],
            tooltip : 'hide',
            orientation : 'vertical',
            reversed : true,
            selection : 'none',
            value : 0.5
        }
    );
    pre_questions_cooperate_slider.on("slideStop", function(event) {
        pre_questions_cooperate_value = event.value;
    })
}

function pre_questions_page_exit() {
    preQuestionsIndex = 0;
    pre_questions_answers = [];
    document.getElementById("pre_questions_page").hidden = true;
}

function pre_questions_page_change_question() {
    preQuestionsIndex = preQuestionsIndex + 1;
    if(preQuestionsIndex == 17) {
        console.log(pre_questions_answers);
        document.getElementById("pre_questions_page_text_" + (preQuestionsIndex-1)).hidden = true;
        changeState("main_page");
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

function pre_questions_answer_variable(arg) {
    var temp_answ = null;
    if(arg == 1) {
        temp_answ = {
            'time' : 1,
            'answer' : document.getElementById("pre_questions_page_age").value
        }
    } else if (arg == 2) {
        temp_answ = {
            'time' : 1,
            'answer' : document.getElementById("pre_questions_page_nationality").value
        }
    } else {
        console.log("no implemented");
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

function pre_questions_submit_range(arg) {
    var temp_answ = null;
    if(arg == 1) {
        temp_answ = {
            'time' : 1,
            'answer' : pre_questions_knowledge_value
        }
    } else if (arg == 2) {
        temp_answ = {
            'time' : 1,
            'answer' : pre_questions_count_value
        }
    } else if (arg == 3) {
        temp_answ = {
            'time' : 1,
            'answer' : pre_questions_friend_value
        }
    } else if (arg == 4) {
        temp_answ = {
            'time' : 1,
            'answer' : pre_questions_cooperate_value
        }
    } else {
        console.log("no implemented");
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