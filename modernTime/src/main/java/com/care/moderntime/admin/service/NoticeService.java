package com.care.moderntime.admin.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dao.INoticeDAO;
import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.dto.SchoolAuthDTO;

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
//공지 전체 불러오기
	public String list() {
		int currentPage = 1;
		int pageBlock = 5; // 한 화면에 보여줄 데이터 수
		int totalCount =noticeDao.noticeCount(); // 총 데이터의 수
		int end = currentPage * pageBlock; // 데이터의 끝 번호
		int begin = end + 1 - pageBlock; // 데이터의 시작 번호
		ArrayList<NoticeDTO>list =  noticeDao.list(begin, end);
		String data = "{\"cd\" : [";
		for(NoticeDTO tmp : list) {
			data += "{ \"title\" : \"" + tmp.getTitle() + "\",";
			data +=	 " \"content\" : \"" + tmp.getContent()+ "\",";
			data +=	 " \"createDate\" : \"" + tmp.getCreate_date()+ "\",";
			data += " \"id\" : \"" + tmp.getId()+"\" },";
	}
		data = data.substring(0, data.length()-1);
		data += "]}";
//		
//		String data = "{\"cd\" : [";
//		for(LectureRegistDTO tmp : list) {
//			data += "{ \"lectureId\" : \"" + tmp.getLecture_id() + "\",";
//			data +=	 " \"type\" : \"" + tmp.getType()+ "\",";
//			data += " \"score\" : \"" + tmp.getScore()+"\" },";
//		}
//		
//		data = data.substring(0, data.length()-1);
//		data += "]}";
		return data;
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
	public int isLecture(String id) {
		int tmp = noticeDao.isLecture(id);
		return tmp;
	}
	public String lectureRegist(LectureRegistDTO dto) {
		if(dto.getLecture_id()==null || dto.getType() == null || dto.getType() == "" || dto.getName() == null || dto.getName() =="" || 
				dto.getTime1()==null || dto.getTime1()=="" || dto.getTeacher() == null || dto.getTeacher()==""
				|| dto.getPlace() == null || dto.getPlace() == "")
			return "필수요소 입니다.";
		int tmp = noticeDao.isLecture(dto.getLecture_id());
		String a = dto.getName();
		a.trim();
		dto.setName(a);
		if(tmp == 0) {
			noticeDao.lectureRegist(dto);
			return "등록 완료";
		}else {
			return "번호는 중복될 수 없습니다.";
		}
	}
	//AJAX에 쓸수 있도록 String 값의 데이터로 변환
	public String lectureListString(ArrayList<LectureRegistDTO> list) {
		String data = "{\"cd\" : [";
		for(LectureRegistDTO tmp : list) {
			data += "{ \"lectureId\" : \"" + tmp.getLecture_id() + "\",";
			data +=	 " \"type\" : \"" + tmp.getType()+ "\",";
			data +=	 " \"name\" : \"" + tmp.getName()+ "\",";
			data +=	 " \"teacher\" : \"" + tmp.getTeacher()+ "\",";
			data +=	 " \"time1\" : \"" + tmp.getTime1()+ "\",";
			data +=	 " \"time2\" : \"" + tmp.getTime2()+ "\",";
			data +=	 " \"place\" : \"" + tmp.getPlace()+ "\",";
			data +=	 " \"credit\" : \"" + tmp.getCredit()+ "\",";
			data +=	 " \"lectureTime\" : \"" + tmp.getLecture_time()+ "\",";
			data +=	 " \"maxStudent\" : \"" + tmp.getMax_student()+ "\",";
			data +=	 " \"listenStudent\" : \"" + tmp.getListen_student()+ "\",";
			data += " \"score\" : \"" + tmp.getScore()+"\" },";
	}
	
	data = data.substring(0, data.length()-1);
	data += "]}";
	return data;
	}
	// 강의 전체 불러오기
	public String lectureList() {
		ArrayList<LectureRegistDTO> lectureList =  noticeDao.lectureList();
		String data = lectureListString(lectureList);
		
	return data;
	}
	public String lectureFilterKeyword(String keywordType, String keyword) {
		System.out.println(keywordType+" "+keyword);
		ArrayList<LectureRegistDTO>list = noticeDao.lectureFilterKeyword(keywordType,keyword);
		String data=lectureListString(list);
			
		return data;
		
	}
	public String lectureFilterOrder(String orderId) {
		ArrayList<LectureRegistDTO> list = noticeDao.lectureFilterOrder(orderId);
		String data = lectureListString(list);
		return data;
	}
	public String lectureFilterType(String type) {
		ArrayList<LectureRegistDTO> list = noticeDao.lectureFilterType(type);
		String data = lectureListString(list);
		return data;
	}
	public String lectureFilterCredit(String credit) {
		String credit1="";
		String credit2="";
		String[] array = credit.split(",");
		if(credit.length()>1) {
			System.out.println(array[0]);
			System.out.println(array[1]);
			credit1 = array[0];
			credit2 = array[1];
		}else {
			credit1 = array[0];
		}
		ArrayList<LectureRegistDTO> list = noticeDao.lectureFilterCredit(credit1,credit2);
		String data = lectureListString(list);
		return data;
	}
	public String schoolAuth() {
		ArrayList<SchoolAuthDTO> list = noticeDao.schoolAuth();
		String data = "{\"cd\" : [";
		for(SchoolAuthDTO tmp : list) {
			data += "{ \"id\" : \"" + tmp.getId() + "\",";
			data +=	 " \"type\" : \"" + tmp.getType()+ "\",";
			data +=	 " \"picture\" : \"" + tmp.getPicture()+ "\",";
			data += " \"userId\" : \"" + tmp.getUser_id()+"\" },";
		}
		data = data.substring(0, data.length()-1);
		data += "]}";
		return data;
	}
	public SchoolAuthDTO schoolAuthView(String id) {
		SchoolAuthDTO view = noticeDao.schoolAuthView(id);
		return view;
	}
	public String schoolAuthCheck(String id) {
		noticeDao.schoolAuthCheck(id);
		return "인증 완료";
	}
	public String lectureDelete(String asd) {
		System.out.println(asd);
		String[] tmp = asd.split("\"");
		String tmp2="";
		int cnt =0;
		for(int i = 0; i<tmp.length;i++) {
			tmp2 +=tmp[i];
		}
//		tmp = tmp2.split(",");
		tmp2 =tmp2.substring(1, tmp2.length()-1);
		tmp = tmp2.split(",");
		cnt = tmp.length;
		System.out.println(tmp);
		for(String m : tmp) {
			System.out.println(m);
			int i = noticeDao.lectureDelete(m);
			System.out.println(i);
			System.out.println("성공");
		}
		return null;
	}
	public String lectureSel(String id) {
		LectureRegistDTO dto = 	noticeDao.lectureSel(id);
		if(dto == null) 
		{return "없는자료입니다.";}
		session.setAttribute("lecture_id", dto.getLecture_id());
		session.setAttribute("lectureSel", dto);
		return "돌려줌";
	}
	public String lectureUpdate(LectureRegistDTO dto) {
		
		String lecture_id =(String)session.getAttribute("lecture_id");
		System.out.println(lecture_id);
		if(dto.getType() == null || dto.getType() == "" || dto.getName() == null || dto.getName() =="" || 
				dto.getTime1()==null || dto.getTime1()=="" || dto.getTeacher() == null || dto.getTeacher()==""
				|| dto.getPlace() == null || dto.getPlace() == "") {
			return "필수요소입니다.";
		}
		dto.setLecture_id(lecture_id);
		noticeDao.lectureUpdate(dto);
		return "수정 완료";
	}
}
