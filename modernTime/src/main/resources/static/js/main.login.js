$().ready(function () {
	var $container = $('#container');
	var _set = {};
	var _fn = {
		initiate: function () {
			var $form = $container.find('form');
			var $userid = $form.find('input[name="userid"]');
			var $password = $form.find('input[name="password"]');
			var $submit = $container.find('input[type="button"]');
			$userid.placeholder();
			$submit.on('click', function () {
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
				
				$.ajax({
					url: '/login',
					type: 'POST',
					data: {"id" : $userid.val(), "pw": $password.val()},
					success: function(data){
						console.log(data)
						if (data == "success"){
							location.href="/";
						} else if (data == "admin"){
							location.href="/admin"
						} else {
							alert(data);
							
						}
						
						
					}
				});
				
				
			});
		}
	};
	_fn.initiate();
});
