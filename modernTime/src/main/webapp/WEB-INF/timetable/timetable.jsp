<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:import url="../common/loginRequired.jsp" />
<!DOCTYPE html>
<html lang="ko">
<head>
<title>광운대 에브리타임</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image" content="https://everytime.kr/images/og_image.png">
<meta property="og:url" content="https://kw.everytime.kr/timetable">
<meta property="og:site_name" content="광운대 에브리타임">
<meta property="og:title" content="광운대 에브리타임">
<meta property="og:description" content="광운대 재학생 커뮤니티. 시간표 작성, 강의평가, 자유게시판, 비밀게시판 등 제공.">
<meta name="description" content="광운대 재학생 커뮤니티. 시간표 작성, 강의평가, 자유게시판, 비밀게시판 등 제공.">
<meta name="keywords"
	content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
<meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
<meta name="robots" content="noindex">
<link type="text/css" href="/css/common.css" rel="stylesheet">
<link type="text/css" href="/css/common.partial.css" rel="stylesheet">
<link type="text/css" href="/css/container.table.css" rel="stylesheet">
<link type="text/css" href="/css/container.modal.css" rel="stylesheet">
<link type="text/css" href="/css/timetable/subjects.css" rel="stylesheet">
<link href="/favicon.ico" rel="shortcut icon">

<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>

<script type="text/javascript" src="/js/timetable/timetable.customsubjects.js"></script>
<script type="text/javascript" src="/js/timetable/timetable.imagegenerator.js"></script>
<script type="text/javascript" src="/js/timetable/timetable.index.js"></script>
<script type="text/javascript" src="/js/timetable/timetable.subjectcolumninfo.js"></script>
<script type="text/javascript" src="/js/timetable/timetable.subjects.js"></script>
<script type="text/javascript" src="/js/timetable/timetable.tableload.js"></script>
<script type="text/javascript" src="/js/timetable/timetable.tablesave.js"></script>
</head>
<body>
	<c:import url="header.jsp" />
	<script type="text/javascript">
		var _timetableGridInfo = [];
	</script>
	<div id="container" class="timetable" style="height: 756px;">
		<hr>
		<aside>
			<form class="select">
				<select id="semesters">
<!-- 					<option>2022년 겨울학기</option> -->
<!-- 					<option>2022년 2학기</option> -->
<!-- 					<option>2022년 여름학기</option> -->
<!-- 					<option>2022년 1학기</option> -->
<!-- 					<option>2021년 겨울학기</option> -->
<!-- 					<option>2021년 2학기</option> -->
<!-- 					<option>2021년 여름학기</option> -->
<!-- 					<option>2021년 1학기</option> -->
<!-- 					<option>2020년 겨울학기</option> -->
<!-- 					<option>2020년 2학기</option> -->
<!-- 					<option>2020년 여름학기</option> -->
<!-- 					<option>2020년 1학기</option> -->
<!-- 					<option>2019년 겨울학기</option> -->
<!-- 					<option>2019년 2학기</option> -->
<!-- 					<option>2019년 여름학기</option> -->
<!-- 					<option>2019년 1학기</option> -->
<!-- 					<option>2018년 겨울학기</option> -->
<!-- 					<option>2018년 2학기</option> -->
<!-- 					<option>2018년 여름학기</option> -->
<!-- 					<option>2018년 1학기</option> -->
<!-- 					<option>2017년 겨울학기</option> -->
<!-- 					<option>2017년 2학기</option> -->
<!-- 					<option>2017년 여름학기</option> -->
<!-- 					<option>2017년 1학기</option> -->
<!-- 					<option>2016년 겨울학기</option> -->
<!-- 					<option>2016년 2학기</option> -->
<!-- 					<option>2016년 여름학기</option> -->
<!-- 					<option>2016년 1학기</option> -->
<!-- 					<option>2015년 겨울학기</option> -->
<!-- 					<option>2015년 2학기</option> -->
<!-- 					<option>2015년 여름학기</option> -->
<!-- 					<option>2015년 1학기</option> -->
<!-- 					<option>2014년 겨울학기</option> -->
<!-- 					<option>2014년 2학기</option> -->
<!-- 					<option>2014년 여름학기</option> -->
<!-- 					<option>2014년 1학기</option> -->
<!-- 					<option>2013년 겨울학기</option> -->
<!-- 					<option>2013년 2학기</option> -->
<!-- 					<option>2013년 여름학기</option> -->
<!-- 					<option>2013년 1학기</option> -->
<!-- 					<option>2012년 겨울학기</option> -->
<!-- 					<option>2012년 2학기</option> -->
<!-- 					<option>2012년 여름학기</option> -->
<!-- 					<option>2012년 1학기</option> -->
<!-- 					<option>2011년 겨울학기</option> -->
<!-- 					<option>2011년 2학기</option> -->
<!-- 					<option>2011년 여름학기</option> -->
<!-- 					<option>2011년 1학기</option> -->
<!-- 					<option>2010년 겨울학기</option> -->
<!-- 					<option>2010년 2학기</option> -->
<!-- 					<option>2010년 여름학기</option> -->
<!-- 					<option>2010년 1학기</option> -->
					</select>
			</form>
			<div class="title">
				<a class="hamburger"></a>
				<h1 id="tableName">시간표 1</h1>
				<div class="description">
					<ul class="info">
						<li style="display: none;"><span id="tableCredit">0</span> 학점</li>
						<li><time id="tableUpdatedAt">08/01 16:05</time> 변경</li>
					</ul>
				</div>
				<hr>
				<ol class="buttons threecols">
