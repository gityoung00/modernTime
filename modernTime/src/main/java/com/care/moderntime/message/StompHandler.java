package com.care.moderntime.message;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor{

	    @Override
	    public Message<?> preSend(Message<?> message, MessageChannel channel) {
	        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
	        if(accessor.getCommand() == StompCommand.CONNECT) {
	            if(false)
	                throw new AccessDeniedException("");
	        }
	        return message;
	    }
}
