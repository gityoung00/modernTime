<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko">
<head>
<title>에브리타임</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image" content="https://everytime.kr/images/og_image.png">
<meta property="og:url" content="https://everytime.kr/lecture">
<meta property="og:site_name" content="에브리타임">
<meta property="og:title" content="에브리타임">
<meta property="og:description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
<meta name="description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
<meta name="keywords"
	content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
<meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
<meta name="robots" content="noindex">
<link type="text/css" href="/css/common.css" rel="stylesheet">
<link type="text/css" href="/css/common.partial.css" rel="stylesheet">
<link type="text/css" href="/css/container.lectureview.css" rel="stylesheet">
<link href="/favicon.ico" rel="shortcut icon">
<!--[if lt IE 9]>
  <script src="/js/extensions.html5shiv.js"></script>
  <script src="/js/extensions.respond.min.js"></script>
  <script src="/js/extensions.excanvas.min.js"></script>
  <![endif]-->
<!--[if lt IE 8]>
  <script src="/js/extensions.json3.min.js"></script>
  <![endif]-->
<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/lecture.view.js"></script>
</head>
<body style="">

	<nav>
		<div class="wrap">
			<div id="logo">
				<a href="/"><img src="/images/new/nav.logo.png"></a>
				<p>
					<span class="name multiple">에브리타임</span><span class="subname">경북대</span>
				</p>
			</div>
			<div id="account">
				<a href="/message" title="쪽지함" class="icon message">쪽지함</a> <a href="/my" title="내 정보" class="icon my">내 정보</a> <input type="hidden" id="userUserid"
					value="jiyoung1329"> <input type="hidden" id="userSchool" value="116"> <input type="hidden" id="userCampus" value="405">
			</div>
			<ul id="menu">
				<li><a href="/">게시판</a></li>
				<li><a href="/timetable">시간표</a></li>
				<li class="active"><a href="/lecture">강의평가</a></li>
				<li><a href="/calculator">학점계산기</a></li>
				<li><a href="/friend">친구</a></li>
				<li><a href="https://bookstore.everytime.kr/">책방</a></li>
				<li><a href="https://www.campuspick.com/">캠퍼스픽</a></li>
			</ul>
		</div>
	</nav>
	<div id="container" class="lectureview">

		<div class="tab">
		</div>
		<div class="side">
		<h2>강의평</h2>
		<!-- 강의정보  -->
			<div class="side head"> 
			<h2>정보</h2>
			<p>
			<label>전공</label><span>뭔가텍스트</span>
			</p>
			<p><label>교수명</label><span>프로페서</span></p>
			<hr>
			</div>
			<div class="side article">
			<a class="writebutton">강의평 쓰기</a>
				<div class="rating">
					<div class="rate">
					<span>
					<span class="value">레이트밸류</span>
						<span class ="star"><span class="on" width="70%"></span></span>
					</span>
					<hr>
					</div>
					<div class="details">
						<p>
						<label>과제</label>
						<span>레이팅스팬</span>
						</p>
						<p>
						<label>조모임</label>
						<span>레이팅스팬</span>
						</p>
						<p>
						<label>성적</label>
						<span>레이팅스팬</span>
						</p>
						<p>
						<label>출결</label>
						<span>레이팅스팬</span>
						</p>
						<p>
						<label>시험횟수</label>
						<span>레이팅스팬</span>
						</p>
					</div>
				</div>
				<!-- 해당 강의평 리스트 -->
				<div class="articles">
					<article>
					</article>
				</div>
			</div>
			<!-- 시험정보 공유 -->
			<div class="side exam">
				<h2>시험 정보</h2>
				<a class= "writebutton">시험 정보 공유</a>
				<div class="exams">
