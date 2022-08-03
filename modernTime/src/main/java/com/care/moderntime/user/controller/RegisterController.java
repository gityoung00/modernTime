package com.care.moderntime.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RegisterController {
	
	@GetMapping("register")
	public String register() {
		return "user/register";
	}
	
	@PostMapping("register/agreement")
	public String agreement() {
		return "user/agreement";
	}
	
	@GetMapping("register/identify/email")
	public String identifyEmail() {
		return "user/email";
	}
	
	@PostMapping("register/identify/email")
	public String identifyEmail(String email) {
		System.out.println(email);
		return "user/email";
	}
}
