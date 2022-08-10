package com.care.moderntime.user.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.user.dto.UserDTO;
import com.care.moderntime.user.service.EmailService;
import com.care.moderntime.user.service.LoginService;
import com.care.moderntime.user.service.UserService;

@Controller
public class LoginController {
	@Autowired
	LoginService loginService;
	
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

	

}
