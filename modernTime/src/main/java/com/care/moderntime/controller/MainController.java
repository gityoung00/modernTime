package com.care.moderntime.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.care.moderntime.service.MainService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MainController {
	private final MainService mainService;
	
	@ResponseBody
	@GetMapping("find/board/list")
	public Map<String, Object> getMainBoard(){
		
		return mainService.findMainBoard();
	}
	
	@ResponseBody
	@GetMapping("find/aside/list")
	public Map<String, Object> getAsideBoard(){
		return mainService.findAsideBoard();
	}
	
	// 인증 여부 확인
	@ResponseBody
	@GetMapping("auth/check")
	public int CheckAuth() {
		return mainService.AuthCheck();
		
	}
	
	
	
}
