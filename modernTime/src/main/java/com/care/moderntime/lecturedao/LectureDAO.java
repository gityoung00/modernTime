package com.care.moderntime.lecturedao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.lecturedto.LectureDTO;


@Mapper
public interface LectureDAO {

	ArrayList<LectureDTO> search(String keyword);
	
}
