package com.care.moderntime.calculator.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.calculator.dto.ReportDTO; 
import com.care.moderntime.calculator.dto.SaveReportDTO;
import com.care.moderntime.calculator.dto.SubjectDTO;

@Mapper
public interface CalculatorDAO {

	public ArrayList<ReportDTO> getAllReport(String userId);
	
	public ArrayList<SubjectDTO> getAllSubject(int reportId);
	
	public void insertReport(ReportDTO report);
	
	public void updateReport(SaveReportDTO report);
	
	public void deleteSubject(int reportId);
	
	public void insertSubject(SubjectDTO subject);
}
