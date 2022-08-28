bookstore.view = {
//  init: function ($item) {
  init: function () {
	var $item = $('#item');
    var $groupItem = $('.group group-item');

    $groupItem.appendTo($item);
    var $groupStatus = $('.group group-status');

    $groupStatus.appendTo($item);
    var $groupMeans = $('.group group-means');
    $('<h2></h2>').text('거래 수단').appendTo($groupMeans);
    var $groupMeansDl = $('<dl></dl>').appendTo($groupMeans);
    $('<dt></dt>').text('택배').appendTo($groupMeansDl);
    var $groupMeansDd1 = $('<dd></dd>').appendTo($groupMeansDl);
    var $groupMeansUl1 = $('<ul></ul>').appendTo($groupMeansDd1);
    $('<li></li>').text('가능').appendTo($groupMeansUl1);
    $('<li></li>').text('불가').appendTo($groupMeansUl1);
    $('<hr>').appendTo($groupMeansUl1);

  },
  showPricePopup: function ($item) {
    var $popup = $('<div></div>').addClass('popup popup-price');
    $('<h2></h2>').text('가격 수정').appendTo($popup);
    var $textfield = $('<input>').addClass('textfield').attr({
      'type': 'number',
      'placeholder': '(단위: 원)'
    }).val($('.selling')).appendTo($popup);
    $('<input>').addClass('button submit').attr({
      'type': 'button',
      'value': '저장'
    }).appendTo($popup);
    $('<input>').addClass('button close').attr({
      'type': 'button',
      'value': '취소'
    }).appendTo($popup);
    $popup.appendTo($item);
    $popup.show();
    $textfield.focus();
  },
  showEditPopup: function ($item) {
    $item.find('div.popup').hide().remove();
    var $popup = $('<div></div>').addClass('popup popup-edit');
    $('<h2></h2>').text('설명 수정').appendTo($popup);
    var $textarea = $('<textarea></textarea>').attr({
      'placeholder': '(500자 이내)'
    }).val($(".comment").val()).appendTo($popup);
    $('<input>').addClass('button submit').attr({
      'type': 'button',
      'value': '저장'
    }).appendTo($popup);
    $('<input>').addClass('button close').attr({
      'type': 'button',
      'value': '취소'
    }).appendTo($popup);
    $popup.appendTo($item);
    $popup.show();
    $textarea.focus();
  },
  showMessagePopup: function ($item) {
    $item.find('div.popup').hide().remove();
    var $popup = $('<div></div>').addClass('popup popup-message');
    $('<h2></h2>').text('쪽지보내기').appendTo($popup);
    var $textarea = $('<textarea></textarea>').attr({
      'placeholder': '(500자 이내)'
    }).val($(".comment").val()).appendTo($popup);
    $('<input>').addClass('button submit').attr({
      'type': 'button',
      'value': '보내기'
    }).appendTo($popup);
    $('<input>').addClass('button close').attr({
      'type': 'button',
      'value': '취소'
    }).appendTo($popup);
    $popup.appendTo($item);
    $popup.show();
    $textarea.focus();
  },
  showGallery: function ($item, url) {
    $item.find('div.gallery').remove();
    var $gallery = $('<div></div>').addClass('gallery');
    var $img = $('<img>').attr('src', url).appendTo($gallery);
    $img.on('load', function () {
      $gallery.appendTo($item);
      $gallery.show();
      var maxHeight = $(window).height();
      var imgWidth = Math.round($img.width() / 2);
      var imgHeight = Math.round($img.height() / 2);
      var marginTop = (imgHeight > maxHeight) ? 0 : ((maxHeight - imgHeight) / 2);
      $img.css({
        width: imgWidth,
        height: imgHeight,
        'margin-top': marginTop
      });
      $('body').css({
        width: '100%',
        overflow: 'hidden',
        position: 'fixed'
      });
    });
  },
  hideGallery: function ($item) {
    $item.find('div.gallery').remove();
    $('body').css({
      width: '',
      overflow: '',
      position: ''
    });
  }
};
$().ready(function () {
  var $item = $('#item');
  bookstore.view.init($item);

  $(window).on('hashchange', function () {
    if (location.hash) {
      var index = Number(location.hash.substring(1)) || 0;
      var $image = $item.find('> div.group-status div.image').eq(index);
      var url = $image.css('background-image').replace('url("', '').replace('url(\'', '').replace('url(', '').replace('")', '').replace('\')', '').replace(')', '');
      bookstore.view.showGallery($item, url);
    } else {
      bookstore.view.hideGallery($item);
    }
  });

  $item
    .on('click', '> div.group-item > p.buttons > a.soldout', function () {
      if (!confirm('판매가 완료되면 더이상 쪽지를 받을 수 없습니다. 정말 판매가 완료되었습니까?')) {
        return false;
      }
      const urlParams = new URL(location.href).searchParams;

		const id = urlParams.get('id');

		console.log(id)
      var data = {
        id: id
      };
      bookstore.fn.saveSoldout(data, function (response) {
        if (response.error) {
          alert('오류가 발생하였습니다!');
        } else {
          alert('판매가 완료되었습니다!');
          location.reload();
        }
      });
    })
    .on('click','> div.group.group-item > p.buttons > a.white.price',function(){
//	'click', '> div.group-item > p.buttons > a.price', function () {
	console.log(bookstore.view)
      bookstore.view.showPricePopup($item);
    })
    .on('click', '> div.group-item > p.buttons > a.edit', function () {
      bookstore.view.showEditPopup($item);
    })
    
    // 판매자에게 쪽지보내기
    .on('click', '> div.group-item > p.buttons > a.message', function () {
    	bookstore.view.showMessagePopup($item);
      
      
    })
    .on('click', '> div.group-status div.image', function (i, index) {
      var $image = $(this);
      var index = $item.find('> div.group-status div.image').index($image);
      location.href = '#' + index;
    })
    .on('click', '> div.gallery', function () {
      history.go(-1);
    })
    .on('click', '> div.popup-price > input.button.submit', function () {
      var $textfield = $item.find('div.popup-price input.textfield');
      var price = Number($textfield.val()) || 0;
      if (price <= 0) {
        return;
      }
        const urlParams = new URL(location.href).searchParams;

		const id = urlParams.get('id');

		console.log(id)
      var data = {
        id: id,
        price: price
      };
      console.log(data)
      bookstore.fn.saveItemPrice(data, function (response) {
        if (response.error) {
          alert('오류가 발생하였습니다!');
        } else {
          location.reload();
        }
      });
    })
    .on('click', '> div.popup-edit > input.button.submit', function () {
      var $textarea = $item.find('div.popup-edit textarea');
      var comment = $textarea.val().trim();
      if (comment.length === 0) {
        return;
      }
        const urlParams = new URL(location.href).searchParams;

		const id = urlParams.get('id');

		console.log(id)
      var data = {
        id: id,
        comment: comment
      };
      bookstore.fn.saveItemComment(data, function (response) {
        if (response.error) {
          alert('오류가 발생하였습니다!');
        } else {
          location.reload();
        }
      });
    })
    .on('click', '> div.popup-message > input.button.submit', function () {
      var $textarea = $item.find('div.popup-message textarea');
      var comment = $textarea.val().trim();
      if (comment.length === 0) {
        return;
      }
        const urlParams = new URL(location.href).searchParams;

		const id = urlParams.get('id');

      var data = {
        bookId: id,
        title: $('#item > div.group.group-book > h1').text(),
        message: comment
        
      };
      bookstore.fn.saveMessage(data, function (response) {
        if (response.error) {
          alert('오류가 발생하였습니다!');
        } else {
          location.reload();
        }
      });
    })
    .on('click', '> div.popup > input.button.close', function () {
      $item.find('div.popup').hide().remove();
    });
});
