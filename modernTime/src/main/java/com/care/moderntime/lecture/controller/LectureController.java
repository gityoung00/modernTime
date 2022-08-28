package com.care.moderntime.lecture.controller;

import java.util.List;
import java.util.Map;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.javassist.compiler.ast.Keyword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.lecture.dto.EvaluationDTO;
import com.care.moderntime.lecture.dto.LectureDTO;
import com.care.moderntime.lecture.service.LectureService;

@Controller
public class LectureController {
	@Autowired
	HttpSession session;
	@Autowired
	LectureService service;

	@GetMapping("lecture")
	public String lecture() {
		return "lecture/lecture";
	}
	

	@ResponseBody
	@PostMapping(value = "EvaluationRegist", produces = "application/json; charset=UTF-8")
	public String lectureRegistPost(@RequestBody EvaluationDTO dto){
		String userId = (String)session.getAttribute("id");
		dto.setUser_id(userId);
		System.out.println(dto.getAttend());
		String result = service.evaluationRegist(dto);
		if(result.equals("등록완료")) {
			return result;			
		}
		return result;
	}
	
	// 내 강의평
	@ResponseBody
	@PostMapping(value = "lecture/list", produces = "application/json; charset=UTF-8")
	public Map<String, Object> lectureList() {
		String userId = (String)session.getAttribute("id");
		
		return service.idjoin(userId);
	}
	
	// 최근 강의평
	@ResponseBody
	@PostMapping(value = "lecture/alllist", produces = "application/json; charset=UTF-8")
	public Map<String, Object> lecturealllist() {
		
		return service.Showcomment();
	}
	

	//강의평 상세
	@RequestMapping("evalview")
	public String evaluationview(String id, HttpSession session) {
//		session.setAttribute("lecture_id", id);
//		System.out.println("전달한 아이디 : " + id);
		String lecture_id = id;
		System.out.println("전달한 아이디 : " + lecture_id);
		service.view(lecture_id);

		
		return "lecture/evaluateView";
	}
	
	//검색
	@ResponseBody
	@PostMapping(value="search", produces="text/html; charset:UTF-8;")
	public String search(@RequestParam String keyword) {
		String result = service.search(keyword);

		return result;
		
	}
	
	// 강의평 상세 - 강의평 조회
	@ResponseBody
	@PostMapping(value="evaluation/list")
	public Map<String, Object> evaluationList(@RequestParam String lecture_id) {
		
		return service.view(lecture_id);
	}
	
}
