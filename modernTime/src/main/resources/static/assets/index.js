bookstore.index = {
	loaded: false,
	loadedLength: 0,
	parseParams: function(url) {
		var urlParams = bookstore.fn.parseUrlParams(url);
		var keyword = urlParams.keyword ? urlParams.keyword.trim() : '';
		return {
			keyword: keyword
		};
	},
	goLinkContent: function($searchForm, $itemsDiv, that, event) {
		event.stopPropagation();
		if (typeof history.pushState === 'undefined') {
			return false;
		}
		var url = $(that).attr('href');
		event.preventDefault();
		history.pushState(null, null, url);
		var params = bookstore.index.parseParams(url);
		bookstore.index.loadItems($itemsDiv, params, 0);
//		bookstore.index.loadItems($searchForm, $itemsDiv, params, 0);
	},
	goRedirectContent: function($searchForm, $itemsDiv, url) {
		if (typeof history.pushState === 'undefined') {
			location.href = url;
			return false;
		}
		history.pushState(null, null, url);
		var params = bookstore.index.parseParams(url);
		bookstore.index.loadItems($itemsDiv, params, 0);
		bookstore.index.loadItems($searchForm, $itemsDiv, params, 0);
		return false;
	},

	init: function($searchForm, $itemsDiv) {
		var $header = $('<div></div>').addClass('header').appendTo('#items');
		$('<h1></h1>').html('&nbsp;').appendTo($header);
		var $filter = $('<div></div>').addClass('filter').appendTo($header);
		var $filterCampus = $('<a></a>').addClass('campus').appendTo($filter);
		$('<span></span>').addClass('text').text('KG IT대').appendTo($filterCampus);
		$('<span></span>').addClass('icons arrowdown-gray-14').appendTo($filterCampus);
		$header.appendTo($itemsDiv);
		var params = bookstore.index.parseParams();
		bookstore.index.loadItems($searchForm, $itemsDiv, params, 0);
	},
	loadItems: function($itemsDiv, params, start) {
		$.ajax({
			url: '/bookSellList',
			type: 'POST',
			dataType: 'json',
			data: {
				asd: 'asd'
			},
			success: function(data) {
//				 var str = data.trim().replace(/\r/gi, '\\r').replace(/\n/gi, '\\n');
//				 console.log(str)
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
				$("#items").html(asd+list);

			}
		})
		//    $('#loading').show();
		
		//    bookstore.index.loaded = false;
		//	  if (!start) {
		//		  bookstore.index.loadedLength = 0;
		//		  $itemsDiv.find('a.item').remove();
		//	  }
		//	  if (typeof Storage !== 'undefined') {
		//		  var previouspageCache = sessionStorage.getItem('previouspage');
		//		  if (!start && previouspageCache && previouspageCache.substr(0, 5) === '/view') {
		//			  var key = location.pathname + location.search;
		//			  var itemlistLengthCache = sessionStorage.getItem('itemlist_length_' + key);
		//			  var itemlistHtmlCache = sessionStorage.getItem('itemlist_html_' + key);
		//			  var itemlistScrollCache = sessionStorage.getItem('itemlist_scroll_' + key);
		//			  if (itemlistLengthCache && itemlistHtmlCache && itemlistHtmlCache) {
		//				  $itemsDiv.html(itemlistHtmlCache);
		//				  bookstore.index.loaded = true;
		//				  bookstore.index.loadedLength = Number(itemlistLengthCache) || 0;
		//				  $('#loading').hide();
		//				  $(window).scrollTop(Number(itemlistScrollCache) || 0);
		//				  return;
		//			  }
		//		  }
		//	  }
		//    bookstore.fn.findItemList(0, params.keyword, null, start, function (response) {
		//	console.log(response)
		//	var $title = $('prevObject')
		//	console.log($title)
		//      $('#loading').hide();
		//      if (response.error) {
		//        var message = '책 목록을 불러올 수 없습니다.';
		//        if (response.error === 'TooManyBooks') {
		//          message = '정확한 검색 결과를 위해<br>구체적인 책 제목을 입력하거나<br>ISBN 검색을 이용해주세요.';
		//        }
		//        $('<a></a>').addClass('item empty').html(message).appendTo($itemsDiv);
		//        return false;
		//      }
		//      var $header = $itemsDiv.find('> div.header');
		//      var $title = $header.find('> h1');
		//      var $filter = $header.find('> div.filter');
		//      if (params.keyword) {
		//        var titleText = '검색 결과: ';
		//        if (response.length >= 40) {
		//          titleText += '40개 이상';
		//        } else {
		//          titleText += response.length + '개';
		//        }
		//        $title.text(titleText);
		//      } else {
		//        $title.text('최근 올라온 책');
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
		//      if (!response.length) {
		//        if (!bookstore.index.loadedLength) {
		//          $('<a></a>').addClass('item empty').text('검색된 책이 없습니다.').appendTo($itemsDiv);
		//        }
		//        return false;
		//      }
		//      bookstore.index.loaded = true;
		//      bookstore.index.loadedLength += response.length;
		//      if (typeof Storage !== 'undefined') {
		//        var key = location.pathname + location.search;
		//        sessionStorage.setItem('itemlist_length_' + key, bookstore.index.loadedLength);
		//        sessionStorage.setItem('itemlist_html_' + key, $itemsDiv.html());
		//      }
		//    });
	}
};

