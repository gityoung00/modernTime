package com.care.moderntime.bookstore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.bookstore.dto.BookStoreDTO;
import com.care.moderntime.bookstore.service.BookStoreChatService;
import com.care.moderntime.bookstore.service.BookStoreService;

@Controller
public class BookStoreController {
	@Autowired BookStoreService bss;
	
	@RequestMapping("bookstore")
	public String bookstore() {
		return "bookstore/bookStoreIndex";
	}
	
	@RequestMapping("bookStoreView")
	public String bookStoreview(String id, HttpSession session, Model model) {
		model.addAttribute("bookstoreview",bss.bookstoreview(id));
		return "bookstore/bookStoreView";
	}
		
		
	@RequestMapping("sell")
	public String sell() {
		return "bookstore/sell";
	}
	
//	@ResponseBody
//	@GetMapping("findList")
//	public HashMap<String, ArrayList<String>> findList(@RequestParam(required=false)String keyword) {
//		System.out.println(keyword);
//		HashMap<String, ArrayList<String>> data = bss.findList(keyword);
//		return data;
//	}
	
	@ResponseBody
	@PostMapping("book/sell")
	public Map<String, Object> bookSell(@RequestBody BookStoreDTO dto) {
		System.out.println("bookesell");
		System.out.println(dto.getPictures());
		BookStoreDTO tmp = bss.bookSell(dto);
		bss.insertPicture(tmp);
		System.out.println("success bookSell");
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("response", 1);
		return res;
	}
	
	@ResponseBody
	@PostMapping("bookSellList")
	public String bookSellList() {
		String data = bss.bookSellList();
		return data;
	}
	
	@ResponseBody
	@PostMapping("bookSellListSearch")
	public String bookSellListSearch(@RequestParam(required=false)String keyword) {
		String data = bss.bookSellListSearch(keyword);
//		System.out.println("BookStoreController : " + data);
		return data;
	}
	
	@ResponseBody
	@PostMapping("bookSellListMy")
	public String bookSellListMy(@RequestParam(required=false)String id) {
		String data = bss.bookSellListMy(id);
		System.out.println("BookStoreController : " + data);
		return data;
	}
	@RequestMapping("myBook")
	public String myBook() {
		return "bookstore/myBook";
	}
	
	@ResponseBody
	@PostMapping("/book/soldout")
	public String soldout(@RequestParam String id) {
		System.out.println(id);
		String result = bss.soldOut(id);
		System.out.println(result);
		return result;
	}
	
	@ResponseBody
	@PostMapping("/book/priceChange")
	public String priceChange(@RequestParam String id, @RequestParam int price) {
		System.out.println(id);
		System.out.println(price);
		String result = bss.priceChange(id,price);
		System.out.println(result);
		return result;
	}
	
	@ResponseBody
	@PostMapping("/book/commentChange")
	public String commentChange(@RequestParam String id, @RequestParam String comment) {
		System.out.println(id);
		System.out.println(comment);
		String result = bss.commentChange(id,comment);
		System.out.println(result);
		return result;
	}
}
