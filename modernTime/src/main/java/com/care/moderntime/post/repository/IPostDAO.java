package com.care.moderntime.post.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.dto.PostLikeDTO;

@Mapper
public interface IPostDAO {
	//게시판
	public void writeProc(PostDTO postDto);
	
	public ArrayList<PostDTO> listProc();

	public PostDTO viewProc(int id);

	public void modifyProc(PostDTO post);

	public void deleteProc(PostDTO post);
	
	//기능
	public void likeProc(PostDTO post);

	public void insertLike(PostLikeDTO postlike);
	
	public int countLike(PostLikeDTO postlike);
	
	public int countLike(PostDTO post);
	
	public void scrapProc(PostDTO post);
	
	public void insertScrap(PostLikeDTO postlike);

	public int countScrap(PostLikeDTO postlike);
	
	public int countScrap(PostDTO post);

	public int tableCountLike(PostDTO post);

	public int tableCountScrap(PostDTO post);
	
	//
	public ArrayList<PostDTO> listProc(@Param("start_num") int start_num);

	public ArrayList<PostDTO> searchProc(@Param("search_type") int search_type, @Param("keyword") String keyword);




}
