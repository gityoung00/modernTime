package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.repository.IPostDAO;

@Service
public class PostServiceImpl implements IPostService{
	
	@Autowired private IPostDAO mapper;
	@Autowired HttpSession session;

	@Override
	public String writeProc(PostDTO post) {
		if(post.getTitle() == null || post.getTitle().isEmpty())
			return "제목을 입력하세요.";
		if(post.getContent() == null || post.getContent().isEmpty())
			return "내용을 입력하세요.";
		
//		String stringId = (String)session.getAttribute("id");
//		int id = Integer.parseInt(stringId);
//		post.setId(id);
		mapper.writeProc(post);
	
		return null;
	}

	@Override
	public void listProc() {
		ArrayList<PostDTO> listProc = mapper.listProc();
		session.setAttribute("listProc", listProc);
	}


	@Override
	public PostDTO viewProc(int id) {
		System.out.println("freedomContent service2 : " + id);
		PostDTO post = mapper.viewProc(id);
		return post;
	}


}
