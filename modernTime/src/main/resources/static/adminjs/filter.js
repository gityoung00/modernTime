$().ready(function () {  
	var $subjects, $filterItems;
	var _fn = {
		init: function () {
			$subjects = $('#subjects');
			$filterItems = $("div.filter");
			
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
		open : function(){
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
		},
		
	showKeywordFilter: function () {
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
      console.log("검색어");
      _fn.loadSubjects(true, function (data) {
        _fn.appendSubjects(data);
      });
    },
		
	}
	_fn.init();
	_fn.open();
});