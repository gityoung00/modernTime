$().ready(function() {
	var $container = $('#container');
	var $messageSend = $('#messageSend');
	var _set = {};
	var _fn = {
		init: function() {
			$container.on('click', '[data-modal="messageSend"]', function() {
				_fn.openMessageSend($(this).data());
			});
			$messageSend.find('a.close').on('click', function() {
				_fn.closeMessageSend();
			});
			setTimeout(function() {
				$(window).on('popstate', function() {
					if ($messageSend.is(':visible')) {
						_fn.closeMessageSend();
					}
				});
			}, 0);
		},
		
		openMessageSend: function(data) {
			_set = _.clone(data);
			console.log("set: ", _set)
			
			$messageSend.find('textarea').val('');
			$messageSend.show();
		},
		closeMessageSend: function() {
			$messageSend.hide();
//			if ($container.is(':has(div.messages:visible)')) {
//				$container.find('div.messages div.title a.refresh').click();
//			}
		},

	};
	_fn.init();
});
