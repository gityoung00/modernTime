package com.care.moderntime.admin.dto;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeViewDTO {
	private int id;
	private int is_mine;
	private int is_scrapped;
	private String title;
	private String text;
	private String created_at;
	private int posvote;
	private int comment;
	private int comment_anonym = 0;
	private int scrap_count;
	private int is_questions = 0;
	private int hasNotification = 0;
	private String user_type;
	private int user_id;
	private String user_nickname = "에브리타임";
	private String user_picture = "https://cf-fpi.everytime.kr/5/1579249303.png";
	
	private ArrayList<PictureDTO> attachs;
}
