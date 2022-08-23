bookstore.messagebox = {
  loadMessageBoxes: function ($boxesDiv) {
    bookstore.fn.findMessageBoxes(function (response) {
      var boxes = $(response).find('box').map(function () {
        var $data = $(this);
        return {
          id: $data.attr('id'),
          text: $data.attr('last_message_text'),
          date: bookstore.fn.formatDate($data.attr('last_message_created_at')),
          unreadCount: Number($data.attr('unread_count')),
          updatedTime: Number($data.attr('updated_time'))
        };
      }).get();
      boxes = _.sortBy(boxes, 'updatedTime').reverse();
      if (!boxes.length) {
        $('<a></a>').addClass('box empty').text('아직 주고 받은 쪽지가 없습니다.').appendTo($boxesDiv);
        return false;
      }
      _.each(boxes, function (box) {
        var $box = $('<a></a>').addClass('box').attr({
          href: '/message/box/' + box.id
        });
        $('<time></time>').html(box.date).appendTo($box);
        if (box.unreadCount > 0) {
          $('<span></span>').addClass('unread').html('+' + box.unreadCount).appendTo($box);
        }
        $('<hr>').appendTo($box);
        $('<p></p>').html(box.text).appendTo($box);
        $box.appendTo($boxesDiv);
      });
    });
  }
};

$().ready(function () {
  var $boxesDiv = $('#messageboxes');
  bookstore.messagebox.loadMessageBoxes($boxesDiv);
});
