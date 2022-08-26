<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="ko">
<head>
<title>판매하기 - 에브리타임 책방</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="naver-site-verification"
	content="b9d866b15d44c9243c600cc22295794f83391370">

<link rel="stylesheet" type="text/css" href="/assets/style.css">
<script async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/assets/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="/assets/underscore-min.js"></script>
<script type="text/javascript" src="/assets/common.js"></script>
<script type="text/javascript" src="/assets/canvas-to-blob.min.js"></script>
<script type="text/javascript" src="/assets/load-image.all.min.js"></script>
<script type="text/javascript" src="/assets/sell.js"></script>

</head>
<body>
	<header>
		<div id="title">
			<a href="/bookstore" class="logo"><img src="/assets/logo.png"
				alt="에브리타임 책방"></a>
		</div>


	</header>
	<form id="sell">
		<h1>판매하기</h1>
		<div class="group group-book">
			<h2>자세한 책 정보를 적어주세요.</h2>
			<input type="hidden" name="book-isbn" value="">
			<p>
				<input class="text" type="text" name="book-title" placeholder="책 이름"
					value="">
			</p>
			<p>
				<input class="text" type="text" name="book-author" placeholder="저자"
					value="">
			</p>
			<p>
				<input class="text" type="text" name="book-publisher"
					placeholder="출판사" value="">
			</p>
			<p>
				<input class="text" type="number" name="book-pubdate"
					placeholder="출판일 (ex. 20160101)" value="">
			</p>
			<p>
				<input class="text" type="number" name="book-price"
					placeholder="정가 (ex. 17000)" value="">
			</p>
			<hr>
			<p>
				<input class="button retry" type="button" value="다시 검색"><input
					class="button next disabled" type="button" value="다음">
			</p>
			<hr>
		</div>
	</form>


	<script type="text/javascript">
		bookstore.data.isAndroidAttachDisable = false;
		bookstore.data.s3 = {
			"key" : "a2755dee13d1ec7f93eea08b092c7613997597b587f22fef9aacc42810e5a85c",
			"provider" : {
				"X-amz-signature" : "c2b3e9f0da83f17552bc1b9b0cdb9cc0bfc43508ff976a1e53aba60446db67eb",
				"X-amz-algorithm" : "AWS4-HMAC-SHA256",
				"X-amz-credential" : "AKIA2ZLBHE2HOZNELLM5/20220818/ap-northeast-2/s3/aws4_request",
				"X-amz-date" : "20220818T070321Z",
				"X-amz-expires" : "86400",
				"policy" : "eyJleHBpcmF0aW9uIjoiMjAyMi0wOC0xOFQwODowMzoyMS4wMTRaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoiYm9va3N0b3JlLWl0ZW0taW1hZ2UifSx7ImFjbCI6InByaXZhdGUifSx7IngtYW16LWFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IngtYW16LWNyZWRlbnRpYWwiOiJBS0lBMlpMQkhFMkhPWk5FTExNNS8yMDIyMDgxOC9hcC1ub3J0aGVhc3QtMi9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWRhdGUiOiIyMDIyMDgxOFQwNzAzMjFaIn0seyJ4LWFtei1leHBpcmVzIjoiODY0MDAifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsImEyNzU1ZGVlMTNkMWVjN2Y5M2VlYTA4YjA5MmM3NjEzOTk3NTk3YjU4N2YyMmZlZjlhYWNjNDI4MTBlNWE4NWMiXSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtVHlwZSIsIiJdLFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMzE0NTcyODBdXX0=",
				"acl" : "private",
				"success_action_status" : "201",
				"bucket" : "bookstore-item-image",
				"region" : "ap-northeast-2"
			}
		}
	</script>
	<c:import url="footer.jsp" />
	<script type="text/javascript">
		bookstore.data.user = {
			id : "${sessionScope.id }",
			nickname : "${sessionScope.nickname }",
		};
	</script>
	<script type="text/javascript">
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script','https://www.google-analytics.com/analytics.js', 'ga');
		ga('create', 'UA-82918907-1', 'auto');
		ga('send', 'pageview');
	</script>



</body>
</html>