package com.care.moderntime.lecture.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.lecture.service.LectureService;

@Controller
public class LectureController {
	@Autowired LectureService service;

	@GetMapping("lecture")
	public String lecture() {
		return "lecture/lecture";
	}
	@GetMapping("evaluation")
	public String evaluation() {
		return"lecture/evaluation";
	}
	
	@RequestMapping("timetable")
	public String timetable() {
		return "timetable";
	}

	@RequestMapping("/lecture/point")
	public String point() {
		return "point";
	}
	@ResponseBody
	@PostMapping(value ="list", produces = "application/json; charset=UTF-8")
	public String lectureList() {
		String data = service.lectureList();
		return data;
	}


}
