<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../header.jsp"%>
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
	<input type="hidden" id="boardId" value="freedom">
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
		<form id="write" class="write" action="writeProc" method="post" >
			<p><input name="title" autocomplete="off" placeholder="글 제목" class="title"></p>
			<p>
				<textarea name="text" placeholder="에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다. 

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
- 스포일러, 공포, 속임, 놀라게 하는 행위 " class="smallplaceholder"></textarea>
			</p>
			<input class="file" type="file" name="file" multiple="multiple">
			<ol class="thumbnails">
				<li class="new"></li>
			</ol>
			<div class="clearBothOnly"></div>
			<p class="question">
				<div>질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱 빠르게 답변을 얻을 수 있게 됩니다.<br>
					또한, 다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이 달린 이후에는 <b>글을 수정 및 삭제할 수 없습니다.</b>
				</div>
			</p>
			<ul class="option">
				<li title="해시태그" class="hashtag"></li>
				<li title="첨부" class="attach"></li>
				<li title="완료" class="submit"></li>
				<li title="익명" class="anonym"></li>
				<li title="질문" class="question"></li>
			</ul>
			<div class="clearBothOnly"></div>
		</form>
		<a id="writeArticleButton" style="display: none;">새 글을 작성해주세요!</a>
		
		<!-- 글 시작 -->
		<c:forEach var="post" items="${sessionScope.listProc }">
			<article>
			<a class="article" href="/freedomContent?id=${post.id }">
				<h2 class="medium">${post.title }</h2>
				<p class="small">${post.content }</p>
				<time class="small">${post.createDate }</time>
				<h3 class="small">익명</h3>
				<ul class="status">
					<li title="공감" class="vote">${post.likeCount }</li>
					<li title="댓글" class="comment">2</li>
				</ul>
				<hr>
				<input type="hidden" name="262053749_comment_anonym" value="0">
			</a>
			<div class="comments"></div>
			</article>
		</c:forEach>
		
		<div class="clearBothOnly"></div>
		<!-- 검색과 페이지 -->
		<div class="pagination">
			<form id="searchArticleForm" class="search">
				<select name="search_type">
					<option value="4">전체</option>
					<option value="3">해시태그</option>
					<option value="2">글 제목</option>
					<option value="1">글 내용</option>
				</select>
				<input name="keyword" placeholder="검색어를 입력하세요." class="text">
			</form>
			<a href="/freedom/p/2" class="next">다음</a>
		</div>
	</div>
	<hr>
	<!-- 오른쪽 HOT 게시물(공감 10개)  -->
	<div class="rightside">
		<div class="card">
			<div class="board">
				<h3>
					<a href="/hotarticle">HOT 게시물<span>더 보기</span></a>
				</h3>
				<a class="list" href="/434318/v/261013284">
					<time>07/24	04:19</time>
					<p>8월이 다가오니까 우울해</p>
					<hr>
				</a>
				<a class="list" href="/freedom/v/260971980">
					<time>07/23 19:51</time>
					<p>몇일 전 강아지 주인 찾는 글을 올렸던 사람입니다.</p>
					<hr>
				</a>
			</div>
		</div>
		<!-- BEST 게시판(공감 100개) -->
		<div class="card">
			<div class="board">
				<h3>
					<a href="/bestarticle">BEST 게시판<span>더 보기</span></a>
				</h3>
			</div>
		</div>
		<!-- 학교 소식 -->
		<div class="card">
			<div class="board">
				<h3>
					<a>학교 소식</a>
				</h3>
				<a class="article" href="/517659/v/262014282">
					<p>
						안녕하십니까 방송국입니다<br>
						에브리타임 게시판을 통해서 앞으로 축제와 여러정보를 올릴 예정이니 많관부
					</p>
					<h4>방송국</h4>
					<ul class="status">
						<li class="vote active">5</li>
						<li class="comment active">0</li>
					</ul>
					<hr>
				</a>
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
			<label>인기 글 금지</label> 
			<input type="checkbox" id="manageMoimForm_is_not_selected_hot_article" name="is_not_selected_hot_article">
			<label for="manageMoimForm_is_not_selected_hot_article" class="checkbox">
				글이 공감을 받아도 인기 글 및 HOT 게시물에 선정되지 않음
			</label>
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
