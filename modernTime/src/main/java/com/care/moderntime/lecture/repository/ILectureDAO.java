package com.care.moderntime.lecture.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.lecture.dto.EvaluationDTO;
import com.care.moderntime.lecture.dto.LectureDTO;

@Mapper
public interface ILectureDAO {
	
	void insert(EvaluationDTO dto); 
	ArrayList<LectureDTO> list();  
//	ArrayList<EvaluationDTO> evalist();

	
	}
