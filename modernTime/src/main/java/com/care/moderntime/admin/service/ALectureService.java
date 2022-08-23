package com.care.moderntime.admin.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dao.IALectureDAO;
import com.care.moderntime.admin.dto.LectureRegistDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ALectureService {
	
	private final IALectureDAO lectureDao;
	private final HttpSession session;
	
	public int isLecture(String id) {
		int tmp = lectureDao.isLecture(id);
		return tmp;
	}

	public Map<String, Object> lectureRegist(LectureRegistDTO dto) {
		Map<String, Object> result = new HashMap<String, Object>();

		if (dto.getLecture_id() == null || dto.getType() == null || dto.getType() == "" || dto.getName() == null || dto.getName() == ""
				|| dto.getTeacher() == null || dto.getTeacher() == "" || dto.getPlace() == null || dto.getPlace() == "") {
			result.put("status", -1);
			return result;
		}

		int tmp = lectureDao.isLecture(dto.getLecture_id());
		dto.setName(dto.getName().trim());
		if (tmp == 0) {
			lectureDao.lectureRegist(dto);
			result.put("status", 1);
			result.put("data", dto);
		} else {
			result.put("status", 0);
		}
		return result;
	}

	// AJAX에 쓸수 있도록 String 값의 데이터로 변환
	public String lectureListString(ArrayList<LectureRegistDTO> list) {
		System.out.println("start");
		String data = "{\"cd\" : [";
		for (LectureRegistDTO tmp : list) {
			data += "{ \"lecture_id\" : \"" + tmp.getLecture_id() + "\",";
			data += " \"type\" : \"" + tmp.getType() + "\",";
			data += " \"name\" : \"" + tmp.getName() + "\",";
			data += " \"teacher\" : \"" + tmp.getTeacher() + "\",";
			data += " \"place\" : \"" + tmp.getPlace() + "\",";
			data += " \"credit\" : \"" + tmp.getCredit() + "\",";
			data += " \"lecture_time\" : \"" + tmp.getLecture_time() + "\",";
			data += " \"max_student\" : \"" + tmp.getMax_student() + "\",";
			data += " \"listen_student\" : \"" + tmp.getListen_student() + "\",";
			data += " \"score\" : \"" + tmp.getScore() + "\",";
			data += " \"week1\" : \"" + tmp.getWeek1() + "\",";
			data += " \"starttime1\" : \"" + tmp.getStarttime1() + "\",";
			data += " \"endtime1\" : \"" + tmp.getEndtime1() + "\",";
			data += " \"week2\" : \"" + tmp.getWeek2() + "\",";
			data += " \"starttime2\" : \"" + tmp.getStarttime2() + "\",";
			data += " \"endtime2\" : \"" + tmp.getEndtime2() + "\" },";
		}

		data = data.substring(0, data.length() - 1);
		data += "]}";
		System.out.println(data);
		return data;
	}

	// 강의 전체 불러오기
	public String lectureList() {
		ArrayList<LectureRegistDTO> lectureList = lectureDao.lectureList();
		String data = lectureListString(lectureList);

		return data;
	}

	public String lectureFilterKeyword(String keywordType, String keyword) {
		System.out.println(keywordType + " " + keyword);
		ArrayList<LectureRegistDTO> list = lectureDao.lectureFilterKeyword(keywordType, keyword);
		String data = lectureListString(list);

		return data;

	}

	public String lectureFilterOrder(String orderId) {
		ArrayList<LectureRegistDTO> list = lectureDao.lectureFilterOrder(orderId);
		String data = lectureListString(list);
		return data;
	}

	public String lectureFilterType(String type) {
		ArrayList<LectureRegistDTO> list = lectureDao.lectureFilterType(type);
		String data = lectureListString(list);
		return data;
	}

	public String lectureFilterCredit(String credit) {
		String credit1 = "";
		String credit2 = "";
		String[] array = credit.split(",");
		if (credit.length() > 1) {
			System.out.println(array[0]);
			System.out.println(array[1]);
			credit1 = array[0];
			credit2 = array[1];
		} else {
			credit1 = array[0];
		}
		ArrayList<LectureRegistDTO> list = lectureDao.lectureFilterCredit(credit1, credit2);
		String data = lectureListString(list);
		return data;
	}

	public String lectureDelete(String asd) {
		System.out.println(asd);
		String[] tmp = asd.split("\"");
		String tmp2 = "";
		int cnt = 0;
		for (int i = 0; i < tmp.length; i++) {
			tmp2 += tmp[i];
		}
//		tmp = tmp2.split(",");
		tmp2 = tmp2.substring(1, tmp2.length() - 1);
		tmp = tmp2.split(",");
		cnt = tmp.length;
		System.out.println(tmp);
		for (String m : tmp) {
			System.out.println(m);
			int i = lectureDao.lectureDelete(m);
			System.out.println(i);
			System.out.println("성공");
		}
		return null;
	}

	public String lectureSel(String id) {
		LectureRegistDTO dto = lectureDao.lectureSel(id);
		if (dto == null) {
			return "없는자료입니다.";
		}
		session.setAttribute("lecture_id", dto.getLecture_id());
		session.setAttribute("lectureSel", dto);
		return "돌려줌";
	}

	public String lectureUpdate(LectureRegistDTO dto) {

		String lecture_id = (String) session.getAttribute("lecture_id");
		System.out.println(lecture_id);
		if (dto.getType() == null || dto.getType() == "" || dto.getName() == null || dto.getName() == "" || dto.getTeacher() == null || dto.getTeacher() == ""
				|| dto.getPlace() == null || dto.getPlace() == "") {
			return "필수요소입니다.";
		}
		dto.setLecture_id(lecture_id);
		lectureDao.lectureUpdate(dto);
		return "수정 완료";
	}

}
