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
			return "????????? ???????????????.";
		}
		EvaluationDTO tmp = lectureDao.evalSel(dto.getLecture_lecture_id(),dto.getUser_id());
		if(tmp == null) {
			lectureDao.evaluationRegist(dto);
			double score = lectureDao.scoreavg(dto.getLecture_lecture_id());
			lectureDao.scoreup(score);
			
			
			return "????????????";			
		}else {			
			return "???????????? ???????????? ????????? ??? ????????????.";
		}

	}

	
	// ??? ????????? ????????????
	public Map<String, Object> idjoin(String user_id) {
		
		// tmp: user_id, timetable_id, lecture_id ?????? ????????????
		ArrayList<TimetableDTO> tmp = lectureDao.idjoin();
		
		
//		tmp2 = ????????? ?????? ????????? ????????? ?????????
		ArrayList<TimetableDTO> tmp2 = new ArrayList<>();
		
		// tid: timetable_id, max ???????????? ?????????
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

		// myEvals : ??? ?????????
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

	public Map<String, Object> search(String keyword) {
		Map<String, Object> res = new HashMap<String, Object>();
		lectureDao.search(keyword);
		ArrayList<ShowcommentDTO> tmp = lectureDao.search(keyword);
		res.put("data", tmp);
		return res;
	}

	
	//???????????????
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
