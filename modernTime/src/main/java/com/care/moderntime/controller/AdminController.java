package com.care.moderntime.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	@RequestMapping("admin")
	public String admin() {
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
	@ResponseBody
	@PostMapping(value = "notice")
	public String noticeWrite(@RequestBody(required = false)NoticeDTO dto) {
		nsv.insert(dto);
		return "admin/notice";
	}
	
	@RequestMapping("noticeView")
	public String noticeView() {
		return "admin/noticeView";
	}
}
