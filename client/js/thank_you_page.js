


function thank_you_page_enter() {
    document.getElementById("thank_you_page").hidden = false;
    var requestDict = {
        type : "FEEDBACK",
        results : trust_values,
        user : current_user
    }
    var request = new ROSLIB.ServiceRequest({
        a : JSON.stringify(requestDict)
    });

    robot_service_trust_client.callService(request, function(result) {
        console.log('Result for service call on '
        + robot_service_trust_client.name
        + ': '
        + result);
        experiment_events[experiment_index] = {
            'dateString' : new Date().toJSON(),
            'name' : "ConversationFinished",
            'type' : "ThankYouPage",
            "value" : chat_number_of_messages
        }
        experiment_index = experiment_index + 1;

        var requestDict = {
            type : "EVENTS",
            results : experiment_events,
            user : current_user
        }
        var request = new ROSLIB.ServiceRequest({
            a : JSON.stringify(requestDict)
        });
    
        robot_service_trust_client.callService(request, function(result) {
            console.log('Result for service call on '
            + robot_service_trust_client.name
            + ': '
            + result);
            
        });
        
    });
}

function thank_you_page_exit() {
    document.getElementById("thank_you_page").hidden = true;
}