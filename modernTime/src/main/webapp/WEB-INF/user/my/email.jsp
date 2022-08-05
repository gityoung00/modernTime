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
<meta property="og:url" content="https://everytime.kr/my/email">
<title>이메일 변경 - 모던타임</title>
<meta data-vue-meta="ssr" name="robots" content="noindex">
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.navi.css" as="style">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.email.css" as="style">
<link data-vue-meta="ssr" rel="stylesheet" href="/css/my/my.common.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.email.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.navi.css">
<script src="/js/my/my.email.js"></script>
<c:import url="../../common/loginRequired.jsp" />
</head>
<body>

	<div data-v-bdf4e790="">
		<c:import url="header.jsp" />
		<form data-v-bdf4e790="" class="container" onSubmit="return false;">
			<section data-v-bdf4e790="">
				<h1 data-v-bdf4e790="">이메일 변경</h1>
				<div data-v-bdf4e790="" class="input">
					<div data-v-bdf4e790="" class="label">
						<label data-v-bdf4e790="">이메일</label>
					</div>
					<input data-v-bdf4e790="" type="email" name="email" maxlength="255" placeholder="이메일" autocomplete="off" value="${sessionScope.email }">
					<!---->
				</div>
				<div data-v-bdf4e790="" class="input">
					<div data-v-bdf4e790="" class="label">
						<label data-v-bdf4e790="">계정 비밀번호</label>
					</div>
					<input data-v-bdf4e790="" type="password" name="pw" maxlength="20" placeholder="계정 비밀번호" class="">
				</div>
				<div data-v-bdf4e790="" class="rules">
					<p data-v-bdf4e790="">
						※ 반드시 본인의 이메일을 입력해주세요.<br data-v-bdf4e790=""> ※ 계정 분실 시 아이디/비밀번호 찾기, 개인정보 관련 주요 고지사항 안내 등에 사용됩니다.
					</p>
				</div>
				<input data-v-bdf4e790="" type="submit" value="이메일 변경">
			</section>
		</form>
		<c:import url="footer.jsp" />
	</div>
	<script id="__INITIAL_STATE__" type="application/json">{"apiServerUrl":"https://api.everytime.kr","appInfo":{"appName":"","appVersion":"","osName":"","osVersion":""},"campusData":{"schoolId":116,"campusId":405,"communityName":"경북대"},"isLogged":true,"pageName":"pages/my/email","pageTitle":"이메일 변경","requestUser":{"email":"jiyoung1329@naver.com"}}</script>


</body>
</html>