package com.care.moderntime.calculator.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportDTO {
	
	public int id;
	public String semester;
	public int sum;
	public int sum_major;
	public int credit;
	public int credit_calc;
	public int credit_major;
	public int credit_major_calc;
	public String created_at;
	public String updated_at;
	public String user_id;
	public List<SubjectDTO> subjects;
	
	public ReportDTO(int id, String semester, int sum, int sum_major, int credit, int credit_calc, int credit_major, int credit_major_calc, String created_at,
			String updated_at, String user_id) {
		super();
		this.id = id;
		this.semester = semester;
		this.sum = sum;
		this.sum_major = sum_major;
		this.credit = credit;
		this.credit_calc = credit_calc;
		this.credit_major = credit_major;
		this.credit_major_calc = credit_major_calc;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.user_id = user_id;
	}

	public ReportDTO(String semester, String user_id) {
		super();
		this.semester = semester;
		this.sum = 0;
		this.sum_major = 0;
		this.credit = 0;
		this.credit_calc = 0;
		this.credit_major = 0;
		this.credit_major_calc = 0;
		this.user_id = user_id;
	}
	
	
	
}
	
	
	
	
	
