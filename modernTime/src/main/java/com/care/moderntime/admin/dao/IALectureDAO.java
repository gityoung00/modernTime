package com.care.moderntime.admin.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.LectureRegistDTO;

@Mapper
public interface IALectureDAO {
	int isLecture(String id);

	void lectureRegist(LectureRegistDTO dto);

	ArrayList<LectureRegistDTO> lectureList();

	LectureRegistDTO lectureSel(String id);

	ArrayList<LectureRegistDTO> lectureFilter(Map<String, Object> filter);

	int lectureDelete(String id);

	void lectureUpdate(LectureRegistDTO dto);
}
