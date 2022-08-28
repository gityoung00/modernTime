bookstore.my = {
  loaded: false,
  loadedLength: 0,
  init: function ($itemsDiv) {
//    $itemsDiv.empty();
    bookstore.my.loadItems($itemsDiv);
  },
  loadItems: function ($itemsDiv) {
//    bookstore.my.loaded = false;
    bookstore.fn.findItemList(1, null, null, function (response) {
	$.ajax({
			url: '/bookSellListMy',
			type: 'POST',
			dataType: 'json',
			data: {
				id: 'test123'
			},
			success: function(data) {
				//				var str = data.trim().replace(/\r/gi, '<br/>').replace(/\n/gi, '\\n');
				var jsonDatas = data;
				//				JSON.parse(str);
				var asd = "<div class='header'><h1>최근 올라온 책</h1><div class='filter'><a class='campus'><span class='text'>KG IT대</span><span class='icons arrowdown - gray - 14'></span></a></div></div>";
				var list = "";
				for (i = 0; i < jsonDatas.cd.length; i++) {
					if(jsonDatas.cd[i].isSold == 0){
						list = list + "<a class='item' href='/bookStoreView?id=" + jsonDatas.cd[i].id + "'>";
						list = list + "<div class='thumb' style='background-image: url(" + jsonDatas.cd[i].picture + ")'></div>";
						list = list + "<h2>" + jsonDatas.cd[i].title + "</h2>";
						list = list + "<p class='details author'>" + jsonDatas.cd[i].author + "</p>";
						list = list + "<p class='details publisher'><span>" + jsonDatas.cd[i].publisher + "</span></p>";
						list = list + "<p class='price'><span class='selling'>" + jsonDatas.cd[i].price + "원</span></p>";
						list = list + "<hr>";
						list += "</a>";
					}else{
						list = list + "<a class='item soldout' href='/bookStoreView?id=" + jsonDatas.cd[i].id + "'>";
						list = list + "<div class='thumb' style='background-image: url(" + jsonDatas.cd[i].picture + ")''></div>";
						list = list + "<h2>" + jsonDatas.cd[i].title + "</h2>";
						list = list + "<p class='details author'>" + jsonDatas.cd[i].author + "</p>";
						list = list + "<p class='details publisher'><span>" + jsonDatas.cd[i].publisher + "</span></p>";
						list = list + "<p class='price'><span class='selling'>" + jsonDatas.cd[i].price + "원</span></p>";
						list = list + "<hr>";
						list += "</a>";
					}
				}
				$("#items").html(list);

			}
		})
//      if (!response || response.error) {
//        $('<a></a>').addClass('item empty').text('책 목록을 불러올 수 없습니다.').appendTo($itemsDiv);
//        return false;
//      }
//      _.each(response, function (item) {
//        var $item = $('<a></a>').addClass('item').data('item', item).attr({
//          href: '/view/' + item.id
//        });
//        if (item.soldout) {
//          $item.addClass('soldout');
//        }
//        var $thumb = $('<div></div>').addClass('thumb').appendTo($item);
//        if (item.cover_image) {
//          $thumb.css({
//            'background-image': 'url("' + item.cover_image + '")'
//          });
//        }
//        $('<h2></h2>').text(item.book_title).appendTo($item);
//        var $detailsAuthor = $('<p></p>').addClass('details author').appendTo($item);
//        $('<span></span>').text(item.book_author + ' 지음').appendTo($detailsAuthor);
//        var $detailsPublisher = $('<p></p>').addClass('details publisher').appendTo($item);
//        $('<span></span>').text(item.book_publisher).appendTo($detailsPublisher);
//        var $price = $('<p></p>').addClass('price').appendTo($item);
//        $('<span></span>').addClass('selling').text(bookstore.fn.formatPrice(item.price)).appendTo($price);
//        if (item.book_price) {
//          $('<span></span>').addClass('original').text(bookstore.fn.formatPrice(item.book_price)).appendTo($price);
//        }
//        $('<hr>').appendTo($item);
//        $item.appendTo($itemsDiv);
//      });
//      if (!response.length && !bookstore.my.loadedLength) {
//        $('<a></a>').addClass('item empty').text('검색된 책이 없습니다.').appendTo($itemsDiv);
//        return false;
//      }
//      bookstore.my.loaded = true;
//      bookstore.my.loadedLength += response.length;
    });
  }
};

$().ready(function () {
  var $itemsDiv = $('#items');
  bookstore.my.init($itemsDiv);

  $(window)
    .on('scroll', function () {
      var scrollTop = $(window).scrollTop();
      if (!bookstore.my.loaded || bookstore.my.loadedLength % 20 !== 0) {
        return false;
      }
      if (scrollTop < ($(document).height() - $(window).height() - 300)) {
        return false;
      }
      bookstore.my.loadItems($itemsDiv);
    });
});
