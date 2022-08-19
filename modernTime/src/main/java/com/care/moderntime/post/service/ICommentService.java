package com.care.moderntime.post.service;

import java.util.ArrayList;
import java.util.Map;

import com.care.moderntime.post.dto.CommentDTO;

public interface ICommentService {

	public String commentWrite(CommentDTO comment);

	public Map<String, Object> commentList();


}
