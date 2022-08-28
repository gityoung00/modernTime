package com.care.moderntime.calculator.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.care.moderntime.calculator.dao.CalculatorDAO;
import com.care.moderntime.calculator.dto.ReportDTO;
import com.care.moderntime.calculator.dto.SaveReportDTO;
import com.care.moderntime.calculator.dto.SubjectDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CalculatorService {
	
	private final CalculatorDAO calDao;
	private final HttpSession session;
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private final String[] semesters = {
			"1학년 1학기",
			"1학년 2학기",
			"2학년 1학기",
			"2학년 2학기",
			"3학년 1학기",
			"3학년 2학기",
			"4학년 1학기",
			"4학년 2학기",
			"5학년 1학기",
			"5학년 2학기",
			"6학년 1학기",
			"6학년 2학기",
			"기타학기"
	};
			

	public Map<String, Object> findReportList() {
		Map<String, Object> res = new HashMap<String, Object>();
		String userId = (String) session.getAttribute("id");
		
		ArrayList<ReportDTO> reports = calDao.getAllReport(userId);
		
		// 레포트가 없으면 학기별로 생성
		if (reports == null || reports.size() == 0) {
			String today = sdf.format(new Date());
			
			ReportDTO dto;
			for (String semester: semesters) {
				dto = new ReportDTO(semester, userId);
				calDao.insertReport(dto);
				dto.setCreated_at(today);
				dto.setUpdated_at(today);
				
				System.out.println("insert id: " + dto.getId());
				reports.add(dto);
			}
		}
		
		// 과목들 넣기
		SubjectDTO subject;
		ArrayList<SubjectDTO> subjects;
		for(ReportDTO report: reports) {
			subjects = calDao.getAllSubject(report.getId());
//			System.out.println("subjects: " + subjects + ", size: " + subjects.size());
			// 만약 과목 길이가 10보다 작으면 나머지는 빈 dto로 밀어넣기
			if (subjects.size() < 10) {
				int count = 10 - subjects.size();
				for (int i=0; i<count; i++) {
					subject = new SubjectDTO("", "A+", 0, 0);
					subjects.add(subject);
				}
			}
			report.setSubjects(subjects);
		}
		
		res.put("data", reports);
		
		
		
		return res;
	}


	public String saveReportList(SaveReportDTO report) {
		System.out.println(report.getId());
		System.out.println(report.getNames());
		System.out.println(report.getCredits());
		System.out.println(report.getGrades());
		System.out.println(report.getIs_majors());
		
		// report 업데이트
		report.setUpdated_at(sdf.format(new Date()));
		
		calDao.updateReport(report);
		
		// subject별 업데이트
		// 먼저 싹다 지우고
		calDao.deleteSubject(report.getId());
		
		
		// 받아온 subject를 차례대로 삽입
		int maxNum = report.getCredits().size();
		for (int i=0; i<maxNum; i++) {
			String name = report.getNames().get(i);
			String grade = report.getGrades().get(i);
			int credit = report.getCredits().get(i);
			int isMajor = report.getIs_majors().get(i) == true ? 1 : 0;
//			System.out.println(i + ". name: " + name + ", grade: "+ grade + ", credit: " + credit + ", isMajor: " + isMajor);
			
			if (name.isEmpty() && grade.equals("A+") && (credit == 0) && (isMajor == 0)) {
				continue;
			}
			calDao.insertSubject(new SubjectDTO(name, grade, credit, isMajor, report.getId()));
//			System.out.println("insert complete");
		}
		
		
		return null;
	}

}
