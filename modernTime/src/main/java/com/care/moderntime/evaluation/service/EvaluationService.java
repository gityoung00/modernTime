package com.care.moderntime.evaluation.service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.care.moderntime.evaluation.repositry.IEvaluationDAO;

public class EvaluationService {
	@Autowired private IEvaluationDAO dao;
	@Autowired private HttpSession session;
	

}
