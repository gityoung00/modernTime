$().ready(function() {
	const $newPw = $("input[name='newPw']");
	const $newPwCheck = $("input[name='newPwCheck']");
	const $oldPw = $("input[name='oldPw']");
	const $submit = $("input[type='submit']");
	const regPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

	var _fn = {
		init: function() {
			$newPw.on('keyup', function(){
				_fn.checkPw();
			});
			$newPwCheck.on('keyup', function(){
				_fn.checkPwCheck();
			});
			$oldPw.on('keyup', function(){
				$oldPw.attr('class', 'pass');
			});
			$submit.hover(function(){
				$submit.css('cursor', 'pointer')
			}); 
			$submit.on('click', function(){
				_fn.onSubmit();
			});
		},
		checkPw: function() {
			var newPw = $newPw.val();
			var $caution = $newPw.next();
			// 아이디 체크: 영문자로 시작하는 영문자 또는 숫자 6~20자
		
			if (regPw.test(newPw)){
				$caution.css("display", "none");
				$newPw.attr('class', 'pass');
				return true;
				
			}else{
				$caution.css("display", "block");
				$newPw.attr('class', 'caution');
				return false;
			}

		},
		checkPwCheck: function() {
			var newPwCheck = $newPwCheck.val();
			var $caution = $newPwCheck.next();
			// 아이디 체크: 영문자로 시작하는 영문자 또는 숫자 6~20자
			if (newPwCheck && newPwCheck === $newPw.val()){
				$caution.css("display", "none");
				$newPwCheck.attr('class', 'pass');
				return true;
				
			}else{
				$caution.css("display", "block");
				$newPwCheck.attr('class', 'caution');
				return false;
			}

		},
		onSubmit: function(){
			const pwResult = _fn.checkPw();
			const pwCheckResult = _fn.checkPwCheck();
			if (pwResult && pwCheckResult){
				$.ajax({
					url: '/my/password',
					type: 'POST',
					data: {'oldPw': $oldPw.val(), 'newPw': $newPw.val()},
					success: function(data){
						if (data == "success"){
							alert("비밀번호 변경이 완료되었습니다.")
							location.href="/";
						} else {
							alert(data);
						}
					}
					
				});
			}
			
		}
		
	};
	_fn.init();
	
	
});
