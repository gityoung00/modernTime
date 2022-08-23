package com.care.moderntime.admin.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.dto.PictureDTO;
import com.care.moderntime.admin.dto.SchoolAuthDTO;
@Mapper
public interface INoticeDAO {
	void insert(NoticeDTO dto);

	ArrayList<NoticeDTO> list(int startNum, int count);

	NoticeDTO noticeView(String id);
	
	void noticeUpdate(NoticeDTO dto);
	
	void noticeDelete(String id);

	int noticeCount();
	
	int savePicture(PictureDTO pictureDto);
	
	ArrayList<PictureDTO> getNoticePictures(int noticeId);

}