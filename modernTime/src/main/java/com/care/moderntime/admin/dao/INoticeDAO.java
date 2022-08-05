package com.care.moderntime.admin.dao;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.admin.dto.NoticeDTO;
@Mapper
public interface INoticeDAO {
	void insert(NoticeDTO dto);
}
