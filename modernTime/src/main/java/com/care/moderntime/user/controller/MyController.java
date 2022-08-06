package com.care.moderntime.user.controller;

import java.util.HashMap;

import javax.mail.MessagingException;
import javax.servlet.http.HttpSession;

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

@Controller
public class MyController {
	@Autowired
	MyService myService;
	@Autowired
	EmailService emailService;
	@Autowired
	HttpSession session;

	@GetMapping("my")
	public String myPage(Model model) {
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

	@ResponseBody
	@PostMapping("my/password")
	public String myPassword(@RequestParam String oldPw, @RequestParam String newPw) {
		if (session.getAttribute("id") == null)
			return "redirect:/login";
		return myService.setPassword(oldPw, newPw);

	}

	@GetMapping("my/email")
	public String myEmail() {
		return "user/my/email";
	}

	@ResponseBody
	@PostMapping("my/email")
	public String myEmail(@RequestParam String email, @RequestParam String pw) throws MessagingException {
		String id = (String) session.getAttribute("id");
		String oldEmail = (String) session.getAttribute("email");

		// 비밀번호 체크
		if (!myService.checkPassword(id, pw)) {
			return "계정 비밀번호가 올바르지 않습니다.";
		}
		if (email.equals(oldEmail)) {
			return "다른 이메일을 입력해주세요";
		}

		// 이메일 중복 체크 -> 토큰 생성
		if (emailService.doubleEmailCheck(email)) {
			return "이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.";
		}

		// token이 double이면(5분이내로 동일한 이메일에 링크를 보냈으면) ->
		String token = emailService.makeToken(email);
		if (token == null) {
			return "이미 해당 메일로 인증 링크를 전송하였습니다. 메일함을 확인해주세요.";
		}

		// token이 빈값이 아니면 -> 이메일로 링크 전송
		// 이메일 전송
		HashMap<String, Object> variables = new HashMap<String, Object>();
		variables.put("token", token);
		emailService.sendMail("modifyEmail", email, variables);
		return "새 이메일로 인증 링크를 전송하였습니다. 메일함을 확인해주세요.";
	}

	// 이메일 토큰 확인 페이지
	@GetMapping("my/identify/email/check_token")
	public String checkToken(@RequestParam String token, Model model, RedirectAttributes ra) {
		System.out.println(token);
		String email = emailService.getEmail(token);
		if (email == null || email.isEmpty()) {
			return "user/tokenExpired";
		}
		// 새 이메일 저장
		myService.setEmail(email);
		ra.addFlashAttribute("msg", "이메일 변경이 완료되었습니다.");
		return "redirect:/";
	}

	@GetMapping("my/nickname")
	public String myNickname(Model model) {
		int duration = myService.compareNickSetTime();
		model.addAttribute("duration", duration);
		return "user/my/nickname";
	}

	@ResponseBody
	@PostMapping("my/nickname")
	public String myNickname(@RequestParam String nickname) {
		System.out.println("nickname: " + nickname);
		return myService.setNickname(nickname);
	}

	@GetMapping("my/withdrawal")
	public String myWithdrawal() {
		return "user/my/withdrawal";
	}

	@ResponseBody
	@PostMapping("my/withdrawal")
	public String myWithdrawal(@RequestParam String pw) {
		return myService.withdrawl(pw);
	}
}
