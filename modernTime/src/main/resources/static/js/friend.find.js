


























































if (!_gfn) var _gfn = {};
_gfn = _.extend(_gfn, {
	requestFriend: function (params) {
		$.ajax({
			url: _apiServerUrl + '/save/friend/request',
			xhrFields: {withCredentials: true},
			type: 'POST',
			data: params,
			success: function (data) {
				var response = $('response', data).text();
				if (response === '1') {
					alert('친구 요청을 보냈습니다.\n상대방이 수락하면 친구가 맺어집니다.');
				} else if (response === '-1') {
					alert('올바르지 않은 상대입니다.');
				} else if (response === '-2') {
					alert('이미 친구인 상대입니다.');
				} else if (response === '-3') {
					alert('이미 친구 요청을 보낸 상대입니다.\n상대방이 수락하면 친구가 맺어집니다.');
				} else {
					alert('친구 요청을 할 수 없습니다.');
				}
			}
		});
	},
	removeFriend: function (identifier) {
		if (!identifier || !confirm('친구를 삭제하시겠습니까?')) {
			return false;
		}
		$.ajax({
			url: _apiServerUrl + '/remove/friend',
			xhrFields: {withCredentials: true},
			type: 'POST',
			data: {
				identifier: identifier
			},
			async: false,
			success: function (data) {
				alert('친구를 삭제하였습니다.');
				location.reload();
			}
		});
	}
});

$().ready(function () {
	var $container = $('#container');

	$container.on('submit', '#friendRequest', function () {
		var userid = $(this).find('input[name="userid"]').val();
		if (!userid) {
			alert('아이디 혹은 이메일을 입력하세요!');
			return false;
		}
		if (confirm('친구 요청을 하시겠습니까?\n(상대방에게 내 이름이 공개됩니다.)')) {
			_gfn.requestFriend({
				data: userid
			});
		}
		return false;
	});

	$container.on('click', '#friendRequestButton', function () {
		_gfn.requestFriend({
			identifier: $(this).data('identifier')
		});
	});

	$container.on('click', '#friendRemove', function () {
		_gfn.removeFriend($(this).data('identifier'));
	});
});
