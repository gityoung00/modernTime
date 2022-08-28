<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="ko">
<head>
<title>에브리타임</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image"
	content="https://everytime.kr/images/og_image.png">
<meta property="og:url" content="https://everytime.kr/lecture">
<meta property="og:site_name" content="에브리타임">
<meta property="og:title" content="에브리타임">
<meta property="og:description"
	content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
<meta name="description"
	content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
<meta name="keywords"
	content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
<meta name="naver-site-verification"
	content="7366738375e320e44bd1c743b364db13086a7b0e">
<meta name="robots" content="noindex">
<link type="text/css" href="/css/common.css" rel="stylesheet">
<link type="text/css" href="/css/common.partial.css" rel="stylesheet">
<link type="text/css" href="/css/container.lectureindex.css"
	rel="stylesheet">
<link href="/favicon.ico" rel="shortcut icon">
<!--[if lt IE 9]>
  <script src="/js/extensions.html5shiv.js"></script>
  <script src="/js/extensions.respond.min.js"></script>
  <script src="/js/extensions.excanvas.min.js"></script>
  <![endif]-->
<!--[if lt IE 8]>
  <script src="/js/extensions.json3.min.js"></script>
  <![endif]-->
<script type="text/javascript" async=""
	src="https://www.google-analytics.com/analytics.js"></script>
<!-- <script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script> -->
<!-- <script type="text/javascript" src="/js/extensions.underscore-min.js"></script> -->
<!-- <script type="text/javascript" src="/js/common.js"></script> -->
<!-- <script type="text/javascript" src="/js/lecture.index.js"></script> -->
</head>
<body style="">

	<div id="container" class="lectureindex">
		<aside class="none">
			<div class="title">
				<a class="hamburger"></a>
				<h1>강의평가</h1>
			</div>
		</aside>

		<form method="post" action="sinfowrite">
			<div class="section">
				<div class="mypoint"></div>
				<td><h2>시험 정보</h2> <input type="submit" value="시험정보 작성">
				<td>
					<table>
							<tr>
							<th>문제 유형</th>
							<td><select name="type">
									<option value="객관식">객관식</option>
									<option value="주관식">주관식</option>
									<option value="T/F형">T/F형</option>
									<option value="약술형">약술형</option>
									<option value="논술형">논술형</option>
									<option value="구술">구술</option>
									<option value="기타">기타</option>
							</select></td>
						</tr>
						<tr>
							<th>시험 전략</th>
							<th><textarea rows="8" cols="85" name="strategy"
									placeholder="시험전략 작성"></textarea></th>
						</tr>
				
						<tr>
							<th>문제 예시</th>
							<th><textarea rows="8" cols="85" name="listen_date"
									placeholder="문제예시 작성"></textarea></th>
						</tr>

					</table>
			</div>
		</form>
		<div class="section">
			<h2>최근 강의평</h2>
			<div class="articles" data-campus-id="0">
				<a class="article" href="/lecture/view/520735"><h3>실용한자 :
						이혁</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
					<div class="loading" style="display: none;"></div>
			</div>
		</div>
	</div>
	<div id="bottom">
		<ul class="links">
			<li><a href="/page/serviceagreement">이용약관</a></li>
			<li class="privacy"><a href="/page/privacy">개인정보처리방침</a></li>
			<li><a href="/page/rules">커뮤니티이용규칙</a></li>
			<li><a href="/notice">공지사항</a></li>
			<li><a href="/page/faq">문의하기</a></li>
			<li class="copyright"><a href="/">© 에브리타임</a></li>
		</ul>
	</div>
	<script type="text/javascript">
		var _serverTime = 1660126168920;
		var _clientTime = new Date().getTime();
		var _diffTime = _clientTime - _serverTime;
		var _apiServerUrl = 'https://api.everytime.kr';
	</script>
	<script async=""
		src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'UA-22022140-4');
	</script>

</body>
</html>