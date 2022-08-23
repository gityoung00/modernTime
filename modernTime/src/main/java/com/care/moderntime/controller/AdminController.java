package com.care.moderntime.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
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
import org.springframework.web.multipart.MultipartFile;
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
	@ResponseBody
	@PostMapping(value = "notice", produces = "application/json; charset=UTF-8")
	public String noticeWrite(@RequestBody(required = false)NoticeDTO dto) throws IOException {
		String result = nsv.insert(dto);
		if(result.equals("등록 완료")){
			System.out.println(result);
			return result;			
		}
		return result;
	}
	
	@ResponseBody
	@PostMapping("admin/upload")
	public String adminImage(@RequestParam("file") MultipartFile picture) throws IOException{
		System.out.println(picture);
		String result = nsv.imageUpload(picture);
		return result;
	}
	
	@ResponseBody
	@PostMapping(value = "admin/list", produces = "application/json; charset=UTF-8")
	public String noticeList() {
		String data = nsv.list();
		return data;
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
	public String lectureRegistPost(LectureRegistDTO dto,HttpSession session){
		String result = nsv.lectureRegist(dto);
		if(result.equals("등록완료")) {
			return "redirect:/lectureRegist";			
		}
		session.setAttribute("result", result);
		return "admin/lectureRegist";
	}
	
	@ResponseBody
	@PostMapping(value = "admin/lectureList", produces = "application/json; charset=UTF-8")
	public String lectureList() {
		
		String data = nsv.lectureList(); 
		return data;
	}
	
	@ResponseBody
	@PostMapping(value="lectureFilterKeyword", produces = "application/json; charset=UTF-8")
	public String lectureFilterKeyword(@RequestParam(required = false)HashMap<String, String>map) {
		String type = map.get("type");
		String search = map.get("search");
		String data = nsv.lectureFilterKeyword(type,search);
//		System.out.println(data);
		return data;
	}
	
	@ResponseBody
	@PostMapping(value="lectureFilterOrder", produces = "application/json; charset=UTF-8")
	public String lectureFilterOrder(@RequestParam(required = false)String orderId) {
//		System.out.println(orderId);
		String data = nsv.lectureFilterOrder(orderId);
//		System.out.println(data);
		return data;
	}
	
	@ResponseBody
	@PostMapping(value="lectureFilterType", produces = "application/json; charset=UTF-8")
	public String lectureFilterType(@RequestParam(required = false)String type) {
//		System.out.println(type);
		String data = nsv.lectureFilterType(type);
//		System.out.println(data);
		return data;
	}
	@ResponseBody
	@PostMapping(value="lectureFilterCredit", produces = "application/json; charset=UTF-8")
	public String lectureFilterCredit(@RequestParam(required = false)String credit) {
		System.out.println(credit);
		String data = nsv.lectureFilterCredit(credit);
//		System.out.println(data);
		return data;
	}
	
	@ResponseBody
	@PostMapping(value="lectureDelete", produces = "application/json; charset=UTF-8")
	public String lectureDelete(@RequestParam(required = false)HashMap<String, String>map) {
		String data = nsv.lectureDelete(map.get("id"));
		System.out.println(data);
		return data;
	}
	@ResponseBody
	@PostMapping(value="lectureUpdate", produces = "application/json; charset=UTF-8")
	public String lectureUpdate(@RequestParam(required = false)String id) {
		System.out.println(id);
		String data = id;
//		System.out.println(data);
		return data;
	}
	
	@GetMapping(value="/lectureUpdateSite")
	public String lectureUpdateSite(String id) {
		System.out.println(id);
		String result = nsv.lectureSel(id);
		if(result.equals("돌려줌"))return "admin/lectureUpdateSite";
		return"admin/lectureRegist";
	}
	@PostMapping(value="/lectureUpdateSite")
	public String lectureUpdateSite(LectureRegistDTO dto) {
		System.out.println(dto);
			String result = nsv.lectureUpdate(dto);
		if(result.equals("수정 완료"))return "admin/lectureRegist";
		return"admin/lectureUpdateSite";
	}
	
	@GetMapping("schoolAuth")
	public String schoolAuth() {
		return "admin/schoolAuth";
	}
	@ResponseBody
	@PostMapping(value = "schoolAuth", produces = "application/json; charset=UTF-8")
	public String schoolAuthPost() {
		 
		String data = nsv.schoolAuth();
//		System.out.println(data);
		return data;
	}
	
	@RequestMapping("schoolAuthView")
	public String schoolAuthView(String id, HttpSession session, Model model) {
		model.addAttribute("schoolAuthView",nsv.schoolAuthView(id));
		return "admin/schoolAuthView";
	}
	
	@RequestMapping("schoolAuthCheck")
	public String schoolAuthCheck(String id) {
		nsv.schoolAuthCheck(id);
		return "admin/schoolAuth";
	}
}
