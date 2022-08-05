


























































$().ready(function () {
	var $container = $('#container');
	var $banners = $('#banners');
	var $main;
	var _fn = {
		initiate: function () {
			$main = $container.find('div.main');
			_fn.loadHome();
		},

		loadHome: function () {
			_fn.ajaxHome(function (data) {
				if (!data) {
					return false;
				}
				_fn.createHome(data);
			});
		},
		ajaxHome: function (callback) {
			var condition = {
				campus_id: $('#communityCampusId').val()
			};
			$.ajax({
				url: _apiServerUrl + '/find/community/web',
				xhrFields: {withCredentials: true},
				data: condition,
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
		createHome: function (data) {
			var $response = $(data).find('response');
			$response.find('board').each(function () {
				var $boardData = $(this);
				var boardType = $boardData.attr('type');
				var $card = $('<div></div>').addClass('card');
				var $board = $('<div></div>').addClass('board').appendTo($card);
				var $h3 = $('<h3></h3>').appendTo($board);
				$('<a></a>').attr('href', '/' + $boardData.attr('id')).html($boardData.attr('name')).appendTo($h3);
				if ($boardData.attr('needLogin')) {
					var $needauth = $('<div></div>').addClass('needauth').appendTo($board);
					$('<p></p>').html('로그인을 한 학생들만<br>이용할 수 있어요!').appendTo($needauth);
					$('<a></a>').addClass('button').attr('href', '/login').text('로그인').appendTo($needauth);
				} else if ($boardData.attr('needAuth')) {
					var $needauth = $('<div></div>').addClass('needauth').appendTo($board);
					$('<p></p>').html('학교 인증을 거친 학생들만<br>이용할 수 있어요!').appendTo($needauth);
					$('<a></a>').addClass('button').attr('href', '/auth').text('학교 인증하기').appendTo($needauth);
				} else {
					$boardData.find('article').each(function () {
						var $articleData = $(this);
						$articleData.attr('boardId', $boardData.attr('id'));
						if (boardType === 'list') {
							_gfn.createListItem($board, $articleData);
						} else if (boardType === 'photo') {
							_gfn.createPhotoItem($board, $articleData);
						} else {
							_gfn.createArticleItem($board, $articleData);
						}
					});
				}
				$card.appendTo($main);
			});
			$('<hr>').appendTo($main);
			$response.find('bookstore').each(function () {
				var $bookstore = $('<div></div>').addClass('bookstore');
				$(this).find('item').each(function () {
					var $itemData = $(this);
					var $a = $('<a></a>').addClass('item').attr('href', 'https://bookstore.everytime.kr').appendTo($bookstore);
					var image = $itemData.attr('image') ? $itemData.attr('image') : '/images/attach.empty.png';
					$('<div></div>').addClass('image').css('background-image', 'url("' + image + '")').appendTo($a);
					$('<h4></h4>').html($itemData.attr('title')).appendTo($a);
					$('<span></span>').addClass('price').text($itemData.attr('price')).appendTo($a);
				});
				$bookstore.appendTo($main);
			});
		}
	};
	_fn.initiate();
});
