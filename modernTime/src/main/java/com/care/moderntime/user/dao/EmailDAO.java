package com.care.moderntime.user.dao;


import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.user.dto.EmailTokenDTO;

@Mapper
public interface EmailDAO {
	// 이메일 체크
	int checkEmail(String email);
	
	// 이메일과 매칭되는 토큰 찾기 - 중복 토큰 방지
	int getTokenCount(String email);

	// 토큰과 매칭되는 이메일 찾기
	EmailTokenDTO getEmail(String token);
	
	void setIsExpired(EmailTokenDTO dto);
	
	// 이메일 토큰 설정
	void setToken(EmailTokenDTO dto);
}
