


























































if (!_gfn) var _gfn = {};
_gfn = _.extend(_gfn, {
	createArticleItem: function ($target, $data) {
		var $a = $('<a></a>').addClass('article').appendTo($target);
		if ($data.attr('boardId') && $data.attr('id')) {
			$a.attr('href', '/' + $data.attr('boardId') + '/v/' + $data.attr('id'));
		} else if ($data.attr('lectureId')) {
			$a.attr('href', '/lecture/view/' + $data.attr('lectureId'));
			var rate = Number($data.attr('rate')) / 5 * 100 + '%';
			var $star = $('<span></span>').addClass('star').appendTo($a);
			$('<span></span>').addClass('on').width(rate).appendTo($star);
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
		if (attachUrl) {
			$('<img>').addClass('thumbnail').attr('src', attachUrl).appendTo($a);
		}
		if ($data.attr('title')) {
			$('<p></p>').addClass('title').html($data.attr('title')).appendTo($a);
			$('<p></p>').addClass('small').html($data.attr('text')).appendTo($a);
		} else {
			$('<p></p>').html($data.attr('text')).appendTo($a);
		}
		if ($data.attr('boardName')) {
			$('<h4></h4>').html($data.attr('boardName')).appendTo($a);
		} else if ($data.attr('createdAt')) {
			$('<time></time>').text(_gfn.formatRelativeDate($data.attr('createdAt'))).appendTo($a);
		}
		if ($data.attr('posvote') || $data.attr('commentCount')) {
			var $status = $('<ul></ul>').addClass('status').appendTo($a);
			$('<li></li>').addClass('vote active').text($data.attr('posvote')).appendTo($status);
			$('<li></li>').addClass('comment active').text($data.attr('commentCount')).appendTo($status);
		}
		$('<hr>').appendTo($a);
	},
	createListItem: function ($target, $data) {
		var $a = $('<a></a>').addClass('list').appendTo($target);
		if ($data.attr('boardId') && $data.attr('id')) {
			$a.attr('href', '/' + $data.attr('boardId') + '/v/' + $data.attr('id'));
		}
		$('<time></time>').text(_gfn.formatRelativeDate($data.attr('createdAt'))).appendTo($a);
		var text = $data.attr('title') ? $data.attr('title') : $data.attr('text');
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
				var $searchForm = $('<form></form>').addClass('search').appendTo($rightside);
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
				url: _apiServerUrl + '/find/community/webside',
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
		createSide: function (data) {
			var $response = $(data).find('response');
			if ($response.find('poparticle').length) {
				_fn.createPopArticle($response.find('poparticle'));
			}
			if ($response.find('hotarticle').length) {
				_fn.createHotArticle($response.find('hotarticle'));
			}
			_fn.createBestArticle();
			if ($response.find('news').length) {
				_fn.createNews($response.find('news'));
			}
			if ($response.find('lecture').length) {
				_fn.createLecture($response.find('lecture'));
			}
		},
		createPopArticle: function ($data) {
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			$('<a></a>').text('실시간 인기 글').appendTo($h3);
			var $articlesData = $data.find('article');
			$articlesData.each(function () {
				_gfn.createArticleItem($board, $(this));
			});
			$card.appendTo($rightside);
		},
		createHotArticle: function ($data) {
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			var $h3a = $('<a></a>').attr('href', '/hotarticle').text('HOT 게시물').appendTo($h3);
			$('<span></span>').text('더 보기').appendTo($h3a);
			var $articlesData = $data.find('article');
			$articlesData.each(function () {
				_gfn.createListItem($board, $(this));
			});
			$card.appendTo($rightside);
		},
		createBestArticle: function () {
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			var $h3a = $('<a></a>').attr('href', '/bestarticle').text('BEST 게시판').appendTo($h3);
			$('<span></span>').text('더 보기').appendTo($h3a);
			$card.appendTo($rightside);
		},
		createNews: function ($data) {
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			$('<a></a>').text('학교 소식').appendTo($h3);
			var $articlesData = $data.find('article');
			$articlesData.each(function () {
				_gfn.createArticleItem($board, $(this));
			});
			$card.appendTo($rightside);
		},
		createLecture: function ($data) {
			var $card = $('<div></div>').addClass('card');
			var $board = $('<div></div>').addClass('board').appendTo($card);
			var $h3 = $('<h3></h3>').appendTo($board);
			var $h3a = $('<a></a>').attr('href', '/lecture').text('최근 강의평').appendTo($h3);
			$('<span></span>').text('더 보기').appendTo($h3a);
			var $articlesData = $data.find('article');
			$articlesData.each(function () {
				_gfn.createArticleItem($board, $(this));
			});
			$card.appendTo($rightside);
		}
	};
	_fn.initiate();
});
