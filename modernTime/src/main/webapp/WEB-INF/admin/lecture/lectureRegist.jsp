<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에브리타임</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image" content="https://everytime.kr/images/og_image.png">
<meta property="og:url" content="https://everytime.kr/c/349">
<meta property="og:site_name" content="에브리타임">
<meta property="og:title" content="에브리타임">
<meta property="og:description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
<meta name="description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
<meta name="keywords"
	content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
<meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
<meta name="robots" content="noindex">
<link href="/favicon.ico" rel="shortcut icon">

<link type="text/css" href="/css/common.css" rel="stylesheet">
<link type="text/css" href="/css/common.partial.css" rel="stylesheet">
<link type="text/css" href="/css/container.modal.css" rel="stylesheet">
<link type="text/css" href="/css/admin/container.lecture.form.css" rel="stylesheet">
<link type="text/css" href="/css/admin/subjects.css" rel="stylesheet">

<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/community.side.js"></script>
<script type="text/javascript" src="/js/admin/extensions.load-image.all.min.js"></script>
<script type="text/javascript" src="/js/admin/lecture.form.js"></script>
<script type="text/javascript" src="/js/admin/lecture.js"></script>
</head>
<body>
	<c:import url="../header.jsp" />
	<div id="container" class="timetable">

		<form id="subjectKeywordFilter" class="modal" style="margin-left: -200px; margin-top: -102px; display: none;">
			<a title="닫기" class="close"></a>
			<h3>검색어</h3>
			<div class="filter">
				<label class="inline"> <input type="radio" name="keyword_type" checked="checked"><span>과목명</span>
				</label> <label class="inline"> <input type="radio" name="keyword_type"><span>교수명</span>
				</label> <label class="inline"> <input type="radio" name="keyword_type"><span>장소</span></label> <input class="keyword" type="search" name="keyword"
					placeholder="검색어">
			</div>
			<input type="submit" value="검색" class="button">
		</form>

		<form id="subjectOrderFilter" class="modal">
			<a title="닫기" class="close"></a>
			<h3>정렬</h3>
			<div class="filter"></div>
			<input type="submit" value="적용" class="button">
		</form>
		<form id="subjectTypeFilter" class="modal">
			<!-- style="margin-left: -200px; margin-top: -230px; display: none;"> -->
			<a title="닫기" class="close"></a>
			<h3>구분</h3>
			<div class="filter">
				<label> <input type="checkbox" name="type" checked="checked"><span>교양</span>
				</label> <label> <input type="checkbox" name="type" checked="checked"><span>전공</span>
				</label>
			</div>
			<input type="button" value="전체 선택" class="button light floatLeft" data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input type="submit" value="적용" class="button">
		</form>
		<form id="subjectCreditFilter" class="modal" name="subjectCreditFilter">
			<a title="닫기" class="close"></a>
			<h3>학점</h3>
			<div class="filter"></div>
			<input type="button" value="전체 선택" class="button light floatLeft" data-action="select"> <input type="button" value="전체 취소"
				class="button light floatLeft" data-action="deselect"> <input type="submit" value="적용" class="button">
		</form>
		<!-- 강의평 등록 -->
		<form action="lectureRegist" class="lecture-write" style="display: none;" method="post">

			<div class="wrap">
				<h2>새 강의 등록</h2>
				<a class="close">닫기</a>
				<hr>
				<dl>
					<dt>과목 구분</dt>
					<dd>
						<select name="type" class="type">
							<option value="교양">교양</option>
							<option value="전공">전공</option>
						</select>
					</dd>
					<dt>과목 번호</dt>
					<dd>
						<input type="text" name="lecture_id">
					</dd>
					<dt>강의명</dt>
					<dd>
						<input type="text" name="name">
					</dd>
					<dt>강사</dt>
					<dd>
						<input type="text" name="teacher">
					</dd>
					<dt>학점</dt>
					<dd>
						<select name="credit" class="credit">
							<option value="1">1학점</option>
							<option value="2">2학점</option>
							<option value="3" selected>3학점</option>
						</select>
					</dd>
					<dt>시간</dt>
					<dd class="timeplaces">
						<div class="timeplace">
							<ol class="weeks">
								<li data-value="0" class="active">월</li>
								<li data-value="1">화</li>
								<li data-value="2">수</li>
								<li data-value="3">목</li>
								<li data-value="4">금</li>
								<li data-value="5">토</li>
								<li data-value="6">일</li>
							</ol>
							<p>
								<select name="starthour" class="starthour"><option value="0">오전 0시</option>
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
									<option value="23">오후 11시</option></select>
									<select name="startminute" class="startminute"><option value="0">0분</option>
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
									<option value="55">55분</option></select><span>~</span>
									 <select name="endhour" class="endhour"><option value="0">오전 0시</option>
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
									<option value="23">오후 11시</option></select>
									 <select name="endminute" class="endminute"><option value="0">0분</option>
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
									<option value="55">55분</option></select>
							</p>
						</div>
					</dd>
					<dd class="timeplaces">
						<div class="timeplace">
							<ol class="weeks">
								<li data-value="0" class="active">월</li>
								<li data-value="1">화</li>
								<li data-value="2">수</li>
								<li data-value="3">목</li>
								<li data-value="4">금</li>
								<li data-value="5">토</li>
								<li data-value="6">일</li>
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
									<option value="23">오후 11시</option></select> <select class="startminute"><option value="0">0분</option>
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
									<option value="55">55분</option></select> <span>~</span> <select class="endhour"><option value="0">오전 0시</option>
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
									<option value="23">오후 11시</option>
								</select> <select class="endminute">
									<option value="0">0분</option>
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
									<option value="55">55분</option>
								</select>
							</p>
						</div>
					</dd>
					<dt>장소</dt>
					<dd>
						<input type="text" name="place">
					</dd>
					<dt>총 강의시간</dt>
					<dd>
						<input type="number" value="1" min="1" name="lecture_time">
					</dd>
					<dt>정원</dt>
					<dd>
						<input type="number" value="1" min="1" name="max_student">
					</dd>

				</dl>
				<hr>
				<input type="submit" value="작성하기" class="submit">
			</div>

		</form>

	</div>
	<div class="lecture-title">
		<h1>
			<a>강의 관리</a>
		</h1>
	</div>
	<!-- 관리자 로그인 인증 필요 -->
	<div class="lectureRegist">
		<h2 id="totalLectureCount">총 강의: 0개</h2>
		<a class="writebutton">새 강의 등록</a>
	</div>
	<div id="subjects" style="" class="subjects">
		<div class="filter">
			<a class="item" data-id="keyword"> <span class="key">검색어:</span><span class="value">없음</span><span class="reset"></span>
			</a> <a class="item" data-id="order"> <span class="key">정렬:</span><span class="value">기본</span><span class="reset"></span>
			</a> <a class="item" data-id="type"> <span class="key">구분:</span><span class="value">전체</span><span class="reset"></span>
			</a> <a class="item" data-id="credit"> <span class="key">학점:</span><span class="value">전체</span><span class="reset"></span>
			</a>
		</div>
		<div class="list">
			<!-- 		<div class="thead"></div> -->
			<table>
				<thead>
					<tr>
						<th>
							<div>
								<input type="checkbox" name="allCheck">
							</div>
						</th>
						<th>구분
							<div>구분</div>
						</th>
						<th>강의시간
							<div>강의시간</div>
						</th>
						<th>교과목명
							<div>교과목명</div>
						</th>
						<th>교수
							<div>교수</div>
						</th>
						<th>학점
							<div>학점</div>
						</th>
						<th>강의실
							<div>강의실</div>
						</th>
						<th>강의평
							<div>강의평</div>
						</th>
						<th>담은 인원
							<div>담은 인원</div>
						</th>
						<th>수강 정원
							<div>수강 정원</div>
						</th>

					</tr>
				</thead>
				<tbody id="tbody">
				</tbody>
			</table>
			<div id="buttons">
			
			</div>
		</div>
	</div>

	<%--<%@ include file="adminFooter.jsp"--%>