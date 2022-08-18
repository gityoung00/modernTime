$().ready(function() {
	var $container = $('#container');
	var $lectureRegistDiv = $('div.lectureRegist');
	var $articleForm = $container.find('form.lecture-write');
	var $tbody = $('#tbody');
	var _params = {
		type: '교양',
		lecture_id: '',
		name: '',
		teacher: '',
		credit: 3,
		week1: 0,
		starttime1: 108,
		endtime1: 120,
		week2: 0,
		starttime2: 108,
		endtime2: 120,
		place: '',
		lecture_time: 1,
		max_student: 1,
	};
	const weekday = {
		0: '월',
		1: '화',
		2: '수',
		3: '목',
		4: '금',
		5: '토',
		6: '일',
	};
	var _gn = {
		init: function() {
			$lectureRegistDiv.on('click', 'a.writebutton', function() {
				_gn.showArticleForm();
			});
			$articleForm.on('click', function(event) {
				if (event.target === event.currentTarget) {
					_gn.hideArticleForm();
				}
			});
			$articleForm.on('click', 'a.close', function(event) {
				_gn.hideArticleForm();
			});
			$articleForm.on('submit', function() {
				_gn.writeArticle();
				return false;
			});
			// 과목 구분
			$articleForm.on('change', 'select.type', function(event) {
				_params.type = event.target.value
			});

			// 과목 번호
			$articleForm.on('change', 'input[name="lecture_id"]', function(event) {
				_params.lecture_id = event.target.value
				console.log(_params)
			});

			// 강의명
			$articleForm.on('change', 'input[name="name"]', function(event) {
				_params.name = event.target.value
				console.log(_params)
			});

			// 강사
			$articleForm.on('change', 'input[name="teacher"]', function(event) {
				_params.teacher = event.target.value
				console.log(_params)
			});

			// 학점
			$articleForm.on('change', 'select.credit', function(event) {
				_params.credit = event.target.value
				console.log(_params)
			});

			// 요일 클릭
			$articleForm.on('click', 'ol.weeks>li', function(event) {
				var $week = $(event.target);
				$week.siblings('li.active').removeClass('active');
				$week.addClass('active');
				$articleForm.find('ol.weeks>li.active').each((idx, item) => {
					_params[`week${idx + 1}`] = $(item).data().value
				});
				console.log(_params)
			});

			// 시간 클릭(starthour)
			$articleForm.on('change', 'select.starthour', function(event) {
				$articleForm.find('select.starthour').each((idx, item) => {
					starthour = parseInt($(item).val()) * 12
					startminute = _params[`starttime${idx + 1}`] % 12;

					if (starthour + startminute >= _params[`endtime${idx + 1}`]) {
						alert('시작시간은 종료시간보다 더 빨라야 합니다.')
						$(item).val(0);
						return;
					}

					_params[`starttime${idx + 1}`] = starthour + startminute;

				});
				console.log(_params)
			});
			// 시간 클릭(startminute)
			$articleForm.on('change', 'select.startminute', function(event) {
				$articleForm.find('select.startminute').each((idx, item) => {
					starthour = parseInt(_params[`starttime${idx + 1}`] / 12) * 12;
					startminute = parseInt(parseInt($(item).val()) / 5);
					if (starthour + startminute >= _params[`endtime${idx + 1}`]) {
						alert('시작시간은 종료시간보다 더 빨라야 합니다.')
						$(item).val(0);
						return;
					}
					_params[`starttime${idx + 1}`] = starthour + startminute;
				});
			});
			// 시간 클릭(endhour)
			$articleForm.on('change', 'select.endhour', function(event) {
				$articleForm.find('select.endhour').each((idx, item) => {
					endhour = parseInt($(item).val()) * 12
					endminute = _params[`endtime${idx + 1}`] % 12;
					if (_params[`starttime${idx + 1}`] >= endhour + endminute) {
						alert('시작시간은 종료시간보다 더 빨라야 합니다.')
						$(item).val(23);
						return;
					}
					_params[`endtime${idx + 1}`] = endhour + endminute;
				});
			});

			// 시간 클릭(endminute)
			$articleForm.on('change', 'select.endminute', function(event) {
				$articleForm.find('select.endminute').each((idx, item) => {
					endhour = parseInt(_params[`endtime${idx + 1}`] / 12) * 12;
					endminute = parseInt(parseInt($(item).val()) / 5);
					if (_params[`starttime${idx + 1}`] >= endhour + endminute) {
						alert('시작시간은 종료시간보다 더 빨라야 합니다.')
						$(item).val(55);
						return;
					}
					_params[`endtime${idx + 1}`] = endhour + endminute;
				});
			});
			// 장소
			$articleForm.on('change', 'input[name="place"]', function(event) {
				_params.place = event.target.value
			});
			// 총 강의시간
			$articleForm.on('change', 'input[name="lecture_time"]', function(event) {
				if (event.target.value < 1) {
					alert('1 이상의 숫자를 입력해주세요.')
					event.target.value = 1;
					return;
				}
				_params.lecture_time = event.target.value
			});
			// 정원
			$articleForm.on('change', 'input[name="max_student"]', function(event) {
				if (event.target.value < 1) {
					alert('1 이상의 숫자를 입력해주세요.')
					event.target.value = 1;
					return;
				}
				_params.max_student = event.target.value
			});
		},
		showArticleForm: function() {
			$articleForm.show();
		},
		hideArticleForm: function() {
			$articleForm.hide();
		},
		writeArticle: function() {
			if (!_params.type || !_params.lecture_id || !_params.name || !_params.teacher ||
				!_params.place) {
				alert('모든 값을 정확히 입력해주세요.')
				return;
			}
			$.ajax({
				url: 'lecture/regist',
				xhrFields: { withCredentials: true },
				type: 'POST',
				contentType: 'application/json; charset=UTF-8',
				data: JSON.stringify(_params),
				success: function(res) {
					if (res.status == 1){
						_gn.addLecture(res.data);
						_gn.hideArticleForm();
					// 내용이 다 작성되지 않았을때
					} else if (res.status == -1){
						alert('내용을 다 작성해주세요.');
					// 강의 등록을 실패했을때
					} else if (res.status == 0){
						alert('강의 등록을 실패했습니다.');
						_gn.hideArticleForm();
					}
				}
			});


		},
		addLecture: function(lecture) {
			var percent = lecture.score / 5 * 100 + '%'
			var $tr = $('<tr></tr>')
			$('<td></td>').text(lecture.type).appendTo($tr)
			$('<td></td>').text(_gn.getLectureTime(lecture)).appendTo($tr)
			$('<td></td>').text(lecture.name).addClass('bold').appendTo($tr)
			$('<td></td>').text(lecture.teacher).appendTo($tr)
			$('<td></td>').text(lecture.credit).appendTo($tr)
			$('<td></td>').text(lecture.place).appendTo($tr)
			// 별점
			// <a class='star'><span class='on' style='width:" + percent + "'></span></a>
			$score = $('<td></td>')
			$aStar = $('<a></a>').addClass('star')
			$('<span></span>').addClass('on').css("width", percent).appendTo($aStar)
			$aStar.appendTo($score)
			$score.appendTo($tr)

			$('<td></td>').text(lecture.listen_student).addClass('small').appendTo($tr)
			$('<td></td>').text(lecture.max_student).addClass('small').appendTo($tr)
			$tr.prependTo($tbody);
		},
		getLectureTime: function(lecture) {
			var week1 = parseInt(lecture.week1);
			var starttime1 = lecture.starttime1;
			var endtime1 = lecture.endtime1;
			var week2 = parseInt(lecture.week2);
			var starttime2 = lecture.starttime2;
			var endtime2 = lecture.endtime2;
			console.log(week1, week2)
			time = `${weekday[week1]} ${_gn.getTime(starttime1)}-${_gn.getTime(endtime1)}, ${weekday[week2]} ${_gn.getTime(starttime2)}-${_gn.getTime(endtime2)}`;
			return time;
		},
		getTime: function(time) {
			time = parseInt(time);
			hour = parseInt(time / 12);
			minute = (time % 12) * 5;
			return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

		},
		showLoadingDialog: function() {
			$('<div></div>').addClass('loadingdialog').html('<p>등록 중입니다...</p>').appendTo($container);
		},
		hideLoadingDialog: function() {
			$container.find('div.loadingdialog').remove();
		}
	};
	_gn.init();
});
