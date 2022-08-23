package com.care.moderntime.timetable.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.care.moderntime.timetable.dto.LectureDTO;
import com.care.moderntime.timetable.dto.SemesterDTO;
import com.care.moderntime.timetable.dto.TimeTableDTO;
import com.care.moderntime.timetable.dao.TimeTableDAO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TimeTableService {

	private final TimeTableDAO ttDao;
	private final HttpSession session;
	
	public Map<String, Object> lectureList() {
		Map<String, Object> res = new HashMap<String, Object>();
		
		ArrayList<LectureDTO> lecturelist = ttDao.getAllLectures();
		
		res.put("data", lecturelist);
		return res;
		
	}

	public Map<String, Object> semesterList() {
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<SemesterDTO> semesterList = ttDao.getSemesterList();
		res.put("data", semesterList);
		return res;
	}
	
	public int saveTable(String data) {
		// data : 테이블명/year/semester/tableId => 테이블에 저장된 수업이 없을때
		// data : 테이블명/year/semester/lecture1/lecture2/.../tableId => 테이블에 저장된 수업이 있을때
		// 해당 학기에 테이블이 없으면 tableId=0
		String[] tmp = data.split("/");
		String tableName = tmp[0];
		int year = Integer.parseInt(tmp[1]);
		int semester = Integer.parseInt(tmp[2]);
		int tableId = Integer.parseInt(tmp[3]);
		String userId = (String) session.getAttribute("id");
		System.out.println("tableId1: " + tableId);
		
		String[] lectures = null;
		if (tmp.length > 4) {
			lectures = Arrays.copyOfRange(tmp, 4, tmp.length);
		}
		System.out.println("lectures : " + lectures);
		
		// 테이블이 없다면, 즉 tableId = 0이라면 => 테이블 생성
		if (tableId == 0) {
			// 새로운 테이블 번호 = 테이블 마지막 번호 + 1 
			String tableLastId = ttDao.getTableLastId();
			
			if (tableLastId != null && !tableLastId.isEmpty()) {
				tableId = Integer.parseInt(tableLastId) + 1;
			} else {
				tableId = 1;
			}
			
			TimeTableDTO dto = new TimeTableDTO(tableId, year, semester, tableName, userId);
			ttDao.makeTimeTable(dto);
			
		// tableId가 있다면 => 과목 추가, 과목 삭제 상태를 저장
		} else {
			// 전체 과목 삭제
			ttDao.deleteLecture(tableId);
			
			// list에 있는 과목들 다 추가
			if (lectures != null && lectures.length > 0) {
				for (String lectureId : lectures) {
					ttDao.insertLecture(tableId, lectureId);
				}
			}
		}
		System.out.println("tableId2: " + tableId);
		return tableId;
		
	}
	

	public Map<String, Object> findTable(int year, int semester) {
		Map<String, Object> res = new HashMap<String, Object>();
		String userId = (String) session.getAttribute("id");
		// timetable 불러오고
		ArrayList<TimeTableDTO> tables = ttDao.findTable(userId, year, semester);
		// timebable에 해당하는 lecture 불러오고
		
		res.put("responseCode", 1);
		res.put("data", tables);
		return res;
	}

	
	public Map<String, Object> findTableLecture(int id) {
		Map<String, Object> res = new HashMap<String, Object>();
		System.out.println("tableId lecture: " + id);
		// timebable에 해당하는 lecture 불러오고
		ArrayList<LectureDTO> lectures = ttDao.findLectureInTable(id);
		
		res.put("responseCode", 1);
		res.put("data", lectures);
		return res;
	}

	public Map<String, Object> updateTableName(String data) {
		Map<String, Object> res = new HashMap<String, Object>();
		
		String[] tmp = data.split("/");
		int tableId = Integer.parseInt(tmp[0]);
		String newName = tmp[1];
		
		ttDao.updateTableName(tableId, newName);
		res.put("responseCode", 1);
		return res;
		
	}

}
