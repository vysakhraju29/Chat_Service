/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var stompClient = null;
var username = null;

function connect(event,user) {
    username = user;

    if (username) {
        //usernamePage.classList.add('hidden');
        //chatPage.classList.remove('hidden');

        var socket = new SockJS('http://'+config.ip+':'+config.port+'/vysakh');
        
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    console.log("inside onConnected()");
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.register",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
            )

    //connectingElement.classList.add('hidden');
}

function onError(error) {
//                connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
//                connectingElement.style.color = 'red';
}
var messageInput = document.getElementById("msg");
function sendMessage(event) {
    var messageContent = document.getElementById("msg").value.trim();
    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
        document.getElementById("msg").value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    console.log("message " + message);
    if(username!=message.sender)
    {
        document.getElementById("myForm").style.display = "block";
        $("#res").append(message.content, "<br>");
        console.log("message2 "+message.content);
    }
}

