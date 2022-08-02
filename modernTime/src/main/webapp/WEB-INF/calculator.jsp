<!DOCTYPE html>
<html lang="ko">
<head>
<title>광운대 에브리타임</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image"
	content="https://everytime.kr/images/og_image.png">
<meta property="og:url" content="https://kw.everytime.kr/calculator">
<meta property="og:site_name" content="광운대 에브리타임">
<meta property="og:title" content="광운대 에브리타임">
<meta property="og:description"
	content="광운대 재학생 커뮤니티. 시간표 작성, 강의평가, 자유게시판, 비밀게시판 등 제공.">
<meta name="description"
	content="광운대 재학생 커뮤니티. 시간표 작성, 강의평가, 자유게시판, 비밀게시판 등 제공.">
<meta name="keywords"
	content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
<meta name="naver-site-verification"
	content="7366738375e320e44bd1c743b364db13086a7b0e">
<meta name="robots" content="noindex">
<link type="text/css" href="/css/common.css" rel="stylesheet">
<link type="text/css" href="/css/common.partial.css" rel="stylesheet">
<link type="text/css" href="/css/container.modal.css" rel="stylesheet">
<link type="text/css" href="/style/calculator.css" rel="stylesheet">
<link href="/favicon.ico" rel="shortcut icon">
<!--[if lt IE 9]>
  <script src="/js/extensions.html5shiv.js"></script>
  <script src="/js/extensions.respond.min.js"></script>
  <script src="/js/extensions.excanvas.min.js"></script>
  <![endif]-->
<!--[if lt IE 8]>
  <script src="/js/extensions.json3.min.js"></script>
  <![endif]-->
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/extensions.jquery.flot.min.js"></script>
<script type="text/javascript"
	src="/js/extensions.jquery.flot.pie.min.js"></script>
<script type="text/javascript"
	src="/js/extensions.jquery.flot.resize.min.js"></script>
<script type="text/javascript" src="/js/calculator.index.js"></script>
</head>
<body>

	<nav>
		<div class="wrap">
			<div id="logo">
				<a href="/"><img src="/images/new/nav.logo.png"></a>
				<p>
					<span class="name multiple">에브리타임</span><span class="subname">광운대</span>
				</p>
			</div>
			<div id="account">
				<a href="/login" class="button">로그인</a> <a href="/register"
					class="button red">회원가입</a>
			</div>
			<ul id="menu">
				<li><a href="/">게시판</a></li>
				<li><a href="/timetable">시간표</a></li>
				<li><a href="/lecture">강의평가</a></li>
				<li class="active"><a href="/calculator">학점계산기</a></li>
				<li><a href="/friend">친구</a></li>
				<li><a href="https://bookstore.everytime.kr/">책방</a></li>
				<li><a href="https://www.campuspick.com/">캠퍼스픽</a></li>
			</ul>
		</div>
	</nav>
	<div id="container" class="calculator">
		<input type="hidden" id="userId" value="0"> <input
			type="hidden" id="userRequiredCredit" value="150"> <input
			type="hidden" id="userGradeType" value="1">
		<aside class="none">
			<div class="title">
				<a class="hamburger"></a>
				<h1>학점 계산기</h1>
			</div>
		</aside>
		<div class="section">
			<div class="chart">
				<article class="overview">
					<div class="column gpa">
						<h4>전체 평점</h4>
						<p class="value"></p>
						<p class="total"></p>
					</div>
					<div class="column major">
						<h4>전공 평점</h4>
						<p class="value"></p>
						<p class="total"></p>
					</div>
					<div class="column acquisition">
						<h4>취득 학점</h4>
						<p class="value"></p>
						<p class="total" title="졸업 학점 설정"></p>
					</div>
				</article>
				<article class="semester">
					<div class="series">
						<div class="legend"></div>
						<div class="plot"></div>
					</div>
					<ul class="ratioplot"></ul>
				</article>
			</div>
			<div class="menu"></div>
			<table class="subjects">
				<caption>
					<h3></h3>
					<dl class="information">
						<dt>평점</dt>
						<dd class="gpa"></dd>
						<dt>전공</dt>
						<dd class="major"></dd>
						<dt>취득</dt>
						<dd class="acquisition"></dd>
					</dl>
					<a class="import">시간표 불러오기</a>
				</caption>
				<thead>
					<tr>
						<th class="name">과목명</th>
						<th class="credit">학점</th>
						<th class="grade">성적</th>
						<th class="major">전공</th>
					</tr>
				</thead>
				<tbody></tbody>
				<tfoot>
					<tr>
						<td colspan="4"><a class="new">더 입력하기</a> <a class="reset">초기화</a>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<hr>
		<form id="importForm" class="modal">
			<a title="닫기" class="close"></a>
			<h3>내 시간표 가져오기</h3>
			<p>
				<label>시간표 선택</label> <select name="semester"></select>
			</p>
			<input type="submit" value="가져오기" class="button">
		</form>
		<form id="requiredCreditForm" class="modal">
			<a title="닫기" class="close"></a>
			<h3>졸업 학점 설정</h3>
			<p>
				<label>졸업 학점</label> <input type="number" name="required_credit"
					maxlength="3" class="text">
			</p>
			<input type="submit" value="저장" class="button">
		</form>
	</div>
	<div id="bottom">
		<ul class="links">
			<li><a href="/page/serviceagreement">이용약관</a></li>
			<li class="privacy"><a href="/page/privacy">개인정보처리방침</a></li>
			<li><a href="/page/rules">커뮤니티이용규칙</a></li>
			<li><a href="/notice">공지사항</a></li>
			<li><a href="/page/faq">문의하기</a></li>
			<li class="copyright"><a href="/">&copy; 에브리타임</a></li>
		</ul>
	</div>
	<script type="text/javascript">
		var _serverTime = 1659349216973;
		var _clientTime = new Date().getTime();
		var _diffTime = _clientTime - _serverTime;
		var _apiServerUrl = 'https://api.everytime.kr';
	</script>
	<script async
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