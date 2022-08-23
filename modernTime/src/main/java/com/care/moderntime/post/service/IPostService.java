package com.care.moderntime.post.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.dto.PostLikeDTO;

public interface IPostService {
	//게시판
	public String writeProc(PostDTO post);

//	public Map<String, Object> listProc();
	
	public PostDTO viewProc(int id);

	public String modifyProc(PostDTO post);

	public String deleteProc(PostDTO post);
	
	//게시글 기능
	public String likeProc(PostDTO post);

	public String insertLike(PostLikeDTO postlike);

	public String scrapProc(PostDTO post);

	public String insertScrap(PostLikeDTO postlike);
	
	//게시판 검색
	public Map<String, Object> listProc(int start_num);

	public Map<String, Object> searchProc(int search_type, String keyword);


}
