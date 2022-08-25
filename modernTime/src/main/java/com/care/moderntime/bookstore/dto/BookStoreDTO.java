package com.care.moderntime.bookstore.dto;

public class BookStoreDTO {
	private int id;
	private String title;
	private String author;
	private String publisher;
	private String publication_date;
	private int price;
	private String comment;
	private String create_date;
	private int is_sold;
	private String user_id;
	private String picture;
	private String viewP;

	public String getViewP() {
		return viewP;
	}

	public void setViewP(String viewP) {
		this.viewP = viewP;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public int getIs_sold() {
		return is_sold;
	}

	public void setIs_sold(int is_sold) {
		this.is_sold = is_sold;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getPublication_date() {
		return publication_date;
	}

	public void setPublication_date(String publication_date) {
		this.publication_date = publication_date;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCreate_date() {
		return create_date;
	}

	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

}
