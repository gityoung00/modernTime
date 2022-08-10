package com.care.moderntime.message.dto;

public class ChatDTO {
	private int id;
	private String type;
	private String roomId;
	private String message;
	private String senderId;
	private String receiverId;
	public ChatDTO(int id, String type, String roomId, String message, String senderId, String receiverId) {
		super();
		this.id = id;
		this.type = type;
		this.roomId = roomId;
		this.message = message;
		this.senderId = senderId;
		this.receiverId = receiverId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRoomId() {
		return roomId;
	}
	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getSenderId() {
		return senderId;
	}
	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}
	public String getReceiverId() {
		return receiverId;
	}
	public void setReceiverId(String receiverId) {
		this.receiverId = receiverId;
	}
	
	
}
