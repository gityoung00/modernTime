package com.care.moderntime.lecturedto;

public class LectureDTO {

	private String lecture_id;
	private String type;
	private String name;
	private String teacher;
	private int time1;
	private int time2;
	private int place;
	private int credit;
	private int listen_time;
	private int max_student;
	private String keyword;
	public String getLecture_id() {
		return lecture_id;
	}
	public void setLecture_id(String lecture_id) {
		this.lecture_id = lecture_id;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
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
	public int getTime1() {
		return time1;
	}
	public void setTime1(int time1) {
		this.time1 = time1;
	}
	public int getTime2() {
		return time2;
	}
	public void setTime2(int time2) {
		this.time2 = time2;
	}
	public int getPlace() {
		return place;
	}
	public void setPlace(int place) {
		this.place = place;
	}
	public int getCredit() {
		return credit;
	}
	public void setCredit(int credit) {
		this.credit = credit;
	}
	public int getListen_time() {
		return listen_time;
	}
	public void setListen_time(int listen_time) {
		this.listen_time = listen_time;
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
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	private int listen_student;
	private int score;
	


}
