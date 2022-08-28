package com.care.moderntime.post.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.service.MySelectServiceImpl;

@Controller
public class MySelectController {
	final static Logger logger = LoggerFactory.getLogger(MySelectController.class);
	
	@Autowired private MySelectServiceImpl service;
	
	
	@GetMapping("myarticle")
	public String myarticle() {
		return "user/myarticle";
	}
	@ResponseBody
	@PostMapping(value="myarticle", produces="application/json; charset=UTF-8")
	public Map<String, Object> myarticle(@RequestParam int start_num, String user_id) {
		System.out.println("\nmyarticle(con) start_num : " + start_num);
		System.out.println("myarticle(con) user_id : " + user_id);
	
		return service.myarticle(start_num, user_id);
		
	}
	
	
	@GetMapping("mycommentarticle")
	public String mycommentarticle() {
		return "user/mycommentarticle";
	}
	@ResponseBody
	@PostMapping(value="mycommentarticle", produces="application/json; charset=UTF-8")
	public Map<String, Object> mycommentarticle(@RequestParam int start_num, String user_id) {
		System.out.println("\nmycommentarticle(con) start_num : " + start_num);
		System.out.println("mycommentarticle(con) user_id : " + user_id);
	
		return service.mycommentarticle(start_num, user_id);
	}
	
	
	@GetMapping("myscrap")
	public String myscrap() {
		return "user/myscrap";
	}
	@ResponseBody
	@PostMapping(value="myscrap", produces="application/json; charset=UTF-8")
	public Map<String, Object> myscrap(@RequestParam int start_num, String user_id) {
		System.out.println("\nmyscrap(con) start_num : " + start_num);
		System.out.println("myscrap(con) user_id : " + user_id);
	
		return service.myscrap(start_num, user_id);
		
	}
	
	//스크랩 취소
	@ResponseBody
	@PostMapping(value = "/removeScrap", produces = "text/html; charset=UTF-8")
	public String removeScrap(@RequestBody PostDTO post, RedirectAttributes ra) {
		System.out.println("removeScrap(con) id : " + post.getId());
		ra.addFlashAttribute("id", post.getId());
		service.removeScrap(post);
		return "freedomContent";
	}
	@ResponseBody
	@PostMapping(value = "/deleteScrap", produces = "text/html; charset=UTF-8")
	public String deleteScrap(@RequestBody PostDTO post, RedirectAttributes ra) {
		System.out.println("deleteScrap(con) id : " + post.getId());
		ra.addFlashAttribute("id", post.getId());
		service.deleteScrap(post);
		return "freedomContent";
	}

}
