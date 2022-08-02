


























































$().ready(function () {
	var $container = $('#container');
	var $search, $friendrequestlist, $friendlist;
	var _fn = {
		initiate: function () {
			$search = $container.find('form.search');
			$friendrequestlist = $container.find('div.friendrequestlist');
			$friendlist = $container.find('div.friendlist');
			$friendrequestlist.on('click', 'a.friend > ul.buttons > li.accept', function () {
				var $a = $(this).parent().parent();
				_gfn.acceptFriendRequest($a.data('id'), 1);
				$a.remove();
				return false;
			}).on('click', 'a > ul.buttons > li.reject', function () {
				var $a = $(this).parent().parent();
				_gfn.acceptFriendRequest($a.data('id'), -1);
				$a.remove();
				return false;
			});
			_fn.loadFriendList();
		},
		loadFriendList: function () {
			_fn.ajaxFriendList(function (data) {
				if (!data) {
					return false;
				}
				_fn.createFriendList(data);
			});
		},
		ajaxFriendList: function (callback) {
			$.ajax({
				url: _apiServerUrl + '/find/friend/list',
				xhrFields: {withCredentials: true},
				type: 'POST',
				success: function (data) {
					var responseCode;
					if (!$(data).find('response').children().length) {
						responseCode = $(data).find('response').text();
					}
					if (responseCode === '0') {
						callback();
					} else {
						callback(data);
					}
				}
			});
		},
		createFriendList: function (data) {
			$(data).find('friendrequest').each(function () {
				var $this = $(this);
				var $a = $('<a></a>').attr('href', '/@' + $this.attr('userid')).addClass('friend').data('id', $this.attr('id')).appendTo($friendrequestlist);
				var $h3 = $('<h3></h3>').text('님이 친구 요청을 보냈습니다.').appendTo($a);
				$('<em></em>').text($this.attr('name')).prependTo($h3);
				var $buttons = $('<ul></ul>').addClass('buttons').appendTo($a);
				$('<li></li>').text('수락').addClass('accept highlight').appendTo($buttons);
				$('<li></li>').text('거절').addClass('reject').appendTo($buttons);
				$('<hr>').appendTo($a);
				$friendrequestlist.show();
			});
			$(data).find('friend').each(function () {
				var $this = $(this);
				var $a = $('<a></a>').attr('href', '/@' + $this.attr('userid')).addClass('friend').appendTo($friendlist);
				$('<h3></h3>').text($this.attr('name')).appendTo($a);
			});
			if (!$friendlist.find('a.friend').length) {
				$('<div></div>').html('친구를 추가하면 친구의 시간표를 확인할 수 있어요!').addClass('dialog').appendTo($friendlist);
			}
		}
	};
	_fn.initiate();
});
