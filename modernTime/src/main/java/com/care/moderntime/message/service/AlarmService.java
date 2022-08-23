package com.care.moderntime.message.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class AlarmService {
	public static Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();
	
	public SseEmitter sendMessage(String name, String msg) {
		SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
		try {
			sseEmitter.send(SseEmitter.event().name(name).data(msg));
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		
		System.out.println("test2");
		sseEmitters.put("test123", sseEmitter);
		sseEmitter.onCompletion(() -> sseEmitters.remove("test123"));
		sseEmitter.onTimeout(() -> sseEmitters.remove("test123"));
		sseEmitter.onError((e) -> sseEmitters.remove("test123"));
		
		return sseEmitter;
	}
	
	public SseEmitter sendchat() {
		String msg = "test";
		return sendMessage("recieveChat", msg);
	}
	
}
