var me = {};
me.avatar = "/img/usericon.png";

var you = {};
you.avatar = "/img/tiago.png";


var synth = window.speechSynthesis;

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
var accessToken = "35e1031ab43a4e62a4649eb20a3cf89d";
var baseUrl = "https://api.api.ai/v1/";
var chat_accessToken_reliable = "35e1031ab43a4e62a4649eb20a3cf89d";
var chat_accessToken_unreliable = "35e1031ab43a4e62a4649eb20a3cf89d";
function insertChat(who, text, time) {
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    var node = document.createElement("LI");
    node.style.width = "100%";
    node.style.padding = "5px";
    if (who == "me"){
        control =   '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                        '<div class="text text-l">' +
                            '<p>'+ text +'</p>' +
                            '<p><small>'+date+'</small></p>' +
                        '</div>' +
                    '</div>';
            
            if(main_page_cond2 == 1) {
                accessToken = chat_accessToken_reliable;
            } else if (main_page_cond2 == 1) {
                accessToken = chat_accessToken_unreliable;
            } else {
                console.log("EROARE la chat conditie nevalida")
            }
                        
			$.ajax({
				type: "POST",
				url: baseUrl + "query?v=20150910",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					"Authorization": "Bearer " + accessToken
				},
				data: JSON.stringify({ query: text, lang: "en", sessionId: "1" }),

				success: function(data) {
                    //JSON.stringify(data, undefined, 2)
                    console.log("Am primit,", data);
					insertChat("you", data.result.fulfillment.speech, 0);
				},
				error: function() {
					console.log("Internal Server Error");
				}
			}); 
    }else{
        control =   '<div class="msj-rta macro">' + 
                        '<div class="text text-r">' +
                            '<p>'+text+'</p>' +
                            '<p><small>'+date+'</small></p>' +
                        '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' + 
                    '</div>';
                var utterThis = new SpeechSynthesisUtterance(text);
                utterThis.lang = "en-US";
                synth.speak(utterThis);
    }
    node.innerHTML = control;
    setTimeout(
        function(){                        
            //$("#chat_messages").append(control).scrollTop($("#chat_messages").prop('scrollHeight'));
            document.getElementById("chat_messages").appendChild(node);
            document.getElementById("chat_messages").scrollTop = document.getElementById("chat_messages").scrollHeight;
        }, time);
}
function resetChat(){
    //$("#chat_messages").empty();
    var my_ul = document.getElementById("chat_messages");
    while(my_ul.childNodes.length != 0) {
        my_ul.removeChild(my_ul.firstElementChild)
    }
}


function chat_send_message_button_click() {
    console.log("a trimis mesaj");
    insertChat("me", document.getElementById("chat_text_to_send").value);     
    document.getElementById("chat_text_to_send").value = "";
    //$(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
}
