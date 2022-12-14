<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html lang="ko">
<head>
<title>쪽지 보내기 - 에브리타임 책방</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="naver-site-verification" content="b9d866b15d44c9243c600cc22295794f83391370">

<link rel="stylesheet" type="text/css" href="/assets/style.css">
<script async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/assets/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="/assets/underscore-min.js"></script>
<script src="/webjars/sockjs-client/1.1.2/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/2.3.1/stomp.min.js"></script>
<script type="text/javascript" src="/assets/common.js"></script>
<script type="text/javascript">
		
bookstore.data.user = {
	id : '${sessionScope.id }',
	nickname : '${sessionScope.nickname }',
}
</script>
<script type="text/javascript" src="/assets/message.js"></script>

</head>
<body>
	<header>
		<div id="title">
			<a href="/bookstore" class="logo"><img src="/assets/logo.png" alt="에브리타임 책방"></a>
		</div>


		<div id="messagetext">
			<form>
				<input type="text" name="text" placeholder="보내실 쪽지 내용을 여기에 작성하세요!" autocomplete="off">
				<div class="sendbutton">
					<span class="icons send-darkgray-16"></span>
				</div>
			</form>
		</div>
	</header>
	<div id="messages">
	</div>
	<script type="text/javascript">
		bookstore.data.itemId = '';
		bookstore.data.boxId = 55084009;
	</script>
	<div id="bar">
		<nav class="trisection">
			<a href="/" class="home"><span class="icons home-darkgray-16"></span><span class="text">홈</span></a> <a href="/sell" class="sell"><span
				class="icons sell-darkgray-16"></span><span class="text">판매하기</span></a> <a href="/my" class="my"><span class="icons my-darkgray-16"></span><span
				class="text">마이페이지</span></a>
		</nav>
	</div>
	<div id="bottom">
		<ul class="links">
			<li class="copyright"><a href="https://everytime.kr">에브리타임</a></li>
			<li><a href="https://everytime.kr/page/faq">문의하기</a></li>
			<li><a href="https://everytime.kr/page/rules">커뮤니티이용규칙</a></li>
			<li><a href="https://everytime.kr/page/privacy">개인정보처리방침</a></li>
		</ul>

	</div>
	
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
		})(window, document, 'script',
				'https://www.google-analytics.com/analytics.js', 'ga');
		ga('create', 'UA-82918907-1', 'auto');
		ga('send', 'pageview');
	</script>



</body>
</html>