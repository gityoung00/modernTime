package com.care.moderntime.post.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.CommentLikeDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.dto.PostLikeDTO;
import com.care.moderntime.post.service.ICommentService;

@Controller
public class CommentController {
	final static Logger logger = LoggerFactory.getLogger(PostController.class);

	@Autowired ICommentService service;
	
	//댓글 작성
	@ResponseBody
	@PostMapping(value="/freedomContent/commentWrite")
	public String commentWrite(@RequestBody CommentDTO comment, RedirectAttributes ra) {
		System.out.println("commentWrite(con) id : " + comment.getId());
		System.out.println("commentWrite(con) post_id : " + comment.getPost_id());
		ra.addFlashAttribute("id", comment.getId());
		service.commentWrite(comment);
		return "freedomContent";
	}
	
	//댓글 리스트
	@ResponseBody
	@PostMapping(value="/commentList", produces="application/json; charset=UTF-8")
	public Map<String, Object> commentList(@RequestParam int post_id) {
		System.out.println("commentList(con) post_id : " + post_id);
		return service.commentList(post_id);
	}
	
	//댓글 삭제
	@ResponseBody
	@PostMapping(value = "/commentRemove", produces = "text/html; charset=UTF-8")
	public String commentRemove(@RequestParam int id) {
		System.out.println("\ncommentRemove(con) id : " + id);
		service.commentRemove(id);
		return "freedomContent";
	}
	
	//공감
	@ResponseBody
	@PostMapping("freedomContent/likeCommentProc")
	public String likeCommentProc(@RequestBody CommentDTO comment, RedirectAttributes ra) {
		System.out.println("\nlikeCommentProc(con) id : " + comment.getId());
		ra.addFlashAttribute("id", comment.getId());
		service.likeCommentProc(comment);
		return "freedomContent";
	}
	
	//like테이블에 insert
	@ResponseBody
	@PostMapping("freedomContent/insertCommentLike")
	public String insertCommentLike(@RequestBody CommentLikeDTO commentLike) {
		System.out.println("insertCommentLike(con) userId : " + commentLike.getUser_id());
		System.out.println("insertCommentLike(con) comment_id : " + commentLike.getComment_id());
		String result = service.insertCommentLike(commentLike);
		if(result.equals("성공"))
			return result;
		return result;
	}

}
