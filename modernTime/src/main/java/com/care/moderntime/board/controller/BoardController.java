package com.care.moderntime.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {
	
	@GetMapping("index")
	public String index() {
		return "index";
	}
	
	@GetMapping("header")
	public String header() {
		return "header";
	}
	
	@GetMapping("footer")
	public String footer() {
		return "footer";
	}
	@GetMapping("main")
	public String main() {
		return "board/main";
	}
	
	//
	@GetMapping("freedom")
	public String freedom() {
		return "board/freedom";
	}
	@GetMapping("secret")
	public String secret() {
		return "board/secret";
	}
	@GetMapping("graduate")
	public String graduate() {
		return "board/graduate";
	}
	@GetMapping("freshman")
	public String freshman() {
		return "board/freshman";
	}
	@GetMapping("issue")
	public String issue() {
		return "board/issue";
	}
	@GetMapping("marketplace")
	public String marketplace() {
		return "board/marketplace";
	}
	@GetMapping("info")
	public String info() {
		return "board/info";
	}
	@GetMapping("job")
	public String job() {
		return "board/job";
	}
	@GetMapping("promotional")
	public String promotional() {
		return "board/promotional";
	}

}
