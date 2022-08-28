$().ready(function() {
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
		init: function() {
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
				setTimeout(function() {
					$(window).scrollTop(0);
				}, 10);
			}
			$(window).on('scroll', function() {
				_fn.onScroll();
			});
			$search.on('submit', function() {
				_fn.ajaxsearch();
				return false;
			});
//			$search.on('focus', 'input[name="keyword"]', function() {
//				var startScrollTop = $(window).scrollTop();
//				setTimeout(function() {
//					var endScrollTop = $(window).scrollTop();
//					if (startScrollTop !== endScrollTop) {
//						$search.css('transform', 'translateY(' + (endScrollTop - startScrollTop) + 'px)');
//					}
//				}, 0);
//			});
//			$search.on('blur', 'input[name="keyword"]', function() {
//				$search.css('transform', 'none');
//			});
		},
		createFromCache: function(pageCache) {
			$container.html(pageCache.container);
			_set.isRendered = true;
			_set.offset = pageCache.offset;
		},
		loadAllArticles: function() {
			$articles.find('div.loading').show();
			_fn.ajaxAllArticles(function(data) {
				if (!data) {
					return false;
				}
				//				_fn.createAllArticles(data);
			});
		},

		ajaxAllArticles: function(callback) {
			var params = {
				limit_num: _set.limit,
				start_num: _set.offset
			};
			if ($articles.data('campus-id') > 0) {
				params.campus_id = $articles.data('campus-id');
			}
			//			$.ajax({
			//				url: _apiServerUrl + '/find/lecture/article/list/recent',
			//				xhrFields: {withCredentials: true},
			//				type: 'POST',
			//				data: params,
			//				success: function (data) {
			//					var responseCode;
			//					if (!$(data).find('response').children().length) {
			//						responseCode = $(data).find('response').text();
			//					}
			//					if (responseCode === '-1') {
			//						window.alert('접근 권한이 없습니다.');
			//						history.go(-1);
			//					} else {
			//						callback(data);
			//					}
			//				}
			//			});
		},

		loadMyPoint: function() {
			_fn.ajaxMyPoint(function(data) {
				if (!data) {
					return false;
				}
				_fn.createMyPoint(data);
			});
		},
		ajaxMyPoint: function(callback) {
			//			$.ajax({
			//				url: _apiServerUrl + '/find/lecture/point',
			//				xhrFields: {withCredentials: true},
			//				type: 'POST',
			//				success: function (data) {
			//					callback(data);
			//				}
			//			});
		},
		createMyPoint: function(data) {
			var point = $(data).find('response').text();
			$mypoint.find('span.value').text(point + 'P');
		},
		loadMyLectures: function() {
			$mylectures.find('div.loading').show();
			_fn.ajaxMyLectures(function(data) {
				if (!data) {
					return false;
				}
				_fn.createMyLectures(data);
			});
		},
		ajaxMyLectures: function() {

			$.ajax({
				url: 'lecture/list',
				type: 'POST',
				success: function(data) {
					console.log(data)
					var jsonDatas = data.data;//JSON.parse(data);
					var list = "";
					var list2 = "";
					if (jsonDatas.length > 0){
						for (i = 0; i < jsonDatas.length; i++) {
							//						var lectureid = jsonDatas.cd[i].lecture_id;
							var percent = jsonDatas[i].score / 5 * 100 + '%'
							list = list + "<a class='lecture' href='evalview?id=" + jsonDatas[i].lecture_id + "'>";
							list = list + "<h3><span class='name'>" + jsonDatas[i].name + "</span> : ";
							list = list + "<span class='professor'>" + jsonDatas[i].teacher + "</span></h3>";
							if (jsonDatas[i].userEval == 0) {
								list = list + "<span class= 'button'><span class='button write' >평가하기</span></span></a>";
							} else {
								list = list + "<span class= 'button'><span class='button completed' >평가완료</span></span></a>";
							}
						}
						$(".mylectures").html(list);
						
					} else {
						$emptyDiv = $("<div></div>").addClass("empty").appendTo($(".mylectures"));
						$("<p></p>").text("아직 확인할 수 있는 과목이 없습니다.").appendTo($emptyDiv);
					}
					_fn.ajaxnewLectures();
				},

				error: function(err) {
					console.log(err)
					console.log("에러")
				}
			});
		},

		ajaxnewLectures: function() {
			$.ajax({
				url: 'lecture/alllist',
				type: 'POST',
				success: function(data) {
					console.log(data)
					
					$articles = $(".articles");
					var jsonDatas = data.data;
					var list = "";
					for (i = 0; i < jsonDatas.length; i++) {
						
						var percent = jsonDatas[i].score / 5 * 100 + '%'
						
						$article = $("<a></a>").addClass("article").attr("href", `evalview?id=${jsonDatas[i].lecture_id}`).appendTo($articles);
						// 과목명, 교수명
						$("<h3></h3>").text(`${jsonDatas[i].name} : ${jsonDatas[i].teacher}`).appendTo($article);
						// 별점
						$pStar = $("<p></p>").addClass("rate").appendTo($article);
						$spanStar = $("<span></span>").addClass("star").appendTo($pStar);						
						$("<span></span>").addClass("on").css("width", percent).appendTo($spanStar);
						// 강의평						
						$("<p></p>").addClass("text").text(jsonDatas[i].comment).appendTo($article);

					}
				},
				error: function(err) {
					console.log(err);
					console.log("에러")
				}
			});


		},

		ajaxsearch: function() {
			var $keyword = $search.find('input[name="keyword"]');
			var $keywords = $search.find('input[name="keyword"]').val();
			console.log($keywords)
			var keyword = $keyword.val().trim();
			if (keyword.replace(/\s/g, '').length < 2) {
				alert('검색어를 두 글자 이상 입력해주세요.');
			};
			console.log(keyword)
			var data = {
				keyword : $keywords
			}
			console.log(data)
			
			$.ajax({
				url: 'search',
				type: 'POST',
				data : {
				keyword : $keywords
			},
//				dataType:"text",
//				contentType: "text/html; charset=UTF-8;",
//				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				success: function(data) {
					console.log(data)
					$articles = $(".articles")
					$articles.empty();
					
					$(data.data).each(function(_, lecture){
						console.log(lecture)
						var percent = lecture.score / 5 * 100 + '%'
						$article = $("<a></a>").addClass("article").attr("href", `evalview?id=${lecture.lecture_id}`).appendTo($articles);
						$("<h3></h3>").text(`${lecture.name} : ${lecture.teacher}`).appendTo($article);
						
						$pRate = $("<p></p>").addClass("rate").appendTo($article);
						$spanRate = $("<span></span>").addClass("star").appendTo($pRate);
						$("<span></span>").addClass("on").css("width", percent).appendTo($spanRate);
						
						$("<p></p>").addClass("text").text(lecture.comment.replace(/<br \/>/gi, '\n')).appendTo($article);
						
					});
				},
				error: function(err) {
					console.log(err)
					console.log("에러")
				}
			});


		},

		//		ajaxLectures: function(callback) {


		ajaxval: function(callback) {

		},
		loadatricles: function() {
			$articles.find('div.loading').show();
			_fn.ajaxarticels(function(data) {
				if (!data) {
					return false;
				}
				_fn.createarticles(data);
			});
		},


		createMyLectures: function(data) {

		},
		onScroll: function() {
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
//		searchLectures: function() {
//			var $keyword = $search.find('input[name="keyword"]');
//			var keyword = $keyword.val().trim();
//			if (keyword.replace(/\s/g, '').length < 2) {
//				alert('검색어를 두 글자 이상 입력해주세요.');
//			} else {
//				location.href = 'search' + "?keyword=" + keyword;
//			}
//		}
	};
	_fn.init();
});
