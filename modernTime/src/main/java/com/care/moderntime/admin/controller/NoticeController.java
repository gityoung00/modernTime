package com.care.moderntime.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.care.moderntime.admin.dto.NoticeDTO;
import com.care.moderntime.admin.service.NoticeService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class NoticeController {

	private final NoticeService noticeService;
	
	@GetMapping("admin")
	public String admin() {
		return "admin/index";
	}

	@GetMapping("admin/notice")
	public String notice() {
		return "admin/notice/notice";
	}

	@ResponseBody
	@PostMapping(value = "admin/notice")
	public String noticeWrite(@RequestBody(required = false) NoticeDTO dto) throws IOException {
		System.out.println("noticeWrite");
		String result = noticeService.insert(dto);
		System.out.println("result: " + result);
		return result;
	}

	@ResponseBody
	@PostMapping("admin/save/picture")
	public int adminImage(@RequestParam("file") MultipartFile picture) throws IOException {
		System.out.println(picture);
		int pictureId = noticeService.imageUpload(picture);
		return pictureId;
	}

	@ResponseBody
	@PostMapping(value = "admin/list", produces = "application/json; charset=UTF-8")
	public Map<String, Object> noticeList(@RequestBody Map<String, Object> conditions) {
		System.out.println("start_num : " + conditions.get("start_num"));
		System.out.println("limit_num : " + conditions.get("limit_num"));
		
		return noticeService.list(conditions);
	}

	// 공감하기
	@ResponseBody
	@PostMapping("notice/vote")
	public int voteNotice(@RequestParam(name="id") int noticeId) {
		return noticeService.voteNotice(noticeId);
	}
	
	// 스크랩하기
	@ResponseBody
	@PostMapping("notice/scrap")
	public int scrapNotice(@RequestParam(name="id") int noticeId) {
		System.out.println("scrapNotice");
		return noticeService.scrapNotice(noticeId);
	}
	
	
	@GetMapping("noticeView")
	public String noticeView(@RequestParam(name="id") int noticeId, Model model) {
//		System.out.println("notice id: " + noticeId);
		model.addAttribute("noticeView", noticeService.noticeView(noticeId));
		return "admin/notice/noticeView";
	}

	// 공지 수정
	@ResponseBody
	@PostMapping("notice/update")
	public String noticeUpdate(@RequestBody NoticeDTO dto) {
//			System.out.println(dto.getTitle());
//			System.out.println(dto.getContent());
//			System.out.println(dto.getId());
		noticeService.update(dto);
		return "공지 수정 완료";
	}

	@RequestMapping("noticeDelete")
	public String noticeDelete(String id) {
		String result = noticeService.delete(id);
		if (result.equals("삭제 완료")) {
			return "redirect:admin/notice";
		}
		return "admin/notice/noticeView";
	}

}
