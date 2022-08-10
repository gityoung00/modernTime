$().ready(function() {
	const $picture = $("input[name='picture']");
	const $submit = $("input[type='submit']");
	const $form = $("#certificationForm");
	
	var _fn = {
		init: function() {
			console.log($picture[0])
			$submit.hover(function(){
				$submit.css('cursor', 'pointer')
			}); 
			$submit.on('click', function(event){
				event.preventDefault();  
				console.log($form)
				console.log($form[0])
				const data = new FormData($form[0]);
				console.log(data)
				
				$.ajax({
					url: location.href,
					enctype: 'multipart/form-data',
					processData: false,    
				 	contentType: false,
					type: 'POST',
					data: data,
					success: function(data){
						console.log(data);
						if (data == "success"){
							alert("증명 제출을 완료하였습니다. 관리자가 검토 후 학교 인증을 완료할 예정입니다. 약 3~5일 정도가 소요될 예정이니 잠시만 기다려주세요.")
							location.href="/";
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
