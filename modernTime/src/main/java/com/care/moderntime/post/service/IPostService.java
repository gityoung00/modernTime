package com.care.moderntime.post.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.post.dto.PostDTO;

public interface IPostService {
	
	void writeProc(MultipartHttpServletRequest multi);
	
	public String writeProc(PostDTO post);

}
