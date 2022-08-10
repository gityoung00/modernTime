package com.care.moderntime.admin.service;

public class PageService {
	public static String getNavi(int currentPage, int pageBlock, int totalPage, String url) {
		int blockCnt = totalPage / pageBlock;
		if (totalPage % pageBlock > 0)
			blockCnt++;
		String result = "";
		if (currentPage != 1)
			result += "<a href='" + url + (currentPage - 1) + "'> [이전] </a>";
		for (int i = 1; i <= blockCnt; i++) {
			if (currentPage == i)
				result += "<b>";
			result += "<a href='" + url + i + "'> " + i + " </a>";
			if (currentPage == i)
				result += "</b>";
		}
		if (currentPage != blockCnt)
			result += "<a href='" + url + (currentPage + 1) + "'> [다음] </a>";
		return result;
	}
}