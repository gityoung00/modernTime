package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.repository.ICommentDAO;

@Service
public class CommentServiceImpl implements ICommentService{
	
	@Autowired private ICommentDAO mapper;
	@Autowired HttpSession session;

	@Override
	public String commentWrite(CommentDTO comment) {
		if(comment.getComment() == null || comment.getComment().isEmpty())
			return "댓글을 입력하세요.";
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd HH:mm");
		comment.setCreateDate(sdf.format(date));
		
		mapper.commentWrite(comment);
		
		session.setAttribute("id", comment.getId());
		
		return null;
	}

	@Override
	public String commentList(CommentDTO comment) {
		System.out.println("commentList(service) postId : " + comment.getPostId());
		mapper.commentList(comment);
		return null;
	}


}
