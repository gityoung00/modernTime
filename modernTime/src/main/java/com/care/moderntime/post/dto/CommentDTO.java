package com.care.moderntime.post.dto;

public class CommentDTO {
	private int id;
	private String is_anonym;
	private String comment;
	private String create_date;
	private int post_id;
	private String user_id;
	private int p_comment_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getIs_anonym() {
		return is_anonym;
	}
	public void setIs_anonym(String is_anonym) {
		this.is_anonym = is_anonym;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public int getPost_id() {
		return post_id;
	}
	public void setPost_id(int post_id) {
		this.post_id = post_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getP_comment_id() {
		return p_comment_id;
	}
	public void setP_comment_id(int p_comment_id) {
		this.p_comment_id = p_comment_id;
	}
	
	
	
}
