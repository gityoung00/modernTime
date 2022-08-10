package com.care.moderntime.post.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.service.IPostService;

@Controller
public class PostController {
	final static Logger logger = LoggerFactory.getLogger(PostController.class);

	@Autowired IPostService service;
	
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
		System.out.println("freedom controller : " + post.getTitle());
		ra.addFlashAttribute("id", post.getId());
		service.writeProc(post);
		return "freedom";
	}
	//게시글 전체 불러오기
	@ResponseBody
	@PostMapping(value="freedom/listProc", produces="application/json; charset=UTF-8")
	public String listProc() {
		service.listProc();
		return "forward:/freedom";
	}
	
	//freedomContent
	@GetMapping(value="freedomContent", produces = "text/html; charset=UTF-8")
	public String viewProc(int id, Model model) {
		System.out.println("보내는 id : " + id);
		PostDTO post = service.viewProc(id);
		model.addAttribute("post", post);
		return "post/freedomContent";
	}
	@ResponseBody
	@PostMapping(value = "freedomContent")
	public String viewProc() {
		return "forward:/freedomContent";
	}
	
	@GetMapping("freedomModify")
	public String freedomModify() {
		return "post/freedomModify";
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
