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
public class ALectureController {

	private final ALectureService lectureService;
	
	@GetMapping("lecture/regist")
	public String lectureRegist() {
		return "admin/lecture/lectureRegist";
	}

	@ResponseBody
	@PostMapping("lecture/regist")
	public Map<String, Object> lectureRegistPost(@RequestBody LectureRegistDTO dto){
		Map<String, Object> result = lectureService.lectureRegist(dto);
		return result;
	}

	@ResponseBody
	@PostMapping(value = "admin/lectureList", produces = "application/json; charset=UTF-8")
	public String lectureList() {

		String data = lectureService.lectureList();
		return data;
	}

	@ResponseBody
	@PostMapping(value = "lectureFilterKeyword", produces = "application/json; charset=UTF-8")
	public String lectureFilterKeyword(@RequestParam(required = false) HashMap<String, String> map) {
		String type = map.get("type");
		String search = map.get("search");
		String data = lectureService.lectureFilterKeyword(type, search);
//		System.out.println(data);
		return data;
	}

	@ResponseBody
	@PostMapping(value = "lectureFilterOrder", produces = "application/json; charset=UTF-8")
	public String lectureFilterOrder(@RequestParam(required = false) String orderId) {
		String data = lectureService.lectureFilterOrder(orderId);

		return data;
	}

	@ResponseBody
	@PostMapping(value = "lectureFilterType", produces = "application/json; charset=UTF-8")
	public String lectureFilterType(@RequestParam(required = false) String type) {
		String data = lectureService.lectureFilterType(type);

		return data;
	}

	@ResponseBody
	@PostMapping(value = "lectureFilterCredit", produces = "application/json; charset=UTF-8")
	public String lectureFilterCredit(@RequestParam(required = false) String credit) {
		String data = lectureService.lectureFilterCredit(credit);
		
		return data;
	}

	@ResponseBody
	@PostMapping(value = "lectureDelete", produces = "application/json; charset=UTF-8")
	public String lectureDelete(@RequestParam(required = false) HashMap<String, String> map) {
		String data = lectureService.lectureDelete(map.get("id"));

		return data;
	}

	@ResponseBody
	@PostMapping(value = "lectureUpdate", produces = "application/json; charset=UTF-8")
	public String lectureUpdate(@RequestParam(required = false) String id) {
		String data = id;
		
		return data;
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
