bookstore.message = {
	sending: false,
	loadMessages: function($messagesDiv, boxId) {
		var data = {};
		data.id = boxId;
		bookstore.fn.findMessages(data, function(response) {
			console.log(response)
			if (response.data.length == 0) {
				$('<div></div>').addClass('empty').text('아직 주고 받은 쪽지가 없습니다.').appendTo($messagesDiv);
				return false;
			}
			$(response.data).each(function() {
				console.log("this", this)
				bookstore.data.user.id = 'jiyoung1329';
				var type = (this.flag == 0) ? 0 : ((bookstore.data.user.id == this.sender) ? 2 : 1);
				var $message = $('<div></div>').addClass('message');
				if (type === 1) {
					$message.addClass('received');
					$('<span></span>').addClass('type').text('받은 쪽지').appendTo($message);
				} else if (type === 2) {
					$message.addClass('sent');
					$('<span></span>').addClass('type').text('보낸 쪽지').appendTo($message);
				} else {
					$message.addClass('info');
					$('<span></span>').addClass('type').text('안내').appendTo($message);
				}
				$('<time></time>').text(this.createDate).appendTo($message);
				$('<hr>').appendTo($message);
				//				var text = this.message.replace(/(https:\/\/bookstore.everytime.kr)(\/view\/[a-z0-9]{1,})/gi, '<a href="$2">$1$2</a>');
				var text = this.message.replace(/(\n|\r\n)/g, '<br>');
				$('<p></p>').html(text).appendTo($message);
				$message.appendTo($messagesDiv);
			});
		});
	}
};

$().ready(function() {
	var $messagetextForm = $('#messagetext > form');
	var $messagesDiv = $('#messages');

	urls = location.href.split("/");
	const boxId = urls[urls.length - 1];

	bookstore.message.loadMessages($messagesDiv, boxId);

	var sockJs = null;
	var stomp = null;
	sockJs = new SockJS("/stomp/chat");
	stomp = Stomp.over(sockJs);
	stomp.connect({}, function() {
		console.log("stomp connect ")
		stomp.subscribe("/sub/" + boxId, function(chat) {
			let message = JSON.parse(chat.body)
			console.log(message)
			
			bookstore.data.user.id = 'jiyoung1329';
			var type = (message.flag == 0) ? 0 : ((bookstore.data.user.id == message.sender) ? 2 : 1);
				var $message = $('<div></div>').addClass('message');
				if (type === 1) {
					$message.addClass('received');
					$('<span></span>').addClass('type').text('받은 쪽지').appendTo($message);
				} else if (type === 2) {
					$message.addClass('sent');
					$('<span></span>').addClass('type').text('보낸 쪽지').appendTo($message);
				} else {
					$message.addClass('info');
					$('<span></span>').addClass('type').text('안내').appendTo($message);
				}
				$('<time></time>').text(message.createDate).appendTo($message);
				$('<hr>').appendTo($message);
				//				var text = this.message.replace(/(https:\/\/bookstore.everytime.kr)(\/view\/[a-z0-9]{1,})/gi, '<a href="$2">$1$2</a>');
				var text = message.message.replace(/(\n|\r\n)/g, '<br>');
				$('<p></p>').html(text).appendTo($message);
				$message.prependTo($messagesDiv);

		});
		
		$messagetextForm
			.on('submit', function() {
				var $textInput = $messagetextForm.find('input[name="text"]');
				var text = $textInput.val().trim();
				if (text.length < 2) {
					alert('내용을 두 글자 이상 입력하세요!');
					$textInput.focus();
					return false;
				}
				params = {
					roomId: boxId,
					message: text,
					sender: bookstore.data.user.id
				}
				console.log(params)
				stomp.send('/pub/book/chat/send/' + boxId, {}, JSON.stringify(params))
				$textInput.val("");
				return false;
			})
			.on('click', 'div.sendbutton', function() {
				$messagetextForm.submit();
			});



	});




});
