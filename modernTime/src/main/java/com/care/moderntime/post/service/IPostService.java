package com.care.moderntime.post.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.dto.PostLikeDTO;

public interface IPostService {
	
	public String writeProc(PostDTO post);

	public ArrayList<PostDTO> listProc();

	public PostDTO viewProc(int id);

	public String modifyProc(PostDTO post);

	public String deleteProc(PostDTO post);

	public void searchProc(Model model, int currentPage, String search, String select, HttpServletRequest req);

	public String likeProc(PostDTO post);

	public String insertLike(PostLikeDTO postlike);


}
