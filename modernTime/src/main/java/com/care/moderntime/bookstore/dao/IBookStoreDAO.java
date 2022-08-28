package com.care.moderntime.bookstore.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.care.moderntime.admin.dto.PictureDTO;
import com.care.moderntime.bookstore.dto.BookPictureDTO;
import com.care.moderntime.bookstore.dto.BookStoreDTO;

@Mapper
public interface IBookStoreDAO {

//	ArrayList<String> findList(@Param("keyword")String keyword);

	int bookSell(BookStoreDTO dto);

	ArrayList<BookStoreDTO> bookSellList();

	ArrayList<BookStoreDTO> bookSellListSearch(@Param("keyword")String keyword);

	ArrayList<BookStoreDTO> bookSellListMy(@Param("userId")String id);

	BookStoreDTO bookstoreview(String id);

	void insertPicture(@Param("bookId")int id, @Param("bookPicId")Integer integer);

	ArrayList<BookPictureDTO> loadPicture(int id);

	String pictureUrl(int i);

	int soldOut(String id);

	int priceChange(@Param("id")String id, @Param("price")int price);

	int commentChange(@Param("id")String id, @Param("comment")String comment);
	
	// 판매글 올린 사람(책방 쪽지에 사용)
	String getReceiver(int id);
}
