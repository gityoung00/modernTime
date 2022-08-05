$().ready(function() {
	const $pw = $("input[name='pw']");
	const $submit = $("input[type='submit']");

	var _fn = {
		init: function() {
			$pw.on('keyup', function(){
				$pw.attr('class', 'pass');
			});
			$submit.hover(function(){
				$submit.css('cursor', 'pointer')
			}); 
			$submit.on('click', function(){
				_fn.onSubmit();
			});
		},
		onSubmit: function(){
			if (confirm("탈퇴 전 안내사항을 반드시 확인 후 진행해주세요. 탈퇴하시겠습니까?")){
				$.ajax({
					url: '/my/withdrawal',
					type: 'POST',
					data: { 'pw': $pw.val() },
					success: function(data){
						if (data == "success"){
							alert("회원탈퇴가 완료되었습니다.")
							location.href="/login";
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
