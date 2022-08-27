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
					//										alert('asd');
					//					console.log(data)
					var jsonDatas = data;//JSON.parse(data);
					var list = "";
					var list2 = "";
					for (i = 0; i < jsonDatas.cd.length; i++) {
						//						var lectureid = jsonDatas.cd[i].lecture_id;
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list = list + "<a class='lecture' href='evalview?id=" + jsonDatas.cd[i].lectureId + "'>";
						list = list + "<h3><span class='name'>" + jsonDatas.cd[i].name + "</span> : ";
//						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";
						list = list + "<span class='professor'>" + jsonDatas.cd[i].teacher + "</span></h3>";
						//						console.log(jsonDatas.cd[i].userEval)
						if (jsonDatas.cd[i].userEval == 0) {
							list = list + "<span class= 'button'><span class='button write' >평가하기</span></span></a>";
//							list2 = list2 + "<span><a href = 'evaluation?id=" + jsonDatas.cd[i].lectureId + "'><button>평가하기</button></a></span></h3></th></tr>";
						} else {
							list = list + "<span class= 'button'><span class='button completed' >평가완료</span></span></a>";
//							 style='float; font-weight: bold; right; height: 22.67px; box-sizing: border-box;  border-radius: 12px;' 
						}
					}
					$(".mylectures").html(list);
//					$("#bodys3").html(list2);
					//					callback(data);
					_fn.ajaxnewLectures();
				},

				error: function() {
					console.log("에러")
				}
			});
		},

		ajaxnewLectures: function() {
			$.ajax({
				url: 'lecture/alllist',
				type: 'POST',
				success: function(data) {
					//										alert('asd');
					//					console.log(data)
					var jsonDatas = data;//JSON.parse(data);
					var list = "";
					for (i = 0; i < jsonDatas.cd.length; i++) {
						//						var lectureid = jsonDatas.cd[i].lecture_id;
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list = list + "<a class='article' href = 'evalview?id=" + jsonDatas.cd[i].lecture_id + "'><h2><tr>"
						list = list + "<th>" + jsonDatas.cd[i].name + " : </th>";
						list = list + "<td>" + jsonDatas.cd[i].teacher + "</td></tr></h2>";
						list = list + "<tr><p class='rate'><span class='star'><span class='on' style='width:" + percent + "'></span></span></p></tr>";
						//						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";
						list = list + "<p class='info'><span class='semester'>" + jsonDatas.cd[i].listen_date + " </span></p>";
						list = list + "<p class='text'>" + jsonDatas.cd[i].comment + " </p>";
						list = list + "</tr></a>"
					}				//"<a href = 'evaluation?id=" + jsonDatas.cd[i].lectureId + "'><button style='float: right;' >평가하기</button></a>"
					$(".articles").html(list);
					//					callback(data);
//					_fn.ajaxesearch();
				},
				error: function() {
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
					var list = "";
					if(data == '{"cd" : ]}'){
						list = list + "<a class='article'></article>"
						$(".articles").html(list);
					}else{
						var jsonDatas = JSON.parse(data);
					for (i = 0; i < jsonDatas.cd.length; i++) {
						//						var lectureid = jsonDatas.cd[i].lecture_id;
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list = list + "<a class='article' href = 'evalview?id=" + jsonDatas.cd[i].lecture_id + "'><h2><tr>"
						list = list + "<th>" + jsonDatas.cd[i].name + " : </th>";
						list = list + "<td>" + jsonDatas.cd[i].teacher + "</td></tr></h2>";
						list = list + "<tr><p class='rate'><span class='star'><span class='on' style='width:" + percent + "'></span></span></p></tr>";
						//						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";
						list = list + "<p class='info'><span class='semester'>" + jsonDatas.cd[i].listen_date + " </span></p>";
						list = list + "<p class='text'>" + jsonDatas.cd[i].comment + " </p>";
						list = list + "</tr></a>"
					}				//"<a href = 'evaluation?id=" + jsonDatas.cd[i].lectureId + "'><button style='float: right;' >평가하기</button></a>"
					$(".articles").html(list);
					}
					//					callback(data);
//					_fn.ajaxevaluationview();
				},
				error: function() {
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
