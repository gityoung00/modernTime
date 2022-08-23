package com.care.moderntime.timetable.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.timetable.dto.LectureDTO;
import com.care.moderntime.timetable.dto.SemesterDTO;
import com.care.moderntime.timetable.dto.TimeTableDTO;

@Mapper
public interface TimeTableDAO {
	
	// 모든 강의 불러오기
	public ArrayList<LectureDTO> getAllLectures();

	
	// 학기 리스트 불러오기
	public ArrayList<SemesterDTO> getSemesterList();
	
	// 마지막 timetableId 들고오기
	public String getTableLastId();
	
	// table 생성
	public void makeTimeTable(TimeTableDTO dto);
	
	// table 불러오기
	public ArrayList<TimeTableDTO> findTable(String userId, int year, int semester);
	
	// table과 매칭되는 수업 불러오기
	public ArrayList<LectureDTO> findLectureInTable(int id);
	
	// 테이블 이름 변경
	public void updateTableName(@Param("id") int id, @Param("name") String newName);
	
	// 수업 삭제
	public void deleteLecture(int id);
	
	// 수업 삽입
	public void insertLecture(@Param("timetable_id")int timetable_id, @Param("lecture_id") String lecture_id);
}
