package com.care.moderntime.post.service;

public class PageService {
	public static String getNavi(int currentPage, int pageBlock, int totalCount, String url) {
		int blockCnt = totalCount / pageBlock;
		
		if(totalCount % pageBlock > 0)
			blockCnt++;
		
		String result = "";
		if(currentPage != 1)
			// /quiz/memberListProc?currentPage=
			result+="<a href='"+url+(currentPage-1)+"'> [이전] </a>";
			
		for(int i = 1;i <= blockCnt; i++) {
			if(currentPage == i)
				result+="<b>";
			// /quiz/memberListProc?currentPage=
			result+="<a href='"+url+i+"'> "+ i +" </a>";
			if(currentPage == i)
				result+="</b>";
		}
		
		if(currentPage!=blockCnt) 
			result+="<a href='"+url+(currentPage+1)+"'> [다음] </a>";
		return result;
	}
}
