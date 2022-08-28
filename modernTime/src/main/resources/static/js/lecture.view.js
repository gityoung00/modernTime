$().ready(function () {
	var $container = $('#container');
	var $tab = $container.find('div.tab');
	var $head = $container.find('div.side.head');
	var $articleSide = $container.find('div.side.article');
	var $examSide = $container.find('div.side.exam');
	var $writeForm = $container.find('form.write');
	var $articleForm = $container.find('form.write.article');
	var $examForm = $container.find('form.write.exam');
	var _set = {
		schoolId: 0,
		lectureId: 0,
		subjectId: 0,
		authToWrite: 0,
		isAnimating: false,
		isScrolling: false
	};
	var _fn = {
		init: function () {
			_set.schoolId = Number($container.find('input[name="school_id"]').val());
			_set.lectureId = Number($container.find('input[name="lecture_id"]').val());
			_set.subjectId = Number($container.find('input[name="subject_id"]').val());
			_set.authToWrite = Number($container.find('input[name="auth_to_write"]').val());
			_fn.loadArticles();
			_fn.loadExams();
			$(window).on('scroll', function () {
				_fn.onScroll();
			});
			$tab.find('a').on('click', function () {
				_fn.onClickTab($(this));
			});
			$articleSide.on('click', 'div.articles article a.posvote', function () {
				_fn.voteArticle($(this));
			});
			$articleSide.on('click', 'div.articles article a.abuse', function () {
				_fn.abuseArticle($(this));
			});
			$articleSide.on('click', 'a.writebutton', function () {
				_fn.showArticleForm();
			});
			$articleForm.on('click', function (event) {
				if (event.target === event.currentTarget) {
					_fn.hideArticleForm();
				}
			});
			$articleForm.on('click', 'a.close', function (event) {
				_fn.hideArticleForm();
			});
			$articleForm.on('submit', function () {
				_fn.writeArticle();
				return false;
			});
			$examSide.on('click', 'a.writebutton', function () {
				_fn.showExamForm();
			});
			$examForm.on('click', function (event) {
				if (event.target === event.currentTarget) {
					_fn.hideExamForm();
				}
			});
			$examForm.on('click', 'a.close', function (event) {
				_fn.hideExamForm();
			});
			$examForm.on('click', 'ol.questions li.new a', function () {
				var $new = $(this).parent('li.new');
				var $prev = $new.prev('li');
				var $li = $prev.clone().insertBefore($new);
				$li.find('input[name="question"]').val('');
			});
			$examForm.on('submit', function () {
				_fn.writeExam();
				return false;
			});
			$writeForm.find('a[data-name]').on('click', function () {
				var $a = $(this);
				if ($a.data('type') === 'multiple') {
					if ($a.hasClass('active')) {
						$a.removeClass('active');
					} else {
						$a.addClass('active');
					}
				} else {
					var $siblings = $a.siblings();
					$a.addClass('active');
					$siblings.removeClass('active');
				}
			});
			$articleForm.find('a[data-name]').on('click', function () {
				var $a = $(this);
				if ($a.data('type')) {
					if ($a.hasClass('active')) {
						$a.removeClass('active');
					} else {
						$a.addClass('active');
					}
				} else {
					var $siblings = $a.siblings();
					$a.addClass('active');
					$siblings.removeClass('active');
				}
			});
			$examForm.find('a[data-name]').on('click', function () {
				var $a = $(this);
				if ($a.data('type')) {
					if ($a.hasClass('active')) {
						$a.removeClass('active');
					} else {
						$a.addClass('active');
					}
				} else {
					var $siblings = $a.siblings();
					$a.addClass('active');
					$siblings.removeClass('active');
				}
			});
		},
		loadArticles: function () {
			_fn.ajaxArticles(function (data) {
				if (!data) {
					return false;
				}
				_fn.createArticles(data);
			});
		},
		ajaxArticles: function (callback) {
			const urlParams = new URL(location.href).searchParams;
			const id = urlParams.get('id');
			console.log(id)
//			if (_set.subjectId) {
//				conditions.subject_id = _set.subjectId;
//			} else {
//				conditions.lecture_id = _set.lectureId;
//			}
			$.ajax({
				url : "evaluation/list",
				type : "post",
//				dataType:"text",
				data:{
					lecture_id : id
				},
				success : function(data){
					console.log(data);
					var jsonDatas = JSON.parse(data);
					var list = "";
					var list2 = "";
					var list3 = "";
					if(jsonDatas.cd.length >= 1 && jsonDatas.cd[0].comment){
						for (i = 0; i < jsonDatas.cd.length; i++) {
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list = list + "<article>"
						list = list + "<p class='rate'><span class='star'><span class='on' style='width : "+percent+"'></span></span></p>"
						list = list + "<p class='text'>" + jsonDatas.cd[i].comment + "</p>"
						list = list + "</article>"
					}
					var percent2 = jsonDatas.cd[0].lscore / 5 * 100 + '%'
						list2 = list2 +"<div class='rate'>"
						list2 = list2 +"<span>"
						list2 = list2 +"<span class='value'>"+jsonDatas.cd[0].lscore+"점</span>"
						list2 = list2 +"<span class='star'><span class='on' style='width : " + percent2 + "'></span></span>"
						list2 = list2 +"</span>"						
						list2 = list2 +"<hr>"						
						list2 = list2 +"</div>"						
						list2 = list2 +"<div class='details'>"
						list2 = list2 +"<p>"
						list2 = list2 +"<label>과제</label>"	
						list2 = list2 +"<span>"+jsonDatas.cd[0].prac+"</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>조모임</label>"	
						list2 = list2 +"<span>"+jsonDatas.cd[0].pro+"</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>성적</label>"	
						list2 = list2 +"<span>"+jsonDatas.cd[0].gra+"</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>출결</label>"	
						list2 = list2 +"<span>"+jsonDatas.cd[0].attend+"</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>시험횟수</label>"	
						list2 = list2 +"<span>"+jsonDatas.cd[0].ex+"</span>"
						list2 = list2 +"</p>"
						list2 = list2 +"</div>"	
						
						list3 = list3 + "<h2>"+ jsonDatas.cd[0].name +"</h2>"
						list3 = list3 + "<p>"
						if(jsonDatas.cd[0].type === "1"){							
						list3 = list3 + "<label>전공여부</label><span>전공</span>"
						}else{
						list3 = list3 + "<label>전공여부</label><span>교양</span>"							
						}
						list3 = list3 + "</p>"
						list3 = list3 + "<p>"
						list3 = list3 + "<label>교수명</label><span>"+jsonDatas.cd[0].teacher+"</span>"
						list3 = list3 + "</p>"
					}else{
						list +="<article>평가 없음</article>"
						var percent2 = jsonDatas.cd[0].score / 5 * 100 + '%'
						list2 = list2 +"<div class='rate'>"
						list2 = list2 +"<span>"
						list2 = list2 +"<span class='value'>"+jsonDatas.cd[0].score+"점</span>"
						list2 = list2 +"<span class='star'><span class='on' style='width : " + percent2 + "'></span></span>"
						list2 = list2 +"</span>"						
						list2 = list2 +"<hr>"						
						list2 = list2 +"</div>"						
						list2 = list2 +"<div class='details'>"
						list2 = list2 +"<p>"
						list2 = list2 +"<label>과제</label>"	
						list2 = list2 +"<span>평가 없음</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>조모임</label>"	
						list2 = list2 +"<span>평가 없음</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>성적</label>"	
						list2 = list2 +"<span>평가 없음</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>출결</label>"	
						list2 = list2 +"<span>평가 없음</span>"
						list2 = list2 +"</p>"	
						list2 = list2 +"<p>"
						list2 = list2 +"<label>시험횟수</label>"	
						list2 = list2 +"<span>평가 없음</span>"
						list2 = list2 +"</p>"
						list2 = list2 +"</div>"
						
						list3 = list3 + "<h2>"+ jsonDatas.cd[0].name +"</h2>"
						list3 = list3 + "<p>"
						if(jsonDatas.cd[0].type === "1"){							
						list3 = list3 + "<label>전공여부</label><span>전공</span>"
						}else{
						list3 = list3 + "<label>전공여부</label><span>교양</span>"							
						}
						list3 = list3 + "</p>"
						list3 = list3 + "<p>"
						list3 = list3 + "<label>교수명</label><span>"+jsonDatas.cd[0].teacher+"</span>"
						list3 = list3 + "</p>"
					}
					$(".articles").html(list);
					$(".rating").html(list2);
					$(".side.head").html(list3);
									
				},
			})
//			$.ajax({
//				url: _apiServerUrl + '/find/lecture/article/list',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: conditions,
//				success: function (data) {
//					var responseCode;
//					if (!$(data).find('response').children().length) {
//						responseCode = $(data).find('response').text();
//					}
//					if (responseCode === '-3') {
//						window.alert('접근 권한이 없습니다.');
//						history.go(-1);
//					} else if (responseCode === '0' || responseCode === '-1' || responseCode === '-2') {
//						callback();
//					} else {
//						callback(data);
//					}
//				}
//			});
		},
		createArticles: function (data) {
			
			var $response = $(data).find('response');
			if (_set.lectureId === 0 && isNaN($response.attr('lectureId')) === false) {
				_set.lectureId = Number($response.attr('lectureId'));
			}
			if ($response.is(':has(subject)')) {
				_fn.createInformation($response);
			}
			if ($response.is(':has(lecture)')) {
				_fn.createHeader($response);
			}
			if ($response.is(':has(rate)')) {
				_fn.createRating($response);
			} else {
				$('<div></div>').addClass('empty').html('<p>아직 등록된 강의평이 없습니다.</p>').appendTo($articleSide);
				return false;
			}
			$('<a></a>').addClass('writebutton').text('새 강의평 쓰기').insertAfter($articleSide.find('h2'));
			if ($response.find('articles > article').length === 0) {
				$('<div></div>').addClass('empty').html('<p>아직 등록된 강의평이 없습니다.</p>').appendTo($articleSide);
			} else {
				var $articles = $('<div></div>').addClass('articles');
				$response.find('articles > article').each(function (index) {
					var $this = $(this);
					var $article = $('<article></article>').appendTo($articles);
					if ($this.attr('isConfirmed') === '0') {
						$article.addClass('notconfirmed');
						var $confirm = $('<div></div>').addClass('confirm').appendTo($article);
						$('<p></p>').html('학교 인증 후 강의평을 확인할 수 있습니다.').appendTo($confirm);
					} else if ($this.attr('isMine') !== '1') {
						$('<a></a>').addClass('button abuse').text('신고').data('id', $this.attr('id')).appendTo($article);
						$('<a></a>').addClass('button posvote').text('추천').data('id', $this.attr('id')).appendTo($article);
					}
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
				});
				$articles.appendTo($articleSide);
			}
			_fn.createSemesters($response);
		},
		createInformation: function ($response) {
			var $subjectData = $response.find('subject');
			$('<h2></h2>').text($subjectData.attr('name')).appendTo($head);
			var subjectInfo = ['semester', 'code', 'professor', 'type', 'grade', 'time', 'place', 'credit', 'capacity', 'popular', 'target', 'notice', 'misc1', 'misc2', 'misc3', 'misc4'];
			var subjectColumnInfo;
			if (_subjectColumnInfo[_set.schoolId]) {
				subjectColumnInfo = _subjectColumnInfo[_set.schoolId];
			} else {
				subjectColumnInfo = _subjectColumnInfo[0];
			}
			for (var i in subjectInfo) {
				var info = subjectInfo[i];
				var label, text;
				if (info === 'semester') {
					label = '학기';
					text = $subjectData.attr('year') + '년 ' + $subjectData.attr('semester') + '학기';
				} else {
					var columnInfo = _.findWhere(subjectColumnInfo, { name: info });
					if (!columnInfo) {
						continue;
					}
					label = columnInfo.value;
					text = $subjectData.attr(info);
				}
				if (!text) {
					continue;
				}
				var $p = $('<p></p>').appendTo($head);
				$('<label></label>').text(label).appendTo($p);
				$('<span></span>').text(text).appendTo($p);
			}
			$('<hr>').appendTo($head);
			$head.find('div.loading').remove();
		},
		createHeader: function ($response) {
			var $lectureData = $response.find('lecture');
			$('<h2></h2>').text($lectureData.attr('name')).appendTo($head);
			if ($lectureData.attr('campus') !== '') {
				var $p1 = $('<p></p>').appendTo($head);
				$('<label></label>').text('캠퍼스').appendTo($p1);
				$('<span></span>').text($lectureData.attr('campus')).appendTo($p1);
			}
			var $p2 = $('<p></p>').appendTo($head);
			$('<label></label>').text('교수명').appendTo($p2);
			$('<span></span>').text($lectureData.attr('professor')).appendTo($p2);
			var semesters = [];
			$response.find('semesters > semester').each(function (i) {
				if (i > 5) {
					semesters.push('...');
					return false;
				}
				var $this = $(this);
				semesters.push($this.attr('year') + '-' + $this.attr('semester'));
			});
			var semester = semesters.join(', ');
			var $p3 = $('<p></p>').addClass('semesters').appendTo($head);
			$('<label></label>').text('개설학기').appendTo($p3);
			$('<span></span>').text(semester).appendTo($p3);
			$('<hr>').appendTo($head);
			$head.find('div.loading').remove();
		},
		createRating: function ($response) {
			var $rateData = $response.find('rate');
			var $detailsData = $response.find('details');
			var $rating = $('<div></div>').addClass('rating');
			var rate = $rateData.text();
			var percent = Number(rate) / 5 * 100 + '%';
			var $rateDiv = $('<div></div>').addClass('rate').appendTo($rating);
			var $rateSpan = $('<span></span>').appendTo($rateDiv);
			var $value = $('<span></span>').addClass('value').text(rate).appendTo($rateSpan);
			var $star = $('<span></span>').addClass('star').appendTo($rateSpan);
			$('<span></span>').addClass('on').width(percent).appendTo($star);
			$('<hr>').appendTo($rateDiv);
			var $detailsDiv1 = $('<div></div>').addClass('details').appendTo($rating);

			var assessmentHomework = $detailsData.attr('assessment_homework');
			var assessmentTeam = $detailsData.attr('assessment_team');
			var assessmentGrade = $detailsData.attr('assessment_grade');
			var assessmentAttendance = $detailsData.attr('assessment_attendance');
			var examTimes = $detailsData.attr('exam_times');
			if (assessmentHomework) {
				var $p1 = $('<p></p>').appendTo($detailsDiv1);
				$('<label></label>').text('과제').appendTo($p1);
				$('<span></span>').text(assessmentHomework).appendTo($p1);
			}
			if (assessmentTeam) {
				var $p2 = $('<p></p>').appendTo($detailsDiv1);
				$('<label></label>').text('조모임').appendTo($p2);
				$('<span></span>').text(assessmentTeam).appendTo($p2);
			}
			if (assessmentGrade) {
				var $p3 = $('<p></p>').appendTo($detailsDiv1);
				$('<label></label>').text('성적').appendTo($p3);
				$('<span></span>').text(assessmentGrade).appendTo($p3);
			}
			if (assessmentAttendance) {
				var $p4 = $('<p></p>').appendTo($detailsDiv1);
				$('<label></label>').text('출결').appendTo($p4);
				$('<span></span>').text(assessmentAttendance).appendTo($p4);
			}
			if (examTimes) {
				var $p5 = $('<p></p>').appendTo($detailsDiv1);
				$('<label></label>').text('시험 횟수').appendTo($p5);
				$('<span></span>').text(examTimes).appendTo($p5);
			}
			$rating.appendTo($articleSide);
		},
		formatPrice: function (text) {
			return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
		},
		loadExams: function () {
			_fn.ajaxExams(function (data) {
				if (!data) {
					return false;
				}
//				_fn.createExams(data);
			});
		},
		
		//시험정보 불러오기 ajax
		ajaxExams: function (callback) {
			const urlParams = new URL(location.href).searchParams;
			const id = urlParams.get('id');
			console.log(id)
			var conditions = {
//				school_id: _set.schoolId,
//				lecture_lecture_id : id,
				lecture_lecture_id : "1",
				limit_num: 20
			};
			if (_set.subjectId) {
				conditions.subject_id = _set.subjectId;
			} else {
				conditions.lecture_id = _set.lectureId;
			}
			$.ajax({
				url : "exam/list",
				type:"POST",
				data : {
					id : "1",
					limit_num: 20
				},
				success : function(data){
					console.log(data)
					var jsonDatas = data;
				
//				JSON.parse(str);
				var list = "";
				for (i = 0; i < jsonDatas.cd.length; i++) {
						list = list + "<article class='exam'>";
						list = list + "<h3>"+jsonDatas.cd[i].nth+"</h3>";
						list = list + "<h4>시험전략</h4>";
						list = list + "<p class='text'>"+jsonDatas.cd[i].strategy+"</p>";
						list = list + "<h4>문제유형</h4>";
						list = list + "<p class='types'>"+jsonDatas.cd[i].type+"</p>";
						list += "</article>";
						list = list + "<hr>";

			}
				$(".exams").html(list);
			}
			});
		},
		createExams: function (data) {
			var $response = $(data).find('response');
			$('<a></a>').addClass('writebutton').text('시험 정보 공유').insertAfter($examSide.find('h2'));
			if ($response.find('exams > exam').length === 0) {
				$('<div></div>').addClass('empty').html('<p>아직 등록된 시험 정보가 없습니다.<br>첫 번째로 적으면 포인트를 <strong>두 배(40P)</strong>로 드려요!</p>').appendTo($examSide);
			} else {
				var $exams = $('<div></div>').addClass('exams');
				$response.find('exams > exam').each(function () {
					var $this = $(this);
					var $exam = $('<article></article>').appendTo($exams);
					$('<h3></h3>').text($this.attr('nth')).appendTo($exam);
					var $info = $('<p></p>').addClass('info').appendTo($exam);
					if ($this.attr('year') && $this.attr('semester')) {
						$('<span></span>').addClass('semester').html($this.attr('year').substr(2) + '년 ' + $this.attr('semester') + '학기 수강자').appendTo($info);
					}
					if (Number($this.attr('posvote')) > 0) {
						$('<span></span>').addClass('posvote').html($this.attr('posvote')).appendTo($info);
					}
					$('<h4></h4>').text('시험 전략').appendTo($exam);
					var knowhow = _.escape(_.unescape($this.attr('knowhow'))).replace(/\n\n+/g, '\n\n').replace(/\n/g, '<br>');
					$('<p></p>').addClass('text').html(knowhow).appendTo($exam);
					if ($this.find('types').is(':has(type)')) {
						$('<h4></h4>').text('문제 유형').appendTo($exam);
						var types = $this.find('types > type').map(function () {
							return $(this).text();
						}).get().join(', ');
						var $types = $('<p></p>').addClass('types').text(types).appendTo($exam);
					}
					if ($this.find('questions').is(':has(question)')) {
						$('<h4></h4>').text('문제 예시').appendTo($exam);
						var $questions = $('<ol></ol>').addClass('questions').appendTo($exam);
						$this.find('questions > question').each(function () {
							$('<li></li>').html($(this).text()).appendTo($questions);
						});
					}
				});
				$exams.appendTo($examSide);
			}
		},
		onScroll: function () {
			if ($tab.is(':not(:visible)') || _set.isAnimating === true || _set.isScrolling === true) {
				return;
			}
			_set.isScrolling = true;
			var scrollTop = $(window).scrollTop() + $head.offset().top + 8
			var target;
			if (scrollTop >= $examSide.offset().top) {
				target = 'exam';
			} else if (scrollTop >= $articleSide.offset().top) {
				target = 'article';
			} else if (scrollTop >= $bookSide.offset().top) {
				target = 'book';
			} else {
				target = 'head';
			}
			$tab.find('a[data-target="' + target + '"]').addClass('active').siblings().removeClass('active');
			setTimeout(function () {
				_set.isScrolling = false;
			}, 10);
		},
		onClickTab: function ($a) {
			var target = $a.data('target');
			var $target;
			if (target === 'head') {
				$target = $head;
			} else if (target === 'book') {
				$target = $bookSide;
			} else if (target === 'article') {
				$target = $articleSide;
			} else if (target === 'exam') {
				$target = $examSide;
			}
			var scrollTop = $target.offset().top - $head.offset().top;
			_set.isAnimating = true;
			$('html,body').animate({scrollTop: scrollTop}, 100, function () {
				$a.addClass('active').siblings().removeClass('active');
				setTimeout(function () {
					_set.isAnimating = false;
				}, 10);
			});
		},
		showArticleForm: function () {

//			if (_set.authToWrite === 1) {
//				alert('학교 인증 후 강의평을 작성할 수 있습니다.\n먼저 학교 인증을 완료해주세요 :D');
//				return;
//			}
			$articleForm.show();
			$articleSide.find('a.writebutton').hide();
			var scrollTop = $articleForm.offset().top - $head.offset().top - 16;
			_set.isAnimating = true;
			$('html,body').animate({scrollTop: scrollTop}, 100, function () {
				setTimeout(function () {
					_set.isAnimating = false;
				}, 10);
			});
		},
		hideArticleForm: function () {
			$articleForm.hide();
			$articleSide.find('a.writebutton').show();
		},
		writeArticle: function () {
			const urlParams = new URL(location.href).searchParams;
			const id = urlParams.get('id');
			console.log(id)
			var $textarea = $articleForm.find('textarea[name="text"]');
			if ($textarea.val().replace(/ /gi, '').length < 20) {
				alert('좀 더 성의있는 내용 작성을 부탁드립니다 :)');
				$textarea.focus();
				return false;
			}
			if (!confirm('강의평을 등록하시겠습니까?\n\n※ 등록 후에는 수정하거나 삭제할 수 없습니다.\n\n※ 허위/중복/저작권침해/성의없는 정보를 작성할 경우, 서비스 이용이 제한될 수 있습니다.')) {
				return false;
			}
			_fn.showLoadingDialog();
			var rate = $articleForm.find('a[data-name="rate"].active').data('value');
			var detail_assessment_grade = $articleForm.find('a[data-name="assessment_grade"].active').data('value');
			var detail_assessment_homework = $articleForm.find('a[data-name="assessment_homework"].active').data('value');
			var detail_assessment_team = $articleForm.find('a[data-name="assessment_team"].active').data('value');
			var detail_assessment_attendance = $articleForm.find('a[data-name="assessment_attendance"].active').data('value');
			var detail_exam_times = $articleForm.find('a[data-name="exam_times"].active').data('value');
			
			var data={
					lecture_lecture_id: id,
					comment: $textarea.val(),
					score: rate,
					grade: detail_assessment_grade,
					practice: detail_assessment_homework,
					project: detail_assessment_team,
					attend: detail_assessment_attendance,
					exam: detail_exam_times
			}
			console.log(data);
			$.ajax({
				url : "EvaluationRegist",
				type:"post",
				contentType:"application/json; charset=utf-8;",
				data : JSON.stringify({
					lecture_lecture_id: id,
					comment: $textarea.val(),
					score: rate,
					grade: detail_assessment_grade,
					practice: detail_assessment_homework,
					project: detail_assessment_team,
					attend: detail_assessment_attendance,
					exam: detail_exam_times
			}),
				success : function(data){
				console.log(data)
			}
			})
				location.reload();
//			$.ajax({
//				url: _apiServerUrl + '/save/lecture/article',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: {
//					id: _set.lectureId,
//					text: $textarea.val(),
//					year: year,
//					semester: semester,
//					rate: rate,
//					is_detail: 'true',
//					detail_assessment_grade: detail_assessment_grade,
//					detail_assessment_homework: detail_assessment_homework,
//					detail_assessment_team: detail_assessment_team,
//					detail_assessment_attendance: detail_assessment_attendance,
//					detail_exam_times: detail_exam_times
//				},
//				success: function (data) {
//					var responseCode = $(data).find('response').text();
//					if (responseCode === '0' || responseCode === '-1' || responseCode === '-3') {
//						alert('강의평을 등록할 수 없습니다. (' + responseCode + ')');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-2') {
//						alert('이미 강의평을 등록한 과목입니다.\n한 과목당 한 개의 강의평만 등록할 수 있습니다.');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-4') {
//						alert('하루에 5개 이상 등록할 수 없습니다.\n내일 더 공유 부탁드러요 :D');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-5') {
//						alert('학교 인증 후 강의평을 작성할 수 있습니다.\n먼저 학교 인증을 완료해주세요 :D');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-6') {
//						alert('강의평 작성 권한이 없습니다.');
//						_fn.hideLoadingDialog();
//					} else {
//						location.reload();
//					}
//				},
//				statusCode: {
//					401: function () {
//						alert('로그인 후 이용해주세요!');
//					}
//				}
//			});
		},
		showExamForm: function () {
//			if (_set.authToWrite === 1) {
//				alert('학교 인증 후 시험 정보를 작성할 수 있습니다.\n먼저 학교 인증을 완료해주세요 :D');
//				return;
//			}
			$examForm.show();
			$examSide.find('a.writebutton').hide();
			var scrollTop = $examForm.offset().top - $head.offset().top - 16;
			_set.isAnimating = true;
			$('html,body').animate({scrollTop: scrollTop}, 100, function () {
				setTimeout(function () {
					_set.isAnimating = false;
				}, 10);
			});
		},
		hideExamForm: function () {
			$examForm.hide();
			$examSide.find('a.writebutton').show();
		},
		writeExam: function () {
			const urlParams = new URL(location.href).searchParams;
				const id = urlParams.get('id');
				console.log(id)
			var $nth = $examForm.find('select[name="nth"]');
			var $types = $examForm.find('a[data-name="type"].active').data('value');
			var $questions = $examForm.find('input[name="question"]');
			var $knowhow = $examForm.find('textarea[name="knowhow"]');
			var nth = $nth.val();
			var questions = _.compact($questions.map(function () {
				return $(this).val().trim();
			}).get());
			var knowhow = $knowhow.val().trim();
			if (knowhow.replace(/ /gi, '').length < 20) {
				alert('시험 전략에 대해 좀 더 성의있는 작성을 부탁드립니다 :)');
				$knowhow.focus();
				return false;
			}
			if (!confirm('시험 정보를 공유하시겠습니까?\n\n※ 등록 후에는 수정하거나 삭제할 수 없습니다.\n\n※ 허위/중복/저작권침해/성의없는 정보를 작성할 경우, 서비스 이용이 제한될 수 있습니다.')) {
				return false;
			}
			
			var params = {
//				확인 되면 주석 풀것
//				lecture_lecture_id: id,
				nth: nth,
				type: $types,
				strategy: knowhow
			};
			console.log(params)
			if (questions.length > 0) {
				params.question = JSON.stringify(questions);
			}
			$.ajax({
				url : "exam/regist",
				type:"POST",
				contentType : "application/json",
				data:JSON.stringify(params),
				success : function(data){
					console.log(data);
					
				}
			});
			location.reload();
//			$.ajax({
//				url: _apiServerUrl + '/save/lecture/exam',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: params,
//				success: function (data) {
//					var responseCode = $(data).find('response').text();
//					if (responseCode === '0' || responseCode === '-1' || responseCode === '-2') {
//						alert('시험 정보를 등록할 수 없습니다.');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-3') {
//						alert('이미 등록한 시험입니다.\n한 시험에 한 번만 등록할 수 있습니다.');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-6') {
//						alert('하루에 5개 이상 등록할 수 없습니다.\n내일 더 공유 부탁드러요 :D');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-7') {
//						alert('학교 인증 후 시험 정보를 작성할 수 있습니다.\n먼저 학교 인증을 완료해주세요 :D');
//						_fn.hideLoadingDialog();
//					} else if (responseCode === '-8') {
//						alert('시험 정보 작성 권한이 없습니다.');
//						_fn.hideLoadingDialog();
//					} else {
//						location.reload();
//					}
//				},
//				statusCode: {
//					401: function () {
//						alert('로그인 후 이용해주세요!');
//						_fn.hideLoadingDialog();
//					}
//				}
//			});
		},
		showLoadingDialog: function () {
			$('<div></div>').addClass('loadingdialog').html('<p>등록 중입니다...</p>').appendTo($container);
		},
		hideLoadingDialog: function () {
			$container.find('div.loadingdialog').remove();
		}
	};
	_fn.init();
});
