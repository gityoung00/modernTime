package com.care.moderntime.timetable.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SemesterDTO {
	private int year;
	private String semester;
	private String startDate;
	private String endDate;
	
	public SemesterDTO(int year, String semester, String startDate, String endDate) {
		super();
		this.year = year;
		this.semester = semester;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	
}
