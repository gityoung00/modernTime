package com.care.moderntime.admin.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dao.INoticeDAO;
import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;

@Service
public class NoticeService {
	@Autowired private INoticeDAO noticeDao;
	@Autowired private HttpSession session;
	
	public String insert(NoticeDTO dto) {
		//String id = (String)session.getAttribute("id");
		/*
		 * if(id != "admin" || id == null) { return "관리자가 아닙니다."; }
		 */
		
		if(dto.getContent() == null || dto.getContent().isEmpty()) {
			return "내용은 필수요소입니다.";
		}
//		LocalDateTime now = LocalDateTime.now();
//		DateTimeFormatter format = DateTimeFormatter.ofPattern("MM/dd hh:mm");
//		String formatNow = now.format(format);
//		System.out.println(formatNow);
//		dto.setCreate_date(formatNow);
//		
		noticeDao.insert(dto);
		return "등록 완료";
	}

	public void list(int currentPage) {
		int pageBlock = 5; // 한 화면에 보여줄 데이터 수
		int totalCount =noticeDao.noticeCount(); // 총 데이터의 수
		int end = currentPage * pageBlock; // 데이터의 끝 번호
		int begin = end + 1 - pageBlock; // 데이터의 시작 번호
		ArrayList<NoticeDTO>list =  noticeDao.list(begin, end);
		session.setAttribute("list", list);
		String url = "/admin/notice?currentPage=";
		session.setAttribute("page", PageService.getNavi(currentPage, pageBlock, totalCount, url));
	}

	public NoticeDTO noticeView(String id) {
		NoticeDTO view = noticeDao.noticeView(id);
		return view;
	}

	public String delete(String id) {
		noticeDao.noticeDelete(id);
		session.invalidate();
		return "삭제 완료";
	}
	public void lectureRegist(LectureRegistDTO dto) {
		noticeDao.lectureRegist(dto);
	}
	// 강의 전체 불러오기
	public String lectureList() {
		ArrayList<LectureRegistDTO> lectureList =  noticeDao.lectureList();
		String data = "{\"cd\" : [";
		for(LectureRegistDTO tmp : lectureList) {
			data += "{ \"lecturtId\" : \"" + tmp.getLecture_id() + "\",";
			data +=	 " \"type\" : \"" + tmp.getType()+ "\",";
			data +=	 " \"name\" : \"" + tmp.getName()+ "\",";
			data +=	 " \"teacher\" : \"" + tmp.getTeacher()+ "\",";
			data +=	 " \"time1\" : \"" + tmp.getName()+ "\",";
			data +=	 " \"time2\" : \"" + tmp.getName()+ "\",";
			data +=	 " \"place\" : \"" + tmp.getName()+ "\",";
			data +=	 " \"credit\" : \"" + tmp.getName()+ "\",";
			data +=	 " \"lectureTime\" : \"" + tmp.getLecture_time()+ "\",";
			data +=	 " \"maxStudent\" : \"" + tmp.getMax_student()+ "\",";
			data +=	 " \"listenStudent\" : \"" + tmp.getListen_student()+ "\",";
			data += " \"score\" : \"" + tmp.getScore()+"\" },";
	}
	
	data = data.substring(0, data.length()-1);
	data += "]}";
	return data;
	}
}
