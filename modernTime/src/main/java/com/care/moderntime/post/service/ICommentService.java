package com.care.moderntime.post.service;

import java.util.ArrayList;
import java.util.Map;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.CommentLikeDTO;

public interface ICommentService {

	public String commentWrite(CommentDTO comment);

	public Map<String, Object> commentList(int post_id);

	public String commentRemove(int id);
	
//	public Map<String, Object> reCommentList(int post_id, int id);

	//기능
	public String likeCommentProc(CommentDTO comment);

	public String insertCommentLike(CommentLikeDTO commentLike);

	




}
