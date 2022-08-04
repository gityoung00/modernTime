package com.care.moderntime.user.dao;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.user.dto.UserDTO;

@Mapper
public interface UserDAO {
	// 아이디 검색(회원가입, 로그인 사용)
	UserDTO selectId(String id);
	
	// 닉네임 중복 체크(회원가입, 닉네임 업데이트 사용)
	String selectNickname(String nickname);
	
	int register(UserDTO dto);
	
	
}
