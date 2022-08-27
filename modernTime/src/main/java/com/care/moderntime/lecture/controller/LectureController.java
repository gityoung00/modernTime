package com.care.moderntime.lecture.controller;

import java.util.List;

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
//		String lecture_id = "2";
//		service.getuser(lecture_id);
//		model.addAttribute("user", service.getuser(lecture_id));
		return "lecture/lecture";
	}
	
//	@PostMapping("lecturewrite")
//	public String lectureWrite(EvaluationDTO dto, HttpSession session) {
//		String id = (String)session.getAttribute("id");
////		System.out.println("전달한 아이디 : " + session.getAttribute("lecture_lecture_id"));
//		dto.setLecture_lecture_id((String)session.getAttribute("lecture_lecture_id"));
////		dto.setUser_id(id);
//		dto.setUser_id("jiyoung1329");
//		
////		System.out.println(dto.getLecture_lecture_id());
//	
//		String result = service.evaluationRegist(dto);
//		if(result.equals("등록완료")) {
//			return "lecture/lecture";
//			
//		}
//		session.setAttribute("result",result);
//		return "lecture/lecture";
//	}
	

	@ResponseBody
	@PostMapping(value = "EvaluationRegist", produces = "application/json; charset=UTF-8")
	public String lectureRegistPost(@RequestBody EvaluationDTO dto){
//		System.out.println("list:cont = " + dto);
//		String userId = (String)session.getAttribute("id");
		String userId = "dddddd";
		dto.setUser_id(userId);
		System.out.println(dto.getAttend());
		String result = service.evaluationRegist(dto);
		if(result.equals("등록완료")) {
			return result;			
		}
		return result;
	}
	
	@GetMapping("evaluation")
	public String evaluation(String id, HttpSession session) {
		
		session.setAttribute("lecture_lecture_id", id);
		
//		String data = service.lectureList();
		return "lecture/evaluation";
	}

	@ResponseBody
	@PostMapping(value = "lecture/list", produces = "application/json; charset=UTF-8")
	public String lectureList() {
//		String data = service.lectureList();

//		String result = service.timetable(1);
		String result = service.idjoin("jiyoung1329");
//		System.out.println(result);
//		System.out.println("list:cont = " + data);
		return result;
	}
	@ResponseBody
	@PostMapping(value = "lecture/alllist", produces = "application/json; charset=UTF-8")
	public String lecturealllist() {
		String data = service.Showcomment();
//		String result = service.timetable(1); 
//		System.out.println(result);
//		System.out.println("list:cont = " + data);
		return data;
	}
	

	@ResponseBody
	@PostMapping(value = "comment/list", produces = "application/json; charset=UTF-8")
	public String commentlist() {
		String comment = service.idjoin("jiyoung1329");
//		System.out.println("list:cont = " + comment);
//		System.out.println(comment);
		return comment;
	}
	
	//강의평
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
//		System.out.println("전달한 아이디 : " + keyword);
		String result = service.search(keyword);
//		System.out.println("전달한 검색 : " + session.getAttribute("keyword"));
//		dto.setKeyword((String)session.getAttribute("keyword"));
//		service.search(keyword);

		return result;
		
	}
	
	@ResponseBody
	@PostMapping(value="evaluation/list", produces="text/html; charset:UTF-8;")
	public String evaluationList(@RequestParam String lecture_id) {
//		System.out.println(lecture_id);
		String data = service.view(lecture_id);
//		System.out.println(data);
		return data;
	}
	
}
