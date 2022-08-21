package com.care.moderntime.timetable.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.timetable.service.TimeTableService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TimeTableController {
	
	private final TimeTableService ttService;
	
	@GetMapping("timetable")
	public String index() {
		return "timetable/timetable";
	}
	
	@GetMapping("timetable/{year}/{semester}/{id}")
	public String index(@PathVariable("year") int year, @PathVariable("semester") String semester, @PathVariable("id") String id) {
		return "timetable/timetable";
	}
	
	@GetMapping("timetable/{year}/{semester}")
	public String index(@PathVariable("year") int year, @PathVariable("semester") String semester) {
		return "timetable/timetable";
	}
	
	@ResponseBody
	@PostMapping("timetable/find/table/list")
	public Map<String, Object> findTable(@RequestParam int year, @RequestParam int semester){
		return ttService.findTable(year, semester);
	}
	
	@ResponseBody
	@PostMapping("timetable/update/table/name")
	public Map<String, Object> updateTableName(@RequestParam String data){
		return ttService.updateTableName(data);
	}
	
	@ResponseBody
	@PostMapping("timetable/find/table")
	public Map<String, Object> findLectureInTable(@RequestParam int id){
		return ttService.findTableLecture(id);
	}
	
	@ResponseBody
	@GetMapping("timetable/lecture/list")
	public Map<String, Object> lectureList() {
		System.out.println("test");
		return ttService.lectureList();
	}
	
	
	// 테이블 생성, 유저 연결, 테이블id retrun 
	@ResponseBody
	@PostMapping("timetable/lecture/add")
	public int saveTable(@RequestParam String data) {
		// data : 테이블명/year/semester/tableId
		// 해당 학기에 테이블이 없으면 tableId=0
		
		return ttService.saveTable(data);
		
	}
	
	@ResponseBody
	@GetMapping("timetable/semester/list")
	public Map<String, Object> semesterList(){
		return ttService.semesterList();
	}
}
