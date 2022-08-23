package com.care.moderntime.user.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.care.moderntime.user.dao.EmailDAO;
import com.care.moderntime.user.dao.UserDAO;
import com.care.moderntime.user.dto.EmailTokenDTO;
import com.care.moderntime.user.dto.UserDTO;

@Service
public class EmailService {
	@Autowired
	EmailDAO emailDao;
	@Autowired
	JavaMailSender mailSender;
	@Autowired
	UserDAO userDao;
	@Autowired
	SpringTemplateEngine templateEngine;

	private static final long EMAIL_TOKEN_EXPIRATION_VALUE = 30L;

	public boolean doubleEmailCheck(String email) {
		// 이메일 중복 체크
		UserDTO user = userDao.selectEmail(email);
		if (user == null) {
			return false;
		}
		return true;
	}

	public String makeToken(String email) {
		String token = null;

		// 이미 보낸 토큰이 있다면
		int tokenDoubleCheck = emailDao.getTokenCount(email);
		if (tokenDoubleCheck > 0) {
			return null;
		}

		// 이메일 토큰 객체 생성
		EmailTokenDTO dto = new EmailTokenDTO();
		dto.setEmail(email);

		// 토큰 생성
		token = UUID.randomUUID().toString();
		System.out.println("token: " + token);
		dto.setToken(token);

		// 토큰 만료 날짜
		LocalDateTime expiredDate = LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRATION_VALUE);
		dto.setExpiredDate(expiredDate);

		// 토큰 만료 여부
		dto.setIsExpired(0);

		// 이메일 토큰 객체 저장
		emailDao.setToken(dto);
		System.out.println("토큰 저장 완료");

		return token;
	}

	public void sendMail(String pageName, String email, String titleName, Map<String, Object> variables) throws MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		
		Map<String, String> titles= new HashMap<String, String>();
		// 제목: 이메일 인증, 이메일 변경, 아이디찾기, 비밀번호 찾기
		titles.put("authEmail", "[모던타임] 이메일 인증 요청");
		titles.put("modifyEmail", "[모던타임] 이메일 변경 안내");
		titles.put("findId", "[모던타임] 아이디 찾기 안내");
		titles.put("findPw", "[모던타임] 비밀번호 찾기 안내");
		
		String title = titles.get(titleName);
		// 메일 제목 설정
		helper.setSubject(title);

		// 수신자 설정
		helper.setTo(email);

		// 템플릿에 전달할 데이터 설정
		Context context = new Context();
		context.setVariables(variables);

		// 메일 내용 설정 : 템플릿 프로세스
		String html = templateEngine.process(pageName, context);
		helper.setText(html, true);

		// 메일 보내기
		mailSender.send(message);

	}

	public String getEmail(String token) {
		// 이메일 불러오는데 조건: is_expired = 0, expired_date가 현재보다 이후여야함
		EmailTokenDTO dto = emailDao.getEmail(token);
		// 이메일 불러오면 is_expired = 1로 설정
		if (dto == null)
			return null;

//		emailDao.setIsExpired(dto);
		System.out.println("token: " + token + ", email: " + dto.getEmail());

		return dto.getEmail();
	}

}
