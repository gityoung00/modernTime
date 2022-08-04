$().ready(function() {
	const $nickname = $("input[name='nickname']");
	const $submit = $("input[type='submit']");
	
	var _fn = {
		init: function() {
			$nickname.on('keyup', function(){
				$nickname.attr('class', 'pass');
			});
			$
		},
		
	};
	_fn.init();
	
	
});
