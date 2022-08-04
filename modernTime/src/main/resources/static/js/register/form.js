$().ready(function() {
	var $container = $('#container');
	var $formEmail = $container.find('input[name="email"]');
	var $formId = $container.find('input[name="id"]');
	var $formPw = $container.find('input[name="pw"]');
	var $formPwCheck = $container.find('input[name="pwCheck"]');
	var $formName = $container.find('input[name="name"]');
	var $formNickname = $container.find('input[name="nickname"]');
	var $formSubmit = $container.find('input[type="submit"]');
	const regId = /^[a-z]+[a-z0-9]{5,19}$/;
	const regPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

	var _fn = {
		init: function() {
			if (!$formEmail.val()){
				alert('유효하지 않은 접근입니다.');
				location.href="/login";
			}

			$formId.on('change', function() {
				_fn.checkId();

			});
			$formPw.on('change', function() {
				_fn.checkPw();

			});
			$formPwCheck.on('change', function() {
				_fn.checkPwCheck();

			});
			$formName.on('change', function() {
				_fn.checkName();

			});
			$formNickname.on('change', function() {
				_fn.checkNickname();

			});
		
			$container.on('submit', function(event) {
				console.log("tset")
				_fn.onSubmit(event);
				event.preventDefault();
				return;
			});
		},
		checkId: function() {
			var id = $formId.val();
			var $label = $formId.next().find('label');
			// 아이디 체크: 영문자로 시작하는 영문자 또는 숫자 6~20자
			if (regId.test(id)){
				$label.css("display", "none");
				$formId.attr('class', 'pass');
				return true;
				
			}else{
				$label.css("display", "block");
				$formId.attr('class', 'caution');
				return false;
			}

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
		checkName: function() {
			var name = $formName.val();
			var $label = $formName.next().find('label');
			// 아이디 체크: 영문자로 시작하는 영문자 또는 숫자 6~20자
			if (name){
				$label.css("display", "none");
				$formName.attr('class', 'pass');
				return true;
				
			}else{
				$label.css("display", "block");
				$formName.attr('class', 'caution');
				return false;
			}

		},
		checkNickname: function() {
			var nickname = $formNickname.val();
			var $label = $formNickname.next().find('label');
			// 아이디 체크: 영문자로 시작하는 영문자 또는 숫자 6~20자
			if (nickname){
				$label.css("display", "none");
				$formNickname.attr('class', 'pass');
				return true;
				
			}else{
				$label.css("display", "block");
				$formNickname.attr('class', 'caution');
				return false;
			}

		},
		onSubmit: function(event) {
			// 아이디 체크
			const idResult = _fn.checkId();
			// 비밀번호 체크
			const pwResult = _fn.checkPw();
			
			// 비밀번호 확인
			const pwcheckResult = _fn.checkPwCheck();
			
			// 이름 체크
			const nameResult = _fn.checkName();
			
			// 닉네임 체크
			const nicknameResult = _fn.checkNickname();

			// 폼 체크시 모두 정상일때			
			console.log(idResult, pwResult, pwcheckResult, nameResult, nicknameResult)
			if (idResult && pwResult && pwcheckResult && nameResult && nicknameResult){
				// 아이디 중복 체크
				$.ajax({
				url: '/register/form/doublecheck',
				type: 'GET',
				data: {"id": $formId.val(), "nickname": $formNickname.val()},
				success: function (data) {
					console.log(data);		
					if (data == "ok"){
						const formData = {
							'email': $formEmail.val(),
							'id': $formId.val(),
							'pw': $formPw.val(),
							'name': $formName.val(),
							'nickname': $formNickname.val(),
							
						}
						// 회원가입
						$.ajax({
							url: '/register/form',
							type: 'POST',
							data: JSON.stringify(formData),
							contentType: "application/json; charset=UTF-8",
							success: function(data){
								console.log(data)
								alert(data);
								location.href = '/login';
							}
						});
						
						
//						alert('회원가입을 축하드립니다.');
						
					} else if (data == "id"){
						alert('이미 존재하는 아이디입니다. 다시 입력해 주세요.');
						$formId.focus();
						$formId.next().find('label').attr('class', 'causion');
						
					} else if (data == "nickname"){
						alert('이미 존재하는 닉네임입니다. 다시 입력해 주세요.');
						$formNickname.focus();
						$formId.next().find('label').attr('class', 'pass');
						$formNickname.next().find('label').attr('class', 'causion');
						
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
