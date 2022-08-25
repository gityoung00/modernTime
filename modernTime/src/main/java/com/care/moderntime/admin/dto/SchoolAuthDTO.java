package com.care.moderntime.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolAuthDTO {
	private int id;
	private String type;
	private String picture;
	private int is_checked;
	private String user_id;
	
}
