$().ready(function() {
	const $email = $("input[name='email']");
	const $pw = $("input[name='pw']");
	const $submit = $("input[type='submit']");
	
	var _fn = {
		init: function() {
			$email.on('keyup', function(){
				$email.attr('class', 'pass');
			});
			$pw.on('keyup', function(){
				$pw.attr('class', 'pass');
			});
			$submit.hover(function(){
				$submit.css('cursor', 'pointer')
			}); 
			$submit.on('click', function(){
				if (confirm('계정 분실, 개인정보 관련 고지 등에 사용되므로, 반드시 본인의 이메일을 입력해주세요. 변경하시겠습니까?')){
					$.ajax({
						url: '/my/email',
						type: 'POST',
						data: {'email': $email.val(), 'pw': $pw.val()},
						success: function(data){
							console.log(data);
							alert(data);
//							location.href="/";
							
						}
					});
				}
			});
		},
		
	};
	_fn.init();
	
	
});
