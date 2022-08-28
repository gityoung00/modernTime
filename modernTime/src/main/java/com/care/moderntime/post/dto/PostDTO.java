package com.care.moderntime.post.dto;

import java.util.ArrayList;

import com.care.moderntime.admin.dto.PictureDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
	private int id, is_anonym, like_count, board_id, scrap_count;
	private String user_id, title, content, create_date, board_name, board_title;
	
	private int post_id, comment_count, picture_count;
	
	private int start_num, search_type;
	
	private String keyword;
	
	private ArrayList<PictureDTO> pictures;
	
	
	
	
}
