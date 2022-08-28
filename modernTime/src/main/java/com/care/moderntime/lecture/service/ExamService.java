package com.care.moderntime.lecture.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.lecture.dto.ExamDTO;
import com.care.moderntime.lecture.repository.IExamDAO;

@Service
public class ExamService {
	@Autowired IExamDAO examDao;
	//시험정보 중복체크
	public ExamDTO examSel(String userId, String lectureId) {
		ExamDTO i = examDao.examSel(userId,lectureId);
		return i;
	}
	//시험정보 등록
	public String examRegist(ExamDTO dto) {
		System.out.println(dto.getType());
		ExamDTO tmp = examDao.examSel(dto.getUser_id(), dto.getLecture_lecture_id());
		if(tmp !=null) {
			return "이미 강의평을 등록하였습니다.";
		}
		int i = examDao.examRegist(dto);
		if(i == 1) {
			return "등록 완료";
		}
		return "등록 실패";
	}
	public String examList(String lectureId) {
		ArrayList<ExamDTO> list = examDao.examList(lectureId);
		
		String data = "{\"cd\" : [";
		for (ExamDTO tmp : list) {
			String str = tmp.getStrategy().replace("\n","<br>"); 
			data += "{ \"id\" : \"" + tmp.getId() + "\",";
			data += " \"nth\" : \"" + tmp.getNth() + "\",";
			data += " \"strategy\" : \"" + str + "\",";
			data += " \"type\" : \"" + tmp.getType() + "\",";
			data += " \"lectureId\" : \"" + tmp.getLecture_lecture_id() + "\",";
			data += " \"userId\" : \"" + tmp.getUser_id() + "\" },";
		}
		data = data.substring(0, data.length() - 1);
		data += "]}";
		System.out.println(data);
		return data;
	}
	
}
