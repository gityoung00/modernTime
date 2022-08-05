
$().ready(function () {
	var $container = $('#container');
	var $mypoint = $container.find('div.mypoint');
	var $history = $container.find('ol.history');
	var _fn = {
		init: function () {
			_fn.loadPointHistory();
		},
		loadPointHistory: function () {
			_fn.ajaxPointHistory(function (data) {
				if (!data) {
					return false;
				}
				_fn.createPointHistory(data);
			});
		},
		ajaxPointHistory: function (callback) {
			$.ajax({
				url: _apiServerUrl + '/find/lecture/point/history/list',
				xhrFields: {withCredentials: true},
				type: 'POST',
				success: function (data) {
					callback(data);
				}
			});
		},
		createPointHistory: function (data) {
			var $response = $(data).find('response');
			$mypoint.find('span.value').text($response.find('point').text() + 'P');
			$response.find('history').each(function () {
				var $this = $(this);
				var $li = $('<li></li>');
				$('<time></time>').text(_gfn.formatRelativeDate($this.attr('created_at'))).appendTo($li);
				if (Number($this.attr('point')) > 0) {
					$('<span></span>').addClass('point positive').text('+' + $this.attr('point')).appendTo($li);
				} else {
					$('<span></span>').addClass('point negative').text($this.attr('point')).appendTo($li);
				}
				$('<span></span>').addClass('text').text($this.attr('text')).appendTo($li);
				$li.appendTo($history);
			});
		}
	};
	_fn.init();
});
