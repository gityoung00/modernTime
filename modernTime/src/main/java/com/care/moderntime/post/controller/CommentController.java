package com.care.moderntime.post.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.service.ICommentService;

@Controller
public class CommentController {
	final static Logger logger = LoggerFactory.getLogger(PostController.class);

	@Autowired ICommentService service;
	
	//댓글 작성
	@ResponseBody
	@PostMapping("freedomContent/commentWrite")
	public String commentWrite(@RequestBody CommentDTO comment, RedirectAttributes ra) {
		System.out.println("commentWrite(con) id : " + comment.getId());
		System.out.println("commentWrite(con) post_id : " + comment.getPost_id());
		ra.addFlashAttribute("id", comment.getId());
		service.commentWrite(comment);
		return "freedomContent";
	}
	
	//댓글 리스트
	@ResponseBody
	@PostMapping(value="freedomContent/commentList", produces="application/json; charset=UTF-8")
	public Map<String, Object> commentList() {
		return service.commentList();
	}

	//댓글 삭제
//	@ResponseBody
//	@PostMapping(value = "freedomContent/commentDelete", produces = "text/html; charset=UTF-8")
//	public String deleteProc(@RequestBody PostDTO post, RedirectAttributes ra) {
////		post.setId(outId);
//		System.out.println(" ");
//		System.out.println("delete con id : " + post.getId());
//		ra.addFlashAttribute("id", post.getId());
//		service.deleteProc(post);
//		return "freedomContent";
//	}

}
