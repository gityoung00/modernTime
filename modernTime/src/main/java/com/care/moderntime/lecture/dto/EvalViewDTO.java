package com.care.moderntime.lecture.dto;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EvalViewDTO {
	// 강의 정보
	private String type;
	private String name;
	private String teacher;
	// 강의평 요약
	private double lscore;
	private String practice;
	private String project;
	private String grade;
	private String attend;
	private String exam;
	
	private ArrayList<EvalListDTO> evals;
	
	
}
