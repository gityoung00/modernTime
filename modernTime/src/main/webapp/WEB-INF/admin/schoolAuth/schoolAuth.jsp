<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="adminHeader.jsp"%>
<div id="submenu">
	<div class="wrap">
	</div>
</div>
<div id="container" class="article">
	<input type="hidden" id="isUser" value="1"> <input
		type="hidden" id="boardId" value="1">
	<aside class="none">
		<div class="title">
			<a class="hamburger"></a>
			<h1>
				<a href="/schoolAuth">학교 인증</a>
			</h1>
		</div>
	</aside>
	<div class="wrap title" style="margin: auto; margin-top: 25px;">
		<h1>
			<a href="/schoolAuth">학교 인증</a>
		</h1>
		<hr>
	</div>
	<div class="wrap articles" style="margin: auto; margin-top: 25px;">

	<div id="schoolAuthList">	
	<!-- 학교인증 요청사항 리스트 -->

	</div>	
			<div class="clearBothOnly"></div>
		<div class="pagination">
			<a href="/1/p/2" class="prev">이전</a>
			<a href="/1/p/2" class="next">다음</a>
		</div>
	</div>
	<hr>
<!-- 	<div class="rightside"> -->
<!-- 		<div class="card"> -->
<!-- 			<div class="board"> -->
<!-- 				<h3> -->
<!-- 					<a>실시간 인기 글</a> -->
<!-- 				</h3> -->
<!-- 				<a class="article" href="/370443/v/262015479"> -->
<!-- 				<p class="title">탈광운충들 특</p> -->
<!-- 					<p class="small"> -->
<!-- 						내용 -->
<!-- 					</p> -->
<!-- 					<h4>자유게시판</h4> -->
<!-- 					<ul class="status"> -->
<!-- 						<li class="vote active">19</li> -->
<!-- 						<li class="comment active">9</li> -->
<!-- 					</ul> -->
<!-- 					<hr> -->
<!-- 				</a> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 		<div class="card"> -->
<!-- 			<div class="board"> -->
<!-- 				<h3> -->
<!-- 					<a href="/hotarticle">HOT 게시물<span>더 보기</span></a> -->
<!-- 				</h3> -->
<!-- 				<a class="list" href="/370443/v/262015479"> -->
<!-- 				<time>08/03	10:00</time> -->
<!-- 					<p>탈광운 충들 특</p> -->
<!-- 					<hr> -->
<!-- 				</a> -->
<!-- 				<a class="list" href="/370443/v/261797452"> -->
<!-- 				<time>08/01	12:03</time> -->
<!-- 					<p>의외로 알바한테 하면 실례인 행동</p> -->
<!-- 					<hr> -->
<!-- 				</a> -->
<!-- 				<a class="list" href="/370443/v/261738330"> -->
<!-- 				<time>07/31	20:47</time> -->
<!-- 					<p>오늘의 일기</p> -->
<!-- 					<hr> -->
<!-- 				</a> -->
<!-- 				<a class="list" href="/370443/v/261529808"> -->
<!-- 				<time>07/29	13:27</time> -->
<!-- 					<p>에타 시간표 뜸</p> -->
<!-- 					<hr> -->
<!-- 				</a> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 		<div class="card"> -->
<!-- 			<div class="board"> -->
<!-- 				<h3> -->
<!-- 					<a href="/bestarticle">BEST 게시판<span>더 보기</span></a> -->
<!-- 				</h3> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 		<div class="card"> -->
<!-- 			<div class="board"> -->
<!-- 				<h3> -->
<!-- 					<a href="/lecture">최근 강의평<span>더 보기</span></a> -->
<!-- 				</h3> -->
<!-- 				<a class="article" href="/lecture/view/2086682"><span -->
<!-- 					class="star"><span class="on" style="width: 100%;"></span></span> -->
<!-- 				<p class="title">머신러닝 : 정한울</p> -->
<!-- 					<p class="small">학교 인증 후 확인할 수 있습니다.</p> -->
<!-- 					<hr></a><a class="article" href="/lecture/view/1936809"><span -->
<!-- 					class="star"><span class="on" style="width: 60%;"></span></span> -->
<!-- 				<p class="title">문화기술과사회변동 : 한양대학교 두일철</p> -->
<!-- 					<p class="small">학교 인증 후 확인할 수 있습니다.</p> -->
<!-- 					<hr></a><a class="article" href="/lecture/view/41339"><span -->
<!-- 					class="star"><span class="on" style="width: 60%;"></span></span> -->
<!-- 				<p class="title">교양음악실기1(바이올린) : 배윤진</p> -->
<!-- 					<p class="small">학교 인증 후 확인할 수 있습니다.</p> -->
<!-- 					<hr></a><a class="article" href="/lecture/view/41759"><span -->
<!-- 					class="star"><span class="on" style="width: 80%;"></span></span> -->
<!-- 				<p class="title">중국어청취연습</p> -->
<!-- 					<p class="small">학교 인증 후 확인할 수 있습니다.</p> -->
<!-- 					<hr></a> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	</div> -->
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
<%@ include file="adminFooter.jsp"%>