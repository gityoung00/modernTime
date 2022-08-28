package com.care.moderntime.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {
	
	@GetMapping("expired")
	public String expired() {
		System.out.println("expired");
		return "user/tokenExpired";
	}
}
