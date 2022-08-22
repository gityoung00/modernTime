package com.care.moderntime.calculator.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveReportDTO {
	public int id;
	public int sum;
	public int sum_major;
	public int credit;
	public int credit_calc;
	public int credit_major;
	public int credit_major_calc;
	
	public String updated_at;
	
	// subject 항목들
	public List<Integer> credits;
	public List<String> grades;
	public List<String> names;
	public List<Boolean> is_majors;
	
	public SaveReportDTO(int id, int sum, int sum_major, int credit, int credit_calc, int credit_major, int credit_major_calc, String updated_at,
			List<Integer> credits, List<String> grades, List<String> names) {
		super();
		this.id = id;
		this.sum = sum;
		this.sum_major = sum_major;
		this.credit = credit;
		this.credit_calc = credit_calc;
		this.credit_major = credit_major;
		this.credit_major_calc = credit_major_calc;
		this.updated_at = updated_at;
		this.credits = credits;
		this.grades = grades;
		this.names = names;
	}
	
	
	
	
	
}
