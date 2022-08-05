package com.care.moderntime.admin.service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dao.INoticeDAO;
import com.care.moderntime.admin.dto.NoticeDTO;

@Service
public class NoticeService {
	@Autowired private INoticeDAO noticeDao;
	@Autowired private HttpSession session;
	
	public String insert(NoticeDTO dto) {
		//String id = (String)session.getAttribute("id");
		/*
		 * if(id != "admin" || id == null) { return "관리자가 아닙니다."; }
		 */
		if(dto.getContent() == null || dto.getContent().isEmpty()) {
			return "내용은 필수요소입니다.";
		}
		
		noticeDao.insert(dto);
		return "등록 완료";
	}
	
}
