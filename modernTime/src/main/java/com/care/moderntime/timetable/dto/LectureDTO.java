package com.care.moderntime.timetable.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureDTO {
	private String lecture_id;
	private String type;
	private String name;
	private String teacher;
	private String place;
	private int credit;
	private int lecture_time;
	private int max_student;
	private int listen_student;
	private double score;
	
	private int week1;
	private int starttime1;
	private int endtime1;
	private int week2;
	private int starttime2;
	private int endtime2;
	
	public LectureDTO(String lecture_id, String type, String name, String teacher, String place, int credit, int lecture_time, int max_student,
			int listen_student, double score, int week1, int starttime1, int endtime1, int week2, int starttime2, int endtime2) {
		super();
		this.lecture_id = lecture_id;
		this.type = type;
		this.name = name;
		this.teacher = teacher;
		this.place = place;
		this.credit = credit;
		this.lecture_time = lecture_time;
		this.max_student = max_student;
		this.listen_student = listen_student;
		this.score = score;
		this.week1 = week1;
		this.starttime1 = starttime1;
		this.endtime1 = endtime1;
		this.week2 = week2;
		this.starttime2 = starttime2;
		this.endtime2 = endtime2;
	}
	
	
	
	

	
	
	
}