<!-- 				<article class="exams"> -->
<!-- 					<h3>중간,기말</h3> -->
<!-- 					<p class="info"> -->
<!-- 					</p> -->
<!-- 					<h4>시험전략</h4> -->
<!-- 					<p class="text">노하우?</p> -->
<!-- 					<h4>문제유형</h4> -->
<!-- 					<p class="types">단답형</p> -->
<!-- 				</article> -->
<!-- 				<hr> -->
			</div>
			</div>
			</div>
			<!-- 시험정보 등록 폼 -->
				<form class="write exam">
					<div class="wrap">
						<h2>시험 정보 공유</h2>
						<a class="close"></a>
						<h3>교수명</h3>
						<p class = "description">시험 정보 공유 페이지입니다.</p>
						<hr>
						<h3>시험 선택</h3>
						<dl>
							<dd>
							<select name="nth">
								<option value="중간고사">중간고사</option>
								<option value="기말고사">기말고사</option>
								<option value="기타">기타</option>
							</select>
							</dd>
						</dl>
						<dl>
							<dt>문제 유형</dt>
							<dd>
								<a data-name="type" data-value="객관식">객관식</a>
								<a data-name="type" data-value="단답형">단답형</a>
								<a data-name="type" data-value="서술형">서술형</a>
								<a data-name="type" data-value="논술형">논술형</a>
<!-- 								<a data-name="type" data-type="multiple">객관식</a> -->
<!-- 								<a data-name="type" data-type="multiple">단답형</a> -->
<!-- 								<a data-name="type" data-type="multiple">서술형</a> -->
<!-- 								<a data-name="type" data-type="multiple">논술형</a> -->
							</dd>
						</dl>
						<h3>시험 전략</h3>
						<textarea class = "text" name="knowhow">시험전략</textarea>
						<input class="submit" type="submit">
					</div>
				</form>
				
				<!-- 강의평 등록 폼 -->
				<form class="write article">
					<div class="wrap">
						<h2>강의평 등록</h2>
						<a class="close">닫기</a>
						<hr>
						<div class = "details">
						<dl>
							<dt>성적</dt>
							<dd>
								<a data-name="assessment_grade" data-value="너그러움">너그러움</a>
								<a data-name="assessment_grade" data-value="보통">보통</a>
								<a data-name="assessment_grade" data-value="깐깐함">깐깐함</a>
							</dd>
						</dl>
						<dl>
							<dt>과제</dt>
								<dd>
									<a data-name="assessment_homework" data-value="많음">많음</a>
									<a data-name="assessment_homework" data-value="보통">보통</a>
									<a data-name="assessment_homework" data-value="없음">없음</a>
								</dd>
						</dl>
						<dl>
							<dt>출결</dt>
								<dd>
									<a data-name="assessment_attendance" data-value="혼용">혼용</a>
									<a data-name="assessment_attendance" data-value="직접호명">직접호명</a>
									<a data-name="assessment_attendance" data-value="지정좌석">지정좌석</a>
									<a data-name="assessment_attendance" data-value="전자출결">전자출결</a>
									<a data-name="assessment_attendance" data-value="반영안함">반영안함</a>
								</dd>
						</dl>
						<dl>
							<dt>시험횟수</dt>
								<dd>
									<a data-name="exam_times" data-value="없음">없음</a>
									<a data-name="exam_times" data-value="한번">한번</a>
									<a data-name="exam_times" data-value="두번">두번</a>
									<a data-name="exam_times" data-value="세번">세번</a>
									<a data-name="exam_times" data-value="도망쳐">도망쳐</a>
								</dd>
						</dl>
						<dl>
							<dt>조모임</dt>
								<dd>
									<a data-name="assessment_team" data-value="많음">많음</a>
									<a data-name="assessment_team" data-value="보통">보통</a>
									<a data-name="assessment_team" data-value="없음">없음</a>
								</dd>
						</dl>
						<dl>
							<dt>총점</dt>
								<dd>
									<a data-name="rate" data-value="5">5점</a>
									<a data-name="rate" data-value="4">4점</a>
									<a data-name="rate" data-value="3">3점</a>
									<a data-name="rate" data-value="2">2점</a>
									<a data-name="rate" data-value="1">1점</a>
								</dd>
						</dl>
						</div>
						<h4>강의평</h4>
						<textarea name="text" class="text"></textarea>
						<input class="submit" type="submit">
					</div>
				</form>
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
	<script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4"></script>
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