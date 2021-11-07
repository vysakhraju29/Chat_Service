package com.vysakh.chatApplication.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.vysakh.chatApplication.model.ChatMessage;

@Controller
public class ChatController {
	
	@MessageMapping("/chat.register")
	@SendTo("/topic/public")
	public ChatMessage register(@Payload ChatMessage chatMessage,SimpMessageHeaderAccessor headerAccessor)
	{
		System.out.println("Inside chat.register");
		headerAccessor.getSessionAttributes().put("userName",chatMessage.getSender());
		return chatMessage;
	}
	
	@MessageMapping("/chat.send")
	@SendTo("/topic/public")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage)
	{
		System.out.println("message "+chatMessage.getSender());
		return chatMessage;
	}

}
