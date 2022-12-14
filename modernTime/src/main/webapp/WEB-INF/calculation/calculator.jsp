<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:import url="../common/loginRequired.jsp" />

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
<link type="text/css" href="/css/common.css" rel="stylesheet">
<link type="text/css" href="/css/common.partial.css" rel="stylesheet">
<link type="text/css" href="/css/container.modal.css" rel="stylesheet">
<link type="text/css" href="/style/calculator.css" rel="stylesheet">
<link href="/favicon.ico" rel="shortcut icon">

<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/extensions.jquery.flot.min.js"></script>
<script type="text/javascript" src="/js/extensions.jquery.flot.pie.min.js"></script>
<script type="text/javascript" src="/js/extensions.jquery.flot.resize.min.js"></script>
<script type="text/javascript" src="/js/calculator.index.js"></script>
</head>
<body style="">
	<c:import url="header.jsp" />

	<div id="container" class="calculator">
		<input type="hidden" id="userId" value="0"> <input type="hidden" id="userRequiredCredit" value="150"> <input type="hidden" id="userGradeType"
			value="1">
		<aside class="none">
			<div class="title">
				<a class="hamburger"></a>
				<h1>학점 계산기</h1>
			</div>
		</aside>
		<div class="section">
			<div class="chart empty">
				<article class="overview">
					<div class="column gpa">
						<h4>전체 평점</h4>
						<p class="value">0</p>
						<p class="total">
							/ 4.5
						</p>
					</div>
					<div class="column major">
						<h4>전공 평점</h4>
						<p class="value">0</p>
						<p class="total">/ 4.5</p>
					</div>
					<div class="column acquisition">
						<h4>취득 학점</h4>
						<p class="value">0</p>
						<p class="total" title="졸업 학점 설정">/ 140</p>
					</div>
				</article>
				<article class="semester">
					<div class="series">
						<div class="legend">
							<table style="font-size: smaller; color: #545454">
								<tbody>
									<tr>
										<td class="legendColorBox">
											<div style="border: 1px solid transparent; padding: 1px">
												<div style="width: 4px; height: 0; border: 5px solid rgb(198, 41, 23); overflow: hidden"></div>
											</div>
										</td>
										<td class="legendLabel"><span style="color: rgb(198, 41, 23)">전체</span></td>
										<td class="legendColorBox">
											<div style="border: 1px solid transparent; padding: 1px">
												<div style="width: 4px; height: 0; border: 5px solid rgb(166, 166, 166); overflow: hidden"></div>
											</div>
										</td>
										<td class="legendLabel"><span style="color: rgb(166, 166, 166)">전공</span></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="plot" style="padding: 0px; position: relative;">
							<canvas class="flot-base" width="419" height="148" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 365px; height: 129px;"></canvas>
							<div class="flot-text" style="position: absolute; inset: 0px; font-size: smaller; color: rgb(84, 84, 84);">
								<div class="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; inset: 0px; display: block;">
									<div
										style="position: absolute; top: 90px; font: 400 12px/14px&amp; quot; 맑은 고딕&amp;quot; , 돋움 , tahoma; color: rgb(166, 166, 166); left: 0px; text-align: right;">2.0</div>
									<div
										style="position: absolute; top: 55px; font: 400 12px/14px&amp; quot; 맑은 고딕&amp;quot; , 돋움 , tahoma; color: rgb(166, 166, 166); left: 0px; text-align: right;">3.0</div>
									<div
										style="position: absolute; top: 20px; font: 400 12px/14px&amp; quot; 맑은 고딕&amp;quot; , 돋움 , tahoma; color: rgb(166, 166, 166); left: 0px; text-align: right;">4.0</div>
								</div>
							</div>
							<canvas class="flot-overlay" width="419" height="148" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 365px; height: 129px;"></canvas>
						</div>
					</div>
					<ul class="ratioplot">
						<li><span class="grade">A+</span>
							<div class="ratiowrapper">
								<div class="ratiobar" style="width: calc(75%); height: 4px; background-color: rgb(242, 133, 114);"></div>
								<span class="ratiotext" style="left: calc(75%); color: rgb(242, 133, 114);">60%</span>
							</div></li>
						<li><span class="grade">B+</span>
							<div class="ratiowrapper">
								<div class="ratiobar" style="width: calc(25%); height: 4px; background-color: rgb(236, 197, 92);"></div>
								<span class="ratiotext" style="left: calc(25%); color: rgb(236, 197, 92);">20%</span>
							</div></li>
						<li><span class="grade">B0</span>
							<div class="ratiowrapper">
								<div class="ratiobar" style="width: calc(25%); height: 4px; background-color: rgb(160, 198, 97);"></div>
								<span class="ratiotext" style="left: calc(25%); color: rgb(160, 198, 97);">20%</span>
							</div></li>
					</ul>
				</article>
			</div>
			<div class="menu">
			</div>
			<table class="subjects">
				<caption>
					<h3>1학년 1학기</h3>
					<dl class="information">
						<dt>평점</dt>
						<dd class="gpa">0</dd>
						<dt>전공</dt>
						<dd class="major">0</dd>
						<dt>취득</dt>
						<dd class="acquisition">0</dd>
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
				<tbody>

				</tbody>
				<tfoot>
					<tr>
						<td colspan="4"><a class="new">더 입력하기</a> <a class="reset">초기화</a></td>
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
				<label>졸업 학점</label> <input type="number" name="required_credit" maxlength="3" class="text">
			</p>
			<input type="submit" value="저장" class="button">
		</form>
	</div>
	<c:import url="../footer.jsp" />