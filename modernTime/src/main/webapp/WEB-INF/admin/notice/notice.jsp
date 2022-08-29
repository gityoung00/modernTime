<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
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
  <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
  <script type="text/javascript" src="/js/common.js"></script>
  <script type="text/javascript" src="/js/community.side.js"></script>
  <script type="text/javascript" src="/js/admin/board.index.js"></script>
  <script type="text/javascript" src="/js/admin/extensions.canvas-to-blob.min.js"></script>
  <script type="text/javascript" src="/js/admin/extensions.load-image.all.min.js"></script>
  <script type="text/javascript" src="/js/admin/message.send.js"></script>
</head>
<body>
<c:import url="../header.jsp" />
<div id="submenu">
	<div class="wrap">
	<font color="red" id = "msg"></font>
		<hr>
	</div>
<!-- 	<input type="hidden" id="communityCampusId" value="349"> -->
</div>
<div id="container" class="article">
	<input type="hidden" id="isUser" value="1"> <input
		type="hidden" id="boardId" value="1">
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

		<a id="writeArticleButton" style="display: block;">새 글을 작성해주세요!</a>
	<div id="noticeList">	
	<!-- 공지리스트 -->

	</div>	
			<div class="clearBothOnly"></div>
		<div class="pagination">
			<a href="/1/p/2" class="prev">이전</a>
			<a href="/1/p/2" class="next">다음</a>
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
			<label>인기 글 금지</label> <input type="checkbox"
				id="manageMoimForm_is_not_selected_hot_article"
				name="is_not_selected_hot_article"><label
				for="manageMoimForm_is_not_selected_hot_article" class="checkbox">글이
				공감을 받아도 인기 글 및 HOT 게시물에 선정되지 않음</label>
		</p>
		<input type="button" value="게시판 양도" class="button light floatLeft">
		<input type="button" value="게시판 삭제" class="button light floatLeft">
		<input type="submit" value="수정" class="button">
	</form>
	<form id="transferMoimForm" class="modal">
		<a title="닫기" class="close"></a>
		<h3>게시판 양도</h3>
		<p>
			<label>양도인 비밀번호</label> <input type="password"
				name="transferer_password" class="text">
		</p>
		<p>
			<label>피양도인 아이디</label> <input type="text" name="transferee_userid"
				class="text">
		</p>
		<input type="submit" value="양도 요청" class="button">
	</form>
	<form id="attachThumbnailForm" class="modal">
		<a title="닫기" class="close"></a>
		<h3>첨부된 이미지</h3>
		<p>
			<label>설명 추가</label>
			<textarea name="caption" class="text"
				placeholder="이 이미지에 대한 설명을 입력하세요."></textarea>
		</p>
		<input type="button" value="첨부 삭제" class="button light floatLeft">
		<input type="submit" value="설명 저장" class="button">
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