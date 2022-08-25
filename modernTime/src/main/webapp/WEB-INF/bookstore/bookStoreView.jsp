<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="ko">
<head>
<title>${bookstoreview.title }</title>
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
<script type="text/javascript" src="/assets/view.js"></script>

<input type="hidden" id="_w_simile" data-inspect-config="3">
<script type="text/javascript"
	src="chrome-extension://dbjbempljhcmhlfpfacalomonjpalpko/scripts/inspector.js"></script>
</head>
<body>
	<header>
		<div id="title">
			<a href="/bookstore" class="logo"><img src="/assets/logo.png"
				alt="에브리타임 책방"></a>
		</div>


	</header>
	<article id="item">
		<div class="group group-book">
			<h1>${bookstoreview.title }</h1>
			<dl>
				<dt>저자</dt>
				<dd>${bookstoreview.author }</dd>
				<dt>출판사</dt>
				<dd>${bookstoreview.publisher }</dd>
				<dt>출판일</dt>
				<dd>${bookstoreview.publication_date }</dd>
			</dl>
			<p class="price">
				<span class="selling">${bookstoreview.viewP }원</span>
			</p>
		</div>
		<div class="group group-item">
			
			<c:choose>
				<c:when test="${bookstoreview.is_sold==1 }">
					<time>${bookstoreview.create_date }</time>
					<p class="soldout">이 책은 판매가 완료되었습니다.</p>
				</c:when>
				<c:when test="${sessionScpoe.id } == ${ bookstoreview.id}">
					<p class="comment">${bookstoreview.comment }</p>
					<time>${bookstoreview.create_date }</time>
					<p class="buttons">
						<a class="red soldout"> <span class="icons soldout-white-16"></span>
							<span class="text">판매 완료하기</span>
						</a> <a class="white price"> <span class="icons price-gray-16"></span>
							<span class="text">가격 수정</span>
						</a> <a class="white edit"> <span class="icons edit-gray-16"></span>
							<span class="text">설명 수정</span>
						</a>
					</p>
				</c:when>
				<c:otherwise>
					<p class="comment">${bookstoreview.comment }</p>
					<time>${bookstoreview.create_date }</time>
					<p class="buttons">
					<!-- 확인 후 삭제 -->
					<a class="red soldout"> <span class="icons soldout-white-16"></span>
							<span class="text">판매 완료하기</span>
						</a> <a class="white price"> <span class="icons price-gray-16"></span>
							<span class="text">가격 수정</span>
						</a> <a class="white edit"> <span class="icons edit-gray-16"></span>
							<span class="text">설명 수정</span>
						</a>
						<!--  -->
						<a class="red message" href="#"> <span
							class="icons message-white-16"></span> <span class="text">판매자에게
								쪽지 보내기</span>
						</a>
					</p>
				</c:otherwise>
			</c:choose>
		</div>
		<c:if test="${!empty pictureUrl }">
			<div class="group group-status">
				<div class="images">
					<div class="wrap" style="width: 260px">
						<c:forEach items="${pictureUrl }" var="url">
							<div class="image"
								style="background-image: url('${url}');"></div>
						</c:forEach>
						<hr>
					</div>
				</div>
			</div>
		</c:if>
		<div class="group group-means">
			<h2>거래 수단</h2>
			<dl>
				<dt>택배</dt>
				<dd>
					<ul>
						<li class="checked">가능</li>
						<li>불가</li>
						<hr>
					</ul>
				</dd>
			</dl>
			<hr>
		</div>
	</article>
	<script type="text/javascript">
		// 		bookstore.data.item = {
		// 			id : 'aa3d248aee42d5',
		// 			soldout : 0,
		// 			status_note : '1010',
		// 			status_damage : '1111',
		// 			price : 13000,
		// 			means_delivery : 1,
		// 			means_direct : 0,
		// 			comment : '택배비 포함 가격입니다!',
		// 			created_at : '2022-08-18 10:44:45',
		// 			book : {
		// 				id : 188669,
		// 				isbn : '9791130333403',
		// 				title : '상법총칙 상행위법(7판)(양장본 HardCover)',
		// 				author : '안강현',
		// 				publisher : '박영사',
		// 				pubdate : '2019-01-30',
		// 				price : 29000
		// 			},
		// 			is_mine : false,
		// 			cover_image : 'https://cf-cii.everytime.kr/87f0e34ba8cda30edf211a49197038152e0ab5d7bc9cb18209d9398e6f0bf478/1660787051115_0.jpg',
		// 			images : [ "https://cf-cii.everytime.kr/87f0e34ba8cda30edf211a49197038152e0ab5d7bc9cb18209d9398e6f0bf478/1660787055433_1.jpg" ]
		// 		};
	</script>
	<div id="bar">
		<nav class="trisection">
			<a href="/admin" class="home"><span
				class="icons home-darkgray-16"></span><span class="text">홈</span></a> <a
				href="/sell" class="sell"><span class="icons sell-darkgray-16"></span><span
				class="text">판매하기</span></a> <a href="/myBook" class="my"><span
				class="icons my-darkgray-16"></span><span class="text">마이페이지</span></a>
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
<!-- 	<div class="popup popup-price"
		style="margin-left: -200px; margin-top: -83.5px; display: none;">
		<h2>가격 수정</h2>
		<input class="textfield" type="number" placeholder="(단위: 원)"><input
			class="button submit" type="button" value="저장"><input
			class="button close" type="button" value="취소">
	</div>
	<div class="popup popup-edit"
		style="margin-left: -200px; margin-top: -115.5px; display: none;">
		<h2>설명 수정</h2>
		<textarea placeholder="(500자 이내)"></textarea>
		<input class="button submit" type="button" value="저장"><input
			class="button close" type="button" value="취소">
	</div> -->
	<!-- 	<script type="text/javascript">
		bookstore.data.user = {
			id : 937760,
			nickname : 'Minesia',
			school_id : 7,
			campus_id : 11,
			campus_full_name : '광운대',
			campus_latitude : 37.61932,
			campus_longitude : 127.058338
		};
		bookstore.data.campuses = [ {
			id : 11,
			full_name : '광운대'
		} ];
	</script> -->
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