<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

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
  <meta name="keywords" content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
  <meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
  <meta name="robots" content="noindex">
  <link type="text/css" href="/css/common.css" rel="stylesheet">
  <link type="text/css" href="/css/common.partial.css" rel="stylesheet">
  <link type="text/css" href="/css/container.article.css" rel="stylesheet">
  <link type="text/css" href="/css/container.community.css" rel="stylesheet">
  <link type="text/css" href="/css/container.modal.css" rel="stylesheet">
  <link href="/favicon.ico" rel="shortcut icon">
  <!--[if lt IE 9]>
  <script src="/js/extensions.html5shiv.js"></script>
  <script src="/js/extensions.respond.min.js"></script>
  <script src="/js/extensions.excanvas.min.js"></script>
  <![endif]-->
  <!--[if lt IE 8]>
  <script src="/js/extensions.json3.min.js"></script>
  <![endif]-->
  <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
  <script type="text/javascript" src="/js/common.js"></script>
  <script type="text/javascript" src="/js/extensions.canvas-to-blob.min.js"></script>
  <script type="text/javascript" src="/js/extensions.load-image.all.min.js"></script>
  <script type="text/javascript" src="/js/post/board.freedomContent.js"></script>
  <script type="text/javascript" src="/js/community.side.js"></script>
  <script type="text/javascript" src="/js/message.send.js"></script>
</head>
<body style="">

<nav>
    <div class="wrap">
      <div id="logo">
        <a href="/"><img src="/images/new/nav.logo.png"></a>
        <p><span class="name multiple">에브리타임</span><span class="subname">KG IT대</span></p>
      </div>
      <div id="account">
        <a href="/message" title="쪽지함" class="icon message">쪽지함</a></li>
        <a href="/my" title="내 정보" class="icon my">내 정보</a>
        <input type="hidden" id="userUserid" value="diharet">
        <input type="hidden" id="userSchool" value="316">
        <input type="hidden" id="userCampus" value="349">
      </div>
      <ul id="menu">
        <li class="active"><a href="/freedom">게시판</a></li>
        <li><a href="/timetable">시간표</a></li>
        <li><a href="/lecture">강의평가</a></li>
        <li><a href="/calculator">학점계산기</a></li>
        <li><a href="/friend">친구</a></li>
        <li><a href="https://bookstore.everytime.kr/">책방</a></li>
        <li><a href="https://www.campuspick.com/">캠퍼스픽</a></li>
      </ul>
    </div>
  </nav>

<div id="submenu">
	<div class="wrap">
		<div class="divider"></div>
		<div class="group">
			<ul>
				<li><a href="/freedom" data-id="393862" class="new">자유게시판</a></li>
				<li><a href="/secret" data-id="259677" class="new">비밀게시판</a></li>
				<li><a href="/graduate" data-id="420831" class="new">졸업생게시판</a></li>
				<li><a href="/freshman" data-id="412735" class="new">새내기게시판</a></li>
				<li><a href="/marketplace" data-id="420924" class="new">장터게시판</a></li>
				<li><a href="/info" data-id="259679">정보게시판</a></li>
				<li><a href="/promotional" data-id="367739">홍보게시판</a></li>
			</ul>
		</div>
		<div class="group">
			<ul>
				<li><a href="/issue" data-id="482868">시사·이슈</a></li>
				<li><a href="/club" data-id="419065">동아리·학회</a></li>
			</ul>
		</div>
		<div class="divider"></div>
		<div class="group">
			<ul>
				<li><a href="/job" data-id="420832">취업·진로</a></li>
			</ul>
		</div>
		<div class="divider"></div>
		<div class="group">
			<ul>
				<li><a href="/517659" data-id="517659" class="new">중앙비상대책위원회</a></li>
				<li><a href="/495030" data-id="495030">동아리연합회</a></li>
				<li><a href="/483540" data-id="483540">방송국</a></li>
				<li><a href="/509240" data-id="509240">대의원회</a></li>
			</ul>
		</div>
		<div class="divider"></div>
		<div class="group">
			<ul>
				<li><a href="/462203" data-id="462203" class="new">간호학과 게시판</a></li>
				<li><a href="/465278" data-id="465278" class="new">치위생학과 게시판</a></li>
				<li><a href="/455159" data-id="455159" class="new">퀴어</a></li>
				<li><a href="/455305" data-id="455305">애니/만화 게시판</a></li>
				<li><a href="/community/search" class="search">게시판 찾기</a></li>
			</ul>
		</div>
		<div class="divider"></div>
		<hr>
	</div>
	<input type="hidden" id="communityCampusId" value="223">
