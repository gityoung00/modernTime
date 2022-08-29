package com.care.moderntime.user.dto;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailTokenDTO {
	private String email;
	private String token;
	private String type;
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

	
	
}
