package com.care.moderntime.bookstore;

import java.util.Map;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.care.moderntime.bookstore.service.BookStoreChatService;
import com.care.moderntime.message.dto.ChatDTO;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BookStoreChatController {
	
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final BookStoreChatService bscService;

	@RequestMapping("messagebox")
	public String messageMybox() {
		return "bookstore/messageBox";
	}

	@ResponseBody
	@GetMapping("find/messageboxes")
	public Map<String, Object> findMessageBoxes() {
		return bscService.getChatAllList();
	}
	

	@GetMapping("message/box/{boxId}")
	public String messageChat() {
		return "bookstore/message";
	}

	@ResponseBody
	@GetMapping("find/messages")
	public Map<String, Object> findMessages(@RequestParam int id) {
		return bscService.getChatList(id);
	}

	// 판매자에게 쪽지보내기
	@ResponseBody
	@PostMapping("book/save/message")
	public int saveMessage(@RequestBody Map<String, Object> params) {
		return bscService.makeInfoChat(params);
	}
	
	// 채팅방에서 메세지 전송
	@MessageMapping("book/chat/send/{id}")
	public void sendMsg(@DestinationVariable Integer id, @RequestBody Map<String, String> data) {
		String message = data.get("message");
		String sender = data.get("sender");
		ChatDTO chat = new ChatDTO(id, message, sender, 0, 1);
		bscService.sendChat(chat);

		simpMessagingTemplate.convertAndSend("/sub/" + id, chat);

	}

}
