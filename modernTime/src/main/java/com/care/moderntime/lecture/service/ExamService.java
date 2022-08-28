package com.care.moderntime.lecture.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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
	public Map<String, Object> examList(String lectureId) {
		Map<String, Object> res = new HashMap<String, Object>();
		
		ArrayList<ExamDTO> list = examDao.examList(lectureId);
		res.put("data", list);
		return res;
	}
	
}
