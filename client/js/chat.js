var me = {};
me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

var you = {};
you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

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

//-- No use time. It is a javaScript effect.
function old_insertChat(who, text, time){
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        control = '<li style="width:100%;padding:5px;">' +
                        '<div class="msj macro">' +
                            '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;padding:5px;">' +
                        '<div class="msj-rta macro">' + 
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                            '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' + 
                        '</div>' +                               
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("#chat_messages").append(control).scrollTop($("#chat_messages").prop('scrollHeight'));
        }, time);
    
}


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
    }else{
        control =   '<div class="msj-rta macro">' + 
                        '<div class="text text-r">' +
                            '<p>'+text+'</p>' +
                            '<p><small>'+date+'</small></p>' +
                        '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' + 
                    '</div>';
    }
    node.innerHTML = control;
    setTimeout(
        function(){                        
            //$("#chat_messages").append(control).scrollTop($("#chat_messages").prop('scrollHeight'));
            document.getElementById("chat_messages").appendChild(node);
            document.getElementById("chat_messages").scroll(document.getElementById("chat_messages").scrollHeight);
        }, time);
}
function resetChat(){
    //$("#chat_messages").empty();
    var my_ul = document.getElementById("chat_messages");
    while(my_ul.childNodes.length != 0) {
        my_ul.removeChild(my_ul.firstElementChild)
    }
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);              
            $(this).val('');
        }
    }
});


function chat_send_message_button_click() {
    console.log("a trimis mesaj");
    insertChat("me", document.getElementById("chat_text_to_send").value);     

    //$(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
}

//-- Clear Chat

//-- Print Messages
insertChat("me", "Hello Tom...", 0);  
insertChat("you", "Hi, Pablo", 1500);
insertChat("me", "What would you like to talk about today?", 3500);
insertChat("you", "Tell me a joke",7000);
insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
insertChat("you", "LOL", 12000);


//-- NOTE: No use time on insertChat.