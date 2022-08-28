package com.care.moderntime.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AsidePostListDTO extends MainPostListDTO{
	private String content;
	private int board_id;
	private String board_name;
	private String board_title;
	private int like_count;
	private int comment_count;
	

}
