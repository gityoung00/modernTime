package com.care.moderntime.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.care.moderntime.dao.MainDAO;
import com.care.moderntime.dto.AsideEvalDTO;
import com.care.moderntime.dto.AsidePostListDTO;
import com.care.moderntime.dto.BoardDTO;
import com.care.moderntime.dto.MainPostListDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainService {
	
	private final MainDAO mainDao;

	public Map<String, Object> findMainBoard() {
		Map<String, Object> res = new HashMap<String, Object>();
		
		// 보드 전체 찾고
		List<BoardDTO> boards = mainDao.getAllBoard();
		for(BoardDTO board: boards) {
			board.setPosts(mainDao.findPostOfBoard(board.getId()));
		}
		res.put("data", boards);
		
		return res;
	}

	public Map<String, Object> findAsideBoard() {
		Map<String, Object> res = new HashMap<String, Object>();
		
		// 인기글
		List<AsidePostListDTO> populars = mainDao.findPopularPost();
		// Hot게시판
		List<MainPostListDTO> hots = mainDao.findHotPost();
		// lecture
		List<AsideEvalDTO> evals = mainDao.findEvaluation();

		res.put("popularPosts", populars);
		res.put("hotPosts", hots);
		res.put("evals", evals);
		
		return res;
	}
	
	
}
