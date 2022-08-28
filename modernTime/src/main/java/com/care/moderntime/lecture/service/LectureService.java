package com.care.moderntime.lecture.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.lecture.dto.EvalViewDTO;
import com.care.moderntime.lecture.dto.EvaluationDTO;
import com.care.moderntime.lecture.dto.LectureDTO;
import com.care.moderntime.lecture.dto.ShowcommentDTO;
import com.care.moderntime.lecture.dto.TimetableDTO;
import com.care.moderntime.lecture.repository.ILectureDAO;

@Service
public class LectureService {
	@Autowired
	ILectureDAO lectureDao;
	@Autowired
	HttpSession session;

//	public Stridng insert(EvaluationDTO dto) {
//		if(dto.getComment())==null || dto.getComment().isEmpty(){
//			return "내용은 필수요소입니다.";
//		}
//	}

	// AJAX에 쓸수 있도록 String 값의 데이터로 변환 lecture
//	public String lectureListString(ArrayList<LectureDTO> list) {
//		String data = "{\"cd\" : [";
//		for (LectureDTO tmp : list) {
//			data += "{ \"lectureId\" : \"" + tmp.getLecture_id() + "\",";
//			data += " \"type\" : \"" + tmp.getType() + "\",";
//			data += " \"name\" : \"" + tmp.getName() + "\",";
//			data += " \"teacher\" : \"" + tmp.getTeacher() + "\",";
//			data += " \"time1\" : \"" + tmp.getTime1() + "\",";
//			data += " \"time2\" : \"" + tmp.getTime2() + "\",";
//			data += " \"place\" : \"" + tmp.getPlace() + "\",";
//			data += " \"credit\" : \"" + tmp.getCredit() + "\",";
//			data += " \"lectureTime\" : \"" + tmp.getLecture_time() + "\",";
//			data += " \"maxStudent\" : \"" + tmp.getMax_student() + "\",";
//			data += " \"listenStudent\" : \"" + tmp.getListen_student() + "\",";
//			data += " \"score\" : \"" + tmp.getScore() + "\",";
//			data += " \"is_written\" : \"" + tmp.getIs_written() + "\" },";
//
//		}
//
//		data = data.substring(0, data.length() - 1);
//		data += "]}";
//		return data;
//	}

//	Evaluation
	public String EvaluationListString(ArrayList<EvaluationDTO> list) {
		int count = 0;
		String data2 = "{\"cd\" : [";
		for (EvaluationDTO tmp : list) {
			data2 += "{ \"id\" : \"" + tmp.getId() + "\",";
			data2 += " \"practice\" : \"" + tmp.getPractice() + "\",";
			data2 += " \"project\" : \"" + tmp.getProject() + "\",";
			data2 += " \"grade\" : \"" + tmp.getGrade() + "\",";
			data2 += " \"attend\" : \"" + tmp.getAttend() + "\",";
			data2 += " \"exam\" : \"" + tmp.getExam() + "\",";
			data2 += " \"score\" : \"" + tmp.getScore() + "\",";
			data2 += " \"comment\" : \"" + tmp.getComment() + "\",";
			data2 += " \"lecture_lecture_id\" : \"" + tmp.getLecture_lecture_id() + "\",";
			data2 += " \"user_id\" : \"" + tmp.getUser_id() + "\"},";
			count++;
		}
		data2 = data2.substring(0, data2.length() - 1);
		data2 += "]}";
		return data2;
	}
	
	public String evaluationList() {
		ArrayList<EvaluationDTO> evaluationList = lectureDao.evaluationlist();
		String data2 = EvaluationListString(evaluationList);
		return data2;
	}

	public String evaluationRegist(EvaluationDTO dto) {
//		System.out.println("list:cont = " + dto.getProject());
//		System.out.println("list:cont = " + dto.getComment());

		if (dto.getComment() == null || dto.getComment().isEmpty()) {
			return "내용을 입력하세요.";
		}
		EvaluationDTO tmp = lectureDao.evalSel(dto.getLecture_lecture_id(),dto.getUser_id());
		if(tmp == null) {
			lectureDao.evaluationRegist(dto);
			double score = lectureDao.scoreavg(dto.getLecture_lecture_id());
			lectureDao.scoreup(score);
			
			
			return "등록완료";			
		}else {			
			return "강의평은 중복해서 등록할 수 없습니다.";
		}

	}

//	public String timetable(int a) {
//		ArrayList<String> list = lectureDao.lecturetime(a);
//		ArrayList<LectureDTO> tmp = new ArrayList<>();
//		for (int i = 0; i < list.size(); i++) {
//			LectureDTO dto = lectureDao.lectureSel(list.get(i));
//			tmp.add(dto);
//		}
////		String data = lectureListString(tmp);
////		System.out.println(data);
//		return data;
//	}
	
