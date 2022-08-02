


























































$().ready(function () {
	var $container = $('#container');
	var _set = {};
	var _fn = {
		initiate: function () {
			var $form = $container.find('form');
			var $userid = $form.find('input[name="userid"]');
			var $password = $form.find('input[name="password"]');
			$userid.placeholder();
			$form.on('submit', function () {
				if (_set.isSubmitted === true) {
					return false;
				}
				if (!$userid.val().replace(/ /gi, '')) {
					alert('아이디를 입력하세요!');
					$userid.focus();
					return false;
				}
				if (!$password.val()) {
					alert('비밀번호를 입력하세요!');
					$password.focus();
					return false;
				}
				_set.isSubmitted = true;
				setTimeout(function () {
					_set.isSubmitted = false;
				}, 100);
			});
		}
	};
	_fn.initiate();
});
