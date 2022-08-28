package com.care.moderntime.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
public class ALectureController {

	private final ALectureService lectureService;
	
	@GetMapping("admin/lecture/regist")
	public String lectureRegist() {
		return "admin/lecture/lectureRegist";
	}

	@ResponseBody
	@PostMapping("admin/lecture/regist")
	public Map<String, Object> lectureRegistPost(@RequestBody LectureRegistDTO dto){
		Map<String, Object> result = lectureService.lectureRegist(dto);
		return result;
	}

	@ResponseBody
	@PostMapping(value = "admin/lecture/list", produces = "application/json; charset=UTF-8")
	public Map<String, Object> lectureList() {
		return lectureService.lectureList();
	}

	@ResponseBody
	@PostMapping(value="admin/lecture/filter", produces = "application/json; charset=UTF-8")
	public Map<String, Object> lectureFilter(@RequestBody HashMap<String, Object> filter) {
		System.out.println("lecture filter");
		return lectureService.lectureFilter(filter);
	}

	@ResponseBody
	@PostMapping("admin/lecture/delete")
	public String lectureDelete(@RequestBody HashMap<String, Object> res) {
		return lectureService.lectureDelete((List<String>)res.get("ids"));
	}

	@ResponseBody
	@PostMapping("admin/lecture/update")
	public String lectureUpdate(@RequestBody LectureRegistDTO lecture) {
		return lectureService.lectureUpdate(lecture);
	}

	@GetMapping(value = "/lectureUpdateSite")
	public String lectureUpdateSite(String id) {
		String result = lectureService.lectureSel(id);
		
		if (result.equals("돌려줌"))
			return "admin/lectureUpdateSite";
		return "admin/lectureRegist";
	}

	@PostMapping(value = "/lectureUpdateSite")
	public String lectureUpdateSite(LectureRegistDTO dto) {
		System.out.println(dto);
		
		String result = lectureService.lectureUpdate(dto);
		
		if (result.equals("수정 완료"))
			return "admin/lectureRegist";
		
		return "admin/lectureUpdateSite";
		
	}

}
