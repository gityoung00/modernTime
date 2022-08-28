package com.care.moderntime.lecture.dto;

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

	private int userEval;
	private String keyword;

	

}
