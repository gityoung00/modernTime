package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
		comment.setCreate_date(sdf.format(date));
		
		mapper.commentWrite(comment);
		
		session.setAttribute("id", comment.getId());
		
		return null;
	}

	@Override
	public Map<String, Object> commentList() {
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<CommentDTO> commentList = mapper.commentList();
		res.put("data", commentList);
		return res;
	}

	


}
