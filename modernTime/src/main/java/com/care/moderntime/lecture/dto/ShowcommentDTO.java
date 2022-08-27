package com.care.moderntime.lecture.dto;


public class ShowcommentDTO {
	private String user_id;
	private String comment;
	private String teacher;
	private String name;
	private String lecture_id;
	private String lecture_lecture_id;
	public String getListen_date() {
		return listen_date;
	}
	public void setListen_date(String listen_date) {
		this.listen_date = listen_date;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	private String listen_date;
	private double score;
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getTeacher() {
		return teacher;
	}
	public void setTeacher(String teacher) {
		this.teacher = teacher;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLecture_id() {
		return lecture_id;
	}
	public void setLecture_id(String lecture_id) {
		this.lecture_id = lecture_id;
	}
	public String getLecture_lecture_id() {
		return lecture_lecture_id;
	}
	public void setLecture_lecture_id(String lecture_lecture_id) {
		this.lecture_lecture_id = lecture_lecture_id;
	}

	
}
