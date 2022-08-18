package com.care.moderntime.lecture.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.lecture.repository.ILectureDAO;


@Service
public class LectureService {
	@Autowired ILectureDAO lectureDao;
	@Autowired HttpSession session; 

}
