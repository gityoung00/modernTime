package com.care.moderntime.post.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.post.dto.CommentDTO;

@Mapper
public interface ICommentDAO {

	public void commentWrite(CommentDTO comment);

	public void commentList(CommentDTO comment);


}
