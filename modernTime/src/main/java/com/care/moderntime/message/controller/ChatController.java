package com.care.moderntime.message.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.care.moderntime.message.dto.ChatDTO;
import com.care.moderntime.message.dto.ChatListDTO;
import com.care.moderntime.message.service.AlarmService;
import com.care.moderntime.message.service.ChatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatController {
	
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService chatService; 
	
	// 메세지 페이지
	@GetMapping("message")
	public String message() {
		return "message/message";
	}
	
	// 채팅 리스트 보기 - 최신 채팅 보여주기, 안읽은 메세지 표시
	@ResponseBody
	@PostMapping("/message/find/list")
	public String findMessage() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();

		Map<String, Object> result = new HashMap<String, Object>();
		
		ArrayList<ChatListDTO> chatList = chatService.getChatAllList();
		result.put("data", chatList);

		return mapper.writeValueAsString(result);
	}
	// 메세지 전송
	@MessageMapping("chat/send")
	public void sendMsg() {
		String receiver = "1";
		System.out.println("teststst");
		simpMessagingTemplate.convertAndSend("/sub/" + receiver, "test");
		
	}

	
	// 채팅방 접속 -> 웹소켓 접속 -> 그동안의 채팅 내용 보여주기
	@GetMapping("message/{id}")
	public String openChat(@PathVariable Integer id) {
		return "message/message";
	}
	
	

	
	
}
