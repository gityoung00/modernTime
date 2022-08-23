package com.care.moderntime.calculator.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.calculator.dto.ReportDTO;
import com.care.moderntime.calculator.dto.SaveReportDTO;
import com.care.moderntime.calculator.service.CalculatorService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CalculatorController {
	
	private final CalculatorService calService;
	
	@GetMapping("calculator")
	public String calculator() {
		System.out.println("calculator");
		return "calculation/calculator";
	}
	
	@ResponseBody
	@GetMapping("calculator/find/report/list")
	public Map<String, Object> findReportList(){
		return calService.findReportList();
	}
	
	@ResponseBody
	@PostMapping("calculator/save/report/list")
	public String saveReportList(@RequestBody SaveReportDTO report) {
		return calService.saveReportList(report);
		
	}
	
	

}
