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
<meta property="og:site_name" content="모던타임">
<meta property="og:url" content="https://everytime.kr/my/password">
<title>비밀번호 변경 - 모던타임</title>
<meta data-vue-meta="ssr" name="robots" content="noindex">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.navi.css" as="style">
<link data-vue-meta="ssr" rel="preload" href="/css/my/my.password.css" as="style">
<link data-vue-meta="ssr" rel="stylesheet" href="/css/my/my.common.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.password.css">
<link rel="stylesheet" type="text/css" href="/css/my/my.navi.css">
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script src="/js/my/my.password.js"></script>
</head>
<body>

	<div data-v-3e962932="">
		<c:import url="header.jsp" />
		<form data-v-3e962932="" class="container" onSubmit="return false;">
			<section data-v-3e962932="">
				<h1 data-v-3e962932="">비밀번호 변경</h1>
				<div data-v-3e962932="" class="input">
					<div data-v-3e962932="" class="label">
						<label data-v-3e962932="">새 비밀번호</label>
						<p data-v-3e962932="">영문, 숫자가 조합된 8~20자</p>
					</div>
					<input data-v-3e962932="" name="newPw" type="password" maxlength="20" placeholder="새 비밀번호" class="">
					<div data-v-3e962932="" class="caution" style="display:none;">영문, 숫자가 조합된 8자~20자 비밀번호를 입력하세요</div>
					<!---->
					<input data-v-3e962932="" name="newPwCheck" type="password" maxlength="20" placeholder="새 비밀번호 확인" class="">
					<div data-v-3e962932="" class="caution" style="display:none;">비밀번호가 일치하지 않습니다</div>
					<!---->
				</div>
				<div data-v-3e962932="" class="input">
					<div data-v-3e962932="" class="label">
						<label data-v-3e962932="">현재 비밀번호</label>
					</div>
					<input data-v-3e962932="" name="oldPw" type="password" maxlength="20" placeholder="현재 비밀번호" class="">
				</div>
				<div data-v-3e962932="" class="rules">
					<p data-v-3e962932="">
						<strong data-v-3e962932="">※ 혹시 타인에게 계정을 양도하려고 하시나요?</strong><br data-v-3e962932=""> 모던타임 이용약관에서는 타인에게 계정 판매, 양도 및 대여 등을 엄격하게 금지하고 있습니다.<br
							data-v-3e962932=""> 모니터링 시스템에 의해 계정 양도가 적발될 경우 해당 계정은 영구 정지, 탈퇴 등의 조치가 가해지며, 계정 양도로 인해 사기, 불법 행위가 발생할 경우 관련법에 따라 <span data-v-3e962932=""
							class="caution">법적 책임을 지게 될 수 있습니다.</span>
					</p>
					<p data-v-3e962932="">
						<strong data-v-3e962932="">※ 타인에 의한 계정 사용이 의심되시나요?</strong><br data-v-3e962932=""> 개인정보 보호를 위해 비밀번호를 변경하여 주시기 바랍니다. 비밀번호를 변경하면 <span
							data-v-3e962932="" class="caution">모든 디바이스(앱, 브라우저 등)에서 즉시 로그아웃 처리됩니다.</span>
					</p>
				</div>
				<input data-v-3e962932="" type="submit" value="비밀번호 변경">
			</section>
		</form>
		<c:import url="footer.jsp" />
	</div>
	<script id="__INITIAL_STATE__" type="application/json">{"apiServerUrl":"https://api.everytime.kr","appInfo":{"appName":"","appVersion":"","osName":"","osVersion":""},"campusData":{"schoolId":116,"campusId":405,"communityName":"경북대"},"isLogged":true,"pageName":"pages/my/password","pageTitle":"비밀번호 변경"}</script>


</body>
</html>