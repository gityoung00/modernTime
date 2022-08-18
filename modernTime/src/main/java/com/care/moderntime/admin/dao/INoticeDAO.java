package com.care.moderntime.admin.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.dto.SchoolAuthDTO;
@Mapper
public interface INoticeDAO {
	void insert(NoticeDTO dto);

	ArrayList<NoticeDTO> list(int begin, int end);

	NoticeDTO noticeView(String id);
	
	void noticeDelete(String id);

	int noticeCount();

	void lectureRegist(LectureRegistDTO dto);

	ArrayList<LectureRegistDTO> lectureList();

	ArrayList<LectureRegistDTO> lectureFilterKeyword(@Param("keywordType")String keywordType,@Param("keyword")String keyword);
	
	ArrayList<LectureRegistDTO> lectureFilterOrder(@Param("orderId")String orderId);

	ArrayList<LectureRegistDTO> lectureFilterType(@Param("type")String type);

	ArrayList<LectureRegistDTO> lectureFilterCredit(@Param("credit1")String credit1,@Param("credit2")String credit2);

	int isLecture(String id);

	ArrayList<SchoolAuthDTO> schoolAuth();

	SchoolAuthDTO schoolAuthView(String id);

	void schoolAuthCheck(String id);

	int lectureDelete(String id);

	LectureRegistDTO lectureSel(String id);

	void lectureUpdate(LectureRegistDTO dto);
}