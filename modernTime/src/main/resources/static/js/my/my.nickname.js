$().ready(function() {
	const $nickname = $("input[name='nickname']");
	const $submit = $("input[type='submit']");
	
	var _fn = {
		init: function() {
			$nickname.on('keyup', function(){
				$nickname.attr('class', 'pass');
			});
			$submit.hover(function(){
				$submit.css('cursor', 'pointer')
			}); 
			$submit.on('click', function(){
				if (confirm('닉네임을 설정하면 30일간 변경할 수 없습니다. 변경하시겠습니까?')){
					$.ajax({
						url: '/my/nickname',
						type: 'POST',
						data: {'nickname': $nickname.val()},
						success: function(data){
							console.log(data);
							if (data == "success"){
								alert("닉네임 변경이 완료되었습니다.")
								location.reload();
							} else {
								alert(data);
							}
							
						}
					});
				}
			});
		},
		
	};
	_fn.init();
	
	
});
