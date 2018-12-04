// global variables
var quest = {}; 
quest.no_question = 0;
quest.questions_results = []; // empty array for the answers

//topicul pe care sunt transmise comenzile din interfata
quest.game_status = new ROSLIB.Topic({
	ros: ros,
	name: '/bibpoli/web/rep',
	messageType: 'std_msgs/String'
});

//$(document).ready(function(){
//	get_lang('messages', init_game);
//});

/*
initializearea chestionarului dupa apsarea butonului start
si transmiterea acestei informatii catre sistemul central

dupa sunt incarcate intrebarile pentru limba

Se afisaeaza doar partea de intro si de chestionar
si se actualizea denumirea butonului de QUIT in functie de limba
*/
function init_game(lang_file){
    quest.game_status.publish({
            data:    'pressStart'
    });
    console.log(lang_file)
	$.ajax({
    	url: lang_file,
      	dataType: 'json',
      	success: function(data){
      		quest.messages = data.messages;
            quest.parameters = data.parameters;
            quest.questions = data.questions;
            quest.answers = data.answers;
      	},
      	error: function(){
      		console.log('error loading file');
      	},
      	async: false
    });


    document.getElementById("intro").hidden = false;
    document.getElementById("app").hidden = false;
    document.getElementById("end_quest").hidden = true;;

    $('#return>span').html(quest.messages.stop);
	start_questionnaire();
};

//se porneste chestionarul
//si se seteaza actiunea in cazul apasarii butonului QUIT
function start_questionnaire(){
    start_questions();

	$('#return').click(function(){
        update_questions(null, null, null, 'press quit');
        endGame();
	});
};

/*
Se seteaa intrebarea curenta 
*/
function start_questions(){
    $('#answers').empty()
    $('.btn-ans').unbind().click(function(){});
    // increment the question number
    quest.no_question = quest.no_question + 1;
    if (quest.no_question == 7) {
        // This means that I reached the end:
        endGame();
    }else{

    $('#quest_no').html('Question ' + quest.no_question.toString() + '/6')

    // load the question:
    chest = 'q' + quest.no_question;

    quest.quest = quest.questions[chest]
    // write in json file the current question
    update_questions(chest, quest.quest.question, null, 'show question')


    // show the question
    $('#top').html(quest.quest.top);
    $('#question').html(chest.toUpperCase() + '. ' + quest.quest.question)

    // show the possible answers
    type_answer = quest.questions[chest].type_answer;

    answers = quest.answers[type_answer].split("; ")

    for (var i=0; i<answers.length; i++){
        $('#answers').append("<button type='button' class='btn btn-info btn-ans' id=ans" + 
                             (i+1).toString() + "><span class='btn-span'></span> </button>");
        id_but = '#ans' + (i+1).toString() + '> span';
        $(id_but).html(answers[i]);
    }

    check_answer();
    
    }

}

function check_answer() {
	$('.btn-ans').click(function(){
      $('.btn-ans').unbind().click(function(){});
        update_questions('Q' + quest.no_question.toString(), quest.quest.question, $(this).attr('id'), 'answered question')
        start_questions();
	});
};

/*
La finalul chestionarului sunt salvate raspunsurile intr-un fisier csv
si este afisat mesajul de multumire
*/
function endGame(){
    quest.game_status.publish({
        data:    'pressQuit'
    });

    update_questions(null, null, null, 'end')

    var jsonString = JSON.stringify(quest.questions_results);
    // get also the parameter for the room and have the name of the file contain that parameter.
    exportCVSfile(jsonString, 'hri_study_questionnaire.json')

	//$('#intro').remove();
	//$('#app').remove();
    //$('#end_quest').removeClass('hidden');
    document.getElementById("intro").hidden = true;
    document.getElementById("app").hidden = true;
    document.getElementById("end_quest").hidden = false;
	$('#end').html(quest.messages.end);
};

/*
Formatarea datelor
*/
function update_questions(varin1, varin2, varin3, var_event){
    console.log('I write in file')
    quest.intrebare = {};
    quest.intrebare.number_question = varin1; // the current question number
    quest.intrebare.question_text = varin2; // the question
    quest.intrebare.time = Date.now().toString(); // the time of answer
    quest.intrebare.answer = varin3; // the answer to the question
    quest.intrebare.status = var_event;

    quest.questions_results.push(quest.intrebare);
}