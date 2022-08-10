package com.care.moderntime.post.repository;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.post.dto.PostDTO;

@Mapper
public interface IPostDAO {
	
	public void writeProc(PostDTO postDto);
	
	public ArrayList<PostDTO> listProc();

	public PostDTO viewProc(int id);

}
