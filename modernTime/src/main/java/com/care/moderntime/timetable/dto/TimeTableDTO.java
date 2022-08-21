package com.care.moderntime.timetable.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimeTableDTO {
	
	private int id;
	private int year;
	private int semester;
	private String name;
	private String createTime; 
	private String userId;
	
	public TimeTableDTO(int id, int year, int semester, String name, String createTime, String userId) {
		super();
		this.id = id;
		this.year = year;
		this.semester = semester;
		this.name = name;
		this.createTime = createTime;
		this.userId = userId;
	}

	public TimeTableDTO(int id, int year, int semester, String name, String userId) {
		super();
		this.id = id;
		this.year = year;
		this.semester = semester;
		this.name = name;
		this.userId = userId;
	}
	
	
	
	
	
}
