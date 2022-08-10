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
import com.care.moderntime.user.service.MyService;
import com.care.moderntime.user.service.UserService;

@Controller
public class ForgotController {
	
	@Autowired
	EmailService emailService;
	@Autowired
	UserService userService;
	@Autowired
	MyService myService;
	
	private SimpleDateFormat format = new SimpleDateFormat("MM월 dd일 HH시 mm분");
	
	@GetMapping("forgot")
	public String forgot() {
		return "user/forgot/forgot";
	}

	@ResponseBody
	@PostMapping("forgot/id")
	public String forgotId(@RequestParam String email) throws MessagingException {

		// 아이디 찾기
		UserDTO user = userService.getUser(email);
		if (user == null) {
			return "해당 이메일로 가입된 아이디가 없습니다.";
		}
		// 이메일 전송
		HashMap<String, Object> variables = new HashMap<String, Object>();
		Date time = new Date();
		String now = format.format(time);

		variables.put("id", user.getId());
		variables.put("now", now);
		emailService.sendMail("idForgot", email, "findId", variables);
		return "success";
	}

	@GetMapping("forgot/password")
	public String forgotPassword() {
		return "user/forgot/pwforgot";
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
	public String findPwEmail(String id, Model model) {
		System.out.println(id);
		model.addAttribute("id", id);
		return "user/forgot/pwEmail";
	}

	@ResponseBody
	@PostMapping("forgot/password/userid")
	public String sendMail(@RequestParam String email, @RequestParam String id) throws MessagingException {
		// 이메일 전송 - 토큰.. 아이디랑 이메일이 일치하는지...
		System.out.println("id: " + id + ", email: " + email);
		UserDTO user = userService.getUserFromId(id);
		if (user == null) {
			return "존재하지 않는 아이디입니다.";
		}
		if (!email.equals(user.getEmail())) {
			return "이메일이 일치하지 않습니다.";
		}
		// 토큰 생성
		String token = emailService.makeToken(email);

		// token이 빈 값이면 -> 이미 보낸 메일이면
		if (token == null)
			return "이미 해당 메일로 인증 링크를 전송하였습니다. 메일함을 확인해주세요.";

		Date time = new Date();
		String now = format.format(time);

		HashMap<String, Object> variables = new HashMap<String, Object>();
		variables.put("id", id);
		variables.put("now", now);
		variables.put("token", token);
		emailService.sendMail("pwForgot", email, "findPw", variables);
		return "success";
	}

	// 이메일 토큰 확인 페이지
	@GetMapping("forgot/password/check_token")
	public String checkToken(@RequestParam String token, RedirectAttributes ra) {
		System.out.println(token);
		String email = emailService.getEmail(token);
		if (email == null || email.isEmpty()) {
			return "redirect:/expired";
		}
		UserDTO user = userService.getUser(email);
		ra.addFlashAttribute("id", user.getId());
		return "redirect:/forgot/password/form";
	}
	//

	// 회원가입 폼 이동
	@GetMapping("forgot/password/form")
	public String passwordForm() {
		return "user/forgot/passwordForm";
	}

	// 회원가입 폼 이동
	@ResponseBody
	@PostMapping("forgot/password/form")
	public String passwordForm(@RequestParam String id, @RequestParam String pw) {
		return myService.setNewPassword(id, pw);
	}
}
