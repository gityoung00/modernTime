if (!_set) var _set = {};

$().ready(function() {
	var $subjects, $filterItems;
	_set = _.extend(_set, {
		subjectSchoolId: 0,
		subjectCampusId: 0,
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
		subjectFilter: {},
		id : [1,2],
		text : ['전공','교양'],
	});
	var _fn = {
		init: function() {
			
			$subjects = $('#subjects');

			$("#deleteLecture").on('click',function(e){
				e.preventDefault();
				_fn.deleteLecture();
			});
			$("#updateLecture").on('click',function(e){
				e.preventDefault();
				_fn.updateLecture();
			});
			$('#subjectKeywordFilter').on('submit', function(e) {
				e.preventDefault();
				_fn.onSubmitKeywordFilter();
				return false;
			}).on('click', 'a.close', function(e) {
				e.preventDefault();
				$('#subjectKeywordFilter').hide();
			});

			$('#subjectOrderFilter').on('submit', function(e) {
				e.preventDefault();
				_fn.onSubmitOrderFilter();
				return false;
			}).on('click', 'a.close', function(e) {
				$('#subjectOrderFilter').hide();
			});

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
				url: 'admin/lectureList',
				type: 'POST',
				data: params,
				contentType: 'application/json; charset=UTF-8',
				success: function(data) {
					console.log(data);
					var jsonDatas = data;//JSON.parse(data);
					var list = "";

					for (i = 0; i < jsonDatas.cd.length; i++) {
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list += "<tr>";
						list = list + "<td>" + jsonDatas.cd[i].type + "</td>";
						if (jsonDatas.cd[i].time2 === 'null' || jsonDatas.cd[i].time2 === "") {
							list = list + "<td>" + jsonDatas.cd[i].time1 + "</td>";
						} else {
							list = list + "<td>" + jsonDatas.cd[i].time1 + jsonDatas.cd[i].time2 + "</td>";
						}
						list = list + "<td class='bold'>" + jsonDatas.cd[i].name + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].teacher + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].credit + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].place, jsonDatas.cd[i].lectureTime + "</td>";
						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";//jsonDatas.cd[i].score
						list = list + "<td>" + jsonDatas.cd[i].listenStudent + "</td>";
						list = list + "<td class='small'>" + jsonDatas.cd[i].maxStudent + "</td>";
						list = list + "<td><input id='chkbox' class='chkbox' name='chkbox' value='"+jsonDatas.cd[i].lectureId+"' type='checkbox' /></td>"
						list += "</tr>";
					}
					$("#tbody").html(list);
					//
					//var $star = $('<a></a>');
					//$star.addClass('star').appendTo($td);

					for (i = 0; i < scores.length; i++) {
						var percent = scores[i] / 5 * 100 + '%';
						console.log(percent);
						//$('<span></span>').addClass('on').width(percent).appendTo($star);
					}

					//
				}
			});

		},
		open: function() {
			$filterItems = $("div.filter");
			//			var $close = $('<a></a>').addClass('close').text('닫기').appendTo($filterItems);
			var $reset = $('<a></a>').addClass('reset hide').text('초기화').appendTo($filterItems);

			//      $list = $('<div></div>').addClass('list').appendTo($subjects);
			//      $('<div></div>').addClass('thead').appendTo($list);
			//      var $listTable = $('<table></table>').appendTo($list);
			//      $listThead = $('<thead></thead>').appendTo($listTable);
			//      _fn.appendListThead();
			//      $listTbody = $('<tbody></tbody>').appendTo($listTable);
			//      $listTfoot = $('<tfoot></tfoot>').appendTo($listTable);
			//      var $listTfootTr = $('<tr></tr>').appendTo($listTfoot);
			//      $('<td></td>').attr('colspan', $listThead.find('tr > th').length).appendTo($listTfootTr);
			_fn.loadFilter(function(data) {
				_fn.appendFilter(data);
				//        _fn.loadSubjects(true, function (data) {
				//          _fn.appendSubjects(data);
				//        });
			});


			//      $close.on('click', function () {
			//        _fn.close();
			//      });
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
			_set.subjectFilter.keyword = undefined;
			_fn.resetFilterItem('keyword');
			_fn.loadLecture();
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
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
			_set.subjectFilter.keyword = JSON.stringify({ type: keywordType.id, keyword: keyword });
			//    {type: keywordType.id, keyword: keyword};
			var params={
				type : keywordType.text,
				search : keyword
				
			};
				console.log(params);
			$.ajax({
				url:'/lectureFilterKeyword',
				type:'POST',
				data : params,
				success:function(data){
					console.log(data);
					var jsonDatas = data;//JSON.parse(data);
					var list = "";

					for (i = 0; i < jsonDatas.cd.length; i++) {
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list += "<tr>";
						list = list + "<td>" + jsonDatas.cd[i].type + "</td>";
						if (jsonDatas.cd[i].time2 === 'null' || jsonDatas.cd[i].time2 === "") {
							list = list + "<td>" + jsonDatas.cd[i].time1 + "</td>";
						} else {
							list = list + "<td>" + jsonDatas.cd[i].time1 + jsonDatas.cd[i].time2 + "</td>";
						}
						list = list + "<td class='bold'>" + jsonDatas.cd[i].name + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].teacher + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].credit + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].place, jsonDatas.cd[i].lectureTime + "</td>";
						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";//jsonDatas.cd[i].score
						list = list + "<td>" + jsonDatas.cd[i].listenStudent + "</td>";
						list = list + "<td class='small'>" + jsonDatas.cd[i].maxStudent + "</td>";
						list = list + "<td><input id='chkbox' class='chkbox' name='chkbox' value='"+jsonDatas.cd[i].lectureId+"' type='checkbox' /></td>"
						list += "</tr>";
					}
					$("#tbody").html(list);
				}
			})
			var $filterItem = $filterItems.find('a.item[data-id="keyword"]').addClass('active');
			$filterItem.find('span.key').html(keywordType.text + ':');
			$filterItem.find('span.value').html(keyword);
			$('#subjectKeywordFilter').hide();
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
		},
		showOrderFilter: function() {
			//      if (_set.isSubjectRendered === false) {
			//        return;
			//      }
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
			if (_set.hasCapacity === true) {
				orders.push({ id: 'competitionDesc', text: '경쟁률 높은순' });
				orders.push({ id: 'competitionAsc', text: '경쟁률 낮은순' });
			}
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
			_set.subjectFilter.order = undefined;
			_fn.resetFilterItem('order');
			$('#subjectOrderFilter').hide();
			_fn.loadLecture();
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
			_set.subjectFilter.order = order.id;
			var $filterItem = $filterItems.find('a.item[data-id="order"]').addClass('active');
			$filterItem.find('span.value').html(order.text);
			$('#subjectOrderFilter').hide();
			var params = {
				orderId : order.id
			}
			console.log(params);
			$.ajax({
				url:'/lectureFilterOrder',
				type:'POST',
				data : params,
				success:function(data){
					console.log(data);
					var jsonDatas = data;//JSON.parse(data);
					var list = "";

					for (i = 0; i < jsonDatas.cd.length; i++) {
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list += "<tr>";
						list = list + "<td>" + jsonDatas.cd[i].type + "</td>";
						if (jsonDatas.cd[i].time2 === 'null' || jsonDatas.cd[i].time2 === "") {
							list = list + "<td>" + jsonDatas.cd[i].time1 + "</td>";
						} else {
							list = list + "<td>" + jsonDatas.cd[i].time1 + jsonDatas.cd[i].time2 + "</td>";
						}
						list = list + "<td class='bold'>" + jsonDatas.cd[i].name + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].teacher + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].credit + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].place, jsonDatas.cd[i].lectureTime + "</td>";
						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";//jsonDatas.cd[i].score
						list = list + "<td>" + jsonDatas.cd[i].listenStudent + "</td>";
						list = list + "<td class='small'>" + jsonDatas.cd[i].maxStudent + "</td>";
						list = list + "<td><input id='chkbox' class='chkbox' name='chkbox' value='"+jsonDatas.cd[i].lectureId+"' type='checkbox' /></td>"
						list += "</tr>";
					}
					$("#tbody").html(list);
				}});
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
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
			var items =  [_set.id,_set.text];
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
			_set.subjectFilter.type = undefined;
			_fn.resetFilterItem('type');
			$('#subjectTypeFilter').hide();
			_fn.loadLecture();
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
		},
		onSubmitTypeFilter: function() {
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
				return;
			}
			_set.subjectFilter.type = JSON.stringify(_.pluck(types, 'id'));
			var value = _.pluck(types, 'text').slice(0, 2).join(', ');
			if (types.length >= 3) {
				value += ' 외 ' + (types.length - 2) + '개';
			}
			var $filterItem = $filterItems.find('a.item[data-id="type"]').addClass('active');
			$filterItem.find('span.value').html(value);
			$('#subjectTypeFilter').hide();
			console.log(value)
			$.ajax({
				url:'/lectureFilterType',
				type:'POST',
				data : {type : value},
				success : function(data){
					console.log(data)
					var jsonDatas = data;//JSON.parse(data);
					var list = "";

					for (i = 0; i < jsonDatas.cd.length; i++) {
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list += "<tr>";
						list = list + "<td>" + jsonDatas.cd[i].type + "</td>";
						if (jsonDatas.cd[i].time2 === 'null' || jsonDatas.cd[i].time2 === "") {
							list = list + "<td>" + jsonDatas.cd[i].time1 + "</td>";
						} else {
							list = list + "<td>" + jsonDatas.cd[i].time1 + jsonDatas.cd[i].time2 + "</td>";
						}
						list = list + "<td class='bold'>" + jsonDatas.cd[i].name + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].teacher + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].credit + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].place, jsonDatas.cd[i].lectureTime + "</td>";
						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";//jsonDatas.cd[i].score
						list = list + "<td>" + jsonDatas.cd[i].listenStudent + "</td>";
						list = list + "<td class='small'>" + jsonDatas.cd[i].maxStudent + "</td>";
						list = list + "<td><input id='chkbox' class='chkbox' name='chkbox' value='"+jsonDatas.cd[i].lectureId+"' type='checkbox' /></td>"
						list += "</tr>";
					}
					$("#tbody").html(list);
					
				}
			})
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
		},
		showCreditFilter: function() {
			//      if (_set.isSubjectRendered === false) {
			//        return;
			//      }
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
			_set.subjectFilter.credit = undefined;
			_fn.resetFilterItem('credit');
			$('#subjectCreditFilter').hide();
			_fn.loadLecture();
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
				return;
			}
			_set.subjectFilter.credit = JSON.stringify(_.pluck(credits, 'id'));
			var value = _.pluck(credits, 'shortText').slice(0, 2).join(',');
			if (credits.length >= 3) {
				value += ' 외 ' + (credits.length - 2) + '개';
			}
			console.log(value);
			var $filterItem = $filterItems.find('a.item[data-id="credit"]').addClass('active');
			$filterItem.find('span.value').html(value);
			$('#subjectCreditFilter').hide();
			$.ajax({
				url:'/lectureFilterCredit',
				type:'POST',
				data : {
					credit : value
				},
				success : function(data){
				console.log(data)
					var jsonDatas = data;//JSON.parse(data);
					var list = "";

					for (i = 0; i < jsonDatas.cd.length; i++) {
						var percent = jsonDatas.cd[i].score / 5 * 100 + '%'
						list += "<tr>";
						list = list + "<td>" + jsonDatas.cd[i].type + "</td>";
						if (jsonDatas.cd[i].time2 === 'null' || jsonDatas.cd[i].time2 === "") {
							list = list + "<td>" + jsonDatas.cd[i].time1 + "</td>";
						} else {
							list = list + "<td>" + jsonDatas.cd[i].time1 + jsonDatas.cd[i].time2 + "</td>";
						}
						list = list + "<td class='bold'>" + jsonDatas.cd[i].name + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].teacher + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].credit + "</td>";
						list = list + "<td>" + jsonDatas.cd[i].place, jsonDatas.cd[i].lectureTime + "</td>";
						list = list + "<td><a class='star'><span class='on' style='width:" + percent + "'></span></a></td>";//jsonDatas.cd[i].score
						list = list + "<td>" + jsonDatas.cd[i].listenStudent + "</td>";
						list = list + "<td class='small'>" + jsonDatas.cd[i].maxStudent + "</td>";
						list = list + "<td><input id='chkbox' class='chkbox' name='chkbox' value='"+jsonDatas.cd[i].lectureId+"' type='checkbox' /></td>"
						list += "</tr>";
					}
					$("#tbody").html(list);
					}
			})
			//      _fn.loadSubjects(true, function (data) {
			//        _fn.appendSubjects(data);
			//      });
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
		loadFilter: function(callback) {
			//      $.ajax({
			//        url: _apiServerUrl + '/find/timetable/subject/filter/list',
			//        xhrFields: {withCredentials: true},
			//        type: 'POST',
			//        data: {
			//          year: _set.year,
			//          semester: _set.semester
			//        },
			//        success: function (data) {
			//          var responseCode;
			//          if (!$(data).find('response').children().length) {
			//            responseCode = $(data).find('response').text();
			//          }
			//          if (responseCode === '-1') {
			//            return;
			//          }
			//          callback(data);
			//        }
			//      });
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
			//      $.ajax({
			//        url: _apiServerUrl + '/find/timetable/subject/list',
			//        xhrFields: {withCredentials: true},
			//        type: 'POST',
			//        data: params,
			//        success: function (data) {
			//          var responseCode;
			//          if (!$(data).find('response').children().length) {
			//            responseCode = $(data).find('response').text();
			//          }
			//          if (responseCode === '-1') {
			//            return;
			//          }
			//          setTimeout(function () {
			//            callback(data);
			//          }, 1000);
			//        }
			//      });
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
		 deleteLecture : function(){
//			
			var checkBox =  $("#tbody").find('input:checkbox[name="chkbox"]:checked');
//			console.log(checkBox)
//			var check = $("#tbody").find("#chkbox");
// 			 ==  true
			var cnt = checkBox.length;
//			console.log(checkBox);
       var arr =checkBox.map(function() {
            return $(this).attr('value');
        });
        var tmp = arr.get();
 		   var map = JSON.stringify(tmp);
 		   console.log(map)
 		   console.log(tmp)
        if(cnt == 0){
            alert("선택된 글이 없습니다.");
        }
        else{
			$.ajax({
				type: "POST",
				url : "/lectureDelete",
				data : {
					id : map				},
				success: function(data){
					console.log(data);
					alert("강의를 삭제했습니다.");
					location.href="/lectureRegist";
				},
				error : function(){
					alert("삭제 실패");
				}
				
			});
			
			}
        },		 
        updateLecture : function(){
			var checkBox =  $("#tbody").find('input:checkbox[name="chkbox"]:checked');
			var cnt = checkBox.length;
       var arr =checkBox.map(function() {
            return $(this).attr('value');
        });
        if(cnt == 0){
            alert("선택된 강의가 없습니다.");
        }
        else if(cnt != 1){
			alert("강의는 하나씩만 수정가능합니다.");
		}
        else{
			$.ajax({
				type: "POST",
				url : "/lectureUpdate",
				data : {
					id : arr.get()
				},
				success: function(data){
					console.log(data);
					var uri = '/lectureUpdateSite?id='+arr.get()
					location.replace(uri);
				},
				error : function(){
					alert("삭제 실패");
				}
				
			});
			
			}
        }
    }

		

	_fn.init();
	_fn.open();
	_fn.loadLecture();
});