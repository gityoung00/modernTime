package com.care.moderntime.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PictureDTO {
	private int id;
	private String picture;
	private String comment;
	
	public PictureDTO() {}
	
	public PictureDTO(String picture,String comment) {
		super();
		this.picture = picture;
		this.comment = comment;
	}
	
}
