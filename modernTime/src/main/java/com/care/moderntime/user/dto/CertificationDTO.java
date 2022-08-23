package com.care.moderntime.user.dto;


public class CertificationDTO {
	private String id;
	private String type;
	private String userId;
	private String picture;
	
	public CertificationDTO() {}
	
	public CertificationDTO(String type, String userId, String picture) {
		super();
		this.type = type;
		this.userId = userId;
		this.picture = picture;
	}
	
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
	
	
	
	
	
	
}
