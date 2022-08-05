	var req;
	function printMsg() {
		var msg = document.getElementById('msg');
		msg.innerHTML = req.responseText;
	}
	function noticeWrite() {
		var f = document.getElementById('f');
		f.submit;
		req = new XMLHttpRequest();
		req.onreadystatechange = printMsg;
		req.open('post', 'notice2');
		req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		var title = document.getElementById('title').value;
		var content = document.getElementById('text').value;
		var data = {
			title : title,
			content : content
		};
		data = JSON.stringify(data);
		req.send(data);
	}
