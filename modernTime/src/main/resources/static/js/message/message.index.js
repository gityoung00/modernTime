
$().ready(function() {
	var $container = $('#container');
	var $messageBoxes = $container.find('div.messageboxes');
	var $messages = $container.find('div.messages');
	var $messageMore = $('#messageMore');
	var $messageSend = $('#messageSend');
	var $messageSendButton = $messageSend.find('input[type="button"]');



	var _set = {
		limitNum: 50,
		isRead: 0,
		lastMessageCreatedAt: '',
		isMessageBoxesRendered: false,
		isMessageBoxesLoadCompleted: false,
		boxId: 0,
		isMessagesRendered: false
	};
	var _fn = {
		init: function() {
			_fn.loadMessageBoxes(function(data) {
				console.log("data: ", data)
				_fn.appendMessageBoxes(data.data);

				// 페이지 로딩
				$messageBoxes.find('div.items').find('a.item').each((idx, item) => {
					if ($(item).attr('href') == location.pathname) {
						_fn.openMessages($(item).data('id'));
					}
				})
				if ($container.data('box-id') > 0) {
					_fn.openMessages($container.data('box-id'));
				} else {
					_set.isMessagesRendered = true;
				}
			});
			console.log("pathname", location.pathname)


			// 채팅방 클릭했을때
			$messageBoxes.find('div.items').on('scroll', function() {
				_fn.onMessageBoxesScroll();
			}).on('click', 'a.item', function() {
				console.log("this: ", this)
				//				console.log("a.item. click", _set.isMessagesRendered)
				if (_set.isMessagesRendered === true) {
					location.href=$(this).attr('href')
//					console.log($(this).data('id'))
//					_gfn.pushHistoryState($(this).attr('href'), { boxId: $(this).data('id') });
//					_fn.openMessages($(this).data('id'));
				}
				return false;
			});

			$messages.on('click', 'div.title a.back', function() {
				history.go(-1);
			}).on('click', 'div.title a.refresh', function() {
				if (_set.boxId > 0 && _set.isMessagesRendered === true) {
					_fn.loadMessages(function(data) {
						//						console.log("sdsdfsfsdfsd", data.data);
						_fn.appendMessages(data);
					});
				}
			}).on('click', 'div.title a.more', function() {
				_fn.openMessageMore();
			});

			$messageMore.find('a.close').on('click', function() {
				_fn.closeMessageMore();
			});
			$messageMore.on('click', 'ul li a', function() {
				_fn.onClickMoreMenu($(this).data('menu'));
			});

			setTimeout(function() {
				$(window).on('popstate', function() {
					if (history.state && history.state.boxId > 0) {
						console.log("history", history)
						_fn.openMessages(history.state.boxId);
					} else {
						_fn.closeMessages();
					}
					if ($messageMore.is(':visible')) {
						_fn.closeMessageMore();
					}
				});
			}, 0);
		},
		loadMessageBoxes: function(callback) {
			_set.isMessageBoxesRendered = false;
			$messageBoxes.find('div.items div.loading').show();
			//			var params = {
			//				limitNum: _set.limitNum,
			//				isRead: _set.isRead
			//			};
			//			if (_set.lastMessageCreatedAt) {
			//				params.lastMessageCreatedAt = _set.lastMessageCreatedAt;
			//			}

			$.ajax({
				url: '/message/find/list',
				xhrFields: { withCredentials: true },
				type: 'POST',
				data: {},
				success: function(data) {
					callback(JSON.parse(data));
				}
			});
		},
		appendMessageBoxes: function(data) {
			var $loading = $messageBoxes.find('div.items div.loading');
			data.forEach(function(chat) {
				var id = Number(chat.roomId);
				var isAnonym = Number(chat.isAnonym);
				var nickname = (isAnonym == 0) ? chat.nickname : "익명";
				var message = chat.message;
				var createDate = chat.createDate;
				var unreadCount = chat.unreadCount;

				//				console.log("id: ", id, "nickname: ", nickname)
				var $item = $('<a></a>').addClass('item').attr('href', '/message/' + id).data({ id: id, nickname: nickname });
				if (id === _set.boxId) {
					$item.addClass('active');
					$messages.find('div.title h2').html(nickname);
				}
				$('<time></time>').text(_gfn.formatRelativeDate(createDate)).appendTo($item);
				$('<h3></h3>').html(nickname).appendTo($item);
				if (unreadCount > 0) {
					$item.addClass('unread');
					$('<p></p>').addClass('count').text('+' + unreadCount).appendTo($item);
				}
				$('<p></p>').addClass('text').html(message).appendTo($item);
				$item.insertBefore($loading);
				_set.lastMessageCreatedAt = createDate;
			});
			_set.isMessageBoxesRendered = true;
			$loading.hide();

			//			if (data.length !== _set.limitNum) {
			//				if (_set.isRead === 0) {
			//					_set.isRead = 1;
			//					_set.lastMessageCreatedAt = '';
			//					_fn.loadMessageBoxes(function(data) {
			//						_fn.appendMessageBoxes(data);
			//					});
			//				} else {
			//					_set.isMessageBoxesLoadCompleted = true;
			//					if ($messageBoxes.find('div.items a.item').length === 0) {
			//						$('<div></div>').addClass('empty').html('<p>받은 쪽지가 없습니다</p>').insertBefore($loading);
			//					}
			//				}
			//			}
		},
		onMessageBoxesScroll: function() {
			if ($messageBoxes.is(':not(:visible)') || _set.isMessageBoxesRendered === false || _set.isMessageBoxesLoadCompleted === true) {
				return;
			}
			var $items = $messageBoxes.find('div.items');
			var scrollTop = $items.scrollTop();
			var remainingHeight = $items[0].scrollHeight - $items.height();
			if (scrollTop < remainingHeight - 300) {
				return;
			}
			_fn.loadMessageBoxes(function(data) {
				_fn.appendMessageBoxes(data);
			});
		},
		openMessages: function(boxId) {
			_set.isMessageBoxesRendered = true;
			_set.boxId = boxId;
			console.log("boxId: " + boxId);

			var sockJs = null;
			var stomp = null;
			sockJs = new SockJS("/stomp/chat");
			stomp = Stomp.over(sockJs);
			stomp.connect({}, function() {
				console.log("stomp connect ")
				stomp.subscribe("/sub/" + boxId, function(chat) {
					console.log("chat: ", chat)
					
					_fn.appendMessage(JSON.parse(chat.body))

				});
				//			console.log("messageSendButton: ", $messageSendButton)
				$messageSendButton.on('click', function(event) {
					var params = _fn.onSubmitMessageSend(boxId);
					$messageSend.hide();
					//					_fn.closeMessageSend();
					console.log("param: ", params)
					stomp.send('/pub/chat/send/' + boxId, {}, JSON.stringify(params))

				});



			});
			$messageBoxes.removeClass('visible');
			$messageBoxes.find('div.items a.item').removeClass('active');
			//
			var nickname = '';
			var $activeMessageBox = $messageBoxes.find('div.items a.item').filter(function() {
				return $(this).data('id') === _set.boxId;
			});
			if ($activeMessageBox.length > 0) {
				$activeMessageBox.addClass('active').removeClass('unread');
				$activeMessageBox.find('p.count').remove();
				nickname = $activeMessageBox.data('nickname');
			}
			//
			$messages.addClass('visible').empty();
			var $title = $('<div></div>').addClass('title').appendTo($messages);
			$('<a></a>').addClass('back').text('뒤로').appendTo($title);
			$('<h2></h2>').html(nickname).appendTo($title);
			$('<a></a>').addClass('send').attr({ 'data-modal': 'messageSend', 'data-box-id': boxId }).text('쪽지 보내기').appendTo($title);
			$('<a></a>').addClass('refresh').text('새로고침').appendTo($title);
			$('<a></a>').addClass('more').text('더보기').appendTo($title);
			$('<div></div>').addClass('items').appendTo($messages);
			_fn.loadMessages(function(data) {
				console.log("loadMessages", data)
				_fn.appendMessages(data.data);
			});
		},
		closeMessageSend: function() {
			$messageSend.hide();
			if ($container.is(':has(div.messages:visible)')) {
				$container.find('div.messages div.title a.refresh').click();
			}
		},
		onSubmitMessageSend: function(boxId) {
			var confirmMessage;
			if (_set.isAnonym === 1) {
				confirmMessage = '상대방에게 익명으로 쪽지가 보내집니다.\n쪽지를 보내시겠습니까?';
			} else {
				confirmMessage = '상대방에게 닉네임으로 쪽지가 보내집니다.\n쪽지를 보내시겠습니까?';
			}
			if (!confirm(confirmMessage)) {
				return;
			}
			var $textarea = $messageSend.find('textarea');
			if ($textarea.val().replace(/ /gi, '').length === 0) {
				alert('내용을 입력해주세요.');
				$textarea.focus();
				return;
			}

			var params = {
				roomId: boxId,
				message: $textarea.val(),
				sender: myId,


			};

			//			if (_set.boxId > 0) {
			//				params.box_id = _set.boxId;
			//			} else if (_set.articleId > 0) {
			//				params.article_id = _set.articleId;
			//			} else if (_set.commentId > 0) {
			//				params.comment_id = _set.commentId;
			//			}
			_set.isSubmitted = true;
			return params;

		},
		loadMessages: function(callback) {
			_set.isMessagesRendered = true;
			var $items = $messages.find('div.items').empty();
			$('<div></div>').addClass('loading').appendTo($items);
			$.ajax({
				url: '/chat/list/',
				xhrFields: { withCredentials: true },
				type: 'POST',
				data: {
					roomId: _set.boxId
				},
				success: function(data) {
					//					callback(data);
					callback(JSON.parse(data));
				}
			});
		},
		appendMessages: function(data) {
			var $items = $messages.find('div.items');
			//			console.log($items)
			data.forEach(function(chat) {
				//				console.log(chat)
				var message = chat.message.replace(/(\n|\r\n)/g, '<br>');;
				console.log(chat.flag, myId, chat.sender)
				var type = (chat.flag == 0) ? 0 : ((myId == chat.sender) ? 2 : 1);
				var createDate = `${chat.createDate[0]}-${(chat.createDate[1]).toString().padStart(2, '0')}-${(chat.createDate[2]).toString().padStart(2, '0')}T${(chat.createDate[3]).toString().padStart(2, '0')}:${(chat.createDate[4]).toString().padStart(2, '0')}:${(chat.createDate[5]).toString().padStart(2, '0')}`;
				console.log(createDate)
				//				console.log(message, type, createDate)
				var $item = $('<div></div>').addClass('item');
				$('<time></time>').text(_gfn.formatRelativeDate(createDate)).appendTo($item);
				if (type === 1) {
					$('<p></p>').addClass('type type1').text('받은 쪽지').appendTo($item);
				} else if (type === 2) {
					$('<p></p>').addClass('type type2').text('보낸 쪽지').appendTo($item);
				} else {
					$('<p></p>').addClass('type type0').text('안내').appendTo($item);
				}
				
				$('<p></p>').addClass('text').html(message).appendTo($item);
				$item.appendTo($items);
			});
			_set.isMessagesRendered = true;
			$items.find('div.loading').remove();
			//			if ($response.find('message').length > 0) {
			//				$messages.find('div.title a.send').attr('data-is-anonym', $response.attr('is_anonym'));
			//				if ($messageBoxes.find('div.items').is(':has(a.item.active)')) {
			//					var $recentMessageItem = $items.find('div.item').first();
			//					var $activeBoxItem = $messageBoxes.find('div.items a.item.active');
			//					$activeBoxItem.find('time').html($recentMessageItem.find('time').html());
			//					$activeBoxItem.find('p.text').html($recentMessageItem.find('p.text').html().split("<br>")[0]);
			//				}
			//			}
		},
		appendMessage: function(chat) {
			console.log(chat)
			var $items = $messages.find('div.items');
			var message = chat.message;
			
			console.log(chat.flag, myId, chat.sender)
			var type = (chat.flag == 0) ? 0 : ((myId == chat.sender) ? 2 : 1);
			// 2022-08-18T01:21:37
			var today = new Date();
			today.setHours(today.getHours() + 9);
			today = today.toISOString()
			var createDate = today;
			//				console.log(message, type, createDate)
			var $item = $('<div></div>').addClass('item');
			$('<time></time>').text(_gfn.formatRelativeDate(createDate)).appendTo($item);
			if (type === 1) {
				$('<p></p>').addClass('type type1').text('받은 쪽지').appendTo($item);
			} else if (type === 2) {
				$('<p></p>').addClass('type type2').text('보낸 쪽지').appendTo($item);
			} else {
				$('<p></p>').addClass('type type0').text('안내').appendTo($item);
			}
			$('<p></p>').addClass('text').html(message).appendTo($item);
			$item.prependTo($items);
			_set.isMessagesRendered = true;

			// 쪽지함 리스트에 있는 text도 업데이트			
			$messageBoxes.find('a.item.active > p').text(message)
			$items.find('div.loading').remove();
		},
		closeMessages: function() {
			$messageBoxes.addClass('visible');
			$messageBoxes.find('div.items a.item').removeClass('active');
			$messages.removeClass('visible').empty();
			_set.boxId = 0;
			_set.isMessagesRendered = true;
		},
		openMessageMore: function() {
			$messageMore.show();
		},
		closeMessageMore: function() {
			$messageMore.hide();
		},
		onClickMoreMenu: function(menu) {
			if (menu === 'removeAll') {
				var nickname = $messages.find('div.title h2').html();
				if (!confirm(nickname + '님과의 모든 쪽지를 삭제하시겠습니까?')) {
					return;
				}
				$.ajax({
					url: '/remove/messageBox/message/list',
					xhrFields: { withCredentials: true },
					type: 'POST',
					data: {
						box_id: _set.boxId
					},
					success: function() {
						$messageBoxes.find('div.items a.item.active').remove();
						history.go(-1);
					}
				});
			} else if (menu === 'block') {
				if (!confirm('쪽지 수신 및 발신이 모두 차단되며, 다시 해제하실 수 없습니다.')) {
					return;
				}
				$.ajax({
					url: '/update/messageBox/block',
					xhrFields: { withCredentials: true },
					type: 'POST',
					data: {
						box_id: _set.boxId
					},
					success: function(data) {
						var responseCode = Number($(data).find('response').text());
						if (responseCode === -2) {
							alert('이미 차단하였습니다.');
						}
						_fn.closeMessageMore();
					}
				});
			} else if (menu === 'reportSpam') {
				if (!confirm('쪽지 내용의 일부가 신고 내용 확인을 위해 검토됩니다. 또한 쪽지 수신 및 발신이 모두 차단되며 다시 해제하실 수 없습니다.')) {
					return;
				}
				$.ajax({
					url: '/update/messageBox/block',
					xhrFields: { withCredentials: true },
					type: 'POST',
					data: {
						box_id: _set.boxId,
						abuse_report: 'true'
					},
					success: function(data) {
						var responseCode = Number($(data).find('response').text());
						if (responseCode === -3) {
							alert('이미 신고하였습니다.');
						}
						_fn.closeMessageMore();
					}
				});
			}
		}
	};
	//	// websocket 연결
	//	var sockJs = new SockJS("/stomp/chat");
	//	var stomp = Stomp.over(sockJs);
	//	stomp.connect({}, function() {
	//		console.log("stomp connect ")
	//		_fn.init();
	//	});
	_fn.init();
});
