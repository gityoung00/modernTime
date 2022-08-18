package com.care.moderntime.post.dto;

public class CommentDTO {
	private int id;
	private String isAnonym;
	private String comment;
	private String createDate;
	private int postId;
	private String userId;
	private int addCommentId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getIsAnonym() {
		return isAnonym;
	}
	public void setIsAnonym(String isAnonym) {
		this.isAnonym = isAnonym;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public int getPostId() {
		return postId;
	}
	public void setPostId(int postId) {
		this.postId = postId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getAddCommentId() {
		return addCommentId;
	}
	public void setAddCommentId(int addCommentId) {
		this.addCommentId = addCommentId;
	}
	
	
	
	
	
	
	
}
