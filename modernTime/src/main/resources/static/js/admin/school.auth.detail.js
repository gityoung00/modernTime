$().ready(function() {
	var $container = $('#container');
	var _fn = {
		initiate: function() {
			$("#AuthButton.before").on('click', function() {
				const userId = $("h3.admin.large").text();
				if (confirm(`${userId}님의 학교인증을 완료하겠습니까?`)){
					$.ajax({
						url: '/school/auth',
						type: 'post',
						data: { userId: userId },
						success: function(data) {
							console.log(data);
							location.href = "/school/auth";
						}
					});
					
				}
			});

		},
	};
	_fn.initiate();
});