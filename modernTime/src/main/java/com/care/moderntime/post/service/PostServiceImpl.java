package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.repository.IPostDAO;

@Service
public class PostServiceImpl implements IPostService{
	@Autowired private IPostDAO mapper;

	@Override
	public void writeProc(MultipartHttpServletRequest multi) {
		//String userId = (String)session.getAttribute("userId");
		String title = multi.getParameter("title");
		String content= multi.getParameter("text");
		//String nickname= multi.getParameter("nickname");
		
		System.out.println(title);
		System.out.println(content);
		
		PostDTO postDto = new PostDTO();
		//postDto.setUserId(userId);		
		postDto.setTitle(title);
		postDto.setContent(content);
		//postDto.setNickname(nickname);
		
		postDto.setUserId("id1");	
		postDto.setNickname("nickname");
		postDto.setId(0);
		postDto.setLike(0);
		postDto.setBoardId(0);
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd HH:mm");
		postDto.setCreateDate(sdf.format(date));
		
		
		System.out.println(postDto.getTitle());
		System.out.println(postDto.getContent());
		
		
		mapper.writeProc(postDto);
	}

	@Override
	public String writeProc(PostDTO post) {
		
		if(post.getTitle() == null || post.getTitle().isEmpty())
			return "제목을 입력하세요.";
		
		if(post.getContent() == null || post.getContent().isEmpty())
			return "내용을 입력하세요.";
		
		mapper.writeProc(post);
	
		return null;
	}
	

}
