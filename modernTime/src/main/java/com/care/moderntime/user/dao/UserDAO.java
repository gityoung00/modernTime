package com.care.moderntime.user.dao;

import java.time.LocalDateTime;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.user.dto.UserDTO;

@Mapper
public interface UserDAO {
	// 아이디 검색(회원가입, 로그인 사용)
	UserDTO selectId(String id);
	
	// 닉네임 중복 체크(회원가입, 닉네임 업데이트 사용)
	String selectNickname(String nickname);
	
	// 이메일 중복체크
	UserDTO selectEmail(String email);
	
	int register(UserDTO dto);
	
	// 닉네임 설정
	int setNickname(@Param("id") String id, @Param("nickname") String nickname, @Param("nickModifyDate") LocalDateTime nickModifyDate);
	
	// 닉네임 설정 시간 가져오기
	LocalDateTime getNickModifyDate(String nickname);
	
	// 비밀번호 얻기
	String getPw(String id);
	
	// 비밀번호 설정
	int setPw(@Param("id") String id, @Param("pw") String pw);
	
	// 이메일 설정
	int setEmail(@Param("id") String id, @Param("email") String email);
	
	//회원탈퇴
	int deleteUser(String id);
	
	
}
