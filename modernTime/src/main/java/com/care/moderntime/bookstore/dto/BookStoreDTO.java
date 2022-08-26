package com.care.moderntime.bookstore.dto;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
	private ArrayList<BookPictureDTO> pictures;


}
