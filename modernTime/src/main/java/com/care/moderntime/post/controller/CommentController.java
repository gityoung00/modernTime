package com.care.moderntime.post.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.service.ICommentService;

@Controller
public class CommentController {
	final static Logger logger = LoggerFactory.getLogger(PostController.class);

	@Autowired ICommentService service;
	
	int outId = 0;

	//댓글 작성
	@ResponseBody
	@PostMapping("freedomContent/commentWrite")
	public String commentWrite(@RequestBody CommentDTO comment, RedirectAttributes ra) {
//		System.out.println("comment con id : " + comment.getId());
//		System.out.println("comment con comment : " + comment.getComment());
		ra.addFlashAttribute("id", comment.getId());
		service.commentWrite(comment);
		outId = comment.getPostId();
		return "freedomContent";
	}
	
	//댓글 리스트
//	@ResponseBody
//	@PostMapping(value="freedomContent/commentList", produces="application/json; charset=UTF-8")
//	public String commentList(CommentDTO comment, Model model) {
//		System.out.println("outId : " + outId);
//		service.commentList(comment);
//		model.addAttribute("comment", comment);
//		return "freedom";
//	}
	@ResponseBody
	@PostMapping("freedomContent/commentList")
	public String commentList(@RequestBody CommentDTO comment, RedirectAttributes ra) {
		comment.setPostId(outId);
//		System.out.println("modify con id : " + post.getId() + ", " + outId);
//		System.out.println("modify con title : " + post.getTitle());
		ra.addFlashAttribute("id", comment.getPostId());
		service.commentList(comment);
		return "freedomContent";
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
