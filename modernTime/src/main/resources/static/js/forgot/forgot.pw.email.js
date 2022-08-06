$().ready(function() {
	const $id = $("input[name='id']");
	const $email = $("input[name='email']");
	const $submit = $("input[type='submit']");
	var _fn = {
		init: function() {
			$submit.hover(function() {
				$submit.css('cursor', 'pointer')
			});
			$submit.on('click', function() {
				if (!$email.val()){
					alert("이메일을 입력해주세요.");
					return;
				}
				
				$.ajax({
					url: '/forgot/password/userid',
					type: 'POST',
					data: { 'email': $email.val(), 'id': $id.val() },
					success: function(data) {
						if (data == "success"){
						} else {
						  alert(data);
						}
					}
				});
			});
		},

	};
	_fn.init();


});
