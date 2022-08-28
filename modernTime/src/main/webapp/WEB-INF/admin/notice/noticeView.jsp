<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
pageContext.setAttribute("replaceChar", "\n");
%>
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
<link type="text/css" href="/css/container.article.css" rel="stylesheet">
<link type="text/css" href="/css/container.community.css" rel="stylesheet">
<link type="text/css" href="/css/container.modal.css" rel="stylesheet">
<link type="text/css" href="/css/admin/container.article.css" rel="stylesheet">
<link type="text/css" href="/css/admin/container.lecture.form.css" rel="stylesheet">
<link type="text/css" href="/css/admin/subjects.css" rel="stylesheet">
<!--   <link type="text/css" href="/adminjs/lectureRegist.css" rel="stylesheet"> -->
<link href="/favicon.ico" rel="shortcut icon">
<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/community.side.js"></script>
<script type="text/javascript" src="/js/admin/notice.detail.js"></script>
<script type="text/javascript" src="/js/admin/extensions.canvas-to-blob.min.js"></script>
<script type="text/javascript" src="/js/admin/extensions.load-image.all.min.js"></script>
<script type="text/javascript" src="/js/admin/message.send.js"></script>
</head>
<body>
	<c:import url="../header.jsp" />
	<div id="submenu">
		<div class="wrap">
			<ul>
				<li><a href="/393862" data-id="393862" class="new">자유게시판</a></li>
				<li><a href="/259677" data-id="259677" class="new">비밀게시판</a></li>
				<li><a href="/420831" data-id="420831" class="new">졸업생게시판</a></li>
				<li><a href="/412735" data-id="412735" class="new">새내기게시판</a></li>
				<li><a href="/community/search" class="search">게시판 찾기</a></li>
			</ul>
			<hr>
		</div>
		<input type="hidden" id="communityCampusId" value="349">
	</div>
	<div id="container" class="article">
		<input type="hidden" id="isUser" value="1"> <input type="hidden" id="boardId" value="1">
		<aside class="none">
			<div class="title">
				<a class="hamburger"></a>
				<h1>
					<a href="/notice">공지사항</a>
				</h1>
			</div>
		</aside>
		<div class="wrap title">
			<h1>
				<a href="/notice">공지사항</a>
			</h1>
			<hr>
		</div>
		<div class="wrap articles">
			<article data-id=${noticeView.id }>
				<a class="article"> <img src="https://cf-fpi.everytime.kr/5/1579249303.png" class="picture large">
					<div class="profile">
						<h3 class="admin large">에브리타임</h3>
						<time class="large">${noticeView.create_date}</time>
					</div>
					<ul class="status">

						<li class="update">수정</li>
						<li class="del">삭제</li>
					</ul>
					<hr>
					<h2 class="large">${noticeView.title }</h2>
					<p class="large">${fn:replace(noticeView.content,replaceChar,"<br/>") }</p>
					<div class="attaches multiple">
						<c:forEach var="picture" items="${noticeView.pictures }">
							<figure class="attach">
								<img src="${picture.picture }">
							</figure>
						</c:forEach>
					</div>
					<hr>
					<ul class="status left">
						<li class="attach">${noticeView.picture_count }</li>
						<li title="공감" class="vote">${noticeView.like_count }</li>
						<li title="댓글" class="comment">0</li>
						<li title="스크랩" class="scrap">${noticeView.scrap_count }</li>
					</ul>
					<hr>
					<div class="buttons">
						<span class="posvote">공감</span><span class="scrap">스크랩</span>
					</div> <input type="hidden" name="254951379_comment_anonym" value="0">
				</a>
				<div class="comments" style="display: block;"></div>
			</article>
			<div class="clearBothOnly"></div>
			<div class="pagination">
				<a id="goListButton" class="list" href="notice">글 목록</a>
				<!-- article.css 관리자만 보이게 -->
				<%-- 			<a id="deleteButton" href="noticeDelete?id=${noticeView.id}">글 삭제</a> --%>
				<%-- 			<a id="updateButton" href="noticeUpdate?id=${noticeView.id}">글 수정</a> --%>
			</div>
		</div>
		<hr>
		<c:import url="../../rightSide.jsp" />
		<form id="abuseForm" class="modal">
			<a title="닫기" class="close"></a>
			<h3>신고 사유 선택</h3>
			<ul>
				<li><a data-reason="1">게시판 성격에 부적절함</a></li>
				<li><a data-reason="2">욕설/비하</a></li>
				<li><a data-reason="3">음란물/불건전한 만남 및 대화</a></li>
				<li><a data-reason="4">상업적 광고 및 판매</a></li>
				<li><a data-reason="5">유출/사칭/사기</a></li>
				<li><a data-reason="6">낚시/놀람/도배</a></li>
				<li><a data-reason="7">정당/정치인 비하 및 선거운동</a></li>
			</ul>
		</form>
		<form id="manageMoimForm" class="modal">
			<a title="닫기" class="close"></a>
			<h3>게시판 설정</h3>
			<p>
				<label>소개</label> <input type="text" name="info" class="text">
			</p>
			<p class="hide">
				<label>인기 글 금지</label> <input type="checkbox" id="manageMoimForm_is_not_selected_hot_article" name="is_not_selected_hot_article"><label
					for="manageMoimForm_is_not_selected_hot_article" class="checkbox">글이 공감을 받아도 인기 글 및 HOT 게시물에 선정되지 않음</label>
			</p>
			<input type="button" value="게시판 양도" class="button light floatLeft"> <input type="button" value="게시판 삭제" class="button light floatLeft"> <input
				type="submit" value="수정" class="button">
		</form>
		<form id="transferMoimForm" class="modal">
			<a title="닫기" class="close"></a>
			<h3>게시판 양도</h3>
			<p>
				<label>양도인 비밀번호</label> <input type="password" name="transferer_password" class="text">
			</p>
			<p>
				<label>피양도인 아이디</label> <input type="text" name="transferee_userid" class="text">
			</p>
			<input type="submit" value="양도 요청" class="button">
		</form>
		<form id="attachThumbnailForm" class="modal">
			<a title="닫기" class="close"></a>
			<h3>첨부된 이미지</h3>
			<p>
				<label>설명 추가</label>
				<textarea name="caption" class="text" placeholder="이 이미지에 대한 설명을 입력하세요."></textarea>
			</p>
			<input type="button" value="첨부 삭제" class="button light floatLeft"> <input type="submit" value="설명 저장" class="button">
		</form>
		<form id="messageSend" class="modal">
			<a title="닫기" class="close"></a>
			<h3>쪽지 보내기</h3>
			<p>
				<textarea name="message" class="text" placeholder="내용을 입력해주세요."></textarea>
			</p>
			<input type="submit" value="전송" class="button">
		</form>
	</div>
	<c:import url="../footer.jsp" />