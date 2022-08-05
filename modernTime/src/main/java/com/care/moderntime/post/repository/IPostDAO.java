package com.care.moderntime.post.repository;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.post.dto.PostDTO;

@Mapper
public interface IPostDAO {
	
	public void writeProc(PostDTO postDto);

}
