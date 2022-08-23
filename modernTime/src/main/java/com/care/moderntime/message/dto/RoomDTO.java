package com.care.moderntime.message.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDTO {
	
	private int roomId;
	private String partUser;
	private int isAnonym;
	
	public RoomDTO(int roomId, String partUser, int isAnonym) {
		super();
		this.roomId = roomId;
		this.partUser = partUser;
		this.isAnonym = isAnonym;
	}
	
	
}
