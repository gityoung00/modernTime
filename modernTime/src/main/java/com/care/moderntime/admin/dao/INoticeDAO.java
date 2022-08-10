package com.care.moderntime.admin.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;
@Mapper
public interface INoticeDAO {
	void insert(NoticeDTO dto);

	ArrayList<NoticeDTO> list(int begin, int end);

	NoticeDTO noticeView(String id);
	
	void noticeDelete(String id);

	int noticeCount();

	void lectureRegist(LectureRegistDTO dto);

	ArrayList<LectureRegistDTO> lectureList();
}