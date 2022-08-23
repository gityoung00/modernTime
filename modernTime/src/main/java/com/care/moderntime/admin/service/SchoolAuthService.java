package com.care.moderntime.admin.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dao.ISchoolAuthDAO;
import com.care.moderntime.admin.dto.SchoolAuthDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SchoolAuthService {
	
	private final ISchoolAuthDAO authDao;
	
	public String schoolAuth() {
		ArrayList<SchoolAuthDTO> list = authDao.schoolAuth();
		String data = "{\"cd\" : [";
		for (SchoolAuthDTO tmp : list) {
			data += "{ \"id\" : \"" + tmp.getId() + "\",";
			data += " \"type\" : \"" + tmp.getType() + "\",";
			data += " \"picture\" : \"" + tmp.getPicture() + "\",";
			data += " \"userId\" : \"" + tmp.getUser_id() + "\" },";
		}
		data = data.substring(0, data.length() - 1);
		data += "]}";
		return data;
	}
	public SchoolAuthDTO schoolAuthView(String id) {
		SchoolAuthDTO view = authDao.schoolAuthView(id);
		return view;
	}
	public String schoolAuthCheck(String id) {
		authDao.schoolAuthCheck(id);
		return "인증 완료";
	}
}
