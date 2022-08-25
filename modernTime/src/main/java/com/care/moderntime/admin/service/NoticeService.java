package com.care.moderntime.admin.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.care.moderntime.S3.S3Upload;
import com.care.moderntime.admin.dao.INoticeDAO;
import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.dto.NoticeListDTO;
import com.care.moderntime.admin.dto.PictureDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
	private final S3Upload s3Upload;
	private final INoticeDAO noticeDao;
	private final HttpSession session;
	

	public String insert(NoticeDTO notice) {
		if (notice.getContent() == null || notice.getContent().isEmpty()) {
			return "내용은 필수요소입니다.";
		}
		noticeDao.insert(notice);
		
		// 사진들 notice와 연결
		for (PictureDTO picture: notice.getPictures()) {
			// 사진 caption update하고
			noticeDao.updateCaption(picture.getCaption(), picture.getId());
			
			// notice와 연결
			noticeDao.saveNoticePicture(notice.getId(), picture.getId());
		}
		
		
		return "등록 완료";
	}

	// 공지 전체 불러오기
	public HashMap<String, Object> list(Map<String, Object> conditions) {
		int startNum = (int) conditions.get("start_num");
		int limitNum = (int) conditions.get("limit_num");
		
		System.out.println("start_num : " + startNum);
		System.out.println("limit_num : " + limitNum);
		HashMap<String, Object> response = new HashMap<String, Object>();
		
		ArrayList<NoticeDTO> list = noticeDao.list(startNum, limitNum-startNum);

		response.put("data", list);
		System.out.println(response.get("data"));
		return response;
	}

	public NoticeListDTO noticeView(int noticeId) {
//		System.out.println("notice Id: " + noticeId);
		// title, create_date, content, pictures, picture_count, like_count, scrap_count
		
		NoticeListDTO view = noticeDao.noticeView(noticeId);
		view.setPictures(noticeDao.getNoticePictures(noticeId));
		return view;
	}
	
	// 공지 수정
	public String update(NoticeDTO dto) {
//		System.out.println("notice id: " + dto.getId());
		System.out.println(dto.getContent());
		noticeDao.noticeUpdate(dto);
		System.out.println("공지 수정 완료");
		return "공지 수정 완료";
	}
	

	public String delete(String id) {
		noticeDao.noticeDelete(id);
		session.invalidate();
		return "삭제 완료";
	}

	public int voteNotice(int noticeId) {
		String userId = (String) session.getAttribute("id");
		// 게시글이 본인인 경우 => -2
		if (userId.equals("test1234")) {
			return -2;
		}
		// 이미 공감을 눌렀을 경우 => -1
		int count = noticeDao.checkVote(noticeId, userId); 
		if (count > 0) {
			return -1;
		} else {
			noticeDao.saveVote(noticeId, userId);
			return count + 1;
		}
		
	}
	
	public int scrapNotice(int noticeId) {
		String userId = (String) session.getAttribute("id");
		// 게시글이 본인인 경우 => -2
		if (userId.equals("test1234")) {
			return -2;
		}
		// 이미 공감을 눌렀을 경우 => -1
		int count = noticeDao.checkScrap(noticeId, userId); 
		if (count > 0) {
			return -1;
		} else {
			noticeDao.saveScrap(noticeId, userId);
			return count + 1;
		}
		
	}
	
	//이미지 업로드
	public int imageUpload(MultipartFile picture) throws IOException{
		// s3에 이미지 업로드
		System.out.println("s3 image upload");
		String url = s3Upload.uploadFiles(picture, "static");
		System.out.println(url);
		PictureDTO pictureDto = new PictureDTO(url);
		int result = noticeDao.savePicture(pictureDto);
		if (result == 0) {
			return -1;
		}
		return pictureDto.getId();
	}
}
