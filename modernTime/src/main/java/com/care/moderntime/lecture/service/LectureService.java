package com.care.moderntime.lecture.service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.care.moderntime.lecturerepositry.ILectureDAO;

public class LectureService {
	@Autowired private ILectureDAO dao;
	@Autowired private HttpSession session;
	

}