</div>
<!-- 게시판 시작 -->
<div id="container" class="article">
	<input type="hidden" id="isUser" value="1"> 
	<input type="hidden" id="boardId" value="${post.id }">
	<input type="hidden" id="commentId" value="${comment.id }">
	<input type="hidden" id="postTitle" value="${post.title }">
	<input type="hidden" id="postContent" value="${post.content }">
	<aside class="none">
		<div class="title">
			<a class="hamburger"></a>
			<h1>
				<a href="/freedom">자유게시판</a>
			</h1>
		</div>
	</aside>
	<div class="wrap title">
		<h1>
			<a href="/freedom">자유게시판</a>
		</h1>
		<hr>
	</div>
	<div class="wrap articles">
		<!-- 수정버튼 누르면 생기는 -->
		<%-- <form id="modify" class="write" action="modifyProc" method="post">
			<p>
				<input name="modifyTitle" autocomplete="off" placeholder="글 제목" class="title" value="${post.title }">
			</p>
			<p>
				<textarea name="modifyText"
					placeholder="에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다. 

아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다. 

※ 정치·사회 관련 행위 금지 
- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위 
- 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위 
- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위 
- 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위 
* 해당 게시물은 시사·이슈 게시판에만 작성 가능합니다. 

※ 홍보 및 판매 관련 행위 금지 
- 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위 
- 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위 
* 해당 게시물은 홍보게시판에만 작성 가능합니다. 

※ 그 밖의 규칙 위반 
- 타인의 권리를 침해하거나 불쾌감을 주는 행위 
- 범죄, 불법 행위 등 법령을 위반하는 행위 
- 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위 
- 음란물, 성적 수치심을 유발하는 행위 
- 스포일러, 공포, 속임, 놀라게 하는 행위 "
					class="smallplaceholder">${post.content }</textarea>
			</p>
			<input class="file" type="file" name="file" multiple="multiple">
			<ol class="thumbnails">
				<li class="new"></li>
			</ol>
			<div class="clearBothOnly"></div>
			<p class="question">
			<div>
				질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱 빠르게 답변을 얻을 수 있게 됩니다.<br>또한,
				다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이 달린 이후에는 <b>글을 수정 및 삭제할 수 없습니다.</b>
			</div>
			</p>
			<ul class="option">
				<li title="해시태그" class="hashtag"></li>
				<li title="첨부" class="attach"></li>
				<li title="완료" class="submit"></li>
				<li title="익명" class="anonym active"></li>
				<li title="질문" class="question"></li>
			</ul>
			<div class="clearBothOnly"></div>
			<input type="hidden" name="article_id" value="262767917">
		</form> --%>		
		<!-- <a id="writeArticleButton" style="display: block;">새 글을 작성해주세요!</a> -->



		<!-- 글 시작 -->
		<article>
			<a class="article"> 
			<img src="https://cf-fpi.everytime.kr/0.png" class="picture large">
				<div class="profile">
					<c:choose>
						<c:when test="${post.is_anonym == 1 }">
							<h3 class="large">익명</h3>
						</c:when>
						<c:otherwise>
							<h3 class="large">${post.user_id }</h3>
						</c:otherwise>
					</c:choose>
					<time class="large">${post.create_date }</time>
				</div>
				<ul class="status">
					<li class="update">수정</li>
					<li class="del">삭제</li>
					<li class="messagesend" data-modal="messageSend" data-article-id="262053749" data-is-anonym="1">쪽지</li>
					<!-- <li class="abuse">신고</li> -->
				</ul>
				<hr>
				<h2 class="large">${post.title }</h2>
				<p class="large">${post.content }</p>
				<ul class="status left">
					<li title="공감" class="vote">${post.like_count }</li>
					<li title="댓글" class="comment">${post.comment_count }</li>
					<li title="스크랩" class="scrap">${post.scrap_count }</li>
				</ul>
				<hr>
				<div class="buttons">
					<span class="posvote">공감</span><span class="scrap">스크랩</span>
				</div> <input type="hidden" name="262053749_comment_anonym" value="0">
			</a>

			<!-- 댓글 시작 -->
			<div class="comments" style="display: block;">
				<%-- <article class="parent">
					<img src="https://cf-fpi.everytime.kr/0.png" class="picture medium">
					<h3 class="medium">익명${comment.p_comment_id }</h3>
					<ul class="status">
						<li class="childcomment">대댓글</li>
						<li class="commentvote">공감</li>
						<li class="messagesend" data-modal="messageSend"
							data-comment-id="${comment.id }"
							data-is-anonym="${comment.is_anonym }">쪽지</li>
						<li class="abuse">신고</li>
					</ul>
					<hr>
					<p class="large">
						내용${comment.comment }
					</p>
					<time class="medium">시간${comment.create_date }</time>
					<ul class="status commentvotestatus">
						<li class="vote commentvote" style="display: list-item;">1</li>
					</ul>
				</article> --%>

				<!-- 대댓글 -->
				<%-- <article class="child">
					<img src="https://cf-fpi.everytime.kr/0.png" class="picture medium">
					<h3 class="medium writer">익명(글쓴이)</h3>
					<ul class="status">
						<li class="commentvote">공감</li>
						<li class="messagesend" data-modal="messageSend"
							data-comment-id="1221869276" data-is-anonym="1">쪽지</li>
						<li class="abuse">신고</li>
					</ul>
					<hr>
					<p class="large">아하 내가 너무 급했나보네! 알려줘서 고마워ㅎㅎ😄${comment.comment }</p>
					<time class="medium">08/03 17:16</time>
					<ul class="status commentvotestatus">
						<li class="vote commentvote" style="display: none;">0</li>
					</ul>
					<!-- ::after -->
				</article> --%>
				
				<!-- 대댓글 입력 부분 -->
