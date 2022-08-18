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

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.service.ICommentService;
import com.care.moderntime.post.service.IPostService;

@Controller
public class PostController {
	final static Logger logger = LoggerFactory.getLogger(PostController.class);

	@Autowired IPostService service;
	@Autowired ICommentService Comservice;
	
	int outId = 0;
	
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
	//freedom
	@GetMapping("freedom")
	public String freedom() {
		return "post/freedom";
	}
	//게시글 넣기 write
	@ResponseBody
	@PostMapping("freedom")
	public String freedom(@RequestBody PostDTO post, RedirectAttributes ra) {
//		System.out.println("freedom controller : " + post.getTitle());
		ra.addFlashAttribute("id", post.getId());
		service.writeProc(post);
		return "freedom";
	}
	//게시글 전체 불러오기 list
	@ResponseBody
	@PostMapping(value="freedom/listProc", produces="application/json; charset=UTF-8")
	public String listProc() {
		service.listProc();
		return "freedom";
	}
	
	//freedomContent
	//게시글 세부정보 view
	@GetMapping(value="freedomContent", produces = "text/html; charset=UTF-8")
	public String viewProc(int id, Model model) {
//		System.out.println("view id : " + id);
		PostDTO post = service.viewProc(id);
		model.addAttribute("post", post);
		outId = id;
		return "post/freedomContent";
	}
	//게시글 수정
	@ResponseBody
	@PostMapping("freedomContent")
	public String modifyProc(@RequestBody PostDTO post, RedirectAttributes ra) {
		post.setId(outId);
//		System.out.println("modify con id : " + post.getId() + ", " + outId);
//		System.out.println("modify con title : " + post.getTitle());
		ra.addFlashAttribute("id", post.getId());
		service.modifyProc(post);
		return "freedomContent";
	}
	//게시글 삭제
	@ResponseBody
	@PostMapping(value = "freedomContent/deleteProc", produces = "text/html; charset=UTF-8")
	public String deleteProc(@RequestBody PostDTO post, RedirectAttributes ra) {
//		post.setId(outId);
//		System.out.println("delete con id : " + post.getId());
		ra.addFlashAttribute("id", post.getId());
		service.deleteProc(post);
		return "freedomContent";
	}
	
	//게시글 검색
	@RequestMapping(value = "searchProc")
	public String searchProc(Model model, int currentPage, String search, String select, HttpServletRequest req ) {
		service.searchProc(model, currentPage, search, select, req);
		return "freedom";
	}
	
	//공감
	@ResponseBody
	@PostMapping("freedomContent/likeProc")
	public String likeProc(@RequestBody PostDTO post, RedirectAttributes ra) {
		System.out.println("createDate : " + post.getCreateDate());
		post.setId(outId);
		ra.addFlashAttribute("id", post.getId());
		service.likeProc(post);
		return "freedomContent";
	}
	
//	@ResponseBody
//	@PostMapping(value="freedomContent/commentList", produces = "text/html; charset=UTF-8")
//	public String commentList(int postId, Model model) {
//		postId = outId;
//		System.out.println("comment(con) list postId : " + postId);
//		CommentDTO comment = Comservice.commentList(postId);
//		model.addAttribute("comment", comment);
//		return "freedom";
//	}
	
	
	
	
	
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
