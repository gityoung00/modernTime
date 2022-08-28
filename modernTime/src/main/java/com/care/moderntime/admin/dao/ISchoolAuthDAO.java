package com.care.moderntime.admin.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.admin.dto.SchoolAuthDTO;

@Mapper
public interface ISchoolAuthDAO {
	ArrayList<SchoolAuthDTO> schoolAuth();
	
	SchoolAuthDTO schoolAuthView(String id);

	void schoolAuthCheck(String id);
}
