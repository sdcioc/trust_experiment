var me = {};
me.avatar = "/img/usericon.png";

var you = {};
you.avatar = "/img/tiago.png";

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
var chat_accessToken = "35e1031ab43a4e62a4649eb20a3cf89d";
var baseUrl = "https://api.api.ai/v1/";
var chat_accessToken_reliable = "35e1031ab43a4e62a4649eb20a3cf89d";
var chat_accessToken_unreliable = "41fbbc31033d4a76b34ccbd08eecbb3f";
var chat_text_to_speak = new SpeechSynthesisUtterance();
chat_text_to_speak.voice = speechSynthesis.getVoices().filter(function(voice) {return voice.name == "Daniel"})[0];
chat_text_to_speak.lang = "en-GB";
chat_text_to_speak.volume = 1;
chat_text_to_speak.pitch = 1;
chat_text_to_speak.rate = 0.8;


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
			$.ajax({
				type: "POST",
				url: baseUrl + "query?v=20150910",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					"Authorization": "Bearer " + chat_accessToken
				},
				data: JSON.stringify({ query: text, lang: "en", sessionId: "1", originalRequest: {
                    source: "webpage",
                    data: {"task":main_page_current_task, "state":main_page_current_state}
                } }),

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
                chat_text_to_speak.text = text;
                speechSynthesis.speak(chat_text_to_speak);
    }
    node.innerHTML = control;
    setTimeout(
        function(){                        
            document.getElementById("chat_messages").appendChild(node);
            document.getElementById("chat_messages").scrollTop = document.getElementById("chat_messages").scrollHeight;
        }, time);
}
function resetChat(){
    var my_ul = document.getElementById("chat_messages");
    while(my_ul.childNodes.length != 0) {
        my_ul.removeChild(my_ul.firstElementChild)
    }
}


function chat_send_message_button_click() {
    console.log("a trimis mesaj");
    insertChat("me", document.getElementById("chat_text_to_send").value);     
    document.getElementById("chat_text_to_send").value = "";
}
