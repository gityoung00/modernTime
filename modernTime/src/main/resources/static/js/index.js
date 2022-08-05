$().ready(function() {
	var $container = $('#container');
	
	var _fn = {
		init: function() {
			
		},
	};
	_fn.init();
	
});

function logout(){
	if (confirm('로그아웃 하시겠습니까?')){
		location.href="/logout";
	}
}