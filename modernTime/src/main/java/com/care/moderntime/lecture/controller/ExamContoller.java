package com.care.moderntime.lecture.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.lecture.dto.ExamDTO;
import com.care.moderntime.lecture.service.ExamService;

@Controller
public class ExamContoller {
	@Autowired ExamService es;
	@Autowired HttpSession session;
	
	//강의평 - 시험 정보 등록
	@ResponseBody
	@PostMapping(value = "exam/regist", produces="application/json; charset:UTF-8;")
	public String examInfoRegist(@RequestBody ExamDTO dto) {
//		유저 아이디 등록
		String userId = (String)session.getAttribute("id");
		//
		System.out.println(dto.getStrategy());
		dto.setUser_id(userId);
		String result = es.examRegist(dto);
		if (result.equals("등록 완료")) {
			return result;			
		}
		return "등록 실패";
	}
	
	// 시험정보 리스트
	@ResponseBody
	@PostMapping(value="exam/list", produces="application/json; charset:UTF-8;")
	public Map<String, Object> examList(@RequestParam String id) {
		
		return es.examList(id);
	}
	
	
}
