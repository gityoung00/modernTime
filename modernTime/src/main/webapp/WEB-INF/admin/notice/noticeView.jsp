<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
	<%pageContext.setAttribute("replaceChar", "\n"); %>
<c:import url="header.jsp" />
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
		<article>
			<a class="article">
			<img src="https://cf-fpi.everytime.kr/5/1579249303.png"	class="picture large">
			<div class="profile">
					<h3 class="admin large">에브리타임</h3>
					<time class="large">${noticeView.create_date}</time>
				</div>
				<ul class="status">
					<li class="messagesend" data-modal="messageSend"
						data-article-id="254951379" data-is-anonym="0">쪽지</li>
					<li class="abuse">신고</li>
				</ul>
				<hr>
				<h2 class="large">${noticeView.title }</h2>
				<p class="large">
					${fn:replace(noticeView.content,replaceChar,"<br/>") }
				</p>
				<div class="attaches multiple">
					<figure class="attach">
						<img
							src="https://cf-ea.everytime.kr/attach_thumbnail/19/50441461/everytime-web-1654588269349.jpg?Expires=1659516090&amp;Key-Pair-Id=APKAICU6XZKH23IGASFA&amp;Signature=KGh66K7RHzodCAsrFPWPKnesAi4uqnmtpxYbL10rir4WKRpxHr83ynWRAuvTMMk0jpVNz3tZ9mVVSxdAB~W38t8Ykyzdf-FPw7wdWhYOl2iCEH4xIwHTHezGQX2-J7sbxh3XV2QRR2jcVpxZbLP9dNXr3YtYM1ZwDY4lmLNmVi20XHNCjmPTflg72lF~5Ufp6PRNxr8C1tBX2e-71hzKEmSsQpjMLFo0TJpjYujGDYsiLy4HY75Cu-twWiz8wO53oNSeDiS2DPgUplbNgfXZWG2TScZRZvOCGfa9IlG24BN7ehtfd8mB4MWRaCJLOAa8PADiN6AGPtWT7X2d4nWmjQ__">
					</figure>
					<figure class="attach">
						<img
							src="https://cf-ea.everytime.kr/attach_thumbnail/814/50441462/everytime-web-1654588269349.jpg?Expires=1659516090&amp;Key-Pair-Id=APKAICU6XZKH23IGASFA&amp;Signature=Zu0sGefoc5Nd1mDK9FCTluo3otnVG9vmsKD6UKl4J2HsNFT96ctzc7HOkgBmRB2MMQwcFNsZUfS23FNpZ1DEJtBoiX6SOK9sPlT0p9I-tlm8pKlX9~QC~PGXzqhvDmZ1rvxKck0e6nndxrZuINUBFlBoUkAh77WNfvGX86rdZ2UWDJ--yFrDGu8vZuvp40m4FJJ3HJRK6BKlXWGwvjeYwra6ENv7lzIIvGUl29N~4jgSqIWSP8oaSBAxSb01Jk~PltdFFdPtexj-PBqqKGFjs4ve0dmi22aFk-wO~mdQB8TyCXbGqPEH~F8SMD3lk0dWJyWZjkBgnSFmwVFQmmOT0Q__">
					</figure>
					<figure class="attach">
						<img
							src="https://cf-ea.everytime.kr/attach_thumbnail/146/50441463/everytime-web-1654588269355.jpg?Expires=1659516090&amp;Key-Pair-Id=APKAICU6XZKH23IGASFA&amp;Signature=fQUTS6kCZ706ON7WYEM8yVRAEVCecRIiaHnJkn8ZktY7wIE718mcPMMoQ3rMnSvMM2gRyjspJ3trnW5DOiJTdrpe11pe2hh~soeoeW5p5c61ApppJbjgkfw1WvUb4gVChoyCBMlpog6N0j2~Ln2GkqHa~1nPsnPn2-QcgEfy4r506V18rVHqJhFHxrpnkO~vaW9jp-cyFytH9cCX2vUXazKzF6vC1KQG4s6spZ9Py7Jca8gU8Hh1BjeZEFfoYQeXxGk8hv28-h8DFVf41wha7lSQGpkVZVr0Liv6~u6-dRrjWIEVNYAv1IAu-71Wp7TMTIDlPpDMbQH0F27HmBX2LA__">
					</figure>
				</div>
				<hr>
				<hr>
				<div class="buttons">
					<span class="posvote">공감</span><span class="scrap">스크랩</span>
				</div>
				<input type="hidden" name="254951379_comment_anonym" value="0"></a>
			<div class="comments" style="display: block;"></div>
		</article>
		<div class="clearBothOnly"></div>
		<div class="pagination">
			<a id="goListButton" class="list" href="notice">글 목록</a>
			<!-- article.css 관리자만 보이게 -->
			<a id="deleteButton" href="noticeDelete?id=${noticeView.id}">글 삭제</a>
			<a id="updateButton" href="noticeUpdate?id=${noticeView.id}">글 수정</a>
		</div>
	</div>
	<hr>
	<div class="rightside">
		<div class="card">
			<div class="board">
				<h3>
					<a>실시간 인기 글</a>
				</h3>
				<a class="article" href="/370443/v/262015479">
					<p class="title">탈광운충들 특</p>
					<p class="small">내용</p>
					<h4>자유게시판</h4>
					<ul class="status">
						<li class="vote active">19</li>
						<li class="comment active">9</li>
					</ul>
					<hr>
				</a>
			</div>
		</div>
		<div class="card">
			<div class="board">
				<h3>
					<a href="/hotarticle">HOT 게시물<span>더 보기</span></a>
				</h3>
				<a class="list" href="/370443/v/262015479"> <time>08/03
						10:00</time>
					<p>탈광운 충들 특</p>
					<hr>
				</a> <a class="list" href="/370443/v/261797452"> <time>08/01
						12:03</time>
					<p>의외로 알바한테 하면 실례인 행동</p>
					<hr>
				</a> <a class="list" href="/370443/v/261738330"> <time>07/31
						20:47</time>
					<p>오늘의 일기</p>
					<hr></a> <a class="list" href="/370443/v/261529808"> <time>07/29
						13:27</time>
					<p>에타 시간표 뜸</p>
					<hr>
				</a>
			</div>
		</div>
		<div class="card">
			<div class="board">
				<h3>
					<a href="/bestarticle">BEST 게시판<span>더 보기</span></a>
				</h3>
			</div>
		</div>
		<div class="card">
			<div class="board">
				<h3>
					<a href="/lecture">최근 강의평<span>더 보기</span></a>
				</h3>
				<a class="article" href="/lecture/view/2086682"><span
					class="star"><span class="on" style="width: 100%;"></span></span>
					<p class="title">머신러닝 : 정한울</p>
					<p class="small">학교 인증 후 확인할 수 있습니다.</p>
					<hr></a><a class="article" href="/lecture/view/1936809"><span
					class="star"><span class="on" style="width: 60%;"></span></span>
					<p class="title">문화기술과사회변동 : 한양대학교 두일철</p>
					<p class="small">학교 인증 후 확인할 수 있습니다.</p>
					<hr></a><a class="article" href="/lecture/view/41339"><span
					class="star"><span class="on" style="width: 60%;"></span></span>
					<p class="title">교양음악실기1(바이올린) : 배윤진</p>
					<p class="small">학교 인증 후 확인할 수 있습니다.</p>
					<hr></a><a class="article" href="/lecture/view/41759"><span
					class="star"><span class="on" style="width: 80%;"></span></span>
					<p class="title">중국어청취연습</p>
					<p class="small">학교 인증 후 확인할 수 있습니다.</p>
					<hr></a>
			</div>
		</div>
	</div>
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