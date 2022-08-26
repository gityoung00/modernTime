bookstore.messagebox = {
  loadMessageBoxes: function ($boxesDiv) {
    bookstore.fn.findMessageBoxes(function (response) {
		console.log(response)
      var boxes = $(response.data).map(function () {
		console.log(this)
        return {
          id: this.room_id,
          text: this.message,
          date: this.create_date,
        };
      }).get();
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
