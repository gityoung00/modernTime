package com.care.moderntime.lecture.dto;

import lombok.Getter;
import lombok.Setter;

public class TimetableDTO {
	private String lecture_id;
	private String user_id;
	private int timetable_id;
	public String getLecture_id() {
		return lecture_id;
	}
	public void setLecture_id(String lecture_id) {
		this.lecture_id = lecture_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getTimetable_id() {
		return timetable_id;
	}
	public void setTimetable_id(int timetable_id) {
		this.timetable_id = timetable_id;
	}


}
