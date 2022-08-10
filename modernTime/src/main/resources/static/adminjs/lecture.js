$().ready(function () {
	var $subjects, $filterItems;
	  var _fn = {
		    init: function () {
			$subjects = $('#subjects');
			
			      $('#subjectCategoryFilter').on('click', 'a.close', function (e) {
			        $('#subjectCategoryFilter').hide();
			      }).on('click', 'li', function () {
			        _fn.onClickCategoryFilterItem($(this));
			      });
			
			      $('#subjectKeywordFilter').on('submit', function (e) {
			        _fn.onSubmitKeywordFilter();
			        return false;
			      }).on('click', 'a.close', function (e) {
			        $('#subjectKeywordFilter').hide();
			      });
			
			      $('#subjectOrderFilter').on('submit', function (e) {
			        _fn.onSubmitOrderFilter();
			        return false;
			      }).on('click', 'a.close', function (e) {
			        $('#subjectOrderFilter').hide();
			      });
			
			      $('#subjectTimeFilter').on('submit', function (e) {
			        _fn.onSubmitTimeFilter();
			        return false;
			      }).on('click', 'a.close', function (e) {
			        $('#subjectTimeFilter').hide();
			      }).on('click', 'td.time', function () {
			        $(this).toggleClass('selected');
			      });
			
			      $('#subjectGradeFilter').on('submit', function (event) {
			        _fn.onSubmitGradeFilter();
			        return false;
			      }).on('click', 'a.close', function () {
			        $('#subjectGradeFilter').hide();
			      }).on('click', 'input[data-action="select"]', function () {
			        $('#subjectGradeFilter').find('input[type="checkbox"]:not(:checked)').trigger('click');
			      }).on('click', 'input[data-action="deselect"]', function () {
			        $('#subjectGradeFilter').find('input[type="checkbox"]:checked').trigger('click');
			      });
			
			      $('#subjectTypeFilter').on('submit', function (event) {
			        _fn.onSubmitTypeFilter();
			        return false;
			      }).on('click', 'a.close', function () {
			        $('#subjectTypeFilter').hide();
			      }).on('click', 'input[data-action="select"]', function () {
			        $('#subjectTypeFilter').find('input[type="checkbox"]:not(:checked)').trigger('click');
			      }).on('click', 'input[data-action="deselect"]', function () {
			        $('#subjectTypeFilter').find('input[type="checkbox"]:checked').trigger('click');
			      });
			
			      $('#subjectCreditFilter').on('submit', function (event) {
			        _fn.onSubmitCreditFilter();
			        return false;
			      }).on('click', 'a.close', function () {
			        $('#subjectCreditFilter').hide();
			      }).on('click', 'input[data-action="select"]', function () {
			        $('#subjectCreditFilter').find('input[type="checkbox"]:not(:checked)').trigger('click');
			      }).on('click', 'input[data-action="deselect"]', function () {
			        $('#subjectCreditFilter').find('input[type="checkbox"]:checked').trigger('click');
			      });
		  },	
		open: function () {
			$filterItems = $("div.filter");
			var $close = $('<a></a>').addClass('close').text('닫기').appendTo($filterItems);
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
      _fn.loadFilter(function (data) {
        _fn.appendFilter(data);
        _fn.loadSubjects(true, function (data) {
          _fn.appendSubjects(data);
        });
      });

      $close.on('click', function () {
        _fn.close();
      });
      $reset.on('click', function () {
        _fn.reset();
      });

      $filterItems
      .on('click','a.item[data-id="keyword"]', function () {
        _fn.showKeywordFilter();
      }).on('click','a.item[data-id="keyword"] > span.reset', function (event) {
        _fn.resetKeywordFilter();
        event.stopPropagation();
      }).on('click','a.item[data-id="order"]', function () {
        _fn.showOrderFilter();
      }).on('click','a.item[data-id="order"] > span.reset', function (event) {
        _fn.resetOrderFilter();
        event.stopPropagation();
      }).on('click', 'a.item[data-id="time"]', function () {
        _fn.showTimeFilter();
      }).on('click', 'a.item[data-id="time"] > span.reset', function (event) {
        _fn.resetTimeFilter();
        event.stopPropagation();
      }).on('click', 'a.item[data-id="grade"]', function () {
        _fn.showGradeFilter();
      }).on('click', 'a.item[data-id="grade"] > span.reset', function (event) {
        _fn.resetGradeFilter();
        event.stopPropagation();
      }).on('click', 'a.item[data-id="type"]', function () {
        _fn.showTypeFilter();
      }).on('click', 'a.item[data-id="type"] > span.reset', function (event) {
        _fn.resetTypeFilter();
        event.stopPropagation();
      }).on('click', 'a.item[data-id="credit"]', function () {
        _fn.showCreditFilter();
      }).on('click', 'a.item[data-id="credit"] > span.reset', function (event) {
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
    close: function () {
      $subjects.hide();
      _gfn.resizeContainer();
    },
    reset: function () {
      _set.subjectFilter = {};
      $subjects.empty();
      _fn.close();
    },
    resize: function () {
      if ($subjects && $subjects.is(':visible') && $subjects.width() < 640) {
        _fn.close();
      }
		},
    showKeywordFilter: function () {
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
      var keywordTypes = [{id: 'name', text: '과목명'}, {id: 'professor', text: '교수명'}, {id: 'code', text: '과목코드'}, {id: 'place', text: '장소'}];
      _.each(keywordTypes, function (keywordType) {
        var $label = $('<label></label>').addClass('inline').appendTo($filter);
        var $radio = $('<input>').attr({type: 'radio', name: 'keyword_type'}).data('keywordType', keywordType).appendTo($label);
        if (setType === keywordType.id) {
          $radio.attr('checked', true);
        }
        $('<span></span>').html(keywordType.text).appendTo($label);
      });
      var $keyword = $('<input>').addClass('keyword').attr({type: 'search', name: 'keyword', placeholder: '검색어'}).val(setKeyword).appendTo($filter);
      $('#subjectKeywordFilter').show();
      $keyword.focus();
    },
    resetKeywordFilter: function () {
      _set.subjectFilter.keyword = undefined;
      _fn.resetFilterItem('keyword');
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    onSubmitKeywordFilter: function () {
      var $radios = $('#subjectKeywordFilter').find('input[type="radio"]');
      var $keyword = $('#subjectKeywordFilter').find('input[name="keyword"]');
      var keywordType = $radios.filter(':checked').data('keywordType');
      var keyword = $keyword.val().trim();
      if (keyword.replace(/\s/g, '').length < 2) {
        alert('검색어를 두 글자 이상 입력해주세요.');
        return;
      }
      _set.subjectFilter.keyword = JSON.stringify({type: keywordType.id, keyword: keyword});
      var $filterItem = $filterItems.find('a.item[data-id="keyword"]').addClass('active');
      $filterItem.find('span.key').html(keywordType.text + ':');
      $filterItem.find('span.value').html(keyword);
      $('#subjectKeywordFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    showOrderFilter: function () {
//      if (_set.isSubjectRendered === false) {
//        return;
//      }
      var $filter = $('#subjectOrderFilter').find('div.filter');
      $filter.empty();
      var orders = [
        {id: undefined, text: '기본'},
        {id: 'code', text: '과목코드'},
        {id: 'name', text: '과목명'},
        {id: 'rateDesc', text: '별점 높은순'},
        {id: 'rateAsc', text: '별점 낮은순'},
        {id: 'popularDesc', text: '담은인원 많은순'},
        {id: 'popularAsc', text: '담은인원 적은순'}
      ];
      if (_set.hasCapacity === true) {
        orders.push({id: 'competitionDesc', text: '경쟁률 높은순'});
        orders.push({id: 'competitionAsc', text: '경쟁률 낮은순'});
      }
      _.each(orders, function (order) {
        var $label = $('<label></label>').appendTo($filter);
        var $radio = $('<input>').attr({type: 'radio', name: 'order'}).data('order', order).appendTo($label);
        if (_set.subjectFilter.order === order.id) {
          $radio.attr('checked', true);
        }
        $('<span></span>').html(order.text).appendTo($label);
      });
      $('#subjectOrderFilter').show();
    },
    resetOrderFilter: function () {
      _set.subjectFilter.order = undefined;
      _fn.resetFilterItem('order');
      $('#subjectOrderFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    onSubmitOrderFilter: function () {
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
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    showTimeFilter: function () {
//      if (_set.isSubjectRendered === false) {
//        return;
//      }
      var $filter = $('#subjectTimeFilter').find('div.filter');
      $filter.empty();
      var setTimeFilter = [];
      if (_set.subjectFilter.time) {
        setTimeFilter = JSON.parse(_set.subjectFilter.time);
      }
      $('<span></span>').addClass('description').text('선택한 시간 내에 개설된 과목만 검색합니다.').appendTo($filter);
      var $times = $('<table></table>').addClass('times');
      var $tbody = $('<tbody></tbody>').appendTo($times);
      _.each(_.range(7, 21), function (hour) {
        var start = hour * 12;
        var end = (hour + 1) * 12;
        var $tr = $('<tr></tr>').appendTo($tbody);
        _.each(_.range(-1, 7), function (day) {
          if (hour === 7) {
            var week = '월화수목금토일'.split('')[day] || '';
            $('<td></td>').addClass('week').text(week).appendTo($tr);
          } else if (day === -1) {
            $('<td></td>').addClass('hour').text(hour).appendTo($tr);
          } else {
            var $td = $('<td></td>').addClass('time').data({day: day, start: start, end: end}).appendTo($tr);
            var foundTimeFilter = _.find(setTimeFilter, function (filter) {
              return day === filter.day && start >= filter.start && end <= filter.end;
            });
            if (foundTimeFilter !== undefined) {
              $td.addClass('selected');
            }
          }
        });
      });
      $times.appendTo($filter);
      $('#subjectTimeFilter').show();
    },
    resetTimeFilter: function () {
      _set.subjectFilter.time = undefined;
      _fn.resetFilterItem('time');
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    onSubmitTimeFilter: function () {
      var times = [];
      $('#subjectTimeFilter').find('td.time.selected').each(function () {
        var time = $(this).data();
        var beforeTime = _.findWhere(times, {day: time.day, end: time.start});
        if (beforeTime !== undefined) {
          beforeTime.end = time.end;
          return;
        }
        var afterTime = _.findWhere(times, {day: time.day, start: time.end});
        if (afterTime !== undefined) {
          afterTime.start = time.start;
          return;
        }
        times.push(time);
      });
      times = _.chain(times).sortBy('start').sortBy('day').value();
      if (times.length === 0) {
        alert('시간을 1개 이상 선택해주세요.');
        return;
      }
      _set.subjectFilter.time = JSON.stringify(times);
      var values = _.map(times, function (time) {
        return '월화수목금토일'.split('')[time.day] + (time.start / 12).toString() + '-' + (time.end / 12).toString() + '시';
      });
      var value = values.slice(0, 2).join(', ');
      if (values.length >= 3) {
        value += ' 외 ' + (values.length - 2) + '개';
      }
      var $filterItem = $filterItems.find('a.item[data-id="time"]').addClass('active');
      $filterItem.find('span.value').html(value);
      $('#subjectTimeFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    showGradeFilter: function () {
//      if (_set.isSubjectRendered === false) {
//        return;
//      }
      var $filter = $('#subjectGradeFilter').find('div.filter');
      $filter.empty();
      var setGradeFilter;
      if (_set.subjectFilter.grade) {
        setGradeFilter = JSON.parse(_set.subjectFilter.grade);
      }
      var items = [1, 2, 3, 4, 0];
      _.each(items, function (item) {
        var grade = {
          id: item,
          shortText: (item === 0) ? '기타' : item.toString(),
          fullText: (item === 0) ? '기타' : item.toString() + '학년'
        };
        var $label = $('<label></label>').appendTo($filter);
        var $checkbox = $('<input>').attr({type: 'checkbox', name: 'grade'}).data('grade', grade).appendTo($label);
        if (setGradeFilter === undefined || _.contains(setGradeFilter, grade.id) === true) {
          $checkbox.attr('checked', true);
        }
        $('<span></span>').html(grade.fullText).appendTo($label);
      });
      $('#subjectGradeFilter').show();
    },
    resetGradeFilter: function () {
      _set.subjectFilter.grade = undefined;
      _fn.resetFilterItem('grade');
      $('#subjectGradeFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    onSubmitGradeFilter: function () {
      var $checkboxes = $('#subjectGradeFilter').find('input[type="checkbox"]');
      var grades = $checkboxes.filter(':checked').map(function () {
        return $(this).data('grade');
      }).get();
      if (grades.length === 0) {
        alert('학년을 1개 이상 선택해주세요.');
        return;
      }
      if ($checkboxes.length === grades.length) {
        _fn.resetGradeFilter();
        return;
      }
      _set.subjectFilter.grade = JSON.stringify(_.pluck(grades, 'id'));
      var value = _.pluck(grades, 'shortText').slice(0, 2).join(', ');
      if (grades.length >= 3) {
        value += ' 외 ' + (grades.length - 2) + '개';
      }
      var $filterItem = $filterItems.find('a.item[data-id="grade"]').addClass('active');
      $filterItem.find('span.value').html(value);
      $('#subjectGradeFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    showTypeFilter: function () {
//      if (_set.isSubjectRendered === false) {
//        return;
//      }
      var $filter = $('#subjectTypeFilter').find('div.filter');
      $filter.empty();
      var setTypeFilter;
      if (_set.subjectFilter.type) {
        setTypeFilter = JSON.parse(_set.subjectFilter.type);
      }
      var items = $(this).attr({type : 'form', name : 'type'});
      var id = (1,2);
      var text = ('교양','전공');
      _.each(items, function () {
        var type = {
//          id: item.id,
//          text: item.name
			id : id,
			text :  text
        };
//        var $label = $('<label></label>').appendTo($filter);
//        var $checkbox = $('<input>').attr({type: 'checkbox', name: 'type'}).data('type', type).appendTo($label);
//        if (setTypeFilter === undefined || _.contains(setTypeFilter, type.id) === true) {
//          $checkbox.attr('checked', true);
//        }
//        $('<span></span>').html(type.text).appendTo($label);
      });
      $('#subjectTypeFilter').show();
    },
    resetTypeFilter: function () {
      _set.subjectFilter.type = undefined;
      _fn.resetFilterItem('type');
      $('#subjectTypeFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    onSubmitTypeFilter: function () {
      var $checkboxes = $('#subjectTypeFilter').find('input[type="checkbox"]');
      var types = $checkboxes.filter(':checked').map(function () {
        return $(this).data('type');
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
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    showCreditFilter: function () {
//      if (_set.isSubjectRendered === false) {
//        return;
//      }
      var $filter = $('#subjectCreditFilter').find('div.filter');
      $filter.empty();
      var setCreditFilter;
      if (_set.subjectFilter.credit) {
        setCreditFilter = JSON.parse(_set.subjectFilter.credit);
      }
      var items = _.range(0, 4.5, 0.5);
      _.each(items, function (item) {
        var credit = {
          id: item,
          shortText: item.toString().replace('4', '4~'),
          fullText: item.toString() + '학점' + (item === 4 ? ' 이상' : '')
        };
        var $label = $('<label></label>').appendTo($filter);
        var $checkbox = $('<input>').attr({type: 'checkbox', name: 'credit'}).data('credit', credit).appendTo($label);
        if (setCreditFilter === undefined || _.contains(setCreditFilter, credit.id) === true) {
          $checkbox.attr('checked', true);
        }
        $('<span></span>').html(credit.fullText).appendTo($label);
      });
      $('#subjectCreditFilter').show();
    },
    resetCreditFilter: function () {
      _set.subjectFilter.credit = undefined;
      _fn.resetFilterItem('credit');
      $('#subjectCreditFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
    onSubmitCreditFilter: function () {
      var $checkboxes = $('#subjectCreditFilter').find('input[type="checkbox"]');
      var credits = $checkboxes.filter(':checked').map(function () {
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
      var value = _.pluck(credits, 'shortText').slice(0, 2).join(', ');
      if (credits.length >= 3) {
        value += ' 외 ' + (credits.length - 2) + '개';
      }
      var $filterItem = $filterItems.find('a.item[data-id="credit"]').addClass('active');
      $filterItem.find('span.value').html(value);
      $('#subjectCreditFilter').hide();
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
      },
    appendListThead: function () {
      var $tr = $('<tr></tr>');
      if (_set.hasSyllabus === true) {
        var $syllabusTh = $('<th></th>').text('계획서').appendTo($tr);
        $('<div></div>').text('계획서').appendTo($syllabusTh);
      }
      _.each(_set.subjectColumnInfo, function (item) {
        var $th = $('<th></th>').text(item.value).appendTo($tr);
        $('<div></div>').text(item.value).appendTo($th);
      });
      $tr.appendTo($listThead);
    },
        loadFilter: function (callback) {
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
    }
	  };
  _fn.init();
  _fn.open();
});