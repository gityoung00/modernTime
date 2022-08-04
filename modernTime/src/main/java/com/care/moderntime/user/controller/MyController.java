package com.care.moderntime.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {
	
	@GetMapping("my")
	public String myPage() {
		return "user/my/index";
	}
	
	@GetMapping("my/auth")
	public String myAuth() {
		return "user/my/auth";
	}
	
	@GetMapping("my/password")
	public String myPassword() {
		return "user/my/password";
	}
	
	@GetMapping("my/email")
	public String myEmail() {
		return "user/my/email";
	}
	
	@GetMapping("my/nickname")
	public String myNickname() {
		return "user/my/nickname";
	}
	
	@GetMapping("my/withdrawal")
	public String myWithdrawal() {
		return "user/my/withdrawal";
	}
}
