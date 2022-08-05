$().ready(function() {
	const $id = $("input[name='id']");
	const $submit = $("input[type='submit']");

	var _fn = {
		init: function() {
			$submit.hover(function() {
				$submit.css('cursor', 'pointer')
			});
			$submit.on('click', function() {
				if (!$id.val()){
					alert("아이디를 입력해주세요.");
					return;
				}
				
				$.ajax({
					url: '/forgot/pw/idcheck',
					type: 'POST',
					data: { 'id': $id.val() },
					success: function(data) {
						if (data == "success"){
							location.href="/forgot/password/userid"
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
