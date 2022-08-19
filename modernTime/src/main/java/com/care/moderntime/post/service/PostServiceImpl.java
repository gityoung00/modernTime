package com.care.moderntime.post.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.care.moderntime.post.dto.PostDTO;
import com.care.moderntime.post.dto.PostLikeDTO;
import com.care.moderntime.post.repository.IPostDAO;

@Service
public class PostServiceImpl implements IPostService{
	
	@Autowired private IPostDAO mapper;
	@Autowired HttpSession session;
	
	int outId = 0;
	
	@Override
	public String writeProc(PostDTO post) {
//		String userId = (String)session.getAttribute("user_id");
//		System.out.println("write(service) userId : " + userId);
		
		if(post.getTitle() == null || post.getTitle().isEmpty())
			return "제목을 입력하세요.";
		if(post.getContent() == null || post.getContent().isEmpty())
			return "내용을 입력하세요.";
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd HH:mm");
		post.setCreate_date(sdf.format(date));
		
		post.setBoard_id(1);
		
		mapper.writeProc(post);
		
//		System.out.println("post Id : " + post.getId() + "outID : " + outId);
//		
//		session.removeAttribute("post");
//		
//		if(post.getId() == 0) {
//			mapper.writeProc(post);
//			return "작성 성공";
//		}else {
//			mapper.modifyProc(post);
//			return "수정 성공";
//		}
		return null;
	}

	@Override
	public Map<String, Object> listProc() {
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<PostDTO> listProc = mapper.listProc();
		
		res.put("data", listProc);
		
		return res;
	}


	@Override
	public PostDTO viewProc(int id) {
		System.out.println("view(service) id : " + id);
		PostDTO post = mapper.viewProc(id);
		
		session.setAttribute("post", post);
		
//		if(post != null) {
//			outId = id;
//			session.setAttribute("post", post);
//		}else {
//			outId = 0;
//		}
		
		return post;
	}

	@Override
	public String modifyProc(PostDTO post) {
		System.out.println("modify(service) id : " + post.getId());
		mapper.modifyProc(post);
		return null;
	}

	@Override
	public String deleteProc(PostDTO post) {
		System.out.println("delete(service) id : " + post.getId());
		mapper.deleteProc(post);
		return null;
		
	}

	@Override
	public void searchProc(Model model, int currentPage, String search, String select, HttpServletRequest req) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("search", search);
		map.put("select", select);
		
		int totalCount = mapper.postCount(map);
		int pageBlock = 10;
		int end = currentPage * pageBlock;
		int begin = end+1 - pageBlock;

		ArrayList<PostDTO> boardList = mapper.searchProc(begin, end, select, search);
		model.addAttribute("boardList", boardList);

		String url = req.getContextPath() + "/searchProc?";
		if(select != null) {
			url+="select="+select+"&";
			url+="search="+search+"&";	
		}
		url+="currentPage=";
		model.addAttribute("page", PageService.getNavi(currentPage, pageBlock, totalCount, url));
	}

	//공감
	@Override
	public String likeProc(PostDTO post) {
		System.out.println("likeProc(service) id : " + post.getId());
		System.out.println("likeProc(service) like_count : " + post.getLike_count());
		
		int tmp = mapper.countLike(post);
		int addLike = mapper.tableCountLike(post) + 1;
		System.out.println("tmp : " + tmp + " /addLike : " + addLike);
		if(tmp == 0) {
			post.setLike_count(addLike);
			mapper.likeProc(post);
			return "+1";
		}else {
			return "그대로";
		}
	}
	@Override
	public String insertLike(PostLikeDTO postlike) {
		System.out.println("insertLike(service) userId : " + postlike.getUser_id());
		System.out.println("insertLike(service) postId : " + postlike.getPost_id());
		
		int tmp = mapper.countLike(postlike);
		if(tmp == 0) {
			mapper.insertLike(postlike);
			return "성공";
		}else
			return "실패";
	}
	
	//스크랩
	@Override
	public String scrapProc(PostDTO post) {
		System.out.println("scrapProc(service) id : " + post.getId());
		
		int tmp = mapper.countScrap(post);
		int addScrap = mapper.tableCountScrap(post) + 1;
		System.out.println("tmp : " + tmp + " /addScrap : " + addScrap);
		if(tmp == 0) {
			post.setScrap_count(addScrap);
			mapper.scrapProc(post);
			return "+1";
		}else {
			return "그대로";
		}
	}
	@Override
	public String insertScrap(PostLikeDTO postlike) {
		System.out.println("insertScrap(service) userId : " + postlike.getUser_id());
		System.out.println("insertScrap(service) postId : " + postlike.getPost_id());
		
		int tmp = mapper.countScrap(postlike);
		if(tmp == 0) {
			mapper.insertScrap(postlike);
			return "성공";
		}else 
			return "실패";
	}
	




	

}
