package com.care.moderntime.message.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.care.moderntime.message.dao.ChatDAO;
import com.care.moderntime.message.dto.ChatDTO;
import com.care.moderntime.message.dto.ChatInfoDTO;
import com.care.moderntime.message.dto.ChatListDTO;
import com.care.moderntime.message.dto.RoomDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final ChatDAO chatDao;
	private final HttpSession session;

	// 채팅방 리스트 가져오기
	public ArrayList<ChatListDTO> getChatAllList() {
		String id = (String) session.getAttribute("id");
		System.out.println("id: " + id);
//		if (id == null || id.isEmpty()) return null;

		ArrayList<ChatListDTO> chatList = chatDao.findMessageList(id);
		System.out.println("chatlist");
		System.out.println(chatList);
		return chatList;
	}

	// 채팅방 개설해서 두 유저간 연결
	public int makeInfoChat(Map<String, Object> params) {
		String sender = (String) session.getAttribute("id");
		
		String type = (String) params.get("type");
		int typeId = (int) params.get("typeId");
		int isAnonym = (int) params.get("isAnonym");

		// 받아오는 정보: message, isAnonym, type, typeId

		// 게시글에서 쪽지보낼때 - 어떤 게시글, 댓글에서 쪽지가 시작됏는지 알아오기
		// 채팅방 안내 메세지 생성
		ChatInfoDTO info;
		String infoMsg;
		System.out.println("type: " + type + ", typeId: " + typeId);
		if (type.equals("post")) {
			// 게시글에서 채팅 보낼때
			System.out.println("post type");
			info = chatDao.getPostChatInfo(typeId);

		} else {
			// 댓글에서 채팅 보낼때
			System.out.println("comment type");
			info = chatDao.getCommentChatInfo(typeId);
		}
		System.out.println("bname" + info.getBName() + ", title: " + info.getTitle() + ", user: " + info.getUserId() + ", isanonym: " + info.getIsAnonym() + ", nickname: " + info.getNickname());
		// userId가 없다면 -> 올바르지 않은 쪽지 상대입니다(responseCode = -3)
		if (info.getUserId() == null || info.getUserId().isEmpty())
			return -3;

		// 게시글or댓글 작성자 == sender(나)
		if (info.getUserId() == sender) {
			infoMsg = info.getBName() + "에 작성된 " + ((type.equals("post")) ? "" : "댓")
					  + "글을 통해 시작된 쪽지입니다. \n 글 제목: " + info.getTitle();

		// 게시글or댓글 작성자 != sender(나)
		} else {
			infoMsg = info.getBName() + "에 작성된 " + ((info.getIsAnonym() > 0) ? ("익명" + info.getIsAnonym()) : info.getNickname())
					+ "님의 " + ((type.equals("post")) ? "" : "댓")
					+ "글을 통해 시작된 쪽지입니다. \n 글 제목: " + info.getTitle();
		}
		System.out.println("infoMsg: " + infoMsg);
		// 채팅방 번호 - 최신 채팅방 번호 + 1
		int roomId = chatDao.getRoomId();
		System.out.println("roomId: " + roomId);
		// 두 유저간 연결
		RoomDTO sendRoom = new RoomDTO(roomId, sender, isAnonym);
		RoomDTO receiveRoom = new RoomDTO(roomId, info.getUserId(), isAnonym);
		chatDao.makeChatRoom(sendRoom);
		chatDao.makeChatRoom(receiveRoom);

		// 알림 메세지 저장
		// room_id, message, sender, is_readed, flag(0: 알림, 1: 유저간 얘기)
		ChatDTO chatInfo = new ChatDTO(roomId, infoMsg, sender, 1, 0);
		chatDao.saveChat(chatInfo);
		
		// 보낸 쪽지 저장
		String message = (String) params.get("message");
		ChatDTO chat = new ChatDTO(roomId, message, sender, 0, 1);
		chatDao.saveChat(chat);
		
		return 1;
	}
	
	public ArrayList<ChatDTO> getChatList(int roomId){
		String id = (String) session.getAttribute("id");
		System.out.println("id: " + id + ", roomId: " + roomId);
//		if (id == null || id.isEmpty()) return null;
		
		
		// 채팅 리스트 있는 친구들 isReaded=1로 바꾸기
		chatDao.updateIsReaded(roomId, id);
		
		// chat list 가져오기
		ArrayList<ChatDTO> chatList = chatDao.getChatList(roomId);
		System.out.println("chatlist");
		System.out.println(chatList);
		return chatList;
	}
	
	// 채팅 보내기
	public void sendChat(ChatDTO chat) {
		// 상대방 접속 여부 확인..?
		// 상대방이 채팅방에 있으면 is_readed = 1 아니면 0
		chatDao.saveChat(chat);
	}


}
