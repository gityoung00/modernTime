package com.care.moderntime.admin.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.LectureRegistDTO;

@Mapper
public interface IALectureDAO {
	int isLecture(String id);

	void lectureRegist(LectureRegistDTO dto);

	ArrayList<LectureRegistDTO> lectureList();

	LectureRegistDTO lectureSel(String id);

	ArrayList<LectureRegistDTO> lectureFilterKeyword(@Param("keywordType") String keywordType, @Param("keyword") String keyword);

	ArrayList<LectureRegistDTO> lectureFilterOrder(@Param("orderId") String orderId);

	ArrayList<LectureRegistDTO> lectureFilterType(@Param("type") String type);

	ArrayList<LectureRegistDTO> lectureFilterCredit(@Param("credit1") String credit1, @Param("credit2") String credit2);

	int lectureDelete(String id);

	void lectureUpdate(LectureRegistDTO dto);
}