<!-- 					<li data-modal="tableExport"><a class="light image export">이미지</a></li> -->
					<li data-modal="tableSetting"><a class="light image setting">설정</a></li>
					<li class="mobileonly"><a id="semestersButton">학기변경</a></li>
				</ol>
				<hr>
			</div>
			<div class="menu">
				<ol>
				</ol>
			</div>
		</aside>
		<div class="wrap" style="width: 486px;">
			<div class="tablehead">
				<table class="tablehead">
					<tbody>
						<tr>
							<th></th>
							<td>월</td>
							<td>화</td>
							<td>수</td>
							<td>목</td>
							<td>금</td>
							<td style="display: none;">토</td>
							<td style="display: none;">일</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="tablebody">
				<table class="tablebody" style="margin-top: -452px;">
					<tbody>
						<tr>
							<th><div class="times">
									<div class="time">오전 0시</div>
									<div class="time">오전 1시</div>
									<div class="time">오전 2시</div>
									<div class="time">오전 3시</div>
									<div class="time">오전 4시</div>
									<div class="time">오전 5시</div>
									<div class="time">오전 6시</div>
									<div class="time">오전 7시</div>
									<div class="time">오전 8시</div>
									<div class="time">오전 9시</div>
									<div class="time">오전 10시</div>
									<div class="time">오전 11시</div>
									<div class="time">오후 12시</div>
									<div class="time">오후 1시</div>
									<div class="time">오후 2시</div>
									<div class="time">오후 3시</div>
									<div class="time">오후 4시</div>
									<div class="time">오후 5시</div>
									<div class="time">오후 6시</div>
									<div class="time">오후 7시</div>
									<div class="time">오후 8시</div>
									<div class="time">오후 9시</div>
									<div class="time">오후 10시</div>
									<div class="time">오후 11시</div>
								</div></th>
							<td><div class="cols" style="width: 84px;"></div>
								<div class="grids">
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
								</div></td>
							<td><div class="cols" style="width: 84px;"></div>
								<div class="grids">
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
								</div></td>
							<td><div class="cols" style="width: 84px;"></div>
								<div class="grids">
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
								</div></td>
							<td><div class="cols" style="width: 84px;"></div>
								<div class="grids">
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
								</div></td>
							<td><div class="cols" style="width: 84px;"></div>
								<div class="grids">
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
								</div></td>
							<td style="display: none;"><div class="cols"></div>
								<div class="grids">
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
								</div></td>
							<td style="display: none;"><div class="cols"></div>
								<div class="grids">
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
									<div class="grid"></div>
								</div></td>
						</tr>
					</tbody>
				</table>
				<div class="nontimes"></div>
			</div>
		</div>
		<form id="tableExport" class="modal">
			<a title="닫기" class="close"></a>
			<h3>시간표 이미지 저장</h3>
			<p>
				<label>이미지 옵션</label> <label class="checkbox"><input type="radio" name="is_mobile" value="false" checked=""> PC용</label> <label class="checkbox"><input
					type="radio" name="is_mobile" value="true"> 모바일용</label>
			</p>
			<input type="hidden" name="id"> <input type="submit" value="저장하기" class="button">
		</form>
		<form id="tableSetting" class="modal">
			<a title="닫기" class="close"></a>
			<h3>시간표 설정</h3>
			<p>
				<label>이름</label> <input type="text" name="name" value="" maxlength="40" class="text">
			</p>
