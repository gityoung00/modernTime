$().ready(function() {
	var $container = $('#container');
	var $description = $container.find('p');
	console.log($description.html())
	var $enterEmail = $container.find('input[name="email"]');
	var $enterSubmit = $container.find('input[type="submit"]');
	var $inputDiv = $container.find('div.input')
 	var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;	
	var _fn = {
		init: function() {
			$container.on('submit', function(event) {
				_fn.onSubmit(event);
			});
		},
		onSubmit: function(event) {
			var email = $enterEmail.val()
			if (!email) {
				alert('이메일을 입력해주세요.');
				event.preventDefault();
				return;
			}
			if (regEmail.test(email) === false){
				alert('이메일을 정확하게 입력해주세요.')
				event.preventDefault();
				return;
			}
			$.ajax({
				url: '/register/identify/email/check',
				type: 'POST',
				data: {"email": email},
				success: function (data) {
					if (data == 'ok'){
						console.log(data)
						// 안내글 보여주기
						$description.html('<br>이메일 인증 링크를 <br /><strong>'+email+'</strong> 로 전송하였습니다. <br /><br />메일함을 확인해주세요.');
						// 기존 input은 숨기기
						$inputDiv.css('display', 'none');
						$enterSubmit.css('display', 'none');
						
					}
					if (data == "tokendouble"){
						// 안내글 보여주기
						$description.html('<br>이메일 인증 링크를 이미<br /><strong>'+email+'</strong> 로 전송하였습니다. <br /><br />메일함을 확인해주세요.');
						// 기존 input은 숨기기
						$inputDiv.css('display', 'none');
						$enterSubmit.css('display', 'none');
					}
					if (data == "emaildouble"){
						$(location).attr('href', '/register/identify/email/result')
					}
					
				}
			}); 
			event.preventDefault();
			return;
				
		}
	};
	_fn.init();
});