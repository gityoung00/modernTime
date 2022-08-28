if (!_set) var _set = {};

$().ready(function() {
	var $subjects, $filterItems;
	var $tbody = $('#tbody');
	var $articleForm = $('#container').find('form.lecture-write');
	_set = _.extend(_set, {
		subjectColumnInfo: [],
		hasCapacity: 0,
		hasCredit: 0,
		hasGrade: 0,
		hasType: 0,
		campuses: [],
		isSubjectRendered: false,
		isSubjectLoadCompleted: false,
		subjectLimitNum: 50,
		subjectStartNum: 0,
		subjectCount: 0,
		checkedSubject: [],
		subjectFilter: {},
		id: [1, 2],
		text: ['전공', '교양'],
		filter: {
			keywordType: '',
			keyword: '',
			order: '',
			type: [1, 2],
			credit: [1, 2, 3],
		}
	});
	const weekday = {
		0: '월',
		1: '화',
		2: '수',
		3: '목',
		4: '금',
		5: '토',
		6: '일',
	}
	var _fn = {
		init: function() {

			$subjects = $('#subjects');

			$("#deleteLecture").on('click', function(e) {
				e.preventDefault();
				_fn.deleteLecture();
			});
			$("#updateLecture").on('click', function(e) {
				e.preventDefault();
				_fn.updateLecture();
			});

			// 검색어
			$('#subjectKeywordFilter').on('submit', function(e) {
				e.preventDefault();
				_fn.onSubmitKeywordFilter();
				return false;
			}).on('click', 'a.close', function(e) {
				e.preventDefault();
				$('#subjectKeywordFilter').hide();
			});

			// 과목명 정렬
			$('#subjectOrderFilter').on('submit', function(e) {
				e.preventDefault();
				_fn.onSubmitOrderFilter();
				return false;
			}).on('click', 'a.close', function(e) {
				$('#subjectOrderFilter').hide();
			});

			// 교양, 전공 구분
			$('#subjectTypeFilter').on('submit', function(event) {
				event.preventDefault();
				_fn.onSubmitTypeFilter();
				return false;
			}).on('click', 'a.close', function() {
				$('#subjectTypeFilter').hide();
			}).on('click', 'input[data-action="select"]', function() {
				$('#subjectTypeFilter').find('input[type="checkbox"]:not(:checked)').trigger('click');
			}).on('click', 'input[data-action="deselect"]', function() {
				$('#subjectTypeFilter').find('input[type="checkbox"]:checked').trigger('click');
			});

			// 학점 필터
			$('#subjectCreditFilter').on('submit', function(event) {
				event.preventDefault();
				_fn.onSubmitCreditFilter();
				return false;
			}).on('click', 'a.close', function() {
				$('#subjectCreditFilter').hide();
			}).on('click', 'input[data-action="select"]', function() {
				$('#subjectCreditFilter').find('input[type="checkbox"]:not(:checked)').trigger('click');
			}).on('click', 'input[data-action="deselect"]', function() {
				$('#subjectCreditFilter').find('input[type="checkbox"]:checked').trigger('click');
			});

		},
		loadLecture: function() {
			var scores = [];
			var params = _.extend(_.clone(_set.subjectFilter), {
				campusId: _set.subjectCampusId,
				year: _set.year,
				semester: _set.semester,
				limitNum: _set.subjectLimitNum,
				startNum: _set.subjectStartNum
			});
			$.ajax({
				url: '/admin/lecture/list',
				type: 'POST',
				data: params,
				contentType: 'application/json; charset=UTF-8',
				success: function(data) {
					console.log(data)
					$tbody.empty();
					_set.subjectCount = data.data.length;
					$("#totalLectureCount").text(`총 강의: ${data.data.length}개`);
					$(data.data).each((idx, lecture) => {
						_fn.addLecture(idx, lecture);


					})
					for (i = 0; i < scores.length; i++) {
						var percent = scores[i] / 5 * 100 + '%';
						console.log(percent);
					}

					//
				}
			});

		},
		addLecture: function(idx, lecture) {

			var percent = lecture.score / 5 * 100 + '%'
			var $tr = $('<tr></tr>');
			var $checkbox = $('<td></td>').appendTo($tr);
			$('<input type="checkbox">').data({
				id: lecture.lecture_id,
				type: lecture.type == '2' ? '교양' : '전공',
				name: lecture.name,
				teacher: lecture.teacher,
				credit: lecture.credit,
				place: lecture.place,
				lecture_time: lecture.lecture_time,
				max_student: lecture.max_student,
				week1: lecture.week1,
				starttime1: lecture.starttime1,
				endtime1: lecture.endtime1,
				week2: lecture.week2,
				starttime2: lecture.starttime2,
				endtime2: lecture.endtime2,

			}).appendTo($checkbox).on('click', function(event) {
				const lecture_id = $(this).data('id')
				if ($(this).is(':checked')) {
					_set.checkedSubject.push($(this).data());
				} else {
					_set.checkedSubject = _set.checkedSubject.filter(function(data) {
						return data.id != lecture_id
					})

				}
				_fn.showButtons();
			});
			$('<td></td>').text(lecture.type == '2' ? '교양' : '전공').appendTo($tr)
			$('<td></td>').text(_fn.getLectureTime(lecture)).appendTo($tr)
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


			$tr.appendTo($tbody);
		},
		getLectureTime: function(lecture) {
			var week1 = parseInt(lecture.week1);
			var starttime1 = lecture.starttime1;
			var endtime1 = lecture.endtime1;
			var week2 = parseInt(lecture.week2);
			var starttime2 = lecture.starttime2;
			var endtime2 = lecture.endtime2;
			time = `${weekday[week1]} ${_fn.getTime(starttime1)}-${_fn.getTime(endtime1)}, \n
			 ${weekday[week2]} ${_fn.getTime(starttime2)}-${_fn.getTime(endtime2)}`;
			return time;
		},
		getTime: function(time) {
			time = parseInt(time);
			hour = parseInt(time / 12);
			minute = (time % 12) * 5;
			return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

		},
		open: function() {
			$filterItems = $("div.filter");
			//			var $close = $('<a></a>').addClass('close').text('닫기').appendTo($filterItems);
			var $reset = $('<a></a>').addClass('reset hide').text('초기화').appendTo($filterItems);

			$reset.on('click', function() {
				_fn.reset();
			});

			$filterItems
				.on('click', 'a.item[data-id="keyword"]', function() {
					_fn.showKeywordFilter();
				}).on('click', 'a.item[data-id="keyword"] > span.reset', function(event) {
					_fn.resetKeywordFilter();
					event.stopPropagation();
				}).on('click', 'a.item[data-id="order"]', function() {
					_fn.showOrderFilter();
				}).on('click', 'a.item[data-id="order"] > span.reset', function(event) {
					_fn.resetOrderFilter();
					event.stopPropagation();
				}).on('click', 'a.item[data-id="time"]', function() {
					_fn.showTimeFilter();
				}).on('click', 'a.item[data-id="time"] > span.reset', function(event) {
					_fn.resetTimeFilter();
					event.stopPropagation();
				}).on('click', 'a.item[data-id="grade"]', function() {
					_fn.showGradeFilter();
				}).on('click', 'a.item[data-id="grade"] > span.reset', function(event) {
					_fn.resetGradeFilter();
					event.stopPropagation();
				}).on('click', 'a.item[data-id="type"]', function() {
					_fn.showTypeFilter();
				}).on('click', 'a.item[data-id="type"] > span.reset', function(event) {
					_fn.resetTypeFilter();
					event.stopPropagation();
				}).on('click', 'a.item[data-id="credit"]', function() {
					_fn.showCreditFilter();
				}).on('click', 'a.item[data-id="credit"] > span.reset', function(event) {
					_fn.resetCreditFilter();
					event.stopPropagation();
				});

			//      $list.on('scroll', function () {
			//        _fn.onListScroll();
			//      });

			//      $listTbody.on('click', 'tr > td:not(:has(a))', function () {
			//        var $tr = $(this).parent('tr');
			//        if ($container.hasClass('timetable')) {
			//          _gfn.insertSubjectIntoTable($tr.data('subject'), function () {
			//            _gfn.save(_set.tableId, $('#tableName').text());
			//          });
			//        } else if ($container.hasClass('wizard')) {
			//          _gfn.insertSubjectIntoGroup($tr.data('subject'));
			//        }
			//      }).on('mouseenter', 'tr > td:not(:has(a))', function () {
			//        var $tr = $(this).parent('tr');
			//        if ($container.hasClass('timetable')) {
			//          _gfn.previewSubjectInTable($tr.data('subject'));
			//        }
			//      }).on('mouseleave', 'tr > td:not(:has(a))', function () {
			//        if ($container.hasClass('timetable')) {
			//          _gfn.previewSubjectInTable();
			//        }
			//      });
		},
		close: function() {
			$subjects.hide();
			_gfn.resizeContainer();
		},
		reset: function() {
			_set.subjectFilter = {};
			$subjects.empty();
			_fn.close();
		},
		resize: function() {
			if ($subjects && $subjects.is(':visible') && $subjects.width() < 640) {
				_fn.close();
			}
		},
		showKeywordFilter: function() {
			//      if (_set.isSubjectRendered === false) {
			//        return;
			//      }
			var $filter = $('#subjectKeywordFilter').find('div.filter');
			$filter.empty();
			var setType, setKeyword;
			if (_set.subjectFilter.keyword) {
				var setFilter = JSON.parse(_set.subjectFilter.keyword);
				setType = setFilter.type;
				setKeyword = setFilter.keyword;
			} else {
				setType = 'name';
				setKeyword = '';
			}
			var keywordTypes = [{ id: 'name', text: '과목명' }, { id: 'professor', text: '교수명' }, { id: 'place', text: '강의실' }];
			_.each(keywordTypes, function(keywordType) {
				var $label = $('<label></label>').addClass('inline').appendTo($filter);
				var $radio = $('<input>').attr({ type: 'radio', name: 'keyword_type' }).data('keywordType', keywordType).appendTo($label);
				if (setType === keywordType.id) {
					$radio.attr('checked', true);
				}
				$('<span></span>').html(keywordType.text).appendTo($label);
			});
			var $keyword = $('<input>').addClass('keyword').attr({ type: 'search', name: 'keyword', placeholder: '검색어' }).val(setKeyword).appendTo($filter);
			$('#subjectKeywordFilter').show();
			$keyword.focus();
		},
		resetKeywordFilter: function() {
			_set.filter.keywordType = '';
			_set.filter.keyword = '';
			_fn.resetFilterItem('keyword');
			_fn.sendFilter();
		},
		onSubmitKeywordFilter: function() {
			var $radios = $('#subjectKeywordFilter').find('input[type="radio"]');
			var $keyword = $('#subjectKeywordFilter').find('input[name="keyword"]');
			var keywordType = $radios.filter(':checked').data('keywordType');

			var keyword = $keyword.val().trim();

			if (keyword.replace(/\s/g, '').length < 2) {
				alert('검색어를 두 글자 이상 입력해주세요.');
				return;
			}
			var $filterItem = $filterItems.find('a.item[data-id="keyword"]').addClass('active');
			$filterItem.find('span.key').html(keywordType.text + ':');
			$filterItem.find('span.value').html(keyword);
			$('#subjectKeywordFilter').hide();

			_set.filter.keywordType = keywordType.id;
			_set.filter.keyword = keyword;
			_fn.sendFilter();
		},
		showOrderFilter: function() {
			var $filter = $('#subjectOrderFilter').find('div.filter');
			$filter.empty();
			var orders = [
				{ id: undefined, text: '기본' },
				{ id: 'name', text: '과목명' },
				{ id: 'rateDesc', text: '별점 높은순' },
				{ id: 'rateAsc', text: '별점 낮은순' },
				{ id: 'popularDesc', text: '담은인원 많은순' },
				{ id: 'popularAsc', text: '담은인원 적은순' }
			];
			_.each(orders, function(order) {
				var $label = $('<label></label>').appendTo($filter);
				var $radio = $('<input>').attr({ type: 'radio', name: 'order' }).data('order', order).appendTo($label);
				if (_set.subjectFilter.order === order.id) {
					$radio.attr('checked', true);
				}
				$('<span></span>').html(order.text).appendTo($label);
			});
			$('#subjectOrderFilter').show();
		},
		resetOrderFilter: function() {
			_set.filter.order = '';
			_fn.resetFilterItem('order');
			$('#subjectOrderFilter').hide();
			_fn.sendFilter();
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
		},
		onSubmitOrderFilter: function() {
			var $radios = $('#subjectOrderFilter').find('input[type="radio"]');
			var order = $radios.filter(':checked').data('order');
			if (order.id === undefined) {
				_fn.resetOrderFilter();
				return;
			}

			var $filterItem = $filterItems.find('a.item[data-id="order"]').addClass('active');
			$filterItem.find('span.value').html(order.text);
			$('#subjectOrderFilter').hide();

			_set.filter.order = order.id;
			_fn.sendFilter();
		},
		showTypeFilter: function() {
			//      if (_set.isSubjectRendered === false) {
			//        return;
			//      }
			var $filter = $('#subjectTypeFilter').find('div.filter');
			$filter.empty();
			var setTypeFilter;
			if (_set.subjectFilter.type) {
				setTypeFilter = JSON.parse(_set.subjectFilter.type);
			}
			var items = [_set.id, _set.text];
			$(this).attr({ type: 'form', name: 'type' });
			//			_.each(items, function() {
			var type1 = {
				id: 1,
				text: '전공'
			};
			var type2 = {
				id: 2,
				text: '교양'
			};
			var $label = $('<label></label>').appendTo($filter);
			var $checkbox = $('<input>').attr({ type: 'checkbox', name: 'type' }).data('type', type1).appendTo($label);
			if (setTypeFilter === undefined || _.contains(setTypeFilter, type1.id) === true) {
				$checkbox.attr('checked', true);
			}
			$('<span></span>').html(type1.text).appendTo($label);
			var $label = $('<label></label>').appendTo($filter);
			var $checkbox = $('<input>').attr({ type: 'checkbox', name: 'type' }).data('type', type2).appendTo($label);
			if (setTypeFilter === undefined || _.contains(setTypeFilter, type2.id) === true) {
				$checkbox.attr('checked', true);
			}
			$('<span></span>').html(type2.text).appendTo($label);
			//			});
			$('#subjectTypeFilter').show();
		},
		resetTypeFilter: function() {
			_set.filter.type = '';
			_fn.resetFilterItem('type');
			$('#subjectTypeFilter').hide();
			_fn.sendFilter();
		},
		onSubmitTypeFilter: function() {
			console.log("onSubmitTypeFilter")
			var $checkboxes = $('#subjectTypeFilter').find('input[type="checkbox"]');
			var types = $checkboxes.filter(':checked').map(function() {
				return $(this).data('type') || $(this).data('type');
			}).get();
			if (types.length === 0) {
				alert('구분을 1개 이상 선택해주세요.');
				return;
			}
			if ($checkboxes.length === types.length) {
				_fn.resetTypeFilter();
				//				return;
			}
			var value = _.pluck(types, 'text').slice(0, 2).join(', ');
			if (types.length >= 3) {
				value += ' 외 ' + (types.length - 2) + '개';
			}
			var $filterItem = $filterItems.find('a.item[data-id="type"]').addClass('active');
			$filterItem.find('span.value').html(value);
			$('#subjectTypeFilter').hide();


			_set.filter.type = _.pluck(types, 'id');
			_fn.sendFilter();
		},
		showCreditFilter: function() {
			var $filter = $('#subjectCreditFilter').find('div.filter');
			$filter.empty();
			var setCreditFilter;
			if (_set.subjectFilter.credit) {
				setCreditFilter = JSON.parse(_set.subjectFilter.credit);
			}
			var items = _.range(1, 4, 1);
			_.each(items, function(item) {
				var credit = {
					id: item,
					shortText: item.toString().replace('4', '4~'),
					fullText: item.toString() + '학점' + (item === 4 ? ' 이상' : '')
				};
				var $label = $('<label></label>').appendTo($filter);
				var $checkbox = $('<input>').attr({ type: 'checkbox', name: 'credit' }).data('credit', credit).appendTo($label);
				if (setCreditFilter === undefined || _.contains(setCreditFilter, credit.id) === true) {
					$checkbox.attr('checked', true);
				}
				$('<span></span>').html(credit.fullText).appendTo($label);
			});
			$('#subjectCreditFilter').show();
		},
		resetCreditFilter: function() {
			_set.filter.credit = '';
			_fn.resetFilterItem('credit');
			$('#subjectCreditFilter').hide();
			_fn.sendFilter();
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
		},
		onSubmitCreditFilter: function() {
			var $checkboxes = $('#subjectCreditFilter').find('input[type="checkbox"]');
			var credits = $checkboxes.filter(':checked').map(function() {
				return $(this).data('credit');
			}).get();
			if (credits.length === 0) {
				alert('학점을 1개 이상 선택해주세요.');
				return;
			}
			if ($checkboxes.length === credits.length) {
				_fn.resetCreditFilter();
				//				return;
			}
			//			_set.subjectFilter.credit = JSON.stringify(_.pluck(credits, 'id'));
			var value = _.pluck(credits, 'shortText').slice(0, 2).join(',');
			if (credits.length >= 3) {
				value += ' 외 ' + (credits.length - 2) + '개';
			}

			var $filterItem = $filterItems.find('a.item[data-id="credit"]').addClass('active');
			$filterItem.find('span.value').html(value);
			$('#subjectCreditFilter').hide();

			_set.filter.credit = _.pluck(credits, 'id');
			_fn.sendFilter();

		},
		sendFilter: function() {
			console.log(_set.filter);
			let params = JSON.stringify(_set.filter);
			$.ajax({
				url: '/admin/lecture/filter',
				type: 'POST',
				contentType: 'application/JSON; charset=utf-8;',
				data: params,
				success: function(data) {
					console.log(data)
					$tbody.empty();
					_set.subjectCount = data.data.length;
					$("#totalLectureCount").text(`총 강의: ${data.data.length}개`);
					$(data.data).each((idx, lecture) => {
						_fn.addLecture(idx, lecture);
					})
				}
			})
		},
		appendListThead: function() {
			var $tr = $('<tr></tr>');
			if (_set.hasSyllabus === true) {
				var $syllabusTh = $('<th></th>').text('계획서').appendTo($tr);
				$('<div></div>').text('계획서').appendTo($syllabusTh);
			}
			_.each(_set.subjectColumnInfo, function(item) {
				var $th = $('<th></th>').text(item.value).appendTo($tr);
				$('<div></div>').text(item.value).appendTo($th);
			});
			$tr.appendTo($listThead);
		},
		loadSubjects: function(isClear, callback) {
			if (isClear === true) {
				_set.isSubjectLoadCompleted = false;
				_set.subjectStartNum = 0;
				$listTbody.empty();
				$listTfoot.show();
			}
			_set.isSubjectRendered = false;
			_set.subjectFilter = JSON.parse(JSON.stringify(_set.subjectFilter));
			var params = _.extend(_.clone(_set.subjectFilter), {
				campusId: _set.subjectCampusId,
				year: _set.year,
				semester: _set.semester,
				limitNum: _set.subjectLimitNum,
				startNum: _set.subjectStartNum
			});
			if (isClear === true && typeof gtag === 'function') {
				var gtagEventParams = JSON.parse(JSON.stringify({
					'event_category': 'Timetable',
					'SubjectFilterKeyword': _set.subjectFilter.keyword,
					'SubjectFilterOrder': _set.subjectFilter.order,
					'SubjectFilterTime': _set.subjectFilter.time,
					'SubjectFilterGrade': _set.subjectFilter.grade,
					'SubjectFilterType': _set.subjectFilter.type,
					'SubjectFilterCredit': _set.subjectFilter.credit
				}));
				gtag('config', 'UA-22022140-4', { 'custom_map': { 'dimension1': 'SubjectFilterCategoryId', 'dimension2': 'SubjectFilterKeyword', 'dimension3': 'SubjectFilterOrder', 'dimension4': 'SubjectFilterTime', 'dimension5': 'SubjectFilterGrade', 'dimension6': 'SubjectFilterType', 'dimension7': 'SubjectFilterCredit' } });
				gtag('event', 'LoadSubjects', gtagEventParams);
			}
		},
		resetFilterItem: function(id) {
			if (id === 'category') {
				$filterItems.find('a.item[data-id="category"]').removeClass('active').html('<span class="key">전공/영역:</span><span class="value">전체</span><span class="reset"></span>');
			} else if (id === 'keyword') {
				$filterItems.find('a.item[data-id="keyword"]').removeClass('active').html('<span class="key">검색어:</span><span class="value">없음</span><span class="reset"></span>');
			} else if (id === 'order') {
				$filterItems.find('a.item[data-id="order"]').removeClass('active').html('<span class="key">정렬:</span><span class="value">기본</span><span class="reset"></span>');
			} else if (id === 'time') {
				$filterItems.find('a.item[data-id="time"]').removeClass('active').html('<span class="key">시간:</span><span class="value">전체</span><span class="reset"></span>');
			} else if (id === 'grade') {
				$filterItems.find('a.item[data-id="grade"]').removeClass('active').html('<span class="key">학년:</span><span class="value">전체</span><span class="reset"></span>');
			} else if (id === 'type') {
				$filterItems.find('a.item[data-id="type"]').removeClass('active').html('<span class="key">구분:</span><span class="value">전체</span><span class="reset"></span>');
			} else if (id === 'credit') {
				$filterItems.find('a.item[data-id="credit"]').removeClass('active').html('<span class="key">학점:</span><span class="value">전체</span><span class="reset"></span>');
			}
		},
		deleteLecture: function() {
			if (confirm("정말로 삭제하시겠습니까?")) {
				console.log(_set.checkedSubject)
				lectureIds = _set.checkedSubject.map(row => row.id)
				console.log(lectureIds)
				$.ajax({
					type: "POST",
					url: "/admin/lecture/delete",
					contentType: "application/json; charset=utf-8;",
					data: JSON.stringify({ ids: lectureIds }),
					success: function(data) {
						console.log(data);
						alert("강의를 삭제했습니다.");
						location.reload();
					},
					error: function() {
						alert("삭제 실패");
					}

				});
				//				
			}

			//
		},
		showUpdateForm: function(data) {
			console.log("data", data)
			$articleForm.show();
			$articleForm.find('h2').text('강의 수정');
			$articleForm.find('select[name="type"]').val(data.type).on('change', function(e) {
				data.type = e.target.value;
			})
			$articleForm.find('input[name="lecture_id"]').val(data.id).attr("readonly",true).on('change', function(e) {
				data.id = e.target.value;
			})
			$articleForm.find('input[name="name"]').val(data.name).on('change', function(e) {
				data.name = e.target.value;
			})
			$articleForm.find('input[name="teacher"]').val(data.teacher).on('change', function(e) {
				data.teacher = e.target.value;
			})
			$articleForm.find('select[name="credit"]').val(data.credit).on('change', function(e) {
				data.credit = e.target.value;
			})

			// 날짜
			let dweek = [data.week1, data.week2];
			let dstarthour = [Number(data.starttime1 / 12), Number(data.starttime2 / 12)];
			let dstartminute = [(data.starttime1 % 12) * 5, (data.starttime2 % 12) * 5];
			let dendhour = [Number(data.endtime1 / 12), Number(data.endtime2 / 12)];
			let dendminute = [(data.endtime1 % 12) * 5, (data.endtime2 % 12) * 5];

			$("ol.weeks").each(function(idx, weeks) {
				$(weeks).find('li.active').removeClass("active");
				$(weeks).find('li').filter(function(data) {
					return data == dweek[idx]
				}).addClass("active");
			})
			$("select.starthour").each(function(idx, starthour) {
				$(starthour).find('option').prop("selected", false);
				$(starthour).find('option').filter(function(data) {
					return data == dstarthour[idx]
				}).prop("selected", true);
			})
			$("select.startminute").each(function(idx, startminute) {
				$(startminute).find('option').prop("selected", false);
				$(startminute).find('option').filter(function(data) {
					return data == dstartminute[idx]
				}).prop("selected", true);
			})
			$("select.endhour").each(function(idx, endhour) {
				$(endhour).find('option').prop("selected", false);
				$(endhour).find('option').filter(function(data) {
					return data == dendhour[idx]
				}).prop("selected", true);
			})
			$("select.endminute").each(function(idx, endminute) {
				$(endminute).find('option').prop("selected", false);
				$(endminute).find('option').filter(function(data) {
					return data == dendminute[idx]
				}).prop("selected", true);
			})


			$articleForm.find('input[name="place"]').val(data.place).on('change', function(e) {
				data.place = e.target.value;
			})
			$articleForm.find('input[name="lecture_time"]').val(data.lecture_time).on('change', function(e) {
				data.lecture_time = e.target.value;
			})
			$articleForm.find('input[name="max_student"]').val(data.max_student).on('change', function(e) {
				data.max_student = e.target.value;
			})



			$articleForm.find('input[type="submit"]').val("수정하기").off("click").on('click', function(event) {
				event.preventDefault();
				_fn.updateLecture(data);
			});

		},
		updateLecture: function(data) {
			data.lecture_id = data.id;
			console.log(data);
			if (!data.type || !data.lecture_id || !data.name || !data.teacher ||
				!data.place) {
				alert('모든 값을 정확히 입력해주세요.')
				return;
			}
			$.ajax({
				type: "POST",
				url: "/admin/lecture/update",
				contentType: "application/json; charset=utf-8;",
				data: JSON.stringify(data),
				success: function(data) {
					alert("강의 수정이 완료되었습니다.")
					location.reload();
				},
				error: function() {
					alert("수정 실패");
				}

			});
//			//
		},
		showButtons: function() {
			// 전체 버튼 해제
			$('input[name="allCheck"]').prop('checked', false);
			// 버튼 다 지우기
			$buttons = $("#buttons");
			$buttons.empty();
			console.log(_set.checkedSubject)
			if (_set.checkedSubject.length == 1) {
				$("<a></a>").text("수정").appendTo($buttons).on('click', function(event) {
					_fn.showUpdateForm(_set.checkedSubject[0]);

				})
				$("<a></a>").text("삭제").appendTo($buttons).on('click', function() {
					_fn.deleteLecture();
				})
			} else if (_set.checkedSubject.length > 0) {
				// 삭제 버튼만 보여주기 , 수정 버튼은 안보이기
				$("<a></a>").text("삭제").appendTo($buttons).on('click', function() {
					_fn.deleteLecture();
				})
			}

			// 전체 버튼 체크
			if (_set.checkedSubject.length == _set.subjectCount) {
				$('input[name="allCheck"]').prop('checked', false);
			}

		},
	}



	_fn.init();
	_fn.open();
	_fn.loadLecture();
});