package com.care.moderntime.common.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class CommonController {
	
	@GetMapping("/expired")
	public String expired() {
		return "user/tokenExpired";
	}
}
