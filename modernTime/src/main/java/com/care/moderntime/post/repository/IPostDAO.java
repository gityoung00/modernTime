package com.care.moderntime.post.repository;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.post.dto.PostDTO;

@Mapper
public interface IPostDAO {
	
	public void writeProc(PostDTO postDto);
	
	public ArrayList<PostDTO> listProc();

	public PostDTO viewProc(int id);

	public void modifyProc(PostDTO post);

	public void deleteProc(PostDTO post);

	public int postCount(HashMap<String, Object> map);

	public ArrayList<PostDTO> searchProc(@Param("b") int begin, @Param("e")int end,  @Param("sel")String sel, @Param("search") String search);

	public void likeProc(PostDTO post);

}
