<%@page import="com.care.moderntime.lecture.dto.LectureDTO"%>
<%@page import="java.util.ArrayList"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에브리타임</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image"content="https://everytime.kr/images/og_image.png">
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
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/lecture.index.js"></script>
</head>
<body style="">

	<nav>
		<div class="wrap">
			<div id="logo">
				<a href="/"><img src="/images/new/nav.logo.png"></a>
				<p>
					<span class="name multiple">에브리타임</span><span class="subname">KG IT대</span>
				</p>
			</div>
			<div id="account">
				<a href="/message" title="쪽지함" class="icon message">쪽지함</a> <a
					href="/my" title="내 정보" class="icon my">내 정보</a> <input
					type="hidden" id="userUserid" value="diharet"> <input
					type="hidden" id="userSchool" value="316"> <input
					type="hidden" id="userCampus" value="349">
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
	<div id="container" class="lectureindex">
		<aside class="none">
			<div class="title">
				<a class="hamburger"></a>
				<h1>강의평가</h1>
			</div>
		</aside>
		<form class="search">
			<input type="text" name="keyword" placeholder="과목명, 교수명으로 검색"
				class="keyword" autocomplete="off"> 
				<input type="submit" class="submit">
		</form>
		<div class="section">

			<h2>내 강의평</h2>

			<div class="mylectures" id="mylectures">
				<!-- 			<a class="lecture"><span class="button"><span class="button write">asd</span></span></a> -->
				<table style="width: 700px">
					<tbody id="bodys" style="float: left;"></tbody>
					<!-- 					<tbody id="bodys2"></tbody> -->
					<!-- 					<tbody id="bodys3" class = "bodys3"></tbody> -->
				</table>
				<!-- 				<table id="bodys3" class="bodys3"> -->

				</table>
				<!-- 				<div class="loading" style="display: none;"></div> -->
			</div>

		</div>
		<div class="section">
			<h2>최근 강의평</h2>
			<div class="articles" data-campus-id="0">

				<!-- 				<a class="article notconfirmed" href="/lecture/view/2376556"><div -->
				<!-- 						class="confirm"> -->
				<!-- 						<p>학교 인증 후 강의평을 확인할 수 있습니다.</p> -->
				<!-- 					</div> -->
				<!-- 					<h3>전공미리보기(OT학기제) : 이태훈</h3> -->
				<!-- 					<p class="rate"> -->
				<!-- 						<span class="star"><span class="on" style="width: 100%;"></span></span> -->
				<!-- 					</p> -->
				<!-- 					<p class="info"> -->
				<!-- 						<span class="semester">22년 1학기 수강자</span> -->
				<!-- 					</p> -->
				<!-- 					<p class="text">학교 증이 요합니다학 인증 필요합 다학교인 이필요 니 학교 증이필요합 다학 인증 -->
				<!-- 						필요합 다학교 증이필요합.</p></a> -->


				<!-- 				<div class="loading" style="display: none;"></div> -->

			</div>

		</div>
	</div>
	</div>
	<%@ include file="../footer.jsp"%>