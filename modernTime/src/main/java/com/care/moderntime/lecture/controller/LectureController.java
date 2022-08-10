package com.care.moderntime.lecture.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.lecture.dto.LectureDTO;

@Controller
public class LectureController {		
	
	@RequestMapping("lecture")
	public String lecture() {
		return "lecture";
	}
	@RequestMapping("timetable")
	public String timetable() {
		return "timetable";
	}
	@RequestMapping("point")
	public String point() {
		return "point";
	}

}

