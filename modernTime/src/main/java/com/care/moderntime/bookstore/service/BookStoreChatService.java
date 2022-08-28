package com.care.moderntime.bookstore.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.care.moderntime.bookstore.dao.IBookStoreDAO;
import com.care.moderntime.bookstore.dto.BookChatListDTO;
import com.care.moderntime.message.dao.ChatDAO;
import com.care.moderntime.message.dto.ChatDTO;
import com.care.moderntime.message.dto.ChatInfoDTO;
import com.care.moderntime.message.dto.ChatListDTO;
import com.care.moderntime.message.dto.RoomDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookStoreChatService {

	private final ChatDAO chatDao;
	private final IBookStoreDAO bookDao;
	private final HttpSession session;

	// 채팅방 리스트 가져오기
	public Map<String, Object> getChatAllList() {
		Map<String, Object> res = new HashMap<String, Object>();
		String id = (String) session.getAttribute("id");

		List<BookChatListDTO> chatList = chatDao.getMyBookChatList(id);
		res.put("data", chatList);
		return res;
	}

	// 채팅방 개설해서 두 유저간 연결
	public int makeInfoChat(Map<String, Object> params) {
		String sender = (String) session.getAttribute("id");
		System.out.println("makeInfoChat");
		System.out.println(params.get("message"));
		System.out.println(params.get("title"));
		System.out.println(params.get("bookId"));
		
		// 받아오는 정보: message, bookstore_id, title
		String message = (String) params.get("message");
		String title = (String) params.get("title");
		int bookId = Integer.parseInt((String) params.get("bookId"));

		// 채팅방 안내 메세지 생성
		// 안내메세지에서 받을 정보 => userid
		String receiver = bookDao.getReceiver(bookId);
		String infoMsg = "[책방에서 판매 중인 \"" + title + "\"에 대한 쪽지입니다. \n" +
						"책정보: <a href='/bookStoreView?id=" + bookId + "'>http://localhost/bookStoreView?id=" + bookId
						+ "</a>\n 에브리타임은 이용자 간 합의한 거래에 대해 책임을 지지 않습니다. 허위 사실, 사기 등에 유의하시기 바랍니다.";
		
		
		// userId가 없다면 -> 올바르지 않은 쪽지 상대입니다(responseCode = -3)
		if (receiver == null || receiver.isEmpty())
			return -3;

		// 채팅방 번호 - 최신 채팅방 번호 + 1
		int roomId = chatDao.getRoomId();
		System.out.println("roomId: " + roomId);
		// 두 유저간 연결
		RoomDTO sendRoom = new RoomDTO(roomId, "book", sender, 0);
		RoomDTO receiveRoom = new RoomDTO(roomId, "book", receiver, 0);
		chatDao.makeChatRoom(sendRoom);
		chatDao.makeChatRoom(receiveRoom);

		// 알림 메세지 저장
		// room_id, message, sender, is_readed, flag(0: 알림, 1: 유저간 얘기)
		ChatDTO chatInfo = new ChatDTO(roomId, infoMsg, sender, 1, 0);
		chatDao.saveChat(chatInfo);
		
		// 보낸 쪽지 저장
		ChatDTO chat = new ChatDTO(roomId, message, sender, 0, 1);
		chatDao.saveChat(chat);
		
		return 1;
	}
	
	public Map<String, Object> getChatList(int roomId){
		Map<String, Object> res = new HashMap<String, Object>();
		String id = (String) session.getAttribute("id");
		System.out.println("id: " + id + ", roomId: " + roomId);
//		if (id == null || id.isEmpty()) return null;
		
		
		// 채팅 리스트 있는 친구들 isReaded=1로 바꾸기
		chatDao.updateIsReaded(roomId, id);
		
		// chat list 가져오기
		ArrayList<ChatDTO> chatList = chatDao.getChatList(roomId);
		res.put("data", chatList);
		return res;
	}
	
	// 채팅 보내기
	public void sendChat(ChatDTO chat) {
		// 상대방 접속 여부 확인..?
		// 상대방이 채팅방에 있으면 is_readed = 1 아니면 0
		chatDao.saveChat(chat);
	}


}
