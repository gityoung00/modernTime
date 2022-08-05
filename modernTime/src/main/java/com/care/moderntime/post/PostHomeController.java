package com.care.moderntime.post;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PostHomeController {
	
	@Autowired HttpSession session;
	
//	public String checkSession(String url) {
//		String id = (String)session.getAttribute("id");
//		if(id == null)
//			return "member/loginForm";
//		return url;
//	}
//	
//	@RequestMapping(value = "/freedom")
//	public String freedom() {
//		String url = checkSession("post/freedom");
//		return url;
//	}
}
