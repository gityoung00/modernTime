package com.care.moderntime.lecture.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.lecture.dto.ExamDTO;

@Mapper
public interface IExamDAO {

	int examRegist(ExamDTO dto);

	ExamDTO examSel(@Param("userId")String userId,@Param("lectureId") String lectureId);

	ArrayList<ExamDTO> examList(String lectureId);

}
