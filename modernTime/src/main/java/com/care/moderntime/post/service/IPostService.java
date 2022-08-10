package com.care.moderntime.post.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.post.dto.PostDTO;

public interface IPostService {
	
	public String writeProc(PostDTO post);

	void listProc();

	public PostDTO viewProc(int id);

}
