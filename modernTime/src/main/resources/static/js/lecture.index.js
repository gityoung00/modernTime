


























































$().ready(function () {
	var $container = $('#container');
	var $search = $container.find('form.search');
	var $mypoint = $container.find('div.mypoint');
	var $mylectures = $container.find('div.mylectures');
	var $campus = $container.find('div.campus');
	var $articles = $container.find('div.articles');
	var _set = {
		isRendered: false,
		isLoadCompleted: false,
		limit: 20,
		offset: 0
	};
	var _fn = {
		init: function () {
			var pageCache;
			if (typeof Storage !== 'undefined') {
				var previouspageCache = sessionStorage.getItem('previouspage');
				if (previouspageCache && new RegExp('^/lecture/view').test(previouspageCache) === true) {
					pageCache = _gfn.getPageCache(location);
				}
			}
			if (pageCache) {
				_fn.createFromCache(pageCache);
				$search = $container.find('form.search');
				$mypoint = $container.find('div.mypoint');
				$mylectures = $container.find('div.mylectures');
				$campus = $container.find('div.campus');
				$articles = $container.find('div.articles');
			} else {
				_fn.loadMyPoint();
				_fn.loadMyLectures();
				_fn.loadAllArticles();
				setTimeout(function () {
					$(window).scrollTop(0);
				}, 10);
			}
			$(window).on('scroll', function () {
				_fn.onScroll();
			});
			$search.on('submit', function () {
				_fn.searchLectures();
				return false;
			});
			$search.on('focus', 'input[name="keyword"]', function () {
				var startScrollTop = $(window).scrollTop();
				setTimeout(function () {
					var endScrollTop = $(window).scrollTop();
					if (startScrollTop !== endScrollTop) {
						$search.css('transform', 'translateY(' + (endScrollTop - startScrollTop) + 'px)');
					}
				}, 0);
			});
			$search.on('blur', 'input[name="keyword"]', function () {
				$search.css('transform', 'none');
			});
		},
		createFromCache: function (pageCache) {
			$container.html(pageCache.container);
			_set.isRendered = true;
			_set.offset = pageCache.offset;
		},
		loadAllArticles: function () {
			$articles.find('div.loading').show();
			_fn.ajaxAllArticles(function (data) {
				if (!data) {
					return false;
				}
				_fn.createAllArticles(data);
			});
		},
		ajaxAllArticles: function (callback) {
			var params = {
				limit_num: _set.limit,
				start_num: _set.offset
			};
			if ($articles.data('campus-id') > 0) {
				params.campus_id = $articles.data('campus-id');
			}
			$.ajax({
				url: _apiServerUrl + '/find/lecture/article/list/recent',
				xhrFields: {withCredentials: true},
				type: 'POST',
				data: params,
				success: function (data) {
					var responseCode;
					if (!$(data).find('response').children().length) {
						responseCode = $(data).find('response').text();
					}
					if (responseCode === '-1') {
						window.alert('접근 권한이 없습니다.');
						history.go(-1);
					} else {
						callback(data);
					}
				}
			});
		},
		createAllArticles: function (data) {
			var $loading = $articles.find('div.loading');
			var $articlesData = $(data).find('response > article');
			if ($articlesData.length === 0) {
				if (_set.offset === 0) {
					$('<div></div>').addClass('empty').html('<p>아직 등록된 강의평이 없습니다.<br>수강했던 과목에 대한 정보를 공유해주세요!</p>').insertBefore($loading);
				}
				_set.isLoadCompleted = true;
			} else {
				$articlesData.each(function () {
					var $this = $(this);
					var $article = $('<a></a>').addClass('article').attr('href', '/lecture/view/' + $this.attr('lecture_id'));
					if ($this.attr('isConfirmed') === '0') {
						$article.addClass('notconfirmed');
						var $confirm = $('<div></div>').addClass('confirm').appendTo($article);
						$('<p></p>').html('학교 인증 후 강의평을 확인할 수 있습니다.').appendTo($confirm);
					}
					var name = $this.attr('lecture_name');
					var professor = $this.attr('lecture_professor_name');
					if (professor) {
						name += ' : ' + professor;
					}
					$('<h3></h3>').html(name).appendTo($article);
					var $rate = $('<p></p>').addClass('rate').appendTo($article);
					var $star = $('<span></span>').addClass('star').appendTo($rate);
					var percent = Number($this.attr('rate')) / 5 * 100 + '%';
					$('<span></span>').addClass('on').width(percent).appendTo($star);
					var $info = $('<p></p>').addClass('info').appendTo($article);
					if ($this.attr('year') && $this.attr('semester')) {
						$('<span></span>').addClass('semester').html($this.attr('year').substr(2) + '년 ' + $this.attr('semester') + '학기 수강자').appendTo($info);
					}
					if (Number($this.attr('posvote')) > 0) {
						$('<span></span>').addClass('posvote').html($this.attr('posvote')).appendTo($info);
					}
					var text = _.escape(_.unescape($this.attr('text'))).replace(/\n\n+/g, '\n\n').replace(/\n/g, '<br>');
					$('<p></p>').addClass('text').html(text).appendTo($article);
					$article.insertBefore($loading);
				});
			}
			$loading.hide();
			_set.isRendered = true;
			_set.offset += _set.limit;
			setTimeout(function () {
				_gfn.setPageCache(location, {
					offset: _set.offset,
					container: $container.html()
				});
			}, 10);
		},
		loadMyPoint: function () {
			_fn.ajaxMyPoint(function (data) {
				if (!data) {
					return false;
				}
				_fn.createMyPoint(data);
			});
		},
		ajaxMyPoint: function (callback) {
			$.ajax({
				url: _apiServerUrl + '/find/lecture/point',
				xhrFields: {withCredentials: true},
				type: 'POST',
				success: function (data) {
					callback(data);
				}
			});
		},
		createMyPoint: function (data) {
			var point = $(data).find('response').text();
			$mypoint.find('span.value').text(point + 'P');
		},
		loadMyLectures: function () {
			$mylectures.find('div.loading').show();
			_fn.ajaxMyLectures(function (data) {
				if (!data) {
					return false;
				}
				_fn.createMyLectures(data);
			});
		},
		ajaxMyLectures: function (callback) {
			$.ajax({
				url: _apiServerUrl + '/find/lecture/list/mine',
				xhrFields: {withCredentials: true},
				type: 'POST',
				success: function (data) {
					callback(data);
				}
			});
		},
		createMyLectures: function (data) {
			var $loading = $mylectures.find('div.loading');
			var $lecturesData = $(data).find('lecture');
			if ($lecturesData.length === 0) {
				$('<div></div>').addClass('empty').html('<p>아직 확인할 수 있는 과목이 없습니다.</p>').insertBefore($loading);
			} else {
				$lecturesData.each(function () {
					var $this = $(this);
					var name = $this.attr('name');
					var professor = $this.attr('professor_name');
					var isWritten = Number($this.attr('is_written'));
					var $a = $('<a></a>').addClass('lecture').attr('href', '/lecture/view/' + $this.attr('id'));
					var $h3 = $('<h3></h3>').appendTo($a);
					$('<span></span>').addClass('name').html(name).appendTo($h3);
					if (professor) {
						$('<span></span>').addClass('professor').html(professor).appendTo($h3);
					}
					if (isWritten) {
						$('<span></span>').text('평가 완료').addClass('button completed').appendTo($a);
					} else {
						$('<span></span>').text('평가하기').addClass('button write').appendTo($a);
					}
					$a.insertBefore($loading);
				});
			}
			$loading.hide();
		},
		onScroll: function () {
			if (_set.isRendered === false || _set.isLoadCompleted === true) {
				return;
			}
			var scrollTop = $(window).scrollTop();
			var remainingHeight = $(document).height() - $(window).height();
			if (scrollTop < remainingHeight - 300) {
				return;
			}
			_set.isRendered = false;
			_fn.loadAllArticles();
		},
		searchLectures: function () {
			var $keyword = $search.find('input[name="keyword"]');
			var keyword = $keyword.val().trim();
			if (keyword.replace(/\s/g, '').length < 2) {
				alert('검색어를 두 글자 이상 입력해주세요.');
			} else {
				location.href = '/lecture/search/' + keyword;
			}
		}
	};
	_fn.init();
});
