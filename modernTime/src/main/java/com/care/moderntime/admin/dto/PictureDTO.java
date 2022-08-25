package com.care.moderntime.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PictureDTO {
	private int id;
	private String picture;
	private String caption;
	
	public PictureDTO() {}

	public PictureDTO(int id, String picture, String caption) {
		super();
		this.id = id;
		this.picture = picture;
		this.caption = caption;
	}

	public PictureDTO(String picture) {
		super();
		this.picture = picture;
	}
	
	
	
	
}
