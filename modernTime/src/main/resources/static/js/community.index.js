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
			$.ajax({
				url:'/find/board/list',
				type: 'GET',
				success: function (data) {
					callback(data);
				}
			});
		},
		createHome: function (data) {
			console.log(data)
			$(data.data).each(function (_, board) {
				var boardType = "list";
				var $card = $('<div></div>').addClass('card');
				var $board = $('<div></div>').addClass('board').appendTo($card);
				var $h3 = $('<h3></h3>').appendTo($board);
				$('<a></a>').attr('href', '/' + board.name).html(board.title).appendTo($h3);
//				if ($boardData.attr('needLogin')) {
//					var $needauth = $('<div></div>').addClass('needauth').appendTo($board);
//					$('<p></p>').html('로그인을 한 학생들만<br>이용할 수 있어요!').appendTo($needauth);
//					$('<a></a>').addClass('button').attr('href', '/login').text('로그인').appendTo($needauth);
//				} else if ($boardData.attr('needAuth')) {
//					var $needauth = $('<div></div>').addClass('needauth').appendTo($board);
//					$('<p></p>').html('학교 인증을 거친 학생들만<br>이용할 수 있어요!').appendTo($needauth);
//					$('<a></a>').addClass('button').attr('href', '/auth').text('학교 인증하기').appendTo($needauth);
//				} else {
				$(board.posts).each(function (_, post) {
					_gfn.createListItem($board, post, board.name);
				});
//				}
				$card.appendTo($main);
			});
			$('<hr>').appendTo($main);
		}
	};
	_fn.initiate();
});
