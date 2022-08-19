package com.care.moderntime.timetable.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TimeTableController {
	
	@GetMapping("timetable")
	public String index() {
		return "timetable/timetable";
	}
}