	// 내 강의평 들고오기
	public Map<String, Object> idjoin(String user_id) {
		
		// tmp: user_id, timetable_id, lecture_id 전부 들고오기
		ArrayList<TimetableDTO> tmp = lectureDao.idjoin();
		
		
//		tmp2 = 유저가 가장 최근에 수강한 시간표
		ArrayList<TimetableDTO> tmp2 = new ArrayList<>();
		
		// tid: timetable_id, max 비교할때 쓰는거
		ArrayList<Integer> tid = new ArrayList<>();
		int max = 0;
		for (TimetableDTO t : tmp) {
			for (int i = 0; i < tmp.size(); i++) {
				tid.add(t.getTimetable_id());
			}
			for (int i = 1; i < tid.size(); i++) {
				if (tid.get(i) > max) {
					max = tid.get(i);
				}
			}
			if (t.getUser_id().equals(user_id) && t.getTimetable_id() == max) {
				tmp2.add(t);
			}
		}

		// myEvals : 내 강의평
		ArrayList<LectureDTO> myEvals = new ArrayList<>();
		for (TimetableDTO timeTable: tmp2) {
			LectureDTO lectureInfo = lectureDao.lectureSel(timeTable.getLecture_id());
			if (lectureDao.evaluationCount(user_id, timeTable.getLecture_id()) == 0) {
				lectureInfo.setUserEval(0);
			} else {
				lectureInfo.setUserEval(1);
			}
			myEvals.add(lectureInfo);
		}
		
		int count = 0;
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("data", myEvals);
		return res;
	}

	public Map<String, Object> Showcomment() {
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<ShowcommentDTO> tmp = lectureDao.showcomment();
		res.put("data", tmp);
		return res;
	}

	public String search(String keyword) {
		// TODO Auto-generated method stub
		lectureDao.search(keyword);
		ArrayList<ShowcommentDTO> tmp = lectureDao.search(keyword);
		String data2 = "{\"cd\" : [";
		for (ShowcommentDTO tt : tmp) { // comment 작성여부
			if (tt.getComment() != null && tt.getLecture_lecture_id() != null) {
				int count = 0;
					data2 += "{ \"user_id\" : \"" + tt.getUser_id() + "\",";
					data2 += " \"comment\" : \"" + tt.getComment() + "\",";
					data2 += " \"score\" : \"" + tt.getScore() + "\",";
					data2 += " \"teacher\" : \"" + tt.getTeacher() + "\",";
					data2 += " \"name\" : \"" + tt.getName() + "\",";
					data2 += " \"lecture_id\" : \"" + tt.getLecture_id() + "\",";
					data2 += " \"lecture_lecture_id\" : \"" + tt.getLecture_lecture_id() + "\"},";
					count++;
			}
			
		}
		data2 = data2.substring(0, data2.length() - 1);
		data2 += "]}";
//		System.out.println(data2);
		return data2;
//		String data3 = lectureListString(search);
//		System.out.println(data3);	
//		return data3 ;
	}

	
	//강의평보기
	public Map<String, Object> view(String lecture_id) {
		Map<String, Object> res = new HashMap<String, Object>();
		
		EvalViewDTO dto = lectureDao.getLectureInfo(lecture_id);
		dto.setPractice(lectureDao.maxPrac(lecture_id));
		dto.setProject(lectureDao.maxPro(lecture_id));
		dto.setGrade(lectureDao.maxGra(lecture_id));
		dto.setAttend(lectureDao.maxAttend(lecture_id));
		dto.setExam(lectureDao.maxEx(lecture_id));
		dto.setEvals(lectureDao.getAllEval(lecture_id));
			
		res.put("data", dto);	
		return res;
	}	
}
