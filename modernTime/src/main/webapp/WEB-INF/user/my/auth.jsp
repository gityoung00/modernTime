<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="ko">
<head>
<script type="text/javascript" async=""
	src="https://www.google-analytics.com/analytics.js"></script>
<script src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4"
	async=""></script>
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
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="naver-site-verification"
	content="7366738375e320e44bd1c743b364db13086a7b0e">
<meta name="color-scheme" content="dark light">
<link rel="shortcut icon" href="/favicon.ico">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image"
	content="https://everytime.kr/images/og_image.png">
<meta property="og:site_name" content="에브리타임">
<meta property="og:url" content="https://everytime.kr/auth">
<title>학교 인증 - 에브리타임</title>
<meta data-vue-meta="ssr" name="robots" content="noindex">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.navi.css"
	as="style">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.auth.css"
	as="style">
<link data-vue-meta="ssr" rel="stylesheet" href="/css/my/my.common.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.auth.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.navi.css">
<c:import url="../../common/loginRequired.jsp" />
</head>
<body>

	<div data-v-6b2a809a="">
		<c:import url="header.jsp" />
		<div data-v-6b2a809a="" class="container">
			<section data-v-6b2a809a="">
				<h1 data-v-6b2a809a="">인증 방식 선택</h1>
				<a data-v-6b2a809a="" href="/auth/freshman" class="menu"><h3
						data-v-6b2a809a="">합격자 인증</h3>
					<p data-v-6b2a809a="">
						새내기 게시판만 이용 가능하며,<br data-v-6b2a809a=""> 합격 증명 자료를 통해 인증
					</p></a> <a data-v-6b2a809a="" href="/auth/student" class="menu"><h3
						data-v-6b2a809a="">재학생 인증</h3>
					<p data-v-6b2a809a="">
						게시판, 캠퍼스픽 등 모든 커뮤니티 이용이 가능하며,<br data-v-6b2a809a=""> 재학 증명
						자료를 통해 인증
					</p></a> <a data-v-6b2a809a="" href="/auth/graduate" class="menu"><h3
						data-v-6b2a809a="">졸업생 인증</h3>
					<p data-v-6b2a809a="">
						게시판, 캠퍼스픽 등 모든 커뮤니티 이용이 가능하며,<br data-v-6b2a809a=""> 졸업 증명
						자료를 통해 인증
					</p></a>
			</section>
		</div>
		<c:import url="footer.jsp" />
	</div>
	<script id="__INITIAL_STATE__" type="application/json">{"apiServerUrl":"https://api.everytime.kr","appInfo":{"appName":"","appVersion":"","osName":"","osVersion":""},"campusData":{"schoolId":116,"campusId":405,"communityName":"경북대"},"isLogged":true,"pageName":"pages/auth/index","pageTitle":"학교 인증","authTypePath":"student"}</script>


</body>
</html>