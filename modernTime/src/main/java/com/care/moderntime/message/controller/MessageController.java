package com.care.moderntime.message.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.care.moderntime.message.dto.ChatDTO;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MessageController {
	
	private final SimpMessagingTemplate simpMessagingTemplate;
	
	@GetMapping("message")
	public String message() {
		return "message/message";
	}
	
	@MessageMapping("/chat/send")
	public void sendMsg(ChatDTO message) {
		String reciever = message.getReceiverId();
		simpMessagingTemplate.convertAndSend("/topic/" + reciever, message);
		
	}
	
	
	
}
