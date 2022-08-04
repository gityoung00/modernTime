package com.care.moderntime.user.service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.care.moderntime.user.dao.UserDAO;
import com.care.moderntime.user.dto.UserDTO;

@Service
public class LoginService {
	@Autowired UserDAO userDao;
	@Autowired HttpSession session;
	
	public String login(String id, String pw) {
		UserDTO dto = userDao.selectId(id);
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if (dto == null || !encoder.matches(pw, dto.getPw())) {
			return "아이디 또는 비밀번호를 입력해주세요";
		}
		
		session.setAttribute("id", dto.getId());
		return "success";
	}
	
	public void logout() {
		session.invalidate();
	}
}
