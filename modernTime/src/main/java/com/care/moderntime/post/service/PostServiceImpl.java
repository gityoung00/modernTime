package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.admin.dto.LectureRegistDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.dto.PostLikeDTO;
import com.care.moderntime.post.repository.IPostDAO;

@Service
public class PostServiceImpl implements IPostService{
	
	@Autowired private IPostDAO mapper;
	@Autowired HttpSession session;
	
	int outId = 0;
	
	@Override
	public String writeProc(PostDTO post) {
//		String userId = (String)session.getAttribute("user_id");
//		System.out.println("write(service) userId : " + userId);
		
		if(post.getTitle() == null || post.getTitle().isEmpty())
			return "제목을 입력하세요.";
		if(post.getContent() == null || post.getContent().isEmpty())
			return "내용을 입력하세요.";
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
		post.setCreate_date(sdf.format(date));
		
		post.setBoard_id(1);
		
		String str = post.getContent().replace("\n","<br>");
		post.setContent(str);
		
		mapper.writeProc(post);
		
		return null;
	}
	
	
	@Override
	public Map<String, Object> listProc(int start_num, String name) {
		System.out.println("\n(ser)start_num : " + start_num);
		System.out.println("(ser)board_id : " + name);
		
		PostDTO post = new PostDTO();
		post.setStart_num(start_num);
		System.out.println("(ser)post start_num : " + post.getStart_num());
		
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<PostDTO> listProc = mapper.listProc(start_num, name);
		
		res.put("data", listProc);
		return res;
		
	}
	
	@Override
	public Map<String, Object> searchProc(int search_type, String keyword) {
		System.out.println("\n(ser)search_type : " + search_type);
		System.out.println("(ser)keyword : " + keyword);
		
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<PostDTO> searchProc = mapper.searchProc(search_type, keyword);
		res.put("data", searchProc);
		
		return res;
		
		
	}
	
	

	@Override
	public PostDTO viewProc(int id) {
		System.out.println("view(service) id : " + id);
		PostDTO post = mapper.viewProc(id);
		
		int comCnt = mapper.commentCount(id);
		post.setComment_count(comCnt);
		mapper.commentCnt(post);
		
		session.setAttribute("post", post);
		return post;
	}

	@Override
	public String modifyProc(PostDTO post) {
		System.out.println("modify(service) id : " + post.getId());
		
		String str = post.getContent().replace("\n","<br>");
		post.setContent(str);
		
		mapper.modifyProc(post);
		return null;
	}

	@Override
	public String deleteProc(PostDTO post) {
		System.out.println("delete(service) id : " + post.getId());
		mapper.deleteProc(post);
		return null;
		
	}

	@Override
	public String insertLike(PostLikeDTO postlike) {
		String userId = (String) session.getAttribute("id");
		postlike.setUser_id(userId);
		
		System.out.println("insertLike(service) userId : " + postlike.getUser_id());
		System.out.println("insertLike(service) postId : " + postlike.getPost_id());
		
		int tmp = mapper.countLike(postlike);
		if(tmp == 0) {
			mapper.insertLike(postlike);
			mapper.likeProc(postlike.getPost_id());
			
			return "성공";
		}else
			return "실패";
	}
	
	@Override
	public String insertScrap(PostLikeDTO postlike) {
		String userId = (String) session.getAttribute("id");
		postlike.setUser_id(userId);
		System.out.println("insertScrap(service) userId : " + postlike.getUser_id());
		System.out.println("insertScrap(service) postId : " + postlike.getPost_id());
		
		int tmp = mapper.countScrap(postlike);
		if(tmp == 0) {
			mapper.insertScrap(postlike);
			mapper.scrapProc(postlike.getPost_id());
			return "성공";
		}else 
			return "실패";
	}




}



