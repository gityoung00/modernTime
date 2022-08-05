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
import com.care.moderntime.user.dto.EmailTokenDTO;

@Service
public class EmailService {
	@Autowired EmailDAO emailDao;
	@Autowired JavaMailSender mailSender;
	@Autowired SpringTemplateEngine templateEngine;
	
	private static final long EMAIL_TOKEN_EXPIRATION_VALUE = 30L;
	
	public String makeToken(String email) {
		String token = "";
		
		// 이메일 중복 체크
		int emailDoubleCheck = emailDao.checkEmail(email); 
		System.out.println("email double check: " + emailDoubleCheck);
		// 이메일이 중복이면 빈값 반환
		if (emailDoubleCheck > 0) return token;
		
		// 이미 보낸 토큰이 있다면
		int tokenDoubleCheck = emailDao.getTokenCount(email);
		if (tokenDoubleCheck > 0) {
			return "double";
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
	
	public void sendMail(String pageName, String email, Map<String, Object> variables) throws MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String title = "[모던타임] 이메일 인증 요청";
        //메일 제목 설정
        helper.setSubject(title);

        //수신자 설정
        helper.setTo(email);

        //템플릿에 전달할 데이터 설정
        Context context = new Context();
        context.setVariables(variables);

        //메일 내용 설정 : 템플릿 프로세스
        String html = templateEngine.process(pageName, context);
        helper.setText(html, true);

        //메일 보내기
        mailSender.send(message);
		
	}
	
	public String getEmail(String token) {
		// 이메일 불러오는데 조건: is_expired = 0, expired_date가 현재보다 이후여야함
		EmailTokenDTO dto = emailDao.getEmail(token);
		// 이메일 불러오면 is_expired = 1로 설정
		if (dto == null) return null;
		
//		emailDao.setIsExpired(dto);
		System.out.println("token: " + token + ", email: " + dto.getEmail());
		
		return dto.getEmail();
	}
	
	

}
