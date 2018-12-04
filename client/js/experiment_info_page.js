/*
Aici va trebui să ofer informații despre joc
Voi spune că e un joc de echipă format dintr-un om și robot
care necesită îndeplinirea unor task-uri. Omul va alege task-urile
ce vor fi efectuate. fiecare task va aveea un punctaj.
*/

var experimentInfoMessages = [
    "<h1>\
    The Human-Robot Team Game\
    </h1>\
    <p>Human-Robot teams are starting to be used more and more. Two examples are: the human-robot teams in \
    disasters for finding persons and in manufacteur of products</p>\
    <p>We propose a game where the team is formed by a human and a robot.\
    the goal of the game is to complete 4 tasks togheter. For every task will be 4 rewards depend of the following results:</p>\
    <ul>\
    <li>The robot does alone the task</li>\
    <li>The robot fails alone in doing the task</li>\
    <li>The human intervine and helps the robot to do task</li>\
    <li>The human intervine and helps the robot, but fails in doing the task</li>\
    </ul>\
    <p>\
    The rewards will depend on the task dificulty.\
    The human can intervine in the following way:\
    </p>\
    <ul>\
    <li>Make the robot to move to a point on the map</li>\
    <li>Make the robot move his head</li>\
    <li>Make the robot to use is camera for scanning for the answer</li>\
    <li>Give the robot the answer for this task</li>\
    </ul>\
    "
];
var experimentInfoIndex = 0;
var last_experiment_info_element = null;

function experiment_info_page_enter() {
    experimentInfoIndex = 0;
    last_experiment_info_element = document.createElement("div");
    last_experiment_info_element.innerHTML = experimentInfoMessages[experimentInfoIndex];
    document.getElementById("experiment_info_page_text").appendChild(last_experiment_info_element);
    document.getElementById("experiment_info_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "ExperimentInfoPage"
    }
    experiment_index = experiment_index + 1;
}

function experiment_info_page_exit() {
    experimentInfoIndex = 0;
    document.getElementById("experiment_info_page_text").removeChild(last_experiment_info_element);
    document.getElementById("experiment_info_page").hidden = true;
}

function experiment_info_page_next_btn_click() {
    experimentInfoIndex = experimentInfoIndex + 1;
    if(experimentInfoIndex == experimentInfoMessages.length) {
        changeState("tiago_info_page");
    } else {
        document.getElementById("experiment_info_page_text").removeChild(last_experiment_info_element);
        last_experiment_info_element = document.createElement("div");
        last_experiment_info_element.innerHTML = experimentInfoMessages[experimentInfoIndex];
        document.getElementById("experiment_info_page_text").appendChild(last_experiment_info_element);
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "NextButtonPressed",
            'type' : "ExperimentInfoPage"
        }
        experiment_index = experiment_index + 1;
    }
}
