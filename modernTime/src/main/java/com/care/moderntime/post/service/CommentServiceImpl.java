package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.care.moderntime.post.dto.CommentDTO;
import com.care.moderntime.post.dto.CommentLikeDTO;
import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.repository.ICommentDAO;
import com.care.moderntime.post.repository.IPostDAO;

@Service
public class CommentServiceImpl implements ICommentService{
	
	@Autowired private ICommentDAO mapper;
	@Autowired HttpSession session;

	@Override
	public String commentWrite(CommentDTO comment) {
		if(comment.getComment() == null || comment.getComment().isEmpty())
			return "댓글을 입력하세요.";
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
		comment.setCreate_date(sdf.format(date));
		
		mapper.commentWrite(comment);
		
		session.setAttribute("id", comment.getId());
		
		return null;
	}

	@Override
	public Map<String, Object> commentList(int post_id) {
		System.out.println("commentList(ser) post_id : " + post_id);
		
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<CommentDTO> commentList = mapper.commentList(post_id);
		ArrayList<CommentDTO> commentList2 = new ArrayList<CommentDTO>();
		
		PostDTO post = new PostDTO();
		post.setComment_count(commentList.size());
		
		// commentList 순서대로 돌면서
		for(int i=0; i<commentList.size(); i++) {
			// i번쨰의 comment의 p_comment_id가 0이면 commentList2에 추가
			if(commentList.get(i).getP_comment_id() == 0) {
				commentList2.add(commentList.get(i));
				// i+1번쨰 부터 commentLIst 끝까지 돌면서
				for(int j=i+1; j < commentList.size(); j++) {
					// j번쨰 comment의 p_comment_id가 i번쨰 comment id와 같다면
					if(commentList.get(j).getP_comment_id() == commentList.get(i).getId())
						// commentList2에 j번쨰 comment 추가
						commentList2.add(commentList.get(j));
				}
				// i번쨰의 comment의 p_comment_id가 0이 아니면 break
			} else {
				break;
			}
		}
		res.put("data", commentList2);
		return res;
	}

	@Override
	public String commentRemove(int id) {
		System.out.println("commentRemove(ser) id : " + id);
		mapper.commentRemove(id);
		return null;
	}

	@Override
	public String likeCommentProc(CommentDTO comment) {
		System.out.println("likeCommentProc(service) id : " + comment.getId());
		System.out.println("likeCommentProc(service) like_count : " + comment.getComment_like());
		
		int tmp = mapper.countCommentLike(comment);
		int addLike = mapper.tableCountLike(comment) + 1;
		if(tmp == 0) {
			comment.setComment_like(addLike);
			mapper.likeCommentProc(comment);
			return "+1";
		}else {
			return "그대로";
		}
		
	}

	@Override
	public String insertCommentLike(CommentLikeDTO commentLike) {
		System.out.println("insertCommentLike(service) userId : " + commentLike.getUser_id());
		System.out.println("insertCommentLike(service) commentId : " + commentLike.getComment_id());
		
		int tmp = mapper.countCommentLike(commentLike);
		if(tmp == 0) {
			mapper.insertCommentLike(commentLike);
			return "성공";
		}else
			return "실패";
	}

	

	


}