<!-- 				<form class="writecomment child">
					<input type="text" name="text" maxlength="300" autocomplete="off"
						placeholder="대댓글을 입력하세요." class="text">
					<ul class="option">
						<li title="익명" class="anonym"></li>
						<li title="완료" class="submit"></li>
					</ul>
					<div class="clearBothOnly"></div>
				</form> -->

				<!-- 댓글 입력 부분 -->
				<!-- <form class="writecomment"> -->
					<!-- <input type="text" name="text" maxlength="300" autocomplete="off"
						placeholder="댓글을 입력하세요." class="text">
					<ul class="option">
						<li title="익명" class="anonym"></li>
						<li title="완료" class="submit"></li>
					</ul>
					<div class="clearBothOnly"></div> 
				</form>-->
			</div>
		</article>


		<div class="clearBothOnly"></div>
		<div class="pagination">
			<a id="goListButton" class="list" href="freedom">글 목록</a>
		</div>
	</div>
	<hr>
	<div class="rightside">
		<div class="card">
			<div class="board">
				<h3>
					<a href="/hotarticle">HOT 게시물<span>더 보기</span></a>
				</h3>
				<a class="list" href="/434318/v/261013284"><time>07/24
						04:19</time>
					<p>8월이 다가오니까 우울해</p>
					<hr></a><a class="list" href="/freedom/v/260971980"><time>07/23
						19:51</time>
					<p>몇일 전 강아지 주인 찾는 글을 올렸던 사람입니다.</p>
					<hr></a><a class="list" href="/434318/v/260929953"><time>07/23
						05:10</time>
					<p>안녕하세용~!! 4학년 칭구들!!</p>
					<hr></a><a class="list" href="/freedom/v/260444979"><time>07/18
						11:31</time>
					<p>강아지 주인을 찾습니다</p>
					<hr></a>
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
					<a>학교 소식</a>
				</h3>
				<a class="article" href="/517659/v/262014282"><p>
						안녕하십니까<br>에브리타임 게시판을 통해서 앞으로 축제와 총학업무관련 정보를 올릴 예정이니 많은
					</p>
					<h4>중앙비상대책위원회</h4>
					<ul class="status">
						<li class="vote active">5</li>
						<li class="comment active">0</li>
					</ul>
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
<%@ include file="../footer.jsp"%>
