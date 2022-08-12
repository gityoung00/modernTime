package com.care.moderntime.message.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.message.dto.ChatDTO;
import com.care.moderntime.message.dto.ChatInfoDTO;
import com.care.moderntime.message.dto.ChatListDTO;
import com.care.moderntime.message.dto.RoomDTO;

@Mapper
public interface ChatDAO {
	
	// 채팅방 목록 생성
	ArrayList<ChatListDTO> findMessageList(String id);

	// 채팅방 만들기
	int getRoomId();
	int makeChatRoom(RoomDTO room);
	
	// 알림메세지 생성시 필요
	ChatInfoDTO getPostChatInfo(int id);
	ChatInfoDTO getCommentChatInfo(int id);
	
	// 채팅 저장
	void saveChat(ChatDTO chat);
	
	// 채팅 불러오기
	ArrayList<ChatDTO> getChatList(int roomId);
	
}
