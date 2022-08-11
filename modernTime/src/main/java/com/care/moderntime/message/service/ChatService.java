package com.care.moderntime.message.service;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.care.moderntime.message.dao.ChatDAO;
import com.care.moderntime.message.dto.ChatListDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
	
	private final ChatDAO chatDao;
	private final HttpSession session;
	
	// 채팅방 리스트 가져오기
	public ArrayList<ChatListDTO> getChatAllList() {
		String id = (String) session.getAttribute("id");
		System.out.println("id: " +  id);
//		if (id == null || id.isEmpty()) return null;
		
		ArrayList<ChatListDTO> chatList = chatDao.findMessageList(id);
		System.out.println("chatlist");
		System.out.println(chatList);
		return chatList;
	}
}
