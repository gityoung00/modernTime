package com.care.moderntime.message.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.message.dto.ChatListDTO;

@Mapper
public interface ChatDAO {
	ArrayList<ChatListDTO> findMessageList(String id);
}
