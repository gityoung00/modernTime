package com.care.moderntime.post.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.post.dto.PostDTO;

@Mapper
public interface IMySelectDAO {
	
	public ArrayList<PostDTO> myscrap(@Param("start_num") int start_num, String user_id);

	public ArrayList<PostDTO> myarticle(@Param("start_num") int start_num, String user_id);

	public ArrayList<PostDTO> mycommentarticle(@Param("start_num") int start_num, String user_id);

	public void removeScrap(PostDTO post);

	public void deleteScrap(PostDTO post);


	



}
