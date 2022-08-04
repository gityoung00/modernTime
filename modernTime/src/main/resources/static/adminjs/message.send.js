


























































$().ready(function () {
  var $container = $('#container');
  var $messageSend = $('#messageSend');
  var _set = {};
  var _fn = {
    init: function () {
      $container.on('click', '[data-modal="messageSend"]', function () {
        _fn.openMessageSend($(this).data());
      });
      $messageSend.find('a.close').on('click', function () {
        _fn.closeMessageSend();
      });
      $messageSend.on('submit', function () {
        _fn.onSubmitMessageSend();
        return false;
      });
      setTimeout(function () {
        $(window).on('popstate', function () {
          if ($messageSend.is(':visible')) {
            _fn.closeMessageSend();
          }
        });
      }, 0);
    },
    openMessageSend: function (data) {
      _set = _.clone(data);
      console.log(_set);
      $messageSend.find('textarea').val('');
      $messageSend.show();
    },
    closeMessageSend: function () {
      $messageSend.hide();
      if ($container.is(':has(div.messages:visible)')) {
        $container.find('div.messages div.title a.refresh').click();
      }
    },
    onSubmitMessageSend: function () {
      if (_set.isSubmitted === true) {
        return;
      }
      var confirmMessage;
      if (_set.isAnonym === 1) {
        confirmMessage = '상대방에게 익명으로 쪽지가 보내집니다.\n쪽지를 보내시겠습니까?';
      } else {
        confirmMessage = '상대방에게 닉네임으로 쪽지가 보내집니다.\n쪽지를 보내시겠습니까?';
      }
      if (!confirm(confirmMessage)) {
        return;
      }
      var $textarea = $messageSend.find('textarea');
      if ($textarea.val().replace(/ /gi, '').length === 0) {
        alert('내용을 입력해주세요.');
        $textarea.focus();
        return;
      }
      var params = {
        text: $textarea.val(),
        is_anonym: _set.isAnonym
      };
      if (_set.boxId > 0) {
        params.box_id = _set.boxId;
      } else if (_set.articleId > 0) {
        params.article_id = _set.articleId;
      } else if (_set.commentId > 0) {
        params.comment_id = _set.commentId;
      }
      _set.isSubmitted = true;
      $.ajax({
        url: _apiServerUrl + '/save/messageBox/message',
        xhrFields: {withCredentials: true},
        type: 'POST',
        data: params,
        success: function (data) {
          var responseCode = Number($(data).find('response').text());
          if (responseCode === -1) {
            alert('학교 인증 후 쪽지를 보낼 수 있습니다.');
          } else if (responseCode === -3) {
            alert('올바르지 않은 쪽지 상대입니다.');
          } else if (responseCode === -4) {
            alert('쪽지를 보낼 수 없는 상대입니다.');
          } else if (responseCode < 0) {
            alert('쪽지를 보낼 수 없습니다.');
          } else {
            _fn.closeMessageSend();
          }
        }
      });
    }
  };
  _fn.init();
});
