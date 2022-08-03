package com.care.moderntime.user.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.user.service.EmailService;

@Controller
public class RegisterController {
	@Autowired EmailService emailService;
	
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
	
	// 이메일 중복 체크 & 토큰 생성
	@ResponseBody
	@PostMapping("register/identify/email/check")
	public String identifyEmail(@RequestParam String email) throws MessagingException {
		// 이메일 중복 체크 -> 토큰 생성
		String token = emailService.makeToken(email);
		
		// token이 빈 값이면 -> 이메일이 중복이면 
		if (token.isEmpty())
			return "emaildouble";
		
		// token이 double이면(5분이내로 동일한 이메일에 링크를 보냈으면) -> 
		if (token.equals("double")) {
			return "tokendouble";
		}
		
		// token이 빈값이 아니면 -> 이메일로 링크 전송
		else {
			// 이메일 전송
			emailService.sendMail(email, token);
			return "ok";
			
		}
	}
	
	// 이메일 토큰 확인 페이지
	@GetMapping("register/identify/email/check_token")
	public String checkToken(@RequestParam String token, Model model) {
		System.out.println(token);
		String email = emailService.getEmail(token);
		if (email == null || email.isEmpty()) {
			return "user/tokenExpired";
		}
		
		model.addAttribute("email", email);
		return "user/registerForm";
	}
	// 
	
	// 이메일 중복일때 이동하는 페이지
	@GetMapping("register/identify/email/result")
	public String identifyResult(String email) {
		return "user/identifyResult";
	}
}
