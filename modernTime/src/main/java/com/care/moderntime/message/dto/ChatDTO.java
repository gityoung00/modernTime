package com.care.moderntime.message.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatDTO {
	private int id;
	private String roomId;
	private String message;
	private String sender;
	private String senderNick;
	private LocalDateTime createDate;
	
	public ChatDTO(int id, String roomId, String message, String sender, String senderNick, LocalDateTime createDate) {
		super();
		this.id = id;
		this.roomId = roomId;
		this.message = message;
		this.sender = sender;
		this.senderNick = senderNick;
		this.createDate = createDate;
	}
	
	
	
	
}
