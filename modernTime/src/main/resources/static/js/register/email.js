$().ready(function() {
	var $container = $('#container');
	var $enterEmail = $container.find('input[name="email"]');
 	var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;	
	var _fn = {
		init: function() {
			$container.on('submit', function(event) {
				_fn.onSubmit(event);
			});
		},
		onSubmit: function(event) {
			if (!$enterEmail.val()) {
				alert('이메일을 입력해주세요.');
				event.preventDefault();
				return;
			}
			if (regEmail.test($enterEmail.val()) === false){
				alert('이메일을 정확하게 입력해주세요.')
				event.preventDefault();
				return;
			} 
				
		}
	};
	_fn.init();
});