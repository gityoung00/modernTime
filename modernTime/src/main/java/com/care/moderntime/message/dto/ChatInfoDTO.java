package com.care.moderntime.message.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatInfoDTO {
	// 내 댓글
	// {{ 게시판 이름 }}에 작성된 댓글을 통해 시작된 쪽지입니다.
	// {{ 게시글 내용 }}
	
	// 상대방 댓글
	// {{ 게시판 이름 }}에 작성된 {{ 댓글 닉네임 }}의 댓글을 통해 시작된 쪽지입니다.
	// {{ 게시글 내용 }}
	
	// 내 게시글
	// {{ 게시판 이름 }}에 작성된 글을 통해 시작된 쪽지입니다.
	// {{ 게시글 내용 }}
	
	// 상대방 게시글
	// {{ 게시판 이름 }}에 작성된 {{ 게시글 닉네임 }}의 게시글을 통해 시작된 쪽지입니다.
	// {{ 게시글 내용 }}
	
	// 필요한 정보, 게시판 이름, 게시글, 댓글 닉네임(익명여부), 게시글 내용 -> 시작점은 commentId, postId
	
	// 기본 안내글
	// 쪽지 이용 시 개인정보 및 금융정보 보호에 유의해주시기 바랍니다.
	// 광고, 스팸, 사기 등의 쪽지를 받았을 경우 스팸신고를 눌러주세요.
	
	private String bName;
	private String title;
	private int isAnonym;
	private String userId;
	private String nickname;
	
	public ChatInfoDTO() {};
	
	public ChatInfoDTO(String bName, String title, int isAnonym, String userId, String nickname) {
		super();
		this.bName = bName;
		this.title = title;
		this.isAnonym = isAnonym;
		this.userId = userId;
		this.nickname = nickname;
	}
	
	
	
	
	

}
