package com.care.moderntime.message.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatDTO {
	private int roomId;
	private String message;
	private String sender;
	private LocalDateTime createDate;
	private int isReaded;
	private int flag; // 0: 알림, 1: 유저간 채팅
	
	public ChatDTO(int roomId, String message, String sender, LocalDateTime createDate, int isReaded, int flag) {
		super();
		this.roomId = roomId;
		this.message = message;
		this.sender = sender;
		this.isReaded = isReaded;
		this.flag = flag;
		this.createDate = createDate;
	}

	public ChatDTO(int roomId, String message, String sender, int isReaded, int flag) {
		super();
		this.roomId = roomId;
		this.message = message;
		this.sender = sender;
		this.isReaded = isReaded;
		this.flag = flag;
	}
	
	
	
	
	
	
	
	
	
}
