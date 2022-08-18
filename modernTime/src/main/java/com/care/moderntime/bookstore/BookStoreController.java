package com.care.moderntime.bookstore;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BookStoreController {
	@RequestMapping("bookstore")
	public String bookstore() {
		return "bookstore/bookStoreIndex";
	}
}
