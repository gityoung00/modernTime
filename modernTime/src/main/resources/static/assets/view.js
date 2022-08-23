bookstore.view = {
  init: function ($item) {
    var data = bookstore.data.item;
    var $groupBook = $('<div></div>').addClass('group group-book');
    $('<h1></h1>').html(data.book.title).appendTo($groupBook);
    var $groupBookDl = $('<dl></dl>').appendTo($groupBook);
    $('<dt></dt>').text('저자').appendTo($groupBookDl);
    $('<dd></dd>').html(data.book.author).appendTo($groupBookDl);
    $('<dt></dt>').text('출판사').appendTo($groupBookDl);
    $('<dd></dd>').html(data.book.publisher).appendTo($groupBookDl);
    if (data.book.pubdate !== '0000-00-00') {
      $('<dt></dt>').text('출판일').appendTo($groupBookDl);
      $('<dd></dd>').html(bookstore.fn.formatDate(data.book.pubdate)).appendTo($groupBookDl);
    }
    var $groupBookPrice = $('<p></p>').addClass('price').appendTo($groupBook);
    $('<span></span>').addClass('selling').html(bookstore.fn.formatPrice(data.price)).appendTo($groupBookPrice);
    if (data.book.price > 0) {
      $('<span></span>').addClass('original').html(bookstore.fn.formatPrice(data.book.price)).appendTo($groupBookPrice);
    }
    $groupBook.appendTo($item);
    var $groupItem = $('<div></div>').addClass('group group-item');
    if (data.comment !== '') {
      var comment = data.comment.replace(/</g, '&lt;').replace(/\n\n/g, '\n').replace(/\n/g, '<br>');
      if (comment.length > 500) {
        comment = comment.substring(0, 500) + '...';
      }
      $('<p></p>').addClass('comment').html(comment).appendTo($groupItem);
    }
    $('<time></time>').html(bookstore.fn.formatDate(data.created_at)).appendTo($groupItem);
    if (data.soldout !== 0) {
      $('<p></p>').addClass('soldout').text('이 책은 판매가 완료되었습니다.').appendTo($groupItem);
    } else if (data.is_mine) {
      var $buttons = $('<p></p>').addClass('buttons').appendTo($groupItem);
      var $soldoutButton = $('<a></a>').addClass('red soldout').appendTo($buttons);
      $('<span></span>').addClass('icons soldout-white-16').appendTo($soldoutButton);
      $('<span></span>').addClass('text').text('판매 완료하기').appendTo($soldoutButton);
      var $priceButton = $('<a></a>').addClass('white price').appendTo($buttons);
      $('<span></span>').addClass('icons price-gray-16').appendTo($priceButton);
      $('<span></span>').addClass('text').text('가격 수정').appendTo($priceButton);
      var $editButton = $('<a></a>').addClass('white edit').appendTo($buttons);
      $('<span></span>').addClass('icons edit-gray-16').appendTo($editButton);
      $('<span></span>').addClass('text').text('설명 수정').appendTo($editButton);

    } else {
      var messageUrl = '/message/item/' + data.id;
      var $buttons = $('<p></p>').addClass('buttons').appendTo($groupItem);
      var $messageButton = $('<a></a>').addClass('red message').attr('href', messageUrl).appendTo($buttons);
      $('<span></span>').addClass('icons message-white-16').appendTo($messageButton);
      $('<span></span>').addClass('text').text('판매자에게 쪽지 보내기').appendTo($messageButton);
    }
    $groupItem.appendTo($item);
    var $groupStatus = $('<div></div>').addClass('group group-status');
    $('<h2></h2>').text('책 상태').appendTo($groupStatus);
    var $groupStatusDl = $('<dl></dl>').appendTo($groupStatus);
    $('<dt></dt>').text('밑줄 흔적').appendTo($groupStatusDl);
    var $groupStatusDd1 = $('<dd></dd>').appendTo($groupStatusDl);
    var $groupStatusUl1 = $('<ul></ul>').appendTo($groupStatusDd1);
    $('<li></li>').text('없음').appendTo($groupStatusUl1);
    $('<li></li>').text('연필/샤프').appendTo($groupStatusUl1);
    $('<li></li>').text('볼펜/형광펜').appendTo($groupStatusUl1);
    $('<hr>').appendTo($groupStatusUl1);
    $('<dt></dt>').text('필기 흔적').appendTo($groupStatusDl);
    var $groupStatusDd2 = $('<dd></dd>').appendTo($groupStatusDl);
    var $groupStatusUl2 = $('<ul></ul>').appendTo($groupStatusDd2);
    $('<li></li>').text('없음').appendTo($groupStatusUl2);
    $('<li></li>').text('연필/샤프').appendTo($groupStatusUl2);
    $('<li></li>').text('볼펜/형광펜').appendTo($groupStatusUl2);
    $('<hr>').appendTo($groupStatusUl2);
    $('<dt></dt>').text('겉표지').appendTo($groupStatusDl);
    var $groupStatusDd3 = $('<dd></dd>').appendTo($groupStatusDl);
    var $groupStatusUl3 = $('<ul></ul>').appendTo($groupStatusDd3);
    $('<li></li>').text('깨끗함').appendTo($groupStatusUl3);
    $('<li></li>').text('깨끗하지않음').appendTo($groupStatusUl3);
    $('<hr>').appendTo($groupStatusUl3);
    $('<dt></dt>').text('이름 기입').appendTo($groupStatusDl);
    var $groupStatusDd4 = $('<dd></dd>').appendTo($groupStatusDl);
    var $groupStatusUl4 = $('<ul></ul>').appendTo($groupStatusDd4);
    $('<li></li>').text('없음').appendTo($groupStatusUl4);
    $('<li></li>').text('있음').appendTo($groupStatusUl4);
    $('<hr>').appendTo($groupStatusUl4);
    $('<dt></dt>').text('페이지 변색').appendTo($groupStatusDl);
    var $groupStatusDd5 = $('<dd></dd>').appendTo($groupStatusDl);
    var $groupStatusUl5 = $('<ul></ul>').appendTo($groupStatusDd5);
    $('<li></li>').text('없음').appendTo($groupStatusUl5);
    $('<li></li>').text('있음').appendTo($groupStatusUl5);
    $('<hr>').appendTo($groupStatusUl5);
    $('<dt></dt>').text('페이지 훼손').appendTo($groupStatusDl);
    var $groupStatusDd6 = $('<dd></dd>').appendTo($groupStatusDl);
    var $groupStatusUl6 = $('<ul></ul>').appendTo($groupStatusDd6);
    $('<li></li>').text('없음').appendTo($groupStatusUl6);
    $('<li></li>').text('있음').appendTo($groupStatusUl6);
    $('<hr>').appendTo($groupStatusUl6);
    var statusNote = data.status_note.split('');
    var statusDamage = data.status_damage.split('');
    if (statusNote[0] === '1' || statusNote[1] === '1') {
      if (statusNote[0] === '1') {
        $groupStatusUl1.find('li:eq(1)').addClass('checked');
      }
      if (statusNote[1] === '1') {
        $groupStatusUl1.find('li:eq(2)').addClass('checked');
      }
    } else {
      $groupStatusUl1.find('li:eq(0)').addClass('checked');
    }
    if (statusNote[2] === '1' || statusNote[3] === '1') {
      if (statusNote[2] === '1') {
        $groupStatusUl2.find('li:eq(1)').addClass('checked');
      }
      if (statusNote[3] === '1') {
        $groupStatusUl2.find('li:eq(2)').addClass('checked');
      }
    } else {
      $groupStatusUl2.find('li:eq(0)').addClass('checked');
    }
    if (statusDamage[0] === '1') {
      $groupStatusUl3.find('li:eq(0)').addClass('checked');
    } else {
      $groupStatusUl3.find('li:eq(1)').addClass('checked');
    }
    if (statusDamage[1] === '1') {
      $groupStatusUl4.find('li:eq(0)').addClass('checked');
    } else {
      $groupStatusUl4.find('li:eq(1)').addClass('checked');
    }
    if (statusDamage[2] === '1') {
      $groupStatusUl5.find('li:eq(0)').addClass('checked');
    } else {
      $groupStatusUl5.find('li:eq(1)').addClass('checked');
    }
    if (statusDamage[3] === '1') {
      $groupStatusUl6.find('li:eq(0)').addClass('checked');
    } else {
      $groupStatusUl6.find('li:eq(1)').addClass('checked');
    }
    if (data.cover_image || data.images.length) {
      var images = _.compact(_.flatten([data.cover_image, data.images]));
      var $groupStatusImages = $('<div></div>').addClass('images').appendTo($groupStatus);
      var $groupStatusImagesWrap = $('<div></div>').addClass('wrap').width(images.length * 130).appendTo($groupStatusImages);
      _.each(images, function (image) {
        $('<div></div>').addClass('image').css('background-image', 'url("' + image + '")').appendTo($groupStatusImagesWrap);
      });
      $('<hr>').appendTo($groupStatusImagesWrap);
    }
    $groupStatus.appendTo($item);
    var $groupMeans = $('<div></div>').addClass('group group-means');
    $('<h2></h2>').text('거래 수단').appendTo($groupMeans);
    var $groupMeansDl = $('<dl></dl>').appendTo($groupMeans);
    $('<dt></dt>').text('택배').appendTo($groupMeansDl);
    var $groupMeansDd1 = $('<dd></dd>').appendTo($groupMeansDl);
    var $groupMeansUl1 = $('<ul></ul>').appendTo($groupMeansDd1);
    $('<li></li>').text('가능').appendTo($groupMeansUl1);
    $('<li></li>').text('불가').appendTo($groupMeansUl1);
    $('<hr>').appendTo($groupMeansUl1);
    $('<dt></dt>').text('직거래').appendTo($groupMeansDl);
    var $groupMeansDd2 = $('<dd></dd>').appendTo($groupMeansDl);
    var $groupMeansUl2 = $('<ul></ul>').appendTo($groupMeansDd2);
    $('<li></li>').text('가능').appendTo($groupMeansUl2);
    $('<li></li>').text('불가').appendTo($groupMeansUl2);
    $('<hr>').appendTo($groupMeansUl2);
    if (data.means_delivery === 1) {
      $groupMeansUl1.find('li:eq(0)').addClass('checked');
    } else {
      $groupMeansUl1.find('li:eq(1)').addClass('checked');
    }
    if (data.means_direct === 1) {
      $groupMeansUl2.find('li:eq(0)').addClass('checked');
    } else {
      $groupMeansUl2.find('li:eq(1)').addClass('checked');
    }
    if (data.location) {
      $('<dt></dt>').text('원하는 장소').appendTo($groupMeansDl);
      $('<dd></dd>').html(data.location.name).appendTo($groupMeansDl);
      $('<hr>').appendTo($groupMeans);
    }
    $('<hr>').appendTo($groupMeans);
    $groupMeans.appendTo($item);
  },
  showPricePopup: function ($item) {
    $item.find('div.popup').hide().remove();
    var $popup = $('<div></div>').addClass('popup popup-price');
    $('<h2></h2>').text('가격 수정').appendTo($popup);
    var $textfield = $('<input>').addClass('textfield').attr({
      'type': 'number',
      'placeholder': '(단위: 원)'
    }).val(bookstore.data.item.price).appendTo($popup);
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
    }).val(bookstore.data.item.comment).appendTo($popup);
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
//  hideGallery: function ($item) {
//    $item.find('div.gallery').remove();
//    $('body').css({
//      width: '',
//      overflow: '',
//      position: ''
//    });
//  }
};
$().ready(function () {
  var $item = $('#item');
  bookstore.view.init($item);

  $(window).on('hashchange', function () {
    if (location.hash) {
//      var index = Number(location.hash.substring(1)) || 0;
      var $image = $item.find('> div.group-status div.image');
//      var $image = $item.find('> div.group-status div.image').eq(index);
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
      var data = {
        id: bookstore.data.item.id
      };
      bookstore.fn.saveSoldout(data, function (response) {
        if (response.error) {
          alert('오류가 발생하였습니다!');
        } else {
          location.reload();
        }
      });
    })
    .on('click', '> div.group-item > p.buttons > a.price', function () {
      bookstore.view.showPricePopup($item);
    })
    .on('click', '> div.group-item > p.buttons > a.edit', function () {
      bookstore.view.showEditPopup($item);
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
      var data = {
        id: bookstore.data.item.id,
        price: price
      };
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
      var data = {
        id: bookstore.data.item.id,
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
    .on('click', '> div.popup > input.button.close', function () {
      $item.find('div.popup').hide().remove();
    });
});
