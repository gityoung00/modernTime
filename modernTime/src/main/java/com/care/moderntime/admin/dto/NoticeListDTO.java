package com.care.moderntime.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeListDTO extends NoticeDTO{
	
	private int like_count;
	private int comment_count;
	private int picture_count;
	private int scrap_count;

}
