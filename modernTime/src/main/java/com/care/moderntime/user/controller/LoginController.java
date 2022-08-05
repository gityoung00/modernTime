package com.care.moderntime.user.controller;

import java.util.HashMap;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.user.dto.UserDTO;
import com.care.moderntime.user.service.EmailService;
import com.care.moderntime.user.service.LoginService;
import com.care.moderntime.user.service.UserService;

@Controller
public class LoginController {
	@Autowired
	LoginService loginService;
	@Autowired EmailService emailService;
	@Autowired UserService userService;

	@GetMapping("login")
	public String login() {
		return "user/login/login";
	}

	@ResponseBody
	@PostMapping("login")
	public String login(@RequestParam String id, @RequestParam String pw) {
		String result = loginService.login(id, pw);
		return result;
	}

	@GetMapping("logout")
	public String logout() {
		loginService.logout();
		return "redirect:/login";

	}

	@GetMapping("forgot")
	public String forgot() {
		return "user/login/forgot";
	}

	@ResponseBody
	@PostMapping("forgot/id")
	public String forgotId(@RequestParam String email) throws MessagingException {
		
		// 아이디 찾기
		String id = loginService.findUser(email);
		if (id == null) {
			return "해당 이메일로 가입된 아이디가 없습니다.";
		}
		// 이메일 전송
		HashMap<String, Object> variables = new HashMap<String, Object>();
		variables.put("id", id);
		emailService.sendMail("idForgot", email, variables);
		return "success";
	}

	@GetMapping("forgot/password")
	public String forgotPassword() {
		return "user/login/pwforgot";
	}
	
	@ResponseBody
	@PostMapping("forgot/pw/idcheck")
	public String idCheck(@RequestParam String id) {
		UserDTO user = userService.getUserFromId(id);
		if (user == null) {
			return "존재하지 않는 아이디입니다.";
		}
		return "success";
	}
	
	@GetMapping("forgot/password/userid")
	public String sendMail() {
		return "user/login/pwforgot";
	}

}
