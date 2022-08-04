<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
<meta property="og:url" content="https://everytime.kr/my/nickname">
<title>닉네임 설정 - 모던타임</title>
<meta data-vue-meta="ssr" name="robots" content="noindex">
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.navi.css" as="style">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.nickname.css" as="style">
<link data-vue-meta="ssr" rel="stylesheet" href="/css/my/my.common.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.nickname.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.navi.css">
<script src="/js/my/my.nickname.js"></script>
</head>

<%--닉네임을 설정하면 30일간 변경할 수 없습니다. 변경하시겠습니까? --%>
<%-- 이미 등록된 닉네임입니다. --%>
<body>

	<div data-v-34dbaf39="">
		<c:import url="header.jsp" />
		<form data-v-34dbaf39="" class="container">
			<section data-v-34dbaf39="">
				<h1 data-v-34dbaf39="">닉네임 설정</h1>
				<div data-v-34dbaf39="" class="input">
					<div data-v-34dbaf39="" class="label">
						<label data-v-34dbaf39="">닉네임</label>
					</div>
					<input data-v-34dbaf39="" type="text" maxlength="10" placeholder="닉네임" autocomplete="off" name="nickname" class="">
					<!---->
				</div>
				<div data-v-34dbaf39="" class="rules">
					<p data-v-34dbaf39="">
						※ 닉네임을 설정하면 <span data-v-34dbaf39="" class="caution">30일간 변경할 수 없습니다.</span>
					</p>
				</div>
				<input data-v-34dbaf39="" type="submit" value="닉네임 설정">
			</section>
		</form>
		<c:import url="footer.jsp" />
	</div>
	<script id="__INITIAL_STATE__" type="application/json">{"apiServerUrl":"https://api.everytime.kr","appInfo":{"appName":"","appVersion":"","osName":"","osVersion":""},"campusData":{"schoolId":116,"campusId":405,"communityName":"경북대"},"isLogged":true,"pageName":"pages/my/nickname","pageTitle":"닉네임 설정","requestUser":{"nickname":"이익며러언"}}</script>


</body>
</html>