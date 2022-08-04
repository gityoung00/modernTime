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
				
			});
		},
		
	};
	_fn.init();
	
	
});
