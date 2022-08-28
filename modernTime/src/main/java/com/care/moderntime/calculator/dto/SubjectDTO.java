package com.care.moderntime.calculator.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectDTO {
	
	public int id;
	public String name;
	public String grade;
	public int credit;
	public int is_major;
	public int report_id;
	
	public SubjectDTO(int id, String name, String grade, int credit, int is_major, int report_id) {
		super();
		this.id = id;
		this.name = name;
		this.grade = grade;
		this.credit = credit;
		this.is_major = is_major;
		this.report_id = report_id;
	}

	public SubjectDTO(String name, String grade, int credit, int is_major, int report_id) {
		super();
		this.name = name;
		this.grade = grade;
		this.credit = credit;
		this.is_major = is_major;
		this.report_id = report_id;
	}

	public SubjectDTO(String name, String grade, int credit, int is_major) {
		super();
		this.name = name;
		this.grade = grade;
		this.credit = credit;
		this.is_major = is_major;
	}
	
	
	
	
	
	
}