<!-- 			<input type="button" value="삭제" class="button light floatLeft">  -->
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
			<input type="button" value="전체 선택" class="button light floatLeft" data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input type="submit" value="적용" class="button">
		</form>
		<form id="subjectTypeFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>구분</h3>
			<div class="filter"></div>
			<input type="button" value="전체 선택" class="button light floatLeft" data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input type="submit" value="적용" class="button">
		</form>
		<form id="subjectCreditFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>학점</h3>
			<div class="filter"></div>
			<input type="button" value="전체 선택" class="button light floatLeft" data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input type="submit" value="적용" class="button">
		</form>
		<ul class="floating" style="left: 521.16px;">
			<li class="button custom only">새 수업 추가</li>
		</ul>
	</div>
	<form id="customsubjects" style="display: none;">
		<input type="hidden" name="id" value=""> <a title="닫기" class="close"></a>
		<h2></h2>
		<dl>
			<dt>과목명 (필수)</dt>
			<dd>
				<input type="text" name="name" placeholder="예) 경제학입문" maxlength="40" class="text">
			</dd>
			<dt>교수명</dt>
			<dd>
				<input type="text" name="professor" placeholder="예) 홍길동" maxlength="40" class="text">
			</dd>
			<dt>시간/장소</dt>
			<dd class="timeplaces">
				<div class="timeplace">
					<ol class="weeks">
						<li class="active">월</li>
						<li>화</li>
						<li>수</li>
						<li>목</li>
						<li>금</li>
						<li>토</li>
						<li>일</li>
					</ol>
					<p>
						<select class="starthour"><option value="0">오전 0시</option>
							<option value="1">오전 1시</option>
							<option value="2">오전 2시</option>
							<option value="3">오전 3시</option>
							<option value="4">오전 4시</option>
							<option value="5">오전 5시</option>
							<option value="6">오전 6시</option>
							<option value="7">오전 7시</option>
							<option value="8">오전 8시</option>
							<option value="9" selected="selected">오전 9시</option>
							<option value="10">오전 10시</option>
							<option value="11">오전 11시</option>
							<option value="12">오후 12시</option>
							<option value="13">오후 1시</option>
							<option value="14">오후 2시</option>
							<option value="15">오후 3시</option>
							<option value="16">오후 4시</option>
							<option value="17">오후 5시</option>
							<option value="18">오후 6시</option>
							<option value="19">오후 7시</option>
							<option value="20">오후 8시</option>
							<option value="21">오후 9시</option>
							<option value="22">오후 10시</option>
							<option value="23">오후 11시</option></select><select class="startminute"><option value="0">0분</option>
							<option value="5">5분</option>
							<option value="10">10분</option>
							<option value="15">15분</option>
							<option value="20">20분</option>
							<option value="25">25분</option>
							<option value="30">30분</option>
							<option value="35">35분</option>
							<option value="40">40분</option>
							<option value="45">45분</option>
							<option value="50">50분</option>
							<option value="55">55분</option></select><span>~</span><select class="endhour"><option value="0">오전 0시</option>
							<option value="1">오전 1시</option>
							<option value="2">오전 2시</option>
							<option value="3">오전 3시</option>
							<option value="4">오전 4시</option>
							<option value="5">오전 5시</option>
							<option value="6">오전 6시</option>
							<option value="7">오전 7시</option>
							<option value="8">오전 8시</option>
							<option value="9">오전 9시</option>
							<option value="10" selected="selected">오전 10시</option>
							<option value="11">오전 11시</option>
							<option value="12">오후 12시</option>
							<option value="13">오후 1시</option>
							<option value="14">오후 2시</option>
							<option value="15">오후 3시</option>
							<option value="16">오후 4시</option>
							<option value="17">오후 5시</option>
							<option value="18">오후 6시</option>
							<option value="19">오후 7시</option>
							<option value="20">오후 8시</option>
							<option value="21">오후 9시</option>
							<option value="22">오후 10시</option>
							<option value="23">오후 11시</option></select><select class="endminute"><option value="0">0분</option>
							<option value="5">5분</option>
							<option value="10">10분</option>
							<option value="15">15분</option>
							<option value="20">20분</option>
							<option value="25">25분</option>
							<option value="30">30분</option>
							<option value="35">35분</option>
							<option value="40">40분</option>
							<option value="45">45분</option>
							<option value="50">50분</option>
							<option value="55">55분</option></select><input type="text" placeholder="예) 종303" class="text place">
					</p>
				</div>
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
			<li class="copyright"><a href="/">© 에브리타임</a></li>
		</ul>
	</div>
	<script type="text/javascript">
		var _serverTime = 1660883642861;
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