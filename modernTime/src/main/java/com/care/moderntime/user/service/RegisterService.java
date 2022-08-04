package com.care.moderntime.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.care.moderntime.user.dao.UserDAO;
import com.care.moderntime.user.dto.UserDTO;

@Service
public class RegisterService {
	
	@Autowired UserDAO userDao;
	
	// 아이디, 닉네임 중복체크
	public String doubleCheck(String id, String nickname) {
		UserDTO dto = userDao.selectId(id);
		String doubleNickname =userDao.selectNickname(nickname);
		
		if (dto != null) {
			return "id"; 
		}
		if (doubleNickname != null && !doubleNickname.isEmpty()) {
			return "nickname";
		}
		return "ok";
	}
	
	public String register(UserDTO dto) {
		// 비밀번호 암호화
		dto.setPw(encryptPassword(dto.getPw()));
		
		int result = userDao.register(dto);
		if (result == 0) {
			return "회원가입 중에 문제가 발생하였습니다. 다시 시도해주세요.";
		}
		
		return "회원가입을 축하드립니다.";
	}
	
	public String encryptPassword(String pw) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.encode(pw);
		
	}
	
}
