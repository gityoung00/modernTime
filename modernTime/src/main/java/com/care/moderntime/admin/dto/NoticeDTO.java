package com.care.moderntime.admin.dto;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDTO {
	private int id;
	private String title;
	private String content;
	private String create_date;
	private ArrayList<PictureDTO> pictures;
	
	
	

	
}
