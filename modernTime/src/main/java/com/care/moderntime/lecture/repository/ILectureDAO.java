package com.care.moderntime.lecture.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.lecture.dto.EvaluationDTO;
import com.care.moderntime.lecture.dto.LectureDTO;
import com.care.moderntime.lecture.dto.ShowcommentDTO;
import com.care.moderntime.lecture.dto.TimetableDTO;
import com.care.moderntime.lecture.dto.ViewDTO;

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
	public LectureDTO lectureSel(String string);
	public ArrayList<TimetableDTO> idjoin();
	public Integer evaluationCount(String user_id, String lecture_id);
	public Integer commentCount(String comment, String lecture_id);
	public ArrayList<ShowcommentDTO> showcomment();
	public ArrayList<String> scoreav(String lecture_id);
	ArrayList<ShowcommentDTO> search(String keyword);
//	ArrayList<>
//	public ArrayList<LectureDTO> search();
	public ArrayList<ViewDTO> viewjoin(String lecture_id);
	public String maxAttend(String lecture_id);
	public String maxPro(String lecture_id);
	public String maxGra(String lecture_id);
	public String maxEx(String lecture_id);
	public String maxPrac(String lecture_id);
	public EvaluationDTO evalSel(@Param("lectureId") String lecture_lecture_id,@Param("userId") String user_id);
	public double scoreavg (String lecture_id);
	public double scoreup (double scoreavg);

	}
