package com.care.moderntime.admin.dto;

public class LectureRegistDTO {
	private String lecture_id;
	private String type;
	private String name;
	private String teacher;
	private String time1;
	private String time2;
	private String place;
	private int credit;
	private int lecture_time;
	private int max_student;
	private int listen_student;
	public String getLecture_id() {
		return lecture_id;
	}
	public void setLecture_id(String lecture_id) {
		this.lecture_id = lecture_id;
	}
	public int getLecture_time() {
		return lecture_time;
	}
	public void setLecture_time(int lecture_time) {
		this.lecture_time = lecture_time;
	}
	public int getMax_student() {
		return max_student;
	}
	public void setMax_student(int max_student) {
		this.max_student = max_student;
	}
	public int getListen_student() {
		return listen_student;
	}
	public void setListen_student(int listen_student) {
		this.listen_student = listen_student;
	}
	private double score;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTeacher() {
		return teacher;
	}
	public void setTeacher(String teacher) {
		this.teacher = teacher;
	}
	public String getTime1() {
		return time1;
	}
	public void setTime1(String time1) {
		this.time1 = time1;
	}
	public String getTime2() {
		return time2;
	}
	public void setTime2(String time2) {
		this.time2 = time2;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public int getCredit() {
		return credit;
	}
	public void setCredit(int credit) {
		this.credit = credit;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	
}
