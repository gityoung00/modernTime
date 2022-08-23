bookstore.sell = {
  saving: false,
  elements: {},
  scrollToDiv: function ($sellForm, $div) {
    $('html, body').stop().delay(100).animate({
      scrollTop: $div.offset().top - $sellForm.offset().top
    }, 300);
  },
  init: function ($sellForm) {
    $sellForm.find('div.group-book').remove();
//    if (typeof window.BarcodeScanner === 'undefined') {
//      bookstore.sell.showSearchDiv($sellForm);
//      return false;
//    }

//  제 1화면 책 검색방법 선택(수동으로만 할것)
    var $container = $('<div></div>').addClass('group group-init');
    $('<h2></h2>').text('어떤 책을 판매하실 건가요?').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
//    $('<input>').addClass('button block barcode').attr({
//      type: 'button',
//      value: '카메라로 바코드 스캔'
//    }).appendTo($buttonWrap);
//    $('<input>').addClass('button block search').attr({
//      type: 'button',
//      value: 'ISBN 혹은 책 이름으로 검색'
//    }).appendTo($buttonWrap);
    $('<input>').addClass('button block manual').attr({
      type: 'button',
      value: '수동으로 정보 입력'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
  },
  
  	//책 검색 화면 DB가 없으므로 사용하지 않을 예정
//  showSearchDiv: function ($sellForm) {
//    $sellForm.find('div.group-init').remove();
//    var $container = $('<div></div>').addClass('group group-search');
//    $('<h2></h2>').text('판매하실 책을 검색하세요.').appendTo($container);
//    var $keywordWrap = $('<p></p>').appendTo($container);
//    $('<input>').addClass('text search').attr({
//      type: 'text',
//      name: 'keyword',
//      placeholder: 'ISBN 혹은 책 이름'
//    }).appendTo($keywordWrap);
//    var $buttonWrap = $("<span></span>").addClass('searchbutton').appendTo($keywordWrap);
//    $('<span></span>').addClass('icons search-gray-16').appendTo($buttonWrap);
//    $('<hr>').appendTo($container);
//    $container.appendTo($sellForm);
//  },

	//검색결과 화면
//  showResultDiv: function ($sellForm, keyword) {
//    $sellForm.find('div.group-search > p > input[name="keyword"]').blur();
//    $sellForm.find('div.group-result').remove();
//    var $container = $('<div></div>').addClass('group group-result').appendTo($sellForm);
//    var $loading = $('<div></div>').addClass('loading').text('검색 중입니다...').appendTo($container);
//    bookstore.fn.findBookList(keyword, function (response) {
//      $container.find('div.loading').remove();
//      var $bookWrap = $('<ol></ol>');
//      if (!response || !response.length) {
//        $('<div></div>').addClass('empty').text('검색 결과가 없습니다.').appendTo($container);
//      }
//      _.each(response, function (book) {
//        var $bookLi = $('<li></li>').data('book', book).appendTo($bookWrap);
//        $('<div></div>').addClass('image').css({
//          'background-image': 'url("' + book.image + '")'
//        }).appendTo($bookLi);
//        $('<h3></h3>').html(bookstore.fn.decodeHtmlSpecialChars(book.title)).appendTo($bookLi);
//        var $bookInfoDl = $('<dl></dl>').appendTo($bookLi);
//        $('<dt></dt>').text('ISBN').appendTo($bookInfoDl);
//        $('<dd></dd>').html(bookstore.fn.decodeHtmlSpecialChars(book.isbn)).appendTo($bookInfoDl);
//        $('<dt></dt>').text('저자').appendTo($bookInfoDl);
//        $('<dd></dd>').html(bookstore.fn.decodeHtmlSpecialChars(book.author)).appendTo($bookInfoDl);
//        $('<dt></dt>').text('출판사').appendTo($bookInfoDl);
//        $('<dd></dd>').html(bookstore.fn.decodeHtmlSpecialChars(book.publisher)).appendTo($bookInfoDl);
//        $('<dt></dt>').text('출판일').appendTo($bookInfoDl);
//        $('<dd></dd>').html(bookstore.fn.formatDate(book.pubdate)).appendTo($bookInfoDl);
//        $('<dt></dt>').text('정가').appendTo($bookInfoDl);
//        $('<dd></dd>').html(bookstore.fn.formatPrice(book.price)).appendTo($bookInfoDl);
//        $('<hr>').appendTo($bookLi);
//      });
//      var $manualLi = $('<li></li>').addClass('manual').data('book', {
//        title: '', author: '', publisher: '', pubdate: '', price: '', isbn: ''
//      }).appendTo($bookWrap);
//      $('<p></p>').text('수동으로 정보 입력하기').appendTo($manualLi);
//      $bookWrap.appendTo($container);
//      bookstore.sell.scrollToDiv($sellForm, $container);
//    });
//  },

	// 수동 정보 입력 폼
  showBookDiv: function ($sellForm, book) {
    $sellForm.find('div.group-init').remove();
    $sellForm.find('div.group-search').remove();
    $sellForm.find('div.group-result').remove();
    var $container = $('<div></div>').addClass('group group-book');
    $('<h2></h2>').text('자세한 책 정보를 적어주세요.').appendTo($container);
    $('<input>').attr({
      type: 'hidden',
      name: 'book-isbn',
      value: bookstore.fn.stripHtml(bookstore.fn.decodeHtmlSpecialChars(book.isbn))
    }).appendTo($container);
    var $titleWrap = $('<p></p>').appendTo($container);
    var $authorWrap = $('<p></p>').appendTo($container);
    var $publisherWrap = $('<p></p>').appendTo($container);
    var $pubdateWrap = $('<p></p>').appendTo($container);
    var $priceWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('text').attr({
      type: 'text',
      name: 'book-title',
      placeholder: '책 이름',
      value: bookstore.fn.stripHtml(bookstore.fn.decodeHtmlSpecialChars(book.title))
    }).appendTo($titleWrap);
    $('<input>').addClass('text').attr({
      type: 'text',
      name: 'book-author',
      placeholder: '저자',
      value: bookstore.fn.stripHtml(bookstore.fn.decodeHtmlSpecialChars(book.author))
    }).appendTo($authorWrap);
    $('<input>').addClass('text').attr({
      type: 'text',
      name: 'book-publisher',
      placeholder: '출판사',
      value: bookstore.fn.stripHtml(bookstore.fn.decodeHtmlSpecialChars(book.publisher))
    }).appendTo($publisherWrap);
    $('<input>').addClass('text').attr({
      type: 'number',
      name: 'book-pubdate',
      placeholder: '출판일 (ex. 20160101)',
      value: book.pubdate
    }).appendTo($pubdateWrap);
//    $('<input>').addClass('text').attr({
//      type: 'number',
//      name: 'book-price',
//      placeholder: '정가 (ex. 17000)',
//      value: book.price
//    }).appendTo($priceWrap);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
//    $('<input>').addClass('button retry').attr({
//      type: 'button',
//      value: '다시 검색'
//    }).appendTo($buttonWrap);
    var $nextButton = $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.validateBookDiv($container);
    $nextButton.click();
  },
  validateBookDiv: function ($bookDiv) {
    if ($bookDiv.find('input[name="book-title"]').val().trim() !== ''
      && $bookDiv.find('input[name="book-author"]').val().trim() !== ''
      && $bookDiv.find('input[name="book-publisher"]').val().trim() !== '') {
      $bookDiv.find('input.button.next').removeClass('disabled');
    } else {
      $bookDiv.find('input.button.next').addClass('disabled');
    }
  },
  //수동 입력 창 비활성화
  lockBookDiv: function ($sellForm) {
    $sellForm.find('div.group-book input.text').attr('readonly', true);
  },
  //어떤수업에서 사용한 책인지 검색 수업을 검색해야함
  showLectureDiv: function ($sellForm) {
    bookstore.sell.lockBookDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-lecture');
    $('<h2></h2>').text('어떤 수업에서 사용한 책인가요?').appendTo($container);
    var $keywordWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('text search').attr({
      type: 'text',
      name: 'lecture',
      placeholder: '수업 검색'
    }).appendTo($keywordWrap);
    var $searchButtonWrap = $("<span></span>").addClass('searchbutton').appendTo($keywordWrap);
    $('<span></span>').addClass('icons search-gray-16').appendTo($searchButtonWrap);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button skip').attr({
      type: 'button',
      value: '건너뛰기'
    }).appendTo($buttonWrap);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  showLecturePopup: function ($sellForm) {
    $sellForm.find('div.popup').hide().remove();
    var $container = $('<div></div>').addClass('popup popup-lecture');
    $('<h2></h2>').text('수업 검색').appendTo($container);
    var $textfield = $('<input>').addClass('textfield').attr({
      'type': 'text',
      'placeholder': '수업명 혹은 교수명'
    }).appendTo($container);
    $('<input>').addClass('button').attr({
      'type': 'submit',
      'value': '찾기'
    }).appendTo($container);
    $container.appendTo($sellForm);
    $container.show();
    $textfield.focus();
  },
  showLectureResultDiv: function ($sellForm, keyword) {
    $sellForm.find('div.popup').hide().remove();
    $sellForm.find('div.group-lecture-result').remove();
    var $container = $('<div></div>').addClass('group group-lecture-result').appendTo($sellForm);
    var $loading = $('<div></div>').addClass('loading').text('검색 중입니다...').appendTo($container);
    bookstore.fn.findLectureList(keyword, function (response) {
      $container.find('div.loading').remove();
      var $lectureWrap = $('<ol></ol>');
      var $lecturesData = $(response).find('lecture');
      console.log($lecturesData)
//      .find('lecture');
      if (!$lecturesData.length) {
        $('<div></div>').addClass('empty').text('검색 결과가 없습니다.').appendTo($container);
      } else {
        $lecturesData.sort(function (a, b) {
          return Number($(b).attr('rate')) - Number($(a).attr('rate'));
        });
        $lecturesData.each(function () {
          var $lectureData = $(this);
          var id = Number($lectureData.attr('id')) || 0;
          var name = $lectureData.attr('name') || '';
          var professor = $lectureData.attr('professor_name') || '';
          var campus = $lectureData.attr('campus_name') || '';
          var value = name;
          if (professor !== '') {
            value += ' : ' + professor;
          }
          if (name === '' || professor === '') {
            return true;
          }
          var $lectureLi = $('<li></li>').data('lecture', {id: id, value: value}).appendTo($lectureWrap);
          $('<h3></h3>').text(name).appendTo($lectureLi);
          $('<span></span>').addClass('professor').text(professor).appendTo($lectureLi);
          if (campus !== '') {
            $('<span></span>').addClass('campus').text(campus).appendTo($lectureLi);
          }
        });
      }
      var $resetLi = $('<li></li>').addClass('retry').appendTo($lectureWrap);
      $('<p></p>').text('다시 검색하기').appendTo($resetLi);
      $lectureWrap.appendTo($container);
      bookstore.sell.scrollToDiv($sellForm, $container);
    });
  },
  putLectureData: function ($sellForm, data) {
    var $lectureInput = $sellForm.find('> div.group-lecture input[name="lecture"]');
    $lectureInput.val(data.value).data({
      id: data.id
    });
    $lectureInput.trigger('change');
    $sellForm.find('div.popup').hide().remove();
    $sellForm.find('div.group-lecture-result').remove();
  },
  validateLectureDiv: function ($lectureDiv) {
    if ($lectureDiv.find('input[name="lecture"]').val().trim() !== '') {
      $lectureDiv.find('input.button.next').removeClass('disabled');
    } else {
      $lectureDiv.find('input.button.next').addClass('disabled');
    }
  },
  lockLectureDiv: function ($sellForm) {
    $sellForm.find('div.group-lecture input.text').attr('readonly', true);
    $sellForm.find('div.group-lecture-result').remove();
  },
  //필기 여부
  showStatusNoteDiv: function ($sellForm) {
    bookstore.sell.lockLectureDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-status group-status-note');
    $('<h2></h2>').text('필기한 흔적이 있나요?').appendTo($container);
    var $checkboxOl = $('<ol></ol>').addClass('select-checkbox').appendTo($container);
    var checkboxItems = ['밑줄 (연필/샤프)', '밑줄 (볼펜/형광펜)', '필기 (연필/샤프)', '필기 (볼펜/형광펜)'];
    _.each(checkboxItems, function (checkboxItem) {
      var $checkboxLi = $('<li></li>').text(checkboxItem).appendTo($checkboxOl);
      $('<span></span>').addClass('icons unchecked-silver-16').prependTo($checkboxLi);
    });
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button skip').attr({
      type: 'button',
      value: '해당사항 없음'
    }).appendTo($buttonWrap);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  lockStatusNoteDiv: function ($sellForm) {
    $sellForm.find('div.group-status-note ol.select-checkbox').addClass('locked');
  },
  
  //훼손상태 여부
  showStatusDamageDiv: function ($sellForm) {
    bookstore.sell.lockStatusNoteDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-status group-status-damage');
    $('<h2></h2>').text('보존 상태는 어떤가요?').appendTo($container);
    var $checkboxOl = $('<ol></ol>').addClass('select-checkbox').appendTo($container);
    var checkboxItems = ['겉표지 깨끗함', '이름(서명) 기입 없음', '페이지 변색 없음', '페이지 훼손 없음'];
    _.each(checkboxItems, function (checkboxItem) {
      var $checkboxLi = $('<li></li>').text(checkboxItem).appendTo($checkboxOl);
      $('<span></span>').addClass('icons unchecked-silver-16').prependTo($checkboxLi);
    });
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button skip').attr({
      type: 'button',
      value: '해당사항 없음'
    }).appendTo($buttonWrap);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  lockStatusDamageDiv: function ($sellForm) {
    $sellForm.find('div.group-status-damage ol.select-checkbox').addClass('locked');
  },
  validateStatusDiv: function ($statusDiv) {
    setTimeout(function () {
      var $checkedItems = $statusDiv.find('> ol.select-checkbox > li.checked');
      if ($checkedItems.length) {
        $statusDiv.find('input.button.next').removeClass('disabled');
      } else {
        $statusDiv.find('input.button.next').addClass('disabled');
      }
    }, 1);
  },
  
  //이미지여부
  showStatusImageDiv: function ($sellForm) {
    bookstore.sell.lockStatusDamageDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-status group-status-image');
    $('<h2></h2>').text('실제 사진을 찍어주세요.').appendTo($container);
    var $images = $('<div></div>').addClass('images').appendTo($container);
    var $imagesWrap = $('<div></div>').addClass('wrap').appendTo($images);
    var imageItems = ['겉표지', '내부 1', '내부 2', '내부 3'];
    _.each(imageItems, function (imageItem) {
      var $image = $('<div></div>').addClass('image').appendTo($imagesWrap);
      $('<span></span>').addClass('remove').text('삭제').appendTo($image);
      $('<span></span>').addClass('icons image-gray-32').appendTo($image);
      $('<p></p>').text(imageItem).appendTo($image);
      var $imgForm = $('<form enctype="multipart/form-data"></form>').addClass('imageForm');
      $('<input>').addClass('file').attr({accept: 'image/*', type: 'file', name:'file'}).appendTo($imgForm);
    });
    $('<hr>').appendTo($imagesWrap);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button skip').attr({
      type: 'button',
      value: '건너뛰기'
    }).appendTo($buttonWrap);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  validateStatusImageDiv: function ($statusImageDiv) {
    if ($statusImageDiv.find('> div.images').is(':has(div.image.attached)')) {
      $statusImageDiv.find('input.button.next').removeClass('disabled');
    } else {
      $statusImageDiv.find('input.button.next').addClass('disabled');
    }
  },
  lockStatusImageDiv: function ($sellForm) {
    var $images = $sellForm.find('div.group-status-image div.images');
    if ($images.length) {
      $images.addClass('locked');
      $images.find('span.remove').remove();
    }
  },
  
  //가격측정
  showPriceDiv: function ($sellForm) {
    bookstore.sell.lockStatusImageDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-price');
    $('<h2></h2>').text('희망하시는 판매 가격을 적어주세요.').appendTo($container);
    var $priceWrap = $('<p></p>').appendTo($container);
    var $priceInput = $('<input>').addClass('text').attr({
      type: 'number',
      name: 'price',
      placeholder: '(단위: 원)'
    }).appendTo($priceWrap);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    $priceInput.focus();
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  validatePriceDiv: function ($priceDiv) {
    var price = Number($priceDiv.find('input[name="price"]').val());
    if (!isNaN(price) && price > 0) {
      $priceDiv.find('input.button.next').removeClass('disabled');
    } else {
      $priceDiv.find('input.button.next').addClass('disabled');
    }
  },
  lockPriceDiv: function ($sellForm) {
    $sellForm.find('div.group-price input.text').attr('readonly', true);
  },
  
  //연락 방법 -쪽지로만 가능함
  showContactDiv: function ($sellForm) {
    bookstore.sell.lockPriceDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-contact');
    $('<h2></h2>').text('원하시는 연락 수단을 선택하세요.').appendTo($container);
    var $checkboxOl = $('<ol></ol>').addClass('select-checkbox').appendTo($container);
    var $checkboxLi = $('<li></li>').addClass('checked required').text('에브리타임 쪽지').appendTo($checkboxOl);
    $('<span></span>').addClass('icons checked-gray-16').prependTo($checkboxLi);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button next').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  lockContactDiv: function ($sellForm) {
    $sellForm.find('div.group-contact ol.select-checkbox').addClass('locked');
  },
  
  //거래수단 택배/직거래
  showMeansDiv: function ($sellForm) {
    bookstore.sell.lockContactDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-means');
    $('<h2></h2>').text('원하시는 거래 수단을 선택하세요.').appendTo($container);
    var $checkboxOl = $('<ol></ol>').addClass('select-checkbox').appendTo($container);
    var checkboxItems = ['택배'];
//    var checkboxItems = ['직거래', '택배'];
    _.each(checkboxItems, function (checkboxItem) {
      var $checkboxLi = $('<li></li>').text(checkboxItem).appendTo($checkboxOl);
      $('<span></span>').addClass('icons unchecked-silver-16').prependTo($checkboxLi);
    });
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  validateMeansDiv: function ($meansDiv) {
    setTimeout(function () {
      var $checkedItems = $meansDiv.find('> ol.select-checkbox > li.checked');
      if ($checkedItems.length) {
        $meansDiv.find('input.button.next').removeClass('disabled');
      } else {
        $meansDiv.find('input.button.next').addClass('disabled');
      }
    }, 1);
  },
  lockMeansDiv: function ($sellForm) {
    $sellForm.find('div.group-means ol.select-checkbox').addClass('locked');
  },
  ////////////////////////////////////////직거래 미구현 ////////////////////////////////////
  //직거래 지역 검색
  showMeansDirectDiv: function ($sellForm) {
    bookstore.sell.lockMeansDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-means-direct');
    $('<h2></h2>').text('원하시는 직거래 지역을 적어주세요.').appendTo($container);
    var $directWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('text search').attr({
      type: 'text',
      name: 'means-direct',
      placeholder: '지역'
    }).appendTo($directWrap);
    $('<span></span>').addClass('icons search-gray-16').appendTo($directWrap);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  validateMeansDirectDiv: function ($meansDirectDiv) {
    if ($meansDirectDiv.find('input[name="means-direct"]').val().trim() !== '') {
      $meansDirectDiv.find('input.button.next').removeClass('disabled');
    } else {
      $meansDirectDiv.find('input.button.next').addClass('disabled');
    }
  },
  lockMeansDirectDiv: function ($sellForm) {
    $sellForm.find('div.group-means-direct input.text').attr('readonly', true);
  },
  //거래지역 팝업
  showMeansDirectPopup: function ($sellForm) {
    $sellForm.find('div.popup').hide().remove();
    var $container = $('<div></div>').addClass('popup popup-means-direct');
    $('<h2></h2>').text('거래 선호 지역 선택').appendTo($container);
    var $menuOl = $('<ol></ol>').addClass('menu').appendTo($container);
    $('<li></li>').html('내 학교').appendTo($menuOl);
    // $('<li></li>').html('현재 위치').appendTo($menuOl);
    $('<li></li>').html('다른 장소 검색').appendTo($menuOl);
    $container.appendTo($sellForm);
    $container.show();
  },
  putMeansDirectCampusData: function ($sellForm) {
    bookstore.sell.putMeansDirectData($sellForm, {
      name: bookstore.data.user.campus_full_name,
      latitude: bookstore.data.user.campus_latitude,
      longitude: bookstore.data.user.campus_longitude
    });
  },
//  putMeansDirectCurrentData: function ($sellForm) {
//    $('<div></div>').html('<p>현재 위치를 불러오는 중입니다...</p>').addClass('toast').appendTo($sellForm);
//    bookstore.fn.findCurrentLocation(function (err, result) {
//      $sellForm.find('div.toast').remove();
//      if (err) {
//        alert('현재 위치를 불러올 수 없습니다!');
//        return false;
//      }
//      bookstore.sell.putMeansDirectData($sellForm, {
//        name: result.name,
//        latitude: result.latitude,
//        longitude: result.longitude
//      });
//    });
//  },
  putMeansDirectData: function ($sellForm, data) {
    var $meansDirectInput = $sellForm.find('div.group-means-direct input[name="means-direct"]');
    $meansDirectInput.val(data.name).data({
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude
    });
    $meansDirectInput.trigger('change');
    $sellForm.find('div.popup').hide().remove();
    $sellForm.find('div.group-means-direct-search-result').remove();
  },
  //직거래 장소 검색창
  showMeansDirectSearchPopup: function ($sellForm) {
    $sellForm.find('div.popup').hide().remove();
    var $container = $('<div></div>').addClass('popup popup-means-direct-search');
    $('<h2></h2>').text('장소 검색').appendTo($container);
    var $textfield = $('<input>').addClass('textfield').attr({
      'type': 'text',
      'placeholder': '지하철, 지역 등'
    }).appendTo($container);
    $('<input>').addClass('button').attr({
      'type': 'submit',
      'value': '찾기'
    }).appendTo($container);
    $container.appendTo($sellForm);
    $container.show();
    $textfield.focus();
  },
  
  showMeansDirectSearchResultDiv: function ($sellForm, keyword) {
    $sellForm.find('div.popup').hide().remove();
    $sellForm.find('div.group-means-direct-search-result').remove();
    var $container = $('<div></div>').addClass('group group-means-direct-search-result').appendTo($sellForm);
    var $loading = $('<div></div>').addClass('loading').text('검색 중입니다...').appendTo($container);
    bookstore.fn.findLocationByKeyword(keyword, function (result) {
      $container.find('div.loading').remove();
      var $locationWrap = $('<ol></ol>');
      if (!result || !result.length) {
        $('<div></div>').addClass('empty').text('검색 결과가 없습니다.').appendTo($container);
      }
      _.each(result, function (location) {
        var $locationLi = $('<li></li>').data('location', location).appendTo($locationWrap);
        $('<h3></h3>').text(location.name).appendTo($locationLi);
        $('<p></p>').addClass('address').text(location.address).appendTo($locationLi);
      });
      var $resetLi = $('<li></li>').addClass('retry').appendTo($locationWrap);
      $('<p></p>').text('다시 검색하기').appendTo($resetLi);
      $locationWrap.appendTo($container);
      bookstore.sell.scrollToDiv($sellForm, $container);
    });
  },
  ////////////////////////////////////////직거래 미구현 ////////////////////////////////////
  
  //기타 추가설명
  showCommentDiv: function ($sellForm) {
    bookstore.sell.lockMeansDiv($sellForm);
    bookstore.sell.lockMeansDirectDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-comment');
    $('<h2></h2>').text('추가 설명을 자유롭게 적어주세요.').appendTo($container);
    var $commentWrap = $('<p></p>').appendTo($container);
    var $commentTextarea = $('<textarea></textarea>').attr({
      name: 'comment',
      placeholder: '(500자 이내)'
    }).appendTo($commentWrap);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button skip').attr({
      type: 'button',
      value: '건너뛰기'
    }).appendTo($buttonWrap);
    $('<input>').addClass('button next disabled').attr({
      type: 'button',
      value: '다음'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    $commentTextarea.focus();
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  validateCommentDiv: function ($commentDiv) {
    if ($commentDiv.find('textarea[name="comment"]').val().trim() !== '') {
      $commentDiv.find('input.button.next').removeClass('disabled');
    } else {
      $commentDiv.find('input.button.next').addClass('disabled');
    }
  },
  lockCommentDiv: function ($sellForm) {
    $sellForm.find('div.group-comment textarea').attr('readonly', true);
  },
  showAgreementDiv: function ($sellForm) {
    bookstore.sell.lockCommentDiv($sellForm);
    var $container = $('<div></div>').addClass('group group-agreement');
    $('<h2></h2>').text('마지막으로 확인해주세요.').appendTo($container);
    var $ul = $('<ul></ul>').appendTo($container);
    $('<li></li>').html('등록 후에는 수정 및 삭제가 불가능합니다.').appendTo($ul);
    $('<li></li>').html('판매자 정보에 재학 중인 학교가 노출됩니다.').appendTo($ul);
    $('<li></li>').html('커뮤니티 이용규칙에 어긋날 경우 삭제됩니다.').appendTo($ul);
    $('<li></li>').html('판매 이후 [판매 완료]를 눌러주시기 바랍니다.').appendTo($ul);
    $('<hr>').appendTo($container);
    var $buttonWrap = $('<p></p>').appendTo($container);
    $('<input>').addClass('button next').attr({
      type: 'button',
      value: '동의 및 등록하기'
    }).appendTo($buttonWrap);
    $('<hr>').appendTo($container);
    $container.appendTo($sellForm);
    bookstore.sell.scrollToDiv($sellForm, $container);
  },
  submit: function ($sellForm) {
    if (bookstore.sell.saving === true) {
      return false;
    }
    bookstore.sell.saving = true;
    var data = {};
    data['book-isbn'] = $sellForm.find('input[name="book-isbn"]').val();
    data['title'] = $sellForm.find('input[name="book-title"]').val();
    data['author'] = $sellForm.find('input[name="book-author"]').val();
    data['publisher'] = $sellForm.find('input[name="book-publisher"]').val();
    data['publication_date'] = $sellForm.find('input[name="book-pubdate"]').val();
    data['price'] = $sellForm.find('input[name="book-price"]').val();
    data['user_id'] ="test123";


    console.log(data)
    if ($sellForm.is(':has(div.group-lecture)')) {
      data['lecture-id'] = $sellForm.find('input[name="lecture"]').data('id');
    }
    data['status-note'] = $sellForm.find('div.group-status-note > ol.select-checkbox > li').map(function () {
      return $(this).hasClass('checked') ? '1' : '0';
    }).get().join('');
    data['status-damage'] = $sellForm.find('div.group-status-damage > ol.select-checkbox > li').map(function () {
      return $(this).hasClass('checked') ? '1' : '0';
    }).get().join('');
    data['status-image'] = JSON.stringify($sellForm.find('div.group-status-image > div.images div.image').map(function (index) {
      return {
        cover: (index === 0) ? 1 : 0,
        url: $(this).data('url')
      };
    }).get());
    data['price'] = $sellForm.find('input[name="price"]').val();
    if (bookstore.data.defaultLocation) {
      data['means-delivery'] = 0;
      data['means-direct'] = 1;
      data['means-direct-name'] = bookstore.data.defaultLocation.name;
      data['means-direct-latitude'] = bookstore.data.defaultLocation.latitude;
      data['means-direct-longitude'] = bookstore.data.defaultLocation.longitude;
    } else {
      data['means-delivery'] = $sellForm.find('div.group-means > ol.select-checkbox > li:last-child').hasClass('checked') ? 1 : 0;
      data['means-direct'] = $sellForm.find('div.group-means > ol.select-checkbox > li:first-child').hasClass('checked') ? 1 : 0;
      if ($sellForm.is(':has(div.group-means-direct)')) {
        var meansDirectData = $sellForm.find('input[name="means-direct"]').data();
        data['means-direct-name'] = meansDirectData.name;
        data['means-direct-latitude'] = meansDirectData.latitude;
        data['means-direct-longitude'] = meansDirectData.longitude;
      }
    }
    if ($sellForm.is(':has(div.group-comment)')) {
      data['comment'] = $sellForm.find('textarea[name="comment"]').val();
    }
    bookstore.fn.saveItem(data, function (response) {
      if (response.error) {
        alert('오류가 발생하였습니다!');
      } else {
        location.href = '/bookstore';
      }
    });
  },
  uploadS3: function ($sellForm, index, canvas, timestamp, thumb, callback) {
	var $form = $('.imageForm');
//    canvas.toBlob(function (blob) {
	console.log($form);
	var $file = $(".file");
	console.log($form[0])
	console.log($($form[0]).find('input[type="file"]').val());
	var formData = new FormData($form[0]);
	console.log(formData)
	console.log(formData[0])
//      var formData = new FormData();
      var fileName = bookstore.data.s3.key + '/' + timestamp + '_' + index.toString();
      if (thumb) {
        fileName += '_thumb';
      }
      fileName += '.jpg';
//      formData.append('Content-Type', 'image/jpeg');
//      formData.append('acl', bookstore.data.s3.provider['acl']);
//      formData.append('policy', bookstore.data.s3.provider['policy']);
//      formData.append('X-amz-algorithm', bookstore.data.s3.provider['X-amz-algorithm']);
//      formData.append('X-amz-credential', bookstore.data.s3.provider['X-amz-credential']);
//      formData.append('X-amz-date', bookstore.data.s3.provider['X-amz-date']);
//      formData.append('X-amz-expires', bookstore.data.s3.provider['X-amz-expires']);
//      formData.append('X-amz-signature', bookstore.data.s3.provider['X-amz-signature']);
//      formData.append('key', fileName);
//      formData.append('file', blob);
//        console.log(fileName),
      $.ajax({
        url: 'admin/upload',
        enctype: 'multipart/form-data',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
          if (callback) {
            callback(fileName);
          }
        }
      });
//    }, "image/jpeg", 0.8);
  },
};

$().ready(function () {
  var $sellForm = $('#sell');
  bookstore.sell.init($sellForm);

  $(window).on('beforeunload', function () {
    if ($sellForm.is(':not(:has(div.group-init))') && $sellForm.is(':not(:has(div.group-search))') && $sellForm.is(':not(:has(div.group-agreement))')) {
      return '내용이 저장되지 않았습니다.';
    }
  });

  $sellForm
    .on('submit', function () {
      if ($sellForm.is(':has(div.group-search)')) {
        var $keywordInput = $sellForm.find('div.group-search input[name="keyword"]');
        if ($keywordInput.val().trim().length < 2) {
          alert('책 이름을 두 글자 이상 입력해주세요!');
          $keywordInput.focus();
          return false;
        }
        bookstore.sell.showResultDiv($sellForm, $keywordInput.val().trim());
      } else if ($sellForm.is(':has(div.popup-lecture)')) {
        var $textfield = $sellForm.find('div.popup-lecture input.textfield');
        if ($textfield.val().trim().length < 2) {
          alert('두 글자 이상 입력해주세요!');
          $textfield.focus();
          return false;
        }
        bookstore.sell.showLectureResultDiv($sellForm, $textfield.val().trim());
      } else if ($sellForm.is(':has(div.popup-means-direct-search)')) {
        var $textfield = $sellForm.find('div.popup-means-direct-search input.textfield');
        if ($textfield.val().trim().length < 2) {
          alert('장소를 두 글자 이상 입력해주세요!');
          $textfield.focus();
          return false;
        }
        bookstore.sell.showMeansDirectSearchResultDiv($sellForm, $textfield.val().trim());
      } else if ($sellForm.is(':has(div.group-agreement)')) {
        bookstore.sell.submit($sellForm);
      }
      return false;
    })
    .on('click', '> div.group > ol.select-checkbox:not(.locked) > li', function () {
      var $checkboxItem = $(this);
      if ($checkboxItem.hasClass('required')) {
        return false;
      }
      if ($checkboxItem.hasClass('checked')) {
        $checkboxItem.removeClass('checked');
        $checkboxItem.find('span.icons').addClass('unchecked-silver-16').removeClass('checked-gray-16');
      } else {
        $checkboxItem.addClass('checked');
        $checkboxItem.find('span.icons').addClass('checked-gray-16').removeClass('unchecked-silver-16');
      }
    })
    .on('click', '> div.group-init input.button.barcode', function () {
      if (typeof window.BarcodeScanner === 'undefined') {
        return false;
      }
      window.BarcodeScanner.startScan();
      window.onBarcodeScannerSuccess = function(barcode) {
        bookstore.sell.showSearchDiv($sellForm);
        $sellForm.find('> div.group-search input[name="keyword"]').val(barcode);
        $sellForm.submit();
      };
    })
    .on('click', '> div.group-init input.button.search', function () {
      bookstore.sell.showSearchDiv($sellForm);
    })
    .on('click', '> div.group-init input.button.manual', function () {
      bookstore.sell.showBookDiv($sellForm, {
        title: '', author: '', publisher: '', publication_date: '', price: '', isbn: ''
      });
    })
    .on('click', '> div.group-search span.searchbutton', function () {
      $sellForm.submit();
    })
    .on('click', '> div.group-result > ol > li', function () {
      bookstore.sell.showBookDiv($sellForm, $(this).data('book'));
    })
    .on('keyup', '> div.group-book input.text', function () {
      var $bookDiv = $sellForm.find('> div.group-book');
      bookstore.sell.validateBookDiv($bookDiv);
    })
    .on('click', '> div.group-book input.button.retry', function () {
      bookstore.sell.init($sellForm);
    })
    .on('click', '> div.group-book input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showStatusImageDiv($sellForm);
    })
    .on('focus', '> div.group-lecture input[name="lecture"]:not([readonly])', function () {
      bookstore.sell.showLecturePopup($sellForm);
      $(this).blur();
    })
    .on('change', '> div.group-lecture input[name="lecture"]', function () {
      var $lectureDiv = $sellForm.find('> div.group-lecture');
      bookstore.sell.validateLectureDiv($lectureDiv);
    })
    .on('click', '> div.group-lecture input.button.skip', function () {
      $sellForm.find('> div.group-lecture').remove();
      bookstore.sell.showStatusNoteDiv($sellForm);
    })
    .on('click', '> div.group-lecture input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showStatusImageDiv($sellForm);
    })
    .on('click', '> div.group-lecture-result > ol > li', function () {
      if ($(this).hasClass('retry')) {
        $sellForm.find('div.group-lecture-result').remove();
        bookstore.sell.showLecturePopup($sellForm);
      } else {
        bookstore.sell.putLectureData($sellForm, $(this).data('lecture'));
      }
    })
    .on('click', '> div.group-status-note input.button.skip', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      var $statusNoteDiv = $sellForm.find('> div.group-status-note');
      $statusNoteDiv.find('> ol.select-checkbox > li.checked').each(function () {
        $(this).click();
      });
      bookstore.sell.showStatusDamageDiv($sellForm);
    })
    .on('click', '> div.group-status-note input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showStatusDamageDiv($sellForm);
    })
    .on('click', '> div.group-status-note > ol.select-checkbox > li', function () {
      var $checkboxItem = $(this);
      var $statusNoteDiv = $sellForm.find('> div.group-status-note');
      bookstore.sell.validateStatusDiv($statusNoteDiv);
    })
    .on('click', '> div.group-status-damage input.button.skip', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      var $statusDamageDiv = $sellForm.find('> div.group-status-damage');
      $statusDamageDiv.find('> ol.select-checkbox > li.checked').each(function () {
        $(this).click();
      });
      bookstore.sell.showStatusImageDiv($sellForm);
    })
    .on('click', '> div.group-status-damage input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showStatusImageDiv($sellForm);
    })
    .on('click', '> div.group-status-damage > ol.select-checkbox > li', function () {
      var $checkboxItem = $(this);
      var $statusDamageDiv = $sellForm.find('> div.group-status-damage');
      bookstore.sell.validateStatusDiv($statusDamageDiv);
    })
    .on('click', '> div.group-status-image > div.images:not(.locked) div.image', function () {
      if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
        alert('사진 첨부를 위해 최신 브라우저를 이용해주세요.');
        return false;
      }
      if (bookstore.data.isAndroidAttachDisable) {
        alert('안드로이드 5.0 롤리팝 미만의 경우 파일 첨부가 불가능합니다. 웹 버전을 이용해주세요.');
        return false;
      }
      var $statusImageDiv = $sellForm.find('> div.group-status-image');
      var $images = $statusImageDiv.find('> div.images');
      var $image = $(this);
      var index = $images.find('div.image').index($image);
      var $input = $images.find('input.file').eq(index);
      if ($image.hasClass('attached')) {
        if (!confirm('삭제하시겠습니까?')) {
          return false;
        }
        $image.removeClass('attached').css('background-image', 'none').removeData('url');
        $input.val('');
      } else {
        $input.click();
      }
      bookstore.sell.validateStatusImageDiv($statusImageDiv);
    })
    .on('change', '> div.group-status-image > div.images input.file', function () {
      var $statusImageDiv = $sellForm.find('> div.group-status-image');
      var input = this;
      var $input = $(input);
      var index = $statusImageDiv.find('> div.images input.file').index($input);
      var $image = $statusImageDiv.find('> div.images div.image').eq(index);
      var file = input.files[0];
      if (!file) {
        return false;
      }
      if (!file.type.match('image')) {
        alert('사진만 첨부할 수 있습니다.');
        return false;
      }
      var loadImageOptions = {
        canvas: true,
        maxWidth: 1280,
        maxHeight: 1280
      };
      var loadThumbImageOptions = {
        canvas: true,
        maxWidth: 300,
        maxHeight: 300
      };
      var timestamp = new Date().getTime().toString();
      loadImage(file, function (canvas) {
	
        if (!canvas.toDataURL || !canvas.toBlob) {
          alert('오류가 발생하였습니다.');
          return false;
        }
        
        $image.addClass('attached').css({
          'background-image': 'url("' + canvas.toDataURL('image/jpeg') + '")'
        });
        
        bookstore.sell.uploadS3($sellForm, index, canvas, timestamp, false, function (response) {
          $image.data('url', response);
          bookstore.sell.validateStatusImageDiv($statusImageDiv);
        });
        
      }, loadImageOptions);
      
      
//      if (index === 0) {
//        loadImage(file, function (canvas) {
//          if (!canvas.toDataURL || !canvas.toBlob) {
//            return false;
//          }
//          bookstore.sell.uploadS3($sellForm, index, canvas, timestamp, true);
//        }, loadThumbImageOptions);
//      }
      
      
    })
    .on('click', '> div.group-status-image input.button.skip', function () {
      var $statusImageDiv = $sellForm.find('> div.group-status-image');
      if ($statusImageDiv.find('> div.images > div.wrap > div.image:first-child').is(':not(.attached)')) {
        if (!confirm('겉표지 사진이 없으면 검색 결과에 사진이 뜨지 않습니다. 넘어가시겠습니까?')) {
          return false;
        }
      }
      $statusImageDiv.remove();
      bookstore.sell.showPriceDiv($sellForm);
    })
    .on('click', '> div.group-status-image input.button.next:not(.disabled)', function () {
      var $statusImageDiv = $sellForm.find('> div.group-status-image');
      if ($statusImageDiv.find('> div.images > div.wrap > div.image:first-child').is(':not(.attached)')) {
        if (!confirm('겉표지 사진 없으면 검색 결과에 사진이 뜨지 않습니다. 넘어가시겠습니까?')) {
          return false;
        }
      }
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showPriceDiv($sellForm);
    })
    .on('keyup', '> div.group-price input.text', function () {
      var $priceDiv = $sellForm.find('> div.group-price');
      bookstore.sell.validatePriceDiv($priceDiv);
    })
    .on('click', '> div.group-price input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showContactDiv($sellForm);
    })
    .on('click', '> div.group-contact input.button.next', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      if (bookstore.data.defaultLocation) {
        bookstore.sell.showCommentDiv($sellForm);
      } else {
        bookstore.sell.showMeansDiv($sellForm);
      }
    })
    .on('click', '> div.group-means > ol.select-checkbox > li', function () {
      var $meansDiv = $sellForm.find('> div.group-means');
      bookstore.sell.validateMeansDiv($meansDiv);
    })
    .on('click', '> div.group-means input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      if ($sellForm.find('> div.group-means > ol.select-checkbox > li:contains("직거래")').hasClass('checked')) {
        bookstore.sell.showMeansDirectDiv($sellForm);
      } else {
        bookstore.sell.showCommentDiv($sellForm);
      }
    })
    .on('focus', '> div.group-means-direct input[name="means-direct"]:not([readonly])', function () {
      bookstore.sell.showMeansDirectPopup($sellForm);
      $(this).blur();
    })
    .on('change', '> div.group-means-direct input[name="means-direct"]', function () {
      var $meansDirectDiv = $sellForm.find('> div.group-means-direct');
      bookstore.sell.validateMeansDirectDiv($meansDirectDiv);
    })
    .on('click', '> div.popup-means-direct > ol.menu > li', function () {
      var $menuItem = $(this);
      if ($menuItem.is(':contains("내 학교")')) {
        bookstore.sell.putMeansDirectCampusData($sellForm);
      } else if ($menuItem.is(':contains("현재 위치")')) {
        bookstore.sell.putMeansDirectCurrentData($sellForm);
      } else {
        bookstore.sell.showMeansDirectSearchPopup($sellForm);
      }
    })
    .on('click', '> div.group-means-direct input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showCommentDiv($sellForm);
    })
    .on('click', '> div.group-means-direct-search-result > ol > li', function () {
      if ($(this).hasClass('retry')) {
        $sellForm.find('div.group-means-direct-search-result').remove();
        bookstore.sell.showMeansDirectSearchPopup($sellForm);
      } else {
        bookstore.sell.putMeansDirectData($sellForm, $(this).data('location'));
      }
    })
    .on('keyup', '> div.group-comment textarea', function () {
      var $commentDiv = $sellForm.find('> div.group-comment');
      bookstore.sell.validateCommentDiv($commentDiv);
    })
    .on('click', '> div.group-comment input.button.skip', function () {
      var $commentDiv = $sellForm.find('> div.group-comment');
      $commentDiv.remove();
      bookstore.sell.showAgreementDiv($sellForm);
    })
    .on('click', '> div.group-comment input.button.next:not(.disabled)', function () {
      var $buttonWrap = $(this).parent();
      $buttonWrap.remove();
      bookstore.sell.showAgreementDiv($sellForm);
    })
    .on('click', '> div.group-agreement input.button.next', function () {
      $sellForm.submit();
      location.href='/bookstore';
    });
});
