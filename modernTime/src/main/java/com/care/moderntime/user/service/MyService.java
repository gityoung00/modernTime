package com.care.moderntime.user.service;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.care.moderntime.S3.S3Upload;
import com.care.moderntime.user.dao.CertificationDAO;
import com.care.moderntime.user.dao.UserDAO;
import com.care.moderntime.user.dto.CertificationDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyService {
	
	private final S3Upload s3Upload;
	private final CertificationDAO certDao;
	
	@Autowired UserDAO userDao;
	@Autowired HttpSession session;
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	
	public String sendCertification(MultipartFile picture, String type) throws IOException {
		String id = (String) session.getAttribute("id");
		// s3에 이미지 업로드
		String url = s3Upload.uploadFiles(picture, "static");
		
		CertificationDTO certification = new CertificationDTO(type, id, url);
		int result = certDao.saveCertification(certification);
		if (result == 0) {
			return "인증 파일 전송 중에 문제가 발생하였습니다. 다시 시도해주세요.";
		}
		return "success";
	}
	
	
	// 닉네임 설정 기간 비교
	public int compareNickSetTime() {
		String nickname = (String) session.getAttribute("nickname");
		LocalDateTime nickModifyDate = userDao.getNickModifyDate(nickname);
		Duration duration = Duration.between(nickModifyDate, LocalDateTime.now());
		int durationDay = (int) duration.getSeconds()/60/60/24;
		return durationDay;
	}
	
	// 닉네임 설정
	public String setNickname(String nickname) {
		String doubleNickname = userDao.selectNickname(nickname);
		if (doubleNickname == null || doubleNickname.isEmpty()) {
			int result = userDao.setNickname((String) session.getAttribute("id"), nickname, LocalDateTime.now());
			if (result == 0) {
				return "닉네임 설정 중에 문제가 발생하였습니다. 다시 시도해주세요.";
			}
			session.setAttribute("nickname", nickname);
			return "success";
		}
		return "이미 등록된 닉네임입니다.";
	}
	
	// 비밀번호 체크
	public boolean checkPassword(String id, String pw) {
		// 기존 비밀번호
		String checkPw = userDao.getPw(id);
		return encoder.matches(pw,  checkPw);
	}
	
	public String setPassword(String oldPw, String newPw) {
		String id = (String) session.getAttribute("id"); 
		// 기존 비밀번호와 일치하는지 확인
		if (checkPassword(id, oldPw)) {
			return setNewPassword(id, newPw);
			
		} else {
			return "비밀번호를 확인해주세요.";
		}
	}
	
	public String setNewPassword(String id, String newPw) {
		// 기존 비밀번호와 일치하는지 확인
		newPw = encoder.encode(newPw);
		int result = userDao.setPw(id, newPw);
		if (result == 0) {
			return "비밀번호 변경 중 오류가 발생하였습니다. 다시 시도해주세요";
		}
		return "success";
			
	}
	
	public String setEmail(String email) {
		int result = userDao.setEmail((String) session.getAttribute("id") , email);
		if (result == 0) {
			return "이메일 변경 과정에서 오류가 발생했습니다. 다시 시도해주세요.";
		}
		session.setAttribute("email", email);
		return "success";
	}
	
	// 회원탈퇴
	public String withdrawl(String pw) {
		// 비밀번호 일치여부
		String id = (String) session.getAttribute("id");
		// 기존 비밀번호와 일치하는지 확인
		if (checkPassword(id, pw)) {
			int result = userDao.deleteUser(id);
			if (result == 0) {
				return "회원탈퇴 중 문제가 발생하였습니다. 다시 시도해주세요";
			}
			return "success";
			
		}
		
		
		return "비밀번호가 일치하지 않습니다.";
	}
}
