$().ready(function() {
	const $email = $("input[name='email']");
	const $submit = $("input[type='submit']");

	var _fn = {
		init: function() {
			console.log($email)
			$email.on('keyup', function() {
				$email.attr('class', 'pass');
			});
			$submit.hover(function() {
				$submit.css('cursor', 'pointer')
			});
			$submit.on('click', function() {
				if (!$email.val()){
					alert("이메일을 입력해주세요.");
					return;
				}
				
				$.ajax({
					url: '/forgot/id',
					type: 'POST',
					data: { 'email': $email.val() },
					success: function(data) {
						if (data == "success"){
							alert("해당 이메일로 가입한 아이디를 전송하였습니다. 메일함을 확인해주세요.")
						} else {
						  alert(data);
						}
						location.href="/login"
					}
				});
			});
		},

	};
	_fn.init();


});
