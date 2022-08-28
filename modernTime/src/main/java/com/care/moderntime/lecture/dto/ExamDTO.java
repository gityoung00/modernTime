package com.care.moderntime.lecture.dto;

public class ExamDTO {
	private int id;
	private String nth;
	private String strategy;
	private String type;
	private String user_id;
	private String lecture_lecture_id;
	
	public String getNth() {
		return nth;
	}
	public void setNth(String nth) {
		this.nth = nth;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStrategy() {
		return strategy;
	}
	public void setStrategy(String strategy) {
		this.strategy = strategy;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getLecture_lecture_id() {
		return lecture_lecture_id;
	}
	public void setLecture_lecture_id(String lecture_lecture_id) {
		this.lecture_lecture_id = lecture_lecture_id;
	}
	
	
}
