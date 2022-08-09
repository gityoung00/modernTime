package com.care.moderntime.user.dto;

import org.springframework.web.multipart.MultipartFile;

public class CertificationDTO {
	private String type;
	private String userId;
	private MultipartFile picture;
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
	public MultipartFile getPicture() {
		return picture;
	}
	public void setPicture(MultipartFile picture) {
		this.picture = picture;
	}
	
	
	
}
