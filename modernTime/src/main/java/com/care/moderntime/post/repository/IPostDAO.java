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
	
	// 좋아요 업데이트
	public void likeProc(int id);

	public void insertLike(PostLikeDTO postlike);
	
	// 스크랩 중복 확인
	public int countLike(PostLikeDTO postlike);
	
	public int countLike(PostDTO post);
	
	// 스크랩 수 업데이트
	public void scrapProc(int id);
	
	public void insertScrap(PostLikeDTO postlike);

	// 
	public int countScrap(PostLikeDTO postlike);
	
	public int countScrap(PostDTO post);

	public int tableCountLike(PostDTO post);

	public int tableCountScrap(PostDTO post);
	
	//
	public ArrayList<PostDTO> hotArticleProc(@Param("start_num") int start_num);

	public ArrayList<PostDTO> listProc(@Param("start_num") int start_num, @Param("name") String name);

	public ArrayList<PostDTO> searchProc(@Param("search_type") int search_type, @Param("keyword") String keyword);

	public int commentCount(int id);

	public PostDTO writeProc(int post_id);

	public void commentCnt(PostDTO post);






}
