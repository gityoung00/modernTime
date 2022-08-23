package com.care.moderntime.admin.dto;

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
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
}
