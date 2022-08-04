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
<meta property="og:url" content="https://everytime.kr/my/withdrawal">
<title>회원 탈퇴 - 모던타임</title>
<meta data-vue-meta="ssr" name="robots" content="noindex">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.navi.css" as="style">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.withdrawal.css" as="style">
<link data-vue-meta="ssr" rel="stylesheet" href="/css/my/my.common.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.withdrawal.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.navi.css">
</head>
<%-- 탈퇴 전 안내사항을 반드시 확인 후 진행해주세요. 탈퇴하시겠습니까? --%>
<body>

	<div data-v-75203738="">
		<c:import url="header.jsp" />
		<form data-v-75203738="" class="container">
			<section data-v-75203738="">
				<h1 data-v-75203738="">회원 탈퇴</h1>
				<div data-v-75203738="" class="input">
					<div data-v-75203738="" class="label">
						<label data-v-75203738="">계정 비밀번호</label>
					</div>
					<input data-v-75203738="" type="password" maxlength="20" placeholder="계정 비밀번호">
				</div>
				<div data-v-75203738="" class="rules">
					<!---->
					<p data-v-75203738="">
						※ 탈퇴 및 가입을 반복할 경우, 서비스 악용 방지를 위해 재가입이 제한됩니다. 최초 탈퇴 시에는 가입 시점을 기준으로 1일간 제한되며, 2회 이상 탈퇴를 반복할 경우 30일간 제한됩니다.<br data-v-75203738="">
						<!---->
					</p>
					<p data-v-75203738="">
						※ 탈퇴 후 개인 정보, 시간표 등의 데이터가 삭제되며, 복구할 수 없습니다.<br data-v-75203738=""> ※ 다시 가입하여도, 게시판 등 이용 제한 기록은 초기화되지 않습니다.<br data-v-75203738=""> ※ 작성한 게시물은
						삭제되지 않으며, (알수없음)으로 닉네임이 표시됩니다.<br data-v-75203738=""> ※ 자세한 내용은 개인정보처리방침을 확인해주세요.
					</p>
				</div>
				<input data-v-75203738="" type="submit" value="회원 탈퇴">
			</section>
		</form>
		<c:import url="footer.jsp" />
	</div>
	<script id="__INITIAL_STATE__" type="application/json">{"apiServerUrl":"https://api.everytime.kr","appInfo":{"appName":"","appVersion":"","osName":"","osVersion":""},"campusData":{"schoolId":116,"campusId":405,"communityName":"경북대"},"isLogged":true,"pageName":"pages/my/withdrawal","pageTitle":"회원 탈퇴"}</script>


</body>
</html>