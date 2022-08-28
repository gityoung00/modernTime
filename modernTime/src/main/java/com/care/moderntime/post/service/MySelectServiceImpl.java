package com.care.moderntime.post.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.repository.IMySelectDAO;

@Service
public class MySelectServiceImpl {
	
	@Autowired private IMySelectDAO mapper;
	@Autowired HttpSession session;

	public Map<String, Object> myscrap(int start_num, String user_id) {
		String userId = (String) session.getAttribute("id");
		System.out.println("\nmyscrap(ser) start_num : " + start_num);
		System.out.println("myscrap(ser) user_id : " + user_id);
		
		PostDTO post = new PostDTO();
		post.setStart_num(start_num);
		System.out.println("myscrap(ser) get-start_num : " + post.getStart_num());
		
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<PostDTO> myscrap = mapper.myscrap(start_num, userId);
		
		res.put("data", myscrap);
		return res;
	}

	public Map<String, Object> myarticle(int start_num, String user_id) {
		String userId = (String) session.getAttribute("id");
		System.out.println("\nmyarticle(ser) start_num : " + start_num);
		System.out.println("myarticle(ser) user_id : " + user_id);
		
		PostDTO post = new PostDTO();
		post.setStart_num(start_num);
		System.out.println("myarticle(ser) get-start_num : " + post.getStart_num());
		
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<PostDTO> myarticle = mapper.myarticle(start_num, userId);
		
		res.put("data", myarticle);
		return res;
	}

	public Map<String, Object> mycommentarticle(int start_num, String user_id) {
		String userId = (String) session.getAttribute("id");
		System.out.println("\nmycommentarticle(ser) start_num : " + start_num);
		System.out.println("mycommentarticle(ser) user_id : " + user_id);
		
		PostDTO post = new PostDTO();
		post.setStart_num(start_num);
		System.out.println("myarticle(ser) get-start_num : " + post.getStart_num());
		
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<PostDTO> mycommentarticle = mapper.mycommentarticle(start_num, userId);
		
		res.put("data", mycommentarticle);
		return res;
	}

	public String removeScrap(PostDTO post) {
		System.out.println("removeScrap(service) id : " + post.getId());
		mapper.removeScrap(post);
		return null;
	}

	public String deleteScrap(PostDTO post) {
		System.out.println("deleteScrap(service) id : " + post.getId());
		mapper.deleteScrap(post);
		return null;
	}


	
}



