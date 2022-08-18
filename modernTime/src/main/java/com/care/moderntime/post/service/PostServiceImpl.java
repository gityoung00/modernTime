package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
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
		String id = (String) session.getAttribute("id");
		post.setUserId(id);
		
		if(post.getTitle() == null || post.getTitle().isEmpty())
			return "제목을 입력하세요.";
		if(post.getContent() == null || post.getContent().isEmpty())
			return "내용을 입력하세요.";
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd HH:mm");
		post.setCreateDate(sdf.format(date));
		
		mapper.writeProc(post);
	
		return null;
	}

	@Override
	public ArrayList<PostDTO> listProc() {
		ArrayList<PostDTO> listProc = mapper.listProc();
		session.setAttribute("listProc", listProc);
		return listProc;
	}


	@Override
	public PostDTO viewProc(int id) {
		System.out.println("service viewProc : " + id);
		PostDTO post = mapper.viewProc(id);
		return post;
	}

	@Override
	public String modifyProc(PostDTO post) {
		System.out.println("modify id : " + post.getId());
		System.out.println("modify title : " + post.getTitle());
		System.out.println("modify content : " + post.getContent());
		mapper.modifyProc(post);
		return null;
	}

	@Override
	public String deleteProc(PostDTO post) {
		System.out.println("delete service id : " + post.getId());
		mapper.deleteProc(post);
		return null;
		
	}

	@Override
	public void searchProc(Model model, int currentPage, String search, String select, HttpServletRequest req) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("search", search);
		map.put("select", select);
		
		int totalCount = mapper.postCount(map);
		int pageBlock = 10;
		int end = currentPage * pageBlock;
		int begin = end+1 - pageBlock;

		ArrayList<PostDTO> boardList = mapper.searchProc(begin, end, select, search);
		model.addAttribute("boardList", boardList);

		String url = req.getContextPath() + "/searchProc?";
		if(select != null) {
			url+="select="+select+"&";
			url+="search="+search+"&";	
		}
		url+="currentPage=";
		model.addAttribute("page", PageService.getNavi(currentPage, pageBlock, totalCount, url));
	}

	@Override
	public String likeProc(PostDTO post) {
		System.out.println("likeCount : " + post.getLikeCount());
		
		mapper.likeProc(post);
		return null;
	}




	

}
