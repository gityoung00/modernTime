package com.care.moderntime.user.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.user.service.LoginService;

@Controller
public class LoginController {
	@Autowired LoginService loginService;
	
	
	@GetMapping("login")
	public String login() {
		return "user/login";
	}
	
	@ResponseBody
	@PostMapping("login")
	public String login(@RequestParam String id,@RequestParam String pw) {
		String result = loginService.login(id, pw);
		return result;
	}
	
	@GetMapping("logout")
	public void logout() {
		loginService.logout();
	}
}
