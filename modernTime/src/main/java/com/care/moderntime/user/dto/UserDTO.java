package com.care.moderntime.user.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class UserDTO {
	private String email;
	private String id;
	private String pw;
	private String name;
	private String nickname;
	private int point;
	private int isCertificate;
	private int isAdmin;
	private LocalDateTime nickModifyDate;
	
	public UserDTO() {
		super();
	}

	public UserDTO(String email, String id, String pw, String name, String nickname, int point, int isCertificate, int isAdmin, LocalDateTime nickModifyDate) {
		super();
		this.email = email;
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.nickname = nickname;
		this.point = point;
		this.isCertificate = isCertificate;
		this.isAdmin = isAdmin;
		this.nickModifyDate = nickModifyDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
	}

	public int getIsCertificate() {
		return isCertificate;
	}

	public void setIsCertificate(int isCertificate) {
		this.isCertificate = isCertificate;
	}

	public int getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(int isAdmin) {
		this.isAdmin = isAdmin;
	}

	public LocalDateTime getNickModifyDate() {
		return nickModifyDate;
	}

	public void setNickModifyDate(LocalDateTime nickModifyDate) {
		this.nickModifyDate = nickModifyDate;
	}

	
	
	
	
	
}
