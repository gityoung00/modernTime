if (!_gfn) var _gfn = {};
_gfn = _.extend(_gfn, {
	createArticleItem: function ($target, data) {
		var $a = $('<a></a>').addClass('article').appendTo($target);
		if (data.id && data.board_name) {
			$a.attr('href', '/' + data.board_name + '/content?id=' + data.id);
		} else if (data.lectureName) {
			$a.attr('href', '/lecture/view/' + data.id);
			var rate = Number(data.score) / 5 * 100 + '%';
			var $star = $('<span></span>').addClass('star').appendTo($a);
			$('<span></span>').addClass('on').width(rate).appendTo($star);
		}
		if (data.title) {
			$('<p></p>').addClass('title').html(data.title).appendTo($a);
			$('<p></p>').addClass('small').html(data.content).appendTo($a);
		}else if (data.lectureName){
			 $('<p></p>').addClass('title').html(data.lectureName).appendTo($a);
			 $('<p></p>').addClass('small').html(data.comment).appendTo($a);
		}else {
			$('<p></p>').html(data.content).appendTo($a);
		}
		if (data.board_name) {
			$('<h4></h4>').html(data.board_name).appendTo($a);
		} else if (data.create_date) {
			$('<time></time>').text(_gfn.formatRelativeDate(data.create_date)).appendTo($a);
		}
		if (data.like_count || data.comment_count) {
			var $status = $('<ul></ul>').addClass('status').appendTo($a);
			$('<li></li>').addClass('vote active').text(data.like_count).appendTo($status);
			$('<li></li>').addClass('comment active').text(data.like_count).appendTo($status);
		}
		$('<hr>').appendTo($a);
	},
	createListItem: function ($target, data, boardName) {
		var $a = $('<a></a>').addClass('list').appendTo($target);
		if (boardName && data.id) {
			$a.attr('href', '/' + boardName + '/content?id=' + data.id);
		}
		console.log("time", _gfn.formatRelativeDate(data.create_date))
		$('<time></time>').text(_gfn.formatRelativeDate(data.create_date)).appendTo($a);
		var text = data.title;
		$('<p></p>').html(text).appendTo($a);
		$('<hr>').appendTo($a);
	},
	createPhotoItem: function ($target, $data) {
		var $a = $('<a></a>').addClass('photo').appendTo($target);
		if ($data.attr('boardId') && $data.attr('id')) {
			$a.attr('href', '/' + $data.attr('boardId') + '/v/' + $data.attr('id'));
		}
		var attachUrl;
		if ($data.attr('attachId')) {
			var attachId = Number($data.attr('attachId'));
			if (attachId === -1) {
				attachUrl = '/images/attach.unauthorized.png';
			} else {
				var extension = $data.attr('attachFileName').split('.').pop().toUpperCase();
				var extensionsForImage = ['GIF', 'JPG', 'JPEG', 'PNG'];
				if (_.indexOf(extensionsForImage, extension) > -1) {
					attachUrl = $data.attr('attachFileUrl');
				}
			}
		}
		if (!attachUrl) {
			attachUrl = '/images/attach.empty.png';
		}
		$a.css('background-image', 'url("' + attachUrl + '")');
		var text = $data.attr('title') ? $data.attr('title') : $data.attr('text');
		$('<p></p>').html(text).appendTo($a);
		$('<time></time>').text(_gfn.formatRelativeDate($data.attr('createdAt'))).appendTo($a);
	}
});

$().ready(function () {
	var $container = $('#container');
	var $rightside;
	var _fn = {
		initiate: function () {
			$rightside = $container.find('div.rightside');
			if ($container.find('aside').is(':has(form.search)')) {
				var $asideSearchForm = $container.find('aside > form.search');
				$('#searchArticle').on('click', function () {
					$asideSearchForm.addClass('visible');
					$asideSearchForm.find('input[name="keyword"]').focus();
				});
				$asideSearchForm.find('input[name="keyword"]').on('blur', function () {
					$asideSearchForm.removeClass('visible');
				});
				$asideSearchForm.on('submit', function () {
					_fn.submitSearch(this);
					return false;
				});
				var $searchForm = $('<form></form>').addClass('search').prependTo($rightside);
				$('<input>').attr({
					type: 'text',
					name: 'keyword',
					placeholder: '전체 게시판의 글을 검색하세요!'
				}).addClass('text').appendTo($searchForm);
				$searchForm.on('submit', function () {
					_fn.submitSearch(this);
					return false;
				});
			}
			if ($rightside.is(':visible')) {
				_fn.loadSide();
			}
			$(window).resize(function () {
				if ($rightside.is(':visible') && $rightside.is(':empty')) {
					_fn.loadSide();
				}
			});
		},
		submitSearch: function (that) {
			var keyword = $(that).find('input[name="keyword"]').val().trim();
			if (keyword.length < 2) {
				alert('검색어를 두 글자 이상 입력하세요!');
				return false;
			}
			location.href = '/search/all/' + keyword;
		},
		loadSide: function () {
			_fn.ajaxSide(function (data) {
				if (!data) {
					return false;
				}
				_fn.createSide(data);
			});
		},
		ajaxSide: function (callback) {
			var condition = {
				campus_id: $('#communityCampusId').val()
			};
			$.ajax({
				url: 'find/aside/list',
				type: 'GET',
				success: function (data) {
					callback(data);
				}
			});
		},
		createSide: function (data) {
			console.log(data);
			if (data.popularPosts.length) {
				_fn.createPopArticle(data.popularPosts);
			}
			if (data.hotPosts.length) {
				_fn.createHotArticle(data.hotPosts);
			}
			if (data.evals.length) {
				_fn.createLecture(data.evals);
			}
		},
		createPopArticle: function (data) {
			console.log(data)
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			$('<a></a>').text('실시간 인기 글').appendTo($h3);
			$(data).each(function (_, post) {
				_gfn.createArticleItem($board, post);
			});
			$card.appendTo($rightside);
		},
		createHotArticle: function (data) {
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			var $h3a = $('<a></a>').attr('href', '/hotarticle').text('HOT 게시물').appendTo($h3);
			$('<span></span>').text('더 보기').appendTo($h3a);
			$(data).each(function (_, post) {
				_gfn.createListItem($board, post, post.board_name);
			});
			$card.appendTo($rightside);
		},
		createLecture: function (data) {
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			var $h3a = $('<a></a>').attr('href', '/lecture').text('최근 강의평').appendTo($h3);
			$('<span></span>').text('더 보기').appendTo($h3a);
			$(data).each(function (_, post) {
				_gfn.createArticleItem($board, post);
			});
			$card.appendTo($rightside);
		}
	};
	_fn.initiate();
});
