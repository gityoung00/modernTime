<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script>
const urlParams = new URL(location.href).searchParams;

const id = urlParams.get('id');

console.log(id)
var id2 = id;
console.log(id2)
</script>



<html lang="ko">
<head>
<title>에브리타임</title>
<meta charset="UTF-8">
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

		<form method="post" action="lecturewrite">
			<div class="section">
				<div class="mypoint"></div>
				<td><h2>내 강의평</h2> <input type="submit" value="강의평 쓰기">
				<td>
					<table>
						<tr>
							<th>실습</th>
							<td><select name="practice">
									<option value="많음">많음</option>
									<option value="보통">보통</option>
									<option value="없음">없음</option>

							</select></td>
						</tr>
						<tr>
							<th>프로젝트</th>
							<td><select name="project"><option value="많음">많음</option>
									<option value="보통">보통</option>
									<option value="없음">없음</option></select></td>
						</tr>
						<tr>
							<th>성적</th>
							<td><select name="grade"><option value="너그러움">너그러움</option>
									<option value="보통">보통</option>
									<option value="깐깐함">깐깐함</option></select></td>
						</tr>
						<tr>
							<th>출결</th>
							<td><select name="attend"><option value="혼용">혼용</option>
									<option value="직접호명">직접호명</option>
									<option value="지정좌석">지정좌석</option>
									<option value="전자출결">전자출결</option>
									<option value="반영안함">반영안함</option></select></td>
						</tr>
						<tr>
							<th>시험횟수</th>
							<td><select name="exam"><option value="없음">없음</option>
									<option value="한번">한번</option>
									<option value="두번">두번</option>
									<option value="세번">세번</option>
									<option value="도망쳐">도망쳐</option></select></td>
						</tr>
						<tr>
							<th>총평</th>
							<td><select name="score"><option value="5">5</option>
									<option value="4.5">4.5</option>
									<option value="4">4</option>
									<option value="3.5">3.5</option>
									<option value="3">3</option>
									<option value="2.5">2.5</option>
									<option value="2">2</option>
									<option value="1.5">1.5</option>
									<option value="1">1</option>
									<option value="0.5">0.5</option>
									<option value="0">0</option></select></td>
						</tr>
						<tr>
							<th>수강학기</th>
							<td><select name="listen_date">
									<option value="2022년1학기">2022년1학기</option>
									<option value="2022학기2학기">2022학기2학기</option>
									<option value="2023년1학기">2023년1학기</option>
									<option value="2023년2학기">2023년2학기</option>
									<option value="2024년1학기">2024년1학기</option>
							</select></td>
						</tr>
						<tr>
							<th>강의평</th>
							<th><textarea rows="8" cols="85" name="comment"
									placeholder="강의평"></textarea></th>
						</tr>

					</table>
			</div>
		</form>
		<!-- 		<div class="section"> -->
		<!-- 			<h2>최근 강의평</h2> -->
		<!-- 			<div class="articles" data-campus-id="0"> -->
		<!-- 				<a class="article" href="/lecture/view/520735"><h3>실용한자 : -->
		<!-- 						이혁</h3> -->
		<!-- 					<p class="rate"> -->
		<!-- 						<span class="star"><span class="on" style="width: 100%;"></span></span> -->
		<!-- 					</p> -->
		<!-- 					<p class="info"> -->
		<!-- 					<div class="loading" style="display: none;"></div> -->
		<!-- 			</div> -->
		<!-- 		</div> -->
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