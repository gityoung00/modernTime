package com.care.moderntime.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.care.moderntime.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MainController {
	private final MainService mainService;
	
	@GetMapping("find/board/list")
	public Map<String, Object> getMainBoard(){
		
		return mainService.findMainBoard();
	}
	
	@GetMapping("find/aside/list")
	public Map<String, Object> getAsideBoard(){
		return mainService.findAsideBoard();
	}
	
	
}
