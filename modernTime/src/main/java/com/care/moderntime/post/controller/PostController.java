package com.care.moderntime.post.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.care.moderntime.post.dto.PostLikeDTO;
import com.care.moderntime.post.service.ICommentService;
import com.care.moderntime.post.service.IPostService;

@Controller
public class PostController {
	final static Logger logger = LoggerFactory.getLogger(PostController.class);

	@Autowired IPostService service;
	@Autowired ICommentService Comservice;
	
	int outId = 0;
	
	//
	//freedom
	@GetMapping(value = {"{freedom}", "freedom)"})
	public String freedom(@PathVariable("freedom") String freedom) {
		return "post/freedom";
	}
	//게시글 넣기 write
	@ResponseBody
	@PostMapping(value = {"{freedom}", "freedom"})
	public String freedom(@PathVariable(value="freedom", required=false) String freedom, @RequestBody PostDTO post, RedirectAttributes ra) {
		System.out.println("write(con) id : " + post.getId());
		System.out.println("write(con) is_anonym : " + post.getIs_anonym());

		ra.addFlashAttribute("id", post.getId());
		service.writeProc(post);
		return "freedom";
	}
	
	//게시글 전체, 검색, 페이징
	@ResponseBody
	@PostMapping(value="listProc", produces="application/json; charset=UTF-8")
	public Map<String, Object> listProc(@RequestParam int start_num, @RequestParam int search_type, @RequestParam String name, @RequestParam String keyword, HttpServletRequest req) {
		System.out.println("\n(con)start_num : " + start_num);
		System.out.println("(con)search_type : " + search_type);
		System.out.println("(con)keyword : " + keyword);
	
		if(search_type == 0)
			return service.listProc(start_num, name);
		else
			return service.searchProc(search_type, keyword);
		
	}
	
	//freedomContent
	//게시글 세부정보 view
	@GetMapping(value="freedomContent", produces = "text/html; charset=UTF-8")
	public String viewProc(int id, Model model) {
		System.out.println("view(con) id : " + id);
		PostDTO post = service.viewProc(id);
		
		System.out.println("댓글 수 : " + post.getComment_count());
		
		model.addAttribute("post", post);
		outId = id;
		return "post/freedomContent";
	}
	
	//게시글 수정
	@ResponseBody
	@PostMapping("freedomContent")
	public String modifyProc(@RequestBody PostDTO post, RedirectAttributes ra) {
		System.out.println("modify(con) id : " + post.getId());
		System.out.println("modify(con) is_anonym : " + post.getIs_anonym());
		
		ra.addFlashAttribute("id", post.getId());
		service.modifyProc(post);
		return "freedomContent";
	}
	//게시글 삭제
	@ResponseBody
	@PostMapping(value = "freedomContent/deleteProc", produces = "text/html; charset=UTF-8")
	public String deleteProc(@RequestBody PostDTO post, RedirectAttributes ra) {
		System.out.println("delete(con) id : " + post.getId());
		ra.addFlashAttribute("id", post.getId());
		service.deleteProc(post);
		return "freedomContent";
	}
	
	//like테이블에 insert
	@ResponseBody
	@PostMapping("freedomContent/insertLike")
	public String insertLike(@RequestBody PostLikeDTO postlike) {
		System.out.println("insertLike(con) userId : " + postlike.getUser_id());
		System.out.println("insertLike(con) postId : " + postlike.getPost_id());
		String result = service.insertLike(postlike);
		if(result.equals("성공"))
			return result;
		return result;
	}

	@ResponseBody
	@PostMapping("freedomContent/insertScrap")
	public String insertScrap(@RequestBody PostLikeDTO postlike) {
		System.out.println("insertScrap(con) userId : " + postlike.getUser_id());
		System.out.println("insertScrap(con) postId : " + postlike.getPost_id());
		String result = service.insertScrap(postlike);

		return result;
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
	@GetMapping("club")
	public String club() {
		return "post/club";
	}

}
