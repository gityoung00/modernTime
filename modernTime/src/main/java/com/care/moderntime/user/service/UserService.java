package com.care.moderntime.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.user.dao.UserDAO;
import com.care.moderntime.user.dto.UserDTO;

@Service
public class UserService {

	@Autowired
	UserDAO userDao;

	// 유저 정보 얻기
	public UserDTO getUser(String email) {
		UserDTO user = userDao.selectEmail(email);
		return user;
	}

	// 유저 정보 얻기 - 비밀번호찾기
	public UserDTO getUserFromId(String id) {
		UserDTO user = userDao.selectId(id);
		return user;
	}
}
