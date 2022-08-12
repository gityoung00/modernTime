package com.care.moderntime.message.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatListDTO {
	private int roomId;
	private int isAnonym;
	private String message;
	private String nickname;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createDate;

	public ChatListDTO(int roomId, int isAnonym, String message, LocalDateTime createDate) {
		super();
		this.roomId = roomId;
		this.isAnonym = isAnonym;
		this.message = message;
		this.createDate = createDate;
	}

	public ChatListDTO(int roomId, int isAnonym, String message, String nickname, LocalDateTime createDate) {
		super();
		this.roomId = roomId;
		this.isAnonym = isAnonym;
		this.message = message;
		this.nickname = nickname;
		this.createDate = createDate;
	}
	
	
	
	
	
	
}
