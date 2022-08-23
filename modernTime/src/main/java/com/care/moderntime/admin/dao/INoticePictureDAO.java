package com.care.moderntime.admin.dao;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.admin.dto.PictureDTO;


@Mapper
public interface INoticePictureDAO {
	int savePicture(PictureDTO pictureDto);
}
