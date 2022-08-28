package com.care.moderntime.post.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.CommentLikeDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.dto.PostLikeDTO;

@Mapper
public interface ICommentDAO {

	public void commentWrite(CommentDTO comment);

	public ArrayList<CommentDTO> commentList(int post_id);

	public void commentRemove(int id);

	public ArrayList<CommentDTO> reCommentList(int post_id, int id, int p_comment_id);
	
	//기능
	public void likeCommentProc(CommentDTO comment);

	public void insertCommentLike(CommentLikeDTO commentlike);
	
	public int countCommentLike(CommentLikeDTO commentlike);
	
	public int countCommentLike(CommentDTO comment);

	public int tableCountLike(CommentDTO comment);

	public int commentCount(int post_id);





}
