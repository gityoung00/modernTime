package com.care.moderntime.lecture.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.lecture.dto.LectureDTO;
import com.care.moderntime.lecture.repository.ILectureDAO;

@Service
public class LectureService {
	@Autowired
	ILectureDAO lectureDao;
	@Autowired
	HttpSession session;

	//AJAX에 쓸수 있도록 String 값의 데이터로 변환
	public String lectureListString(ArrayList<LectureDTO> list) {
		String data = "{\"cd\" : [";
		for(LectureDTO tmp : list) {
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
	

	
	public String lectureList() {
		ArrayList<LectureDTO> lectureList = lectureDao.list();
		String data = lectureListString(lectureList);
		return data;
	}


}