$().ready(function() {
	var $searchForm = $('#search > form');
	var $itemsDiv = $('#items');
	bookstore.index.init($searchForm, $itemsDiv);
	
	setTimeout(function() {
		$(window).on('popstate', function() {
			var params = bookstore.index.parseParams();
			bookstore.index.loadItems($searchForm, $itemsDiv, params, 0);
		});
	}, 0);

	$(window)
		.on('scroll', function() {
			var scrollTop = $(window).scrollTop();
			if (typeof Storage !== 'undefined') {
				var key = location.pathname + location.search;
				sessionStorage.setItem('itemlist_scroll_' + key, scrollTop);
			}
			if (!bookstore.index.loaded || bookstore.index.loadedLength % 40 !== 0) {
				return false;
			}
			if (scrollTop < ($(document).height() - $(window).height() - 300)) {
				return false;
			}
			var params = bookstore.index.parseParams();
			bookstore.index.loadItems($searchForm, $itemsDiv, params, bookstore.index.loadedLength);
		});

	$searchForm
		.on('submit', function(e) {
			e.preventDefault();
	var keyword = $searchForm.find('input[name="keyword"]').val();
	console.log(keyword)
		$.ajax({
			url: '/bookSellListSearch',
			type: 'POST',
			dataType : "text",
			data: {
				keyword : keyword
			},
			success : function(data){
				var str = data.trim().replace(/\r/gi, '<br/>').replace(/\n/gi, '\\n');
				var jsonDatas = JSON.parse(str);
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
				$("#items").html(asd+list);
			},
			error : function(){
				alert('asd')
				console.log("asdasd")
			}
		})
//			$keywordInput.blur();
//			var urlParams = bookstore.fn.parseUrlParams();
//			var url = '?keyword=' + encodeURIComponent(keyword);
//			bookstore.index.goRedirectContent($searchForm, $itemsDiv, url);
//			return false;
		})
		.on('click', 'div.searchbutton', function(e) {
			e.preventDefault();
			var $keywordInput = $searchForm.find('input[name="keyword"]');
			var keyword = $keywordInput.val().trim();
			if (keyword.length < 2) {
				alert('검색어를 두 글자 이상 입력하세요!');
				$keywordInput.focus();
				return false;
			}

			$searchForm.submit();
	});
//			searchsubmit();

	$itemsDiv
		.on('click', '> div.header > div.filter > a.campus', function() {
			alert('거래 사기를 방지하고, 안전한 직거래 환경을 제공하고자\n타 대학·캠퍼스 학생과의 거래 기능이 종료되었습니다.');
		})
		.on('click', '> div.popup > input.button.close', function(event) {
			$itemsDiv.find('div.popup').hide().remove();
		})
		.on('click', '> div.popup-filter > ol.menu > li > a', function(event) {
			bookstore.index.goLinkContent($searchForm, $itemsDiv, this, event);
			$itemsDiv.find('div.popup-filter').hide().remove();
		});
})	