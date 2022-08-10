package com.care.moderntime.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.LiveBeansViewMBean;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.service.NoticeService;

@Controller
public class AdminController {
	@Autowired NoticeService nsv;
	
	@RequestMapping("adminHeader")
	public String adminHeader() {
		return "admin/adminHeader";
	}
	@RequestMapping("adminFooter")
	public String adminFooter() {
		return "admin/adminFooter";
	}
	
	@GetMapping("admin")
	public String admin() {
		System.out.println("testsdfsdfsdf");
		return "admin/adminMain";
	}
	
	@RequestMapping("adminLogout")
	public String adminLogout(HttpSession session) {
		session.invalidate();
		return "index";
	}
	
	@GetMapping("notice")
	public String notice() {
		return "admin/notice";
	}
	@PostMapping(value = "notice", produces = "application/json; charset=UTF-8")
	public String noticeWrite(@RequestBody(required = false)NoticeDTO dto) {
		String result = nsv.insert(dto);
		System.out.println(dto.getTitle());
		System.out.println(dto.getContent());
		if(result.equals("등록 완료")){
			return "/notice";			
		}
		System.out.println(result);
		return "admin/notice";
	}
	
	@ResponseBody
	@PostMapping(value = "admin/list", produces = "application/json; charset=UTF-8")
	public String noticeList(@RequestParam(value = "currentPage", required=false, defaultValue = "1") int currentPage) {
		nsv.list(currentPage); 
		return "forward:/notice";
	}
	
	@RequestMapping("noticeView")
	public String noticeView(String id, HttpSession session, Model model) {
		
		
		model.addAttribute("noticeView",nsv.noticeView(id));
		return "admin/noticeView";
	}
	
	@RequestMapping("noticeDelete")
	public String noticeDelete(String id) {
		String result = nsv.delete(id);
		if(result.equals("삭제 완료")) {			
			return "redirect:notice";
		}
		return "admin/noticeView";
	}
	
	@GetMapping("lectureRegist")
	public String lectureRegist() {
		return "admin/lectureRegist";
	}
	
	@PostMapping("lectureRegist")
	public String lectureRegistPost(LectureRegistDTO dto){
		nsv.lectureRegist(dto);
		return "admin/adminMain";
	}
	
	@ResponseBody
	@PostMapping(value = "admin/lectureList", produces = "application/json; charset=UTF-8")
	public String lectureList() {
		
		String data = nsv.lectureList(); 
		return data;
	}
}
