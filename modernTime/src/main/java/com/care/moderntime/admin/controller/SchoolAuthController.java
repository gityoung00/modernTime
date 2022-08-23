package com.care.moderntime.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.service.ALectureService;
import com.care.moderntime.admin.service.NoticeService;
import com.care.moderntime.admin.service.SchoolAuthService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SchoolAuthController {

	private final SchoolAuthService authService;
	

	@GetMapping("school/auth")
	public String schoolAuth() {
		return "admin/schoolAuth/schoolAuth";
	}

	@ResponseBody
	@PostMapping(value = "schoolAuth", produces = "application/json; charset=UTF-8")
	public String schoolAuthPost() {

		String data = authService.schoolAuth();
//		System.out.println(data);
		return data;
	}

	@RequestMapping("schoolAuthView")
	public String schoolAuthView(String id, HttpSession session, Model model) {
		model.addAttribute("schoolAuthView", authService.schoolAuthView(id));
		return "admin/schoolAuth/schoolAuthView";
	}

	@RequestMapping("schoolAuthCheck")
	public String schoolAuthCheck(String id) {
		authService.schoolAuthCheck(id);
		return "admin/schoolAuth/schoolAuth";
	}
}
