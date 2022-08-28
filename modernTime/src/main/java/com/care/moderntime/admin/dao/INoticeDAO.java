package com.care.moderntime.admin.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.dto.NoticeListDTO;
import com.care.moderntime.admin.dto.PictureDTO;
import com.care.moderntime.admin.dto.SchoolAuthDTO;
@Mapper
public interface INoticeDAO {
	void insert(NoticeDTO dto);

	ArrayList<NoticeDTO> list(int startNum, int count);

	NoticeListDTO noticeView(int noticeId);
	
	void noticeUpdate(NoticeDTO dto);
	
	void noticeDelete(String id);

	int noticeCount();
	
	int checkVote(@Param("noticeId") int noticeId, @Param("userId") String userId);
	
	void saveVote(@Param("noticeId") int noticeId, @Param("userId") String userId);
	
	int checkScrap(@Param("noticeId") int noticeId, @Param("userId") String userId);
	
	void saveScrap(@Param("noticeId") int noticeId, @Param("userId") String userId);
	
	
	
	int savePicture(PictureDTO pictureDto);
	
	void updateCaption(@Param("caption") String caption, @Param("id") int id);
	
	void saveNoticePicture(@Param("noticeId") int noticeId, @Param("pictureId") int pictureId);
	
	ArrayList<PictureDTO> getNoticePictures(int noticeId);

}