package com.care.moderntime.bookstore.service;

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
	@Autowired
	NoticeService tmp;
	@Autowired HttpSession session;
	private ArrayList<Integer> num = tmp.getNum();

//	public HashMap<String, ArrayList<String>> findList(String keyword) {
//		String data = "";
//		ArrayList<String> a= dao.findList(keyword);
//		HashMap<String, ArrayList<String>> map = new HashMap<>();
//		map.put("lecture", a);
//		System.out.println(map);
//		return map;
//		
//	}

	public ArrayList<Integer> getNum() {
		return num;
	}

	public void setNum(ArrayList<Integer> num) {
		this.num = num;
	}
	
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
	
	public void insertPicture(BookStoreDTO dto) {
		for(int j=0;j<num.size();j++) {
			System.out.println(dto.getId());
			System.out.println(num.get(j));
			dao.insertPicture(dto.getId(),num.get(j));
		}
		tmp.getNum().clear();
	}

	public String bookSellList() {
		ArrayList<BookStoreDTO> list = dao.bookSellList();
		String data = "{\"cd\" : [";
		for (BookStoreDTO tmp : list) {
			data += "{ \"id\" : \"" + tmp.getId() + "\",";
			data += " \"title\" : \"" + tmp.getTitle() + "\",";
			data += " \"author\" : \"" + tmp.getAuthor() + "\",";
			data += " \"publisher\" : \"" + tmp.getPublisher() + "\",";
			data += " \"publicationDate\" : \"" + tmp.getPublication_date() + "\",";
			data += " \"price\" : \"" + tmp.getPrice() + "\",";
			data += " \"comment\" : \"" + tmp.getComment() + "\",";
			data += " \"createDate\" : \"" + tmp.getCreate_date() + "\",";
			data += " \"isSold\" : \"" + tmp.getIsSold() + "\",";
			data += " \"userId\" : \"" + tmp.getUser_id() + "\" },";
		}

		data = data.substring(0, data.length() - 1);
		data += "]}";
		return data;
	}

	public String bookSellListSearch(String keyword) {
		ArrayList<BookStoreDTO>list = dao.bookSellListSearch(keyword);
		String data = "{\"cd\" : [";
		for (BookStoreDTO tmp : list) {
			data += "{ \"id\" : \"" + tmp.getId() + "\",";
			data += " \"title\" : \"" + tmp.getTitle() + "\",";
			data += " \"author\" : \"" + tmp.getAuthor() + "\",";
			data += " \"publisher\" : \"" + tmp.getPublisher() + "\",";
			data += " \"publicationDate\" : \"" + tmp.getPublication_date() + "\",";
			data += " \"price\" : \"" + tmp.getPrice() + "\",";
			data += " \"comment\" : \"" + tmp.getComment() + "\",";
			data += " \"createDate\" : \"" + tmp.getCreate_date() + "\",";
			data += " \"isSold\" : \"" + tmp.getIsSold() + "\",";
			data += " \"userId\" : \"" + tmp.getUser_id() + "\" },";
		}
		data = data.substring(0, data.length() - 1);
		data += "]}";
		System.out.println(data);
		return data;
	}

	public String bookSellListMy(String id) {
		ArrayList<BookStoreDTO>list = dao.bookSellListMy(id);
		String data = "{\"cd\" : [";
		for (BookStoreDTO tmp : list) {
			data += "{ \"id\" : \"" + tmp.getId() + "\",";
			data += " \"title\" : \"" + tmp.getTitle() + "\",";
			data += " \"author\" : \"" + tmp.getAuthor() + "\",";
			data += " \"publisher\" : \"" + tmp.getPublisher() + "\",";
			data += " \"publicationDate\" : \"" + tmp.getPublication_date() + "\",";
			data += " \"price\" : \"" + tmp.getPrice() + "\",";
			data += " \"comment\" : \"" + tmp.getComment() + "\",";
			data += " \"createDate\" : \"" + tmp.getCreate_date() + "\",";
			data += " \"isSold\" : \"" + tmp.getIsSold() + "\",";
			data += " \"userId\" : \"" + tmp.getUser_id() + "\" },";
		}
		data = data.substring(0, data.length() - 1);
		data += "]}";
		System.out.println(data);
		return data;
	}

	public BookStoreDTO bookstoreview(String id) {
		BookStoreDTO dto = dao.bookstoreview(id);
		System.out.println(dto.getId());
		ArrayList<BookPictureDTO> tmp = dao.loadPicture(dto.getId());
		ArrayList<String>s = new ArrayList<>();
		for(BookPictureDTO b : tmp) {
			System.out.println(b.getPicture_id());
			s.add(dao.pictureUrl(b.getPicture_id()));
		}
		session.setAttribute("pictureUrl", s);
		return dto;
	}

}
