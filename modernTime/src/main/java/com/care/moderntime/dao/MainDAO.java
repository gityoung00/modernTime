package com.care.moderntime.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.dto.AsideEvalDTO;
import com.care.moderntime.dto.AsidePostListDTO;
import com.care.moderntime.dto.BoardDTO;
import com.care.moderntime.dto.MainPostListDTO;

@Mapper
public interface MainDAO {
	
	ArrayList<BoardDTO> getAllBoard();

	ArrayList<MainPostListDTO> findPostOfBoard(int boardId);
	
	ArrayList<MainPostListDTO> findHotPost();
	
	ArrayList<AsidePostListDTO> findPopularPost();
	
	ArrayList<AsideEvalDTO> findEvaluation();

}
