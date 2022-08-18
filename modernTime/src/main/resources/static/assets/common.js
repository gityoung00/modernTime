var bookstore = {
  data: {},
  fn: {
    decodeHtmlSpecialChars: function (text) {
      return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, '\'');
    },
    encodeHtmlSpecialChars: function (text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },
    findBookList: function (keyword, callback) {
      $.ajax({
        url: '/find/booklistviaapi.json',
        type: 'GET',
        dataType: 'json',
        data: {
          keyword: keyword
        },
        success: function (response) {
          callback(response);
        }
      });
    },
    findCurrentLocation: function (callback) {
      bookstore.fn.findCurrentPosition(function (err, result) {
        if (err) {
          callback(err);
          return false;
        }
        $.ajax({
          url: '/find/locationviaapi.json',
          type: 'GET',
          dataType: 'json',
          data: {
            latitude: result.latitude,
            longitude: result.longitude
          },
          success: function (response) {
            callback(null, response);
          }
        });
      });
    },
    findCurrentPosition: function (callback) {
      if (!navigator.geolocation) {
        callback('위치 정보 확인을 위해 최신 브라우저를 이용해주세요.');
        return false;
      }
      navigator.geolocation.getCurrentPosition(function (position) {
        callback(null, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, function (error) {
        if (error.code === error.PERMISSION_DENIED) {
          callback('현재 위치를 확인하기 위해 [위치] 설정을 변경해주세요.');
        } else {
          callback('현재 위치를 불러올 수 없습니다.');
        }
      });
    },
    findItemList: function (mine, keyword, campus, start, callback) {
      $.ajax({
        url: '/find/itemlist.json',
        type: 'GET',
        dataType: 'json',
        data: {
          mine: mine,
          keyword: keyword,
          start: start
        },
        success: function (response) {
          callback(response);
        }
      });
    },
    findLectureList: function (keyword, callback) {
      $.ajax({
        url: '/find/lecturelist.xml',
        type: 'GET',
        data: {
          keyword: keyword
        },
        success: function (response) {
          callback(response);
        }
      });
    },
    findLocationByKeyword: function (keyword, callback) {
      $.ajax({
        url: '/find/locationviaapi.json',
        type: 'GET',
        dataType: 'json',
        data: {
          keyword: keyword
        },
        success: function (response) {
          callback(response);
        }
      });
    },
    findMessageBoxes: function (callback) {
      $.ajax({
        url: '/find/messageboxes.xml',
        type: 'GET',
        success: function (response) {
          callback(response);
        }
      });
    },
    findMessages: function (data, callback) {
      $.ajax({
        url: '/find/messages.xml',
        type: 'GET',
        data: data,
        success: function (response) {
          callback(response);
        }
      });
    },
    formatPrice: function (text) {
      return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
    },
    formatDate: function (text) {
      text = text.replace(/-/g, '');
      return Number(text.slice(0, 4)) + '년 ' + Number(text.slice(4, 6)) + '월 ' + Number(text.slice(6, 8)) + '일';
    },
    parseUrlParams: function (params) {
      if (!params) {
        params = location.search;
      }
      params = params.substring(1);
      return _.chain(params.split('&')).map(function (param) {
        if (param) {
          return param.split('=');
        }
      }).compact().object().mapObject(function (value, key) {
        return decodeURIComponent(value);
      }).value();
    },
    resizeBase64Image: function (base64, maxHeight, callback) {
      var img = new Image();
      img.src = base64;
      img.onload = function () {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        var imgWidth = img.width;
        var imgHeight = img.height;
        if (imgHeight > maxHeight) {
          imgWidth *= maxHeight / imgHeight;
          imgHeight = maxHeight;
        }
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        context.drawImage(img, 0, 0, imgWidth, imgHeight);
        callback(canvas);
      };
    },
    saveItem: function (data, callback) {
      $.ajax({
        url: '/save/item',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (response) {
          callback(response);
        }
      });
    },
    saveItemComment: function (data, callback) {
      $.ajax({
        url: '/save/itemcomment',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (response) {
          callback(response);
        }
      });
    },
    saveItemPrice: function (data, callback) {
      $.ajax({
        url: '/save/itemprice',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (response) {
          callback(response);
        }
      });
    },
    saveMessage: function (data, callback) {
      $.ajax({
        url: '/save/message',
        type: 'POST',
        data: data,
        success: function (response) {
          callback(response);
        }
      });
    },
    saveSoldout: function (data, callback) {
      $.ajax({
        url: '/save/soldout',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (response) {
          callback(response);
        }
      });
    },
    stripHtml: function (text) {
      var div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    }
  }
};

(function ($) {
  var _oldShow = $.fn.show;
  $.fn.show = function (speed, oldCallback) {
    return $(this).each(function () {
      var obj = $(this),
      newCallback = function () {
        if ($.isFunction(oldCallback)) {
          oldCallback.apply(obj);
        }
      };
      obj.trigger('beforeShow');
      _oldShow.apply(obj, [speed, newCallback]);
      obj.trigger('afterShow');
    });
  };
  var _oldHide = $.fn.hide;
  $.fn.hide = function (speed, oldCallback) {
    return $(this).each(function () {
      var obj = $(this),
      newCallback = function () {
        if ($.isFunction(oldCallback)) {
          oldCallback.apply(obj);
        }
      };
      obj.trigger('beforeHide');
      _oldHide.apply(obj, [speed, newCallback]);
      obj.trigger('afterHide');
    });
  };
})(jQuery);

$().ready(function () {
  $(document).on('beforeShow', 'div.popup', function (event) {
    if (event.target !== this) return false;
    var $popup = $(this);
    var $popupWrap = $('<div></div>').addClass('popup-wrap');
    $popupWrap.insertBefore($popup);
    $popup.css({
      'margin-left': -($popup.outerWidth() / 2),
      'margin-top': -($popup.outerHeight() / 2)
    });
  }).on('afterHide', 'div.popup', function (event) {
    if (event.target !== this) return false;
    $('div.popup-wrap').remove();
  }).on('click', 'div.popup-wrap', function (event) {
    $('div.popup:visible').hide();
  }).on('focus', 'input[type="text"], input[type="number"], textarea', function () {
    if ($('body').is(':has(#bar)')) {
      $('#bar').hide();
    }
  }).on('blur', 'input[type="text"], input[type="number"], textarea', function () {
    if ($('body').is(':has(#bar)')) {
      $('#bar').show();
    }
  });
  if (typeof Storage !== 'undefined') {
    var currentpageCache = sessionStorage.getItem('currentpage');
    if (currentpageCache) {
      sessionStorage.setItem('previouspage', currentpageCache);
    }
    sessionStorage.setItem('currentpage', location.pathname + location.search);
  }
});
