package com.care.moderntime.lecture.controller;

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
//		String userId = (String)session.getAttribute("id");
//		if(userId == null || userId == "") {
//			return "로그인이 필요합니다.";
//		}
		//삭제할것
		dto.setLecture_lecture_id("1");
		//
		System.out.println(dto.getStrategy());
		String userId = "jiyoung1329";
		dto.setUser_id(userId);
		String result = es.examRegist(dto);
		if (result.equals("등록 완료")) {
			return result;			
		}
		return "등록 실패";
	}
	
	@ResponseBody
	@PostMapping(value="exam/list", produces="application/json; charset:UTF-8;")
	public String examList(@RequestParam String id, @RequestParam int limit_num) {
		System.out.println(id);
		String data = es.examList(id);
		return data;
	}
	@GetMapping("evalView")
	public String evalView() {
		return "lecture/evaluateView";
	}
	
}
