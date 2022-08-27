package com.care.moderntime.lecture.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.lecture.dto.EvaluationDTO;
import com.care.moderntime.lecture.dto.LectureDTO;
import com.care.moderntime.lecture.dto.ShowcommentDTO;
import com.care.moderntime.lecture.dto.TimetableDTO;
import com.care.moderntime.lecture.dto.ViewDTO;
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
	public String lectureListString(ArrayList<LectureDTO> list) {
		String data = "{\"cd\" : [";
		for (LectureDTO tmp : list) {
			data += "{ \"lectureId\" : \"" + tmp.getLecture_id() + "\",";
			data += " \"type\" : \"" + tmp.getType() + "\",";
			data += " \"name\" : \"" + tmp.getName() + "\",";
			data += " \"teacher\" : \"" + tmp.getTeacher() + "\",";
			data += " \"time1\" : \"" + tmp.getTime1() + "\",";
			data += " \"time2\" : \"" + tmp.getTime2() + "\",";
			data += " \"place\" : \"" + tmp.getPlace() + "\",";
			data += " \"credit\" : \"" + tmp.getCredit() + "\",";
			data += " \"lectureTime\" : \"" + tmp.getLecture_time() + "\",";
			data += " \"maxStudent\" : \"" + tmp.getMax_student() + "\",";
			data += " \"listenStudent\" : \"" + tmp.getListen_student() + "\",";
			data += " \"score\" : \"" + tmp.getScore() + "\",";
			data += " \"is_written\" : \"" + tmp.getIs_written() + "\" },";

		}

		data = data.substring(0, data.length() - 1);
		data += "]}";
		return data;
	}

	public String lectureList() {
		ArrayList<LectureDTO> lectureList = lectureDao.lecturelist();
		String data = lectureListString(lectureList);
//		System.out.println(data);
		return data;
	}

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

	public String timetable(int a) {
		ArrayList<String> list = lectureDao.lecturetime(a);
		ArrayList<LectureDTO> tmp = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			LectureDTO dto = lectureDao.lectureSel(list.get(i));
			tmp.add(dto);
		}
		String data = lectureListString(tmp);
//		System.out.println(data);
		return data;
	}

	public String idjoin(String user_id) {
		ArrayList<TimetableDTO> tmp = lectureDao.idjoin();
		ArrayList<TimetableDTO> tmp2 = new ArrayList<>();
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
//		System.out.println(max);

//	tmp2 = 유저가 가장 최근에 수강한 시간표
		ArrayList<Integer> a = new ArrayList<>();
		for (TimetableDTO tt : tmp) { // 강의평 작성여부
			if (lectureDao.evaluationCount(tt.getUser_id(), tt.getLecture_id()) == null) {
				a.add(0);
			} else {
				a.add(1);
			}
		}
//		System.out.println(a.get(0) + " " + a.get(1) + " " + a.get(2));
		ArrayList<LectureDTO> list = new ArrayList<>();
		for (int i = 0; i < tmp2.size(); i++) {
			list.add(lectureDao.lectureSel(tmp2.get(i).getLecture_id()));
		}
		int count = 0;
		String data = "{\"cd\" : [";
		for (LectureDTO e : list) {
			data += "{ \"lectureId\" : \"" + e.getLecture_id() + "\",";
			data += " \"type\" : \"" + e.getType() + "\",";
			data += " \"name\" : \"" + e.getName() + "\",";
			data += " \"teacher\" : \"" + e.getTeacher() + "\",";
			data += " \"time1\" : \"" + e.getTime1() + "\",";
			data += " \"time2\" : \"" + e.getTime2() + "\",";
			data += " \"place\" : \"" + e.getPlace() + "\",";
			data += " \"credit\" : \"" + e.getCredit() + "\",";
			data += " \"lectureTime\" : \"" + e.getLecture_time() + "\",";
			data += " \"maxStudent\" : \"" + e.getMax_student() + "\",";
			data += " \"listenStudent\" : \"" + e.getListen_student() + "\",";
			data += " \"score\" : \"" + e.getScore() + "\",";
			if (a.get(count) == 1) {
				data += " \"userEval\" : \"" + 1 + "\",";
			} else {
				data += " \"userEval\" : \"" + 0 + "\",";
			}
			data += " \"is_written\" : \"" + e.getIs_written() + "\" },";
			count++;

		}
		data = data.substring(0, data.length() - 1);
		data += "]}";
//		System.out.println(data);
		return data;
	}

	public String Showcomment() {
		ArrayList<ShowcommentDTO> tmp = lectureDao.showcomment();
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
	public String view(String lecture_id) {
		
		ArrayList<ViewDTO> tmp = lectureDao.viewjoin(lecture_id);
		System.out.println(tmp);
		if(tmp.size()<1) {
			LectureDTO dto = lectureDao.lectureSel(lecture_id);
			String data1 = "{\"cd\" : [";
			data1 += "{ \"id\" : \"" + dto.getLecture_id() + "\",";
			data1 += " \"name\" : \"" + dto.getName() + "\",";
			data1 += " \"teacher\" : \"" + dto.getTeacher() + "\",";
			data1 += " \"score\" : \"" + dto.getScore() + "\",";
			data1 += " \"type\" : \"" + dto.getType() + "\"}";
			data1 += "]}";
			
			return data1;
		}else {
			String attend = lectureDao.maxAttend(lecture_id);
			String ex = lectureDao.maxEx(lecture_id);
			String gra = lectureDao.maxGra(lecture_id);
			String prac = lectureDao.maxPrac(lecture_id);
			String pro = lectureDao.maxPro(lecture_id);
			String data2 = "{\"cd\" : [";
			for (ViewDTO tt : tmp) { 
				int count = 0;
				data2 += "{ \"id\" : \"" + tt.getId() + "\",";
				data2 += " \"name\" : \"" + tt.getName() + "\",";
				data2 += " \"teacher\" : \"" + tt.getTeacher() + "\",";
				data2 += " \"score\" : \"" + tt.getScore() + "\",";
				data2 += " \"lscore\" : \"" + tt.getLscore() + "\",";
				data2 += " \"comment\" : \"" + tt.getComment() + "\",";
				data2 += " \"attend\" : \"" + attend + "\",";
				data2 += " \"ex\" : \"" + ex + "\",";
				data2 += " \"gra\" : \"" + gra + "\",";
				data2 += " \"prac\" : \"" + prac + "\",";
				data2 += " \"pro\" : \"" + pro + "\",";
				data2 += " \"user_id\" : \"" + tt.getUser_id() + "\",";
				data2 += " \"type\" : \"" + tt.getType() + "\"},";
			}
			
			data2 = data2.substring(0, data2.length() - 1);
			data2 += "]}";
			
			return data2;
		}
	}	
}
