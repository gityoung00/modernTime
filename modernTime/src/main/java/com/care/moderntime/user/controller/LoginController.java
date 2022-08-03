package com.care.moderntime.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {
	
	@GetMapping("login")
	public String login() {
		return "user/login";
	}
	
	@PostMapping("login")
	public String login(String id, String pw) {
		return "user/login";
	}
}
