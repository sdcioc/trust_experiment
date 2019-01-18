/*
Aici va trebui să ofer informații despre joc
Voi spune că e un joc de echipă format dintr-un om și robot
care necesită îndeplinirea unor task-uri. Omul va alege task-urile
ce vor fi efectuate. fiecare task va aveea un punctaj.
*/

/*
var experimentInfoMessages = [
    "<h1>\
    The Human-Robot Team Game\
    </h1>\
    <p>Human-Robot teams are starting to be used more and more. Two examples are: the human-robot teams in \
    disasters for finding persons and in manufacteur of products</p>\
    <p>We propose a game where the team is formed by a human and a robot.\
    the goal of the game is to complete 3 tasks togheter. For every task will be 3 rewards depend of the following results:</p>\
    <ul>\
    <li>The robot does alone the task</li>\
    <li>The robot fails alone in doing the task</li>\
    <li>The human intervine and helps the robot to do task</li>\
    <li>The human intervine and helps the robot, but fails in doing the task</li>\
    </ul>\
    <p>\
    The human can intervine in the following way:\
    </p>\
    <ul>\
    <li>Make the robot to move to a point on the map</li>\
    <li>Make the robot move his head</li>\
    <li>Make the robot to use is camera for scanning for the answer</li>\
    <li>Give the robot the answer for this task</li>\
    </ul>\
    <p>\
    The game will take place in two rooms connected: room 1 and room 2.\
    </p>\
    "
];*/

var experimentInfoMessages = [
    "<h1>\
    The Human-Robot Team Game\
    </h1>\
    <p>Human-Robot teams are more and more common. Two such examples are: human-robot teams in \
    trying to find people in different disasters; and human-robot teams in products manufacturing</p>\
    <p>We propose a game where the team is formed by a human and a robot.\
    The goal of the game is to complete 3 tasks together. For each task there will be 3 rewards depending on the following results:</p>\
    <ul>\
    <li>The robot does the task alone </li>\
    <li>The robot fails in doing the task alone </li>\
    <li>The human intervenes and helps the robot to do task</li>\
    <li>The human intervenes and helps the robot, but fails in doing the task</li>\
    </ul>\
    <p>\
    The human can intervene in the following ways:\
    </p>\
    <ul>\
    <li>Moves the robot to a certain point on the map</li>\
    <li>Controls the head of the robot</li>\
    <li>Selects what the robot scans </li>\
    <li>Gives the robot the answer for the task</li>\
    </ul>\
    <p>\
    The game will take place in two connected rooms: Room 1 and Room 2.\
    </p>\
    "
]

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
