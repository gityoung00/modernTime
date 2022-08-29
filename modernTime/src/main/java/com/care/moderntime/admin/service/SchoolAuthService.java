package com.care.moderntime.admin.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dao.ISchoolAuthDAO;
import com.care.moderntime.admin.dto.SchoolAuthDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SchoolAuthService {
	
	private final ISchoolAuthDAO authDao;
	
	public Map<String, Object> schoolAuth() {
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<SchoolAuthDTO> list = authDao.schoolAuth();
		res.put("data", list);
		return res;
	}
	public SchoolAuthDTO schoolAuthView(String id) {
		SchoolAuthDTO view = authDao.schoolAuthView(id);
		return view;
	}
	public String schoolAuthCheck(String id) {
		System.out.println("schoolAuthCheck id: " + id);
		authDao.schoolAuthCheck(id);
		return "인증 완료";
	}
}
