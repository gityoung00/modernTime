package com.care.moderntime.post.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.service.IPostService;

@Controller
public class PostController {
	final static Logger logger = LoggerFactory.getLogger(PostController.class);

	@Autowired IPostService service;
	
	@RequestMapping(value = "writeProc")
	public String writeProc(MultipartHttpServletRequest multi) {
		service.writeProc(multi);
		return "forward:/freedom";
	}
	
	//
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
		return "post/main";
	}
	
	//
	@GetMapping("freedom")
	public String freedom() {
		return "post/freedom";
	}
	@PostMapping("freedom")
	@ResponseBody
	public String freedom(@RequestBody PostDTO post, RedirectAttributes ra) {
		System.out.println(post.getTitle());
		ra.addFlashAttribute("id", post.getId());
		return service.writeProc(post);
	}
	
	
	@GetMapping("freedomContent")
	public String freedomContent() {
		return "post/freedomContent";
	}
	@GetMapping("secret")
	public String secret() {
		return "post/secret";
	}
	@GetMapping("graduate")
	public String graduate() {
		return "post/graduate";
	}
	@GetMapping("freshman")
	public String freshman() {
		return "post/freshman";
	}
	@GetMapping("issue")
	public String issue() {
		return "post/issue";
	}
	@GetMapping("marketplace")
	public String marketplace() {
		return "post/marketplace";
	}
	@GetMapping("info")
	public String info() {
		return "post/info";
	}
	@GetMapping("job")
	public String job() {
		return "post/job";
	}
	@GetMapping("promotional")
	public String promotional() {
		return "post/promotional";
	}

}
