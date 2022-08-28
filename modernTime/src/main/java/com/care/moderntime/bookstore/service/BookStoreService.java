package com.care.moderntime.bookstore.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.admin.dto.PictureDTO;
import com.care.moderntime.admin.service.NoticeService;
import com.care.moderntime.bookstore.dao.IBookStoreDAO;
import com.care.moderntime.bookstore.dto.BookPictureDTO;
import com.care.moderntime.bookstore.dto.BookStoreDTO;

@Service
public class BookStoreService {
	@Autowired
	IBookStoreDAO dao;
	@Autowired HttpSession session;

//	public HashMap<String, ArrayList<String>> findList(String keyword) {
//		String data = "";
//		ArrayList<String> a= dao.findList(keyword);
//		HashMap<String, ArrayList<String>> map = new HashMap<>();
//		map.put("lecture", a);
//		System.out.println(map);
//		return map;
//		
//	}

	// 판매글 등록
	public BookStoreDTO bookSell(BookStoreDTO dto) {
		if (dto.getUser_id() == null || dto.getUser_id() == "") {
			return null;
		}
		int i = dao.bookSell(dto);
		if (i == 1) {
			return dto;
		}
		return null;
	}
	public String listToString(ArrayList<BookStoreDTO> list) {
		DecimalFormat decFormat = new DecimalFormat("###,###");
		String data = "{\"cd\" : [";
		for (BookStoreDTO tmp : list) {
			String str = tmp.getComment().replace("\n","<br>"); 
			String price = decFormat.format(tmp.getPrice());
			data += "{ \"id\" : \"" + tmp.getId() + "\",";
			data += " \"title\" : \"" + tmp.getTitle() + "\",";
			data += " \"author\" : \"" + tmp.getAuthor() + "\",";
			data += " \"publisher\" : \"" + tmp.getPublisher() + "\",";
			data += " \"publicationDate\" : \"" + tmp.getPublication_date() + "\",";
			data += " \"price\" : \"" + price + "\",";
//			data += " \"comment\" : \"" + tmp.getComment() + "\",";
			data += " \"comment\" : \"" + str + "\",";
			data += " \"createDate\" : \"" + tmp.getCreate_date() + "\",";
			data += " \"isSold\" : \"" + tmp.getIs_sold() + "\",";
			data += " \"picture\" : \"" + tmp.getPicture() + "\",";
			data += " \"userId\" : \"" + tmp.getUser_id() + "\" },";
		}
		data = data.substring(0, data.length() - 1);
		data += "]}";
		System.out.println(data);
		return data;
	}
	public void insertPicture(BookStoreDTO dto) {
		for(BookPictureDTO picture : dto.getPictures()) {
			dao.insertPicture(dto.getId(), picture.getId());
		}
	}
	//전체 리스트
	public String bookSellList() {
		ArrayList<BookStoreDTO> list = dao.bookSellList();
		String data = listToString(list);
		return data;
	}
	//검색 리스트
	public String bookSellListSearch(String keyword) {
		ArrayList<BookStoreDTO>list = dao.bookSellListSearch(keyword);
		String data = listToString(list);
		return data;
	}
	//내가 올린 리스트
	public String bookSellListMy(String id) {
		ArrayList<BookStoreDTO>list = dao.bookSellListMy(id);
		String data = listToString(list);
		return data;
	}
	//책보기
	public BookStoreDTO bookstoreview(String id) {
		
		// bookstore 정보 불러오고
		BookStoreDTO dto = dao.bookstoreview(id);
		// comment는 개행시키기
		dto.setComment(dto.getComment().replace("\n","<br>"));
		
		// 가격 정보 천단위 콤마
		DecimalFormat decFormat = new DecimalFormat("###,###");
		dto.setViewP(decFormat.format(dto.getPrice()));
		
		System.out.println(dto.getId());
		// 사진 불러오기
		dto.setPictures(dao.loadPicture(dto.getId()));
		return dto;
	}

	public String soldOut(String id) {
		System.out.println(id);
		int i = dao.soldOut(id);
		if(i == 1) {
			return "판매 완료";
		}
		return "오류";
	}

	public String priceChange(String id, int price) {
		System.out.println(id + " " + price );
		int i = dao.priceChange(id,price);
		if(i == 1) {
			return "수정 완료";
		}
		return "오류";
	}

	public String commentChange(String id, String comment) {
		System.out.println(id + " " + comment );
		int i = dao.commentChange(id,comment);
		if(i == 1) {
			return "수정 완료";
		}
		return "오류";
	}

}
