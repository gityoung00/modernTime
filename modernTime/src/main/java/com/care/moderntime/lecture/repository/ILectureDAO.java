package com.care.moderntime.lecture.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.lecture.dto.EvaluationDTO;
import com.care.moderntime.lecture.dto.LectureDTO;
import com.care.moderntime.lecture.dto.ShowcommentDTO;
import com.care.moderntime.lecture.dto.TimetableDTO;
import com.care.moderntime.lecture.dto.EvalListDTO;
import com.care.moderntime.lecture.dto.EvalViewDTO;

@Mapper
public interface ILectureDAO {
	public ArrayList<EvaluationDTO> viewevaluation(String lecture_id);
	ArrayList<LectureDTO> lecturelist();  
	ArrayList<EvaluationDTO> evaluationlist();  
	int isEvaluation(String id);
	public void evaluationRegist(EvaluationDTO dto);
	public void evaluationlectureid(String dto);
	void lectureup(String id);
	public ArrayList<String> lecturetime(int a);
	public LectureDTO lectureSel(String lectureId);
	public ArrayList<TimetableDTO> idjoin();
	public Integer evaluationCount(String user_id, String lecture_id);
	public Integer commentCount(String comment, String lecture_id);
	public ArrayList<ShowcommentDTO> showcomment();
	public ArrayList<String> scoreav(String lecture_id);
	ArrayList<ShowcommentDTO> search(String keyword);
	
	// 강의평 상세 페이지 - 강의 정보 불러오기
	public EvalViewDTO getLectureInfo(String lectureId);
	// 강의평 불러오기
	public ArrayList<EvalListDTO> getAllEval(String lecture_id);
	public String maxAttend(String lecture_id);
	public String maxPro(String lecture_id);
	public String maxGra(String lecture_id);
	public String maxEx(String lecture_id);
	public String maxPrac(String lecture_id);
	public EvaluationDTO evalSel(@Param("lectureId") String lecture_lecture_id,@Param("userId") String user_id);
	public double scoreavg (String lecture_id);
	public double scoreup (double scoreavg);

	}
