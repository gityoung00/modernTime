<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:import url="../common/loginRequired.jsp" />
<html lang="ko">
<head>
<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
<script src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4" async=""></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('config', 'UA-22022140-4');
</script>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
<meta name="color-scheme" content="dark light">
<link rel="shortcut icon" href="/favicon.ico">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image" content="https://everytime.kr/images/og_image.png">
<meta property="og:site_name" content="에브리타임">
<meta property="og:url" content="https://everytime.kr/my">
<title>내 정보 - 에브리타임</title>
<meta data-vue-meta="ssr" name="robots" content="noindex">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.navi.css" as="style">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.index.css" as="style">
<link data-vue-meta="ssr" rel="stylesheet" href="/css/my/my.common.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.index.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.navi.css">
<script src="/js/my/my.index.js"></script>

<link type="text/css" href="/css/common.css" rel="stylesheet">
<link type="text/css" href="/css/common.partial.css" rel="stylesheet">
<link type="text/css" href="/css/container.modal.css" rel="stylesheet">

<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/community.side.js"></script>
<script type="text/javascript" src="/js/admin/extensions.load-image.all.min.js"></script>


</head>
<body>


	<c:import url="header.jsp" />
	<div data-v-cd48e290="">
		<div data-v-cd48e290="" class="container">
			<section data-v-cd48e290="">
				<div data-v-cd48e290="" class="title">
					<h1 data-v-cd48e290="">내 정보</h1>
					<a data-v-cd48e290="" href="/logout" class="logout" onclick="logout();">로그아웃</a>

				</div>
				<div data-v-cd48e290="" class="profile">
					<img data-v-cd48e290="" src="https://cf-fpi.everytime.kr/0.png">
					<h3 data-v-cd48e290="">${id }</h3>
					<p data-v-cd48e290="">
						<span data-v-cd48e290="">${name }</span> / <span data-v-cd48e290="">${nickname }</span>
					</p>
					<p data-v-cd48e290="">
						<span data-v-cd48e290="">KG IT대학교</span>
					</p>
				</div>
			</section>
			<section data-v-cd48e290="">
				<h2 data-v-cd48e290="">이용 관리</h2>
				<a data-v-cd48e290="" href="/admin/notice" class="item">공지사항 관리</a> <a data-v-cd48e290="" href="/admin/lecture/regist" class="item">강의 관리</a>
			</section>
			<section data-v-cd48e290="">
				<h2 data-v-cd48e290="">계정 관리</h2>
				<a data-v-cd48e290="" href="/school/auth" class="item">학교 인증 관리</a>
			</section>
		</div>
		<c:import url="footer.jsp" />
	</div>
	<script id="__INITIAL_STATE__" type="application/json">{"apiServerUrl":"https://api.everytime.kr","appInfo":{"appName":"","appVersion":"","osName":"","osVersion":""},"campusData":{"schoolId":116,"campusId":405,"communityName":"경북대"},"isLogged":true,"pageName":"pages/my/index","pageTitle":"내 정보","requestUser":{"campusName":"경북대 대구캠","enterYear":2016,"name":"김지영","nickname":"이익며러언","picture":"https://cf-fpi.everytime.kr/0.png","userid":"jiyoung1329"}}</script>


</body>
</html>