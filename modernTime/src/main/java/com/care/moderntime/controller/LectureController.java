package com.care.moderntime.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LectureController {
	@RequestMapping("lecture")
	public String lecture() {
		return "lecture";
	}
}
