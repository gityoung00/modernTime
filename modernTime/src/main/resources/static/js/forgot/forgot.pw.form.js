$().ready(function() {
	var $container = $('#container');
	var $formId = $container.find('input[name="id"]');
	var $formPw = $container.find('input[name="pw"]');
	var $formPwCheck = $container.find('input[name="pwCheck"]');
	var $formSubmit = $container.find('input[type="submit"]');
	const regPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

	var _fn = {
		init: function() {
			if (!$formId.val()){
				alert('다시 시도해주세요.');
				location.href="/expired";
			}
			
			$formPw.on('change', function() {
				_fn.checkPw();

			});
			$formPwCheck.on('change', function() {
				_fn.checkPwCheck();

			});
		
			$container.on('submit', function(event) {
				_fn.onSubmit(event);
				event.preventDefault();
				return;
			});
		},
		checkPw: function() {
			var pw = $formPw.val();
			var $label = $formPw.next().find('label');
			// 아이디 체크: 영문자로 시작하는 영문자 또는 숫자 6~20자
			if (regPw.test(pw)){
				$label.css("display", "none");
				$formPw.attr('class', 'pass');
				return true;
				
			}else{
				$label.css("display", "block");
				$formPw.attr('class', 'caution');
				return false;
			}

		},
		checkPwCheck: function() {
			var pwCheck = $formPwCheck.val();
			var $label = $formPwCheck.next().find('label');
			// 아이디 체크: 영문자로 시작하는 영문자 또는 숫자 6~20자
			if (pwCheck && pwCheck === $formPw.val()){
				$label.css("display", "none");
				$formPwCheck.attr('class', 'pass');
				return true;
				
			}else{
				$label.css("display", "block");
				$formPwCheck.attr('class', 'caution');
				return false;
			}

		},
		onSubmit: function(event) {
			// 비밀번호 체크
			const pwResult = _fn.checkPw();
			
			// 비밀번호 확인
			const pwcheckResult = _fn.checkPwCheck();
			

			// 폼 체크시 모두 정상일때			
			if (pwResult && pwcheckResult){
				
				$.ajax({
				url: '/forgot/password/form',
				type: 'POST',
				data: {"id": $formId.val(), "pw": $formPw.val()},
				success: function (data) {
					console.log(data);		
					if (data == "success"){
						alert("비밀번호 변경이 완료되었습니다.");
						location.href="/login";
					}else {
						alert(data);
					}
				}
			}); 
				
				
			}
			
			console.log("submit")
			event.preventDefault();
			return;
		}
	};
	_fn.init();

});
