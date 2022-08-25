<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
  <link type="text/css" href="/css/common.css" rel="stylesheet">
  <link type="text/css" href="/css/common.partial.css" rel="stylesheet">
  <link type="text/css" href="/css/container.community.css" rel="stylesheet">
  <link type="text/css" href="/css/container.modal.css" rel="stylesheet">
  <link type="text/css" href="/css/admin/school.auth.css" rel="stylesheet">

  <link href="/favicon.ico" rel="shortcut icon">
  <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
  <script type="text/javascript" src="/js/common.js"></script>
  <script type="text/javascript" src="/js/community.side.js"></script>
  <script type="text/javascript" src="/js/admin/board.index.js"></script>
  <script type="text/javascript" src="/js/admin/extensions.canvas-to-blob.min.js"></script>
  <script type="text/javascript" src="/js/admin/extensions.load-image.all.min.js"></script>
  <script type="text/javascript" src="/js/admin/message.send.js"></script>
  <script type="text/javascript" src="/js/admin/school.auth.detail.js"></script>
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
</div>
<div id="container" class="article">
 	<input type="hidden" id="isUser" value="1"> <input
		type="hidden" id="boardId" value="9999">
	<aside class="none">
		<div class="title">
			<a class="hamburger"></a>
			<h1>
				<a href="/schoolAuth">학교 인증</a>
			</h1>
		</div>
	</aside>
	<div class="wrap title">
		<h1>
			<a href="/schoolAuth">학교 인증</a>
		</h1>
		<hr>
	</div>
	<div class="wrap articles">
		<article>
			<a class="article">
			<img src="https://cf-fpi.everytime.kr/5/1579249303.png"	class="picture large">
			<div class="profile">
					<h3 class="admin large">${schoolAuthView.user_id}</h3>
					<time class="large"></time>
			</div>
				<hr>
					<h2 class="large">${schoolAuthView.type == 'freshmen' ? '합격자 인증' : (schoolAuthView.type == 'student' ? '재학생 인증' : '졸업생 인증')}</h2>
					<p class="large">
<%-- 					<img src=${schoolAuthView.picture }> --%>
				</p>
				<div class="attaches multiple">
					<figure class="attach">
						<img
							src="${schoolAuthView.picture }">
					</figure>
				</div>
				<hr>
				<hr>
				<input type="hidden" name="254951379_comment_anonym" value="0"></a>
			<div class="comments" style="display: block;"></div>
		</article>
		<div class="clearBothOnly"></div>
		<div class="pagination">
			<a id="goListButton" class="list" href="/school/auth">글 목록</a>
			<!-- article.css 관리자만 보이게 -->
			<c:if test="${schoolAuthView.is_checked == 0 }">
				<a id="AuthButton" class="before">인증하기</a>
			</c:if>
			<c:if test="${schoolAuthView.is_checked == 1 }">
				<a id="AuthButton" class="complete">인증하기</a>
			</c:if>
		</div>
	</div>
	<hr>
	<!-- rightSide -->
	<c:import url="../../rightSide.jsp" />
	<!-- //rightSide -->
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