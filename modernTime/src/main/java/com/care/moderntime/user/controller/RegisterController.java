package com.care.moderntime.user.controller;

import java.util.HashMap;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.user.dto.UserDTO;
import com.care.moderntime.user.service.EmailService;
import com.care.moderntime.user.service.RegisterService;
import com.care.moderntime.user.service.UserService;

@Controller
public class RegisterController {
	@Autowired
	EmailService emailService;
	@Autowired
	RegisterService registerService;
	@Autowired
	UserService userService;

	@GetMapping("register/agreement")
	public String agreement() {
		return "user/register/agreement";
	}

	@GetMapping("register/identify/email")
	public String identifyEmail() {
		return "user/register/email";
	}

	// 이메일 중복 체크 & 토큰 생성
	@ResponseBody
	@PostMapping("register/identify/email/check")
	public String identifyEmail(@RequestParam String email) throws MessagingException {
		// 이메일 중복 체크 -> 토큰 생성
		String token = null;
		if (emailService.doubleEmailCheck(email)) {
			return "emaildouble";
		}

		// token이 double이면(5분이내로 동일한 이메일에 링크를 보냈으면) ->
		token = emailService.makeToken(email);
		if (token == null) {
			return "tokendouble";
		}

		// token이 빈값이 아니면 -> 이메일로 링크 전송
		// 이메일 전송
		HashMap<String, Object> variables = new HashMap<String, Object>();
		variables.put("token", token);
		emailService.sendMail("registerMail", email, variables);
		return "ok";

	}

	// 이메일 토큰 확인 페이지
	@GetMapping("register/identify/email/check_token")
	public String checkToken(@RequestParam String token, Model model, RedirectAttributes ra) {
		System.out.println(token);
		String email = emailService.getEmail(token);
		if (email == null || email.isEmpty()) {
			return "user/tokenExpired";
		}

		model.addAttribute("email", email);
		ra.addFlashAttribute("email", email);
		return "redirect:/register/form";
	}
	//

	// 이메일 중복일때 이동하는 페이지
	@GetMapping("register/identify/email/result")
	public String identifyResult(String email, Model model) {
		System.out.println("email: " + email);
		UserDTO user = userService.getUser(email);
		model.addAttribute("name", user.getName());
		model.addAttribute("id", user.getId());
		return "user/register/identifyResult";
	}

	// 회원가입 폼 이동
	@GetMapping("register/form")
	public String registerForm() {
		return "user/register/registerForm";
	}

	// 회원가입 폼 작성
	@ResponseBody
	@PostMapping("register/form")
	public String registerForm(@RequestBody UserDTO dto, RedirectAttributes ra) {
		
		System.out.println("email: " + dto.getEmail());
		System.out.println("id: " + dto.getId());
		System.out.println("pw: " + dto.getPw());
		System.out.println("name: " + dto.getName());
		System.out.println("nickname: " + dto.getNickname());
		ra.addFlashAttribute("id", dto.getId());
		
		return registerService.register(dto);
	}
	
	// 아이디 & 닉네임 중복 체크
	@ResponseBody
	@GetMapping("register/form/doublecheck")
	public String doubleCheck(@RequestParam String id, @RequestParam String nickname) {
		System.out.println("id: " + id + ", nickname: " + nickname);
		return registerService.doubleCheck(id, nickname);
	}
}
