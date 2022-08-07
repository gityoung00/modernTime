package com.care.moderntime.user.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class EmailTokenDTO {
	private String email;
	private String token;
	private int isExpired;
	private LocalDateTime expiredDate;
	
	public EmailTokenDTO() {}

	public EmailTokenDTO(String email, String token, int isExpired, LocalDateTime expiredDate) {
		super();
		this.email = email;
		this.token = token;
		this.isExpired = isExpired;
		this.expiredDate = expiredDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getIsExpired() {
		return isExpired;
	}

	public void setIsExpired(int isExpired) {
		this.isExpired = isExpired;
	}

	public LocalDateTime getExpiredDate() {
		return expiredDate;
	}

	public void setExpiredDate(LocalDateTime expiredDate) {
		this.expiredDate = expiredDate;
	}
	
	
	
	
	
	
}
