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
<meta property="og:url" content="https://kw.everytime.kr/timetable">
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
<link type="text/css" href="/css/container.table.css" rel="stylesheet">
<link type="text/css" href="/css/container.modal.css" rel="stylesheet">
<link type="text/css" href="/css/subjects.css" rel="stylesheet">
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
<script type="text/javascript" src="/js/timetable.tableload.js"></script>
<script type="text/javascript" src="/js/timetable.tablesave.js"></script>
<script type="text/javascript" src="/js/timetable.subjects.js"></script>
<script type="text/javascript" src="/js/timetable.customsubjects.js"></script>
<script type="text/javascript" src="/js/timetable.index.js"></script>
<script type="text/javascript" src="/js/timetable.subjectcolumninfo.js"></script>
<script type="text/javascript" src="/js/timetable.imagegenerator.js"></script>
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
				<a href="/message" title="쪽지함" class="icon message">쪽지함</a>
				</li> <a href="/my" title="내 정보" class="icon my">내 정보</a> <input
					type="hidden" id="userUserid" value="slayers504"> <input
					type="hidden" id="userSchool" value="7"> <input
					type="hidden" id="userCampus" value="11">
			</div>
			<ul id="menu">
				<li><a href="/">게시판</a></li>
				<li class="active"><a href="/timetable">시간표</a></li>
				<li><a href="/lecture">강의평가</a></li>
				<li><a href="/calculator">학점계산기</a></li>
				<li><a href="/friend">친구</a></li>
				<li><a href="https://bookstore.everytime.kr/">책방</a></li>
				<li><a href="https://www.campuspick.com/">캠퍼스픽</a></li>
			</ul>
		</div>
	</nav>
	<script type="text/javascript">
		var _timetableGridInfo = [ {
			"no" : "0",
			"rows" : [ 90, 108 ],
			"hidden" : true
		}, {
			"no" : "1",
			"rows" : [ 108, 126 ],
			"hidden" : false
		}, {
			"no" : "2",
			"rows" : [ 126, 144 ],
			"hidden" : false
		}, {
			"no" : "3",
			"rows" : [ 144, 162 ],
			"hidden" : false
		}, {
			"no" : "4",
			"rows" : [ 162, 180 ],
			"hidden" : false
		}, {
			"no" : "5",
			"rows" : [ 180, 198 ],
			"hidden" : false
		}, {
			"no" : "6",
			"rows" : [ 198, 216 ],
			"hidden" : false
		}, {
			"no" : "7",
			"rows" : [ 216, 226 ],
			"hidden" : false
		}, {
			"no" : "8",
			"rows" : [ 226, 236 ],
			"hidden" : false
		}, {
			"no" : "9",
			"rows" : [ 236, 246 ],
			"hidden" : false
		}, {
			"no" : "10",
			"rows" : [ 246, 256 ],
			"hidden" : false
		}, {
			"no" : "11",
			"rows" : [ 256, 266 ],
			"hidden" : false
		}, {
			"no" : "",
			"rows" : [ 266, 288 ],
			"hidden" : false
		} ];
	</script>
	<div id="container" class="timetable">
		<hr>
		<aside>
			<form class="select">
				<select id="semesters"></select>
			</form>
			<div class="title">
				<a class="hamburger"></a>
				<h1 id="tableName">시간표</h1>
				<div class="description">
					<ul class="info">
						<li><span id="tableCredit">0</span> 학점</li>
						<li><time id="tableUpdatedAt"></time> 변경</li>
					</ul>
				</div>
				<hr>
				<ol class="buttons threecols">
					<li data-modal="tableExport"><a class="light image export">이미지</a></li>
					<li data-modal="tableSetting"><a class="light image setting">설정</a></li>
					<li class="mobileonly"><a id="semestersButton">학기변경</a></li>
				</ol>
				<hr>
			</div>
			<div class="menu">
				<ol></ol>
			</div>
		</aside>
		<div class="wrap">
			<div class="tablehead"></div>
			<div class="tablebody"></div>
		</div>
		<form id="tableExport" class="modal">
			<a title="닫기" class="close"></a>
			<h3>시간표 이미지 저장</h3>
			<p>
				<label>이미지 옵션</label> <label class="checkbox"><input
					type="radio" name="is_mobile" value="false" checked> PC용</label> <label
					class="checkbox"><input type="radio" name="is_mobile"
					value="true"> 모바일용</label>
			</p>
			<input type="hidden" name="id"> <input type="submit"
				value="저장하기" class="button">
		</form>
		<form id="tableSetting" class="modal">
			<a title="닫기" class="close"></a>
			<h3>시간표 설정</h3>
			<p>
				<label>이름</label> <input type="text" name="name" value=""
					maxlength="40" class="text">
			</p>
			<p>
				<label>공개 범위</label> <input type="radio" id="tableSetting_priv0"
					name="priv" value="0"><label for="tableSetting_priv0"
					class="checkbox">전체공개</label> <input type="radio"
					id="tableSetting_priv1" name="priv" value="1"><label
					for="tableSetting_priv1" class="checkbox">친구공개</label> <input
					type="radio" id="tableSetting_priv2" name="priv" value="2"><label
					for="tableSetting_priv2" class="checkbox">비공개</label>
			</p>
			<p>
				<label>기본</label> <input type="checkbox"
					id="tableSetting_is_primary" name="is_primary"><label
					for="tableSetting_is_primary" class="checkbox">기본시간표 설정</label>
			</p>
			<input type="button" value="삭제" class="button light floatLeft">
			<input type="submit" value="설정 저장" class="button">
		</form>
		<form id="subjectCampusFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>캠퍼스</h3>
			<div class="filter"></div>
			<input type="submit" value="적용" class="button">
		</form>
		<form id="subjectCategoryFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>전공/영역</h3>
			<div class="filter"></div>
		</form>
		<form id="subjectKeywordFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>검색어</h3>
			<div class="filter"></div>
			<input type="submit" value="검색" class="button">
		</form>
		<form id="subjectOrderFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>정렬</h3>
			<div class="filter"></div>
			<input type="submit" value="적용" class="button">
		</form>
		<form id="subjectTimeFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>시간</h3>
			<div class="filter"></div>
			<input type="submit" value="적용" class="button">
		</form>
		<form id="subjectGradeFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>학년</h3>
			<div class="filter"></div>
			<input type="button" value="전체 선택" class="button light floatLeft"
				data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input
				type="submit" value="적용" class="button">
		</form>
		<form id="subjectTypeFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>구분</h3>
			<div class="filter"></div>
			<input type="button" value="전체 선택" class="button light floatLeft"
				data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input
				type="submit" value="적용" class="button">
		</form>
		<form id="subjectCreditFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>학점</h3>
			<div class="filter"></div>
			<input type="button" value="전체 선택" class="button light floatLeft"
				data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input
				type="submit" value="적용" class="button">
		</form>
		<ul class="floating"></ul>
	</div>
	<form id="customsubjects">
		<input type="hidden" name="id"> <a title="닫기" class="close"></a>
		<h2></h2>
		<dl>
			<dt>과목명 (필수)</dt>
			<dd>
				<input type="text" name="name" placeholder="예) 경제학입문" maxlength="40"
					class="text">
			</dd>
			<dt>교수명</dt>
			<dd>
				<input type="text" name="professor" placeholder="예) 홍길동"
					maxlength="40" class="text">
			</dd>
			<dt>시간/장소</dt>
			<dd class="timeplaces">
				<a class="new"><strong>+</strong> 더 입력</a>
			</dd>
		</dl>
		<div class="clearBothOnly"></div>
		<div class="submit">
			<input type="submit" value="저장" class="button">
		</div>
	</form>
	<div id="subjects"></div>
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
		var _serverTime = 1659350632626;
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