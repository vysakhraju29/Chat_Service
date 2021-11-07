var url="ws://localhosot:8080/app";
var stompClient = Stomp.client(url);
function connect(event)
{
	var userName=document.getElementById().value;
	
	if(userName){
		var socket=new SockJS("/vysakh");
		stompClient=Stomp.over(socket);
		stompClient.connect({},onConnected,onError);
	}
	
	event.preventDefault();
}

function onConnected(){
	stompClient.subscribe("/topic/public",onMessageRecieved);
	
	stompClient.send("/app/chat.register",{},JSON.stringify({sender:userName,type:'JOIN'}));
}