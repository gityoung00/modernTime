<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="adminHeader.jsp"%>
<div id="submenu">
	<div class="wrap">
	<font color="red" id = "msg"></font>
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
				<a href="/1">공지사항</a>
			</h1>
		</div>
	</aside>
	<div class="wrap title">
		<h1>
			<a href="/1">공지사항</a>
		</h1>
		<hr>
	</div>
	<div class="wrap articles">
		<form class="write" id="f" method="post">
			<p>
				<input name="title" autocomplete="off" placeholder="글 제목"
					class="title" id="text">
			</p>
			<p>
				<textarea name="text" id="text"
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
					class="smallplaceholder"></textarea>
			</p>
			<input class="file" type="file" name="file" multiple="multiple">
			<ol class="thumbnails">
				<li class="new"></li>
			</ol>
			<div class="clearBothOnly"></div>
			<p class="question"><div>질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱 빠르게 답변을 얻을 수 있게 됩니다.<br>또한, 다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이 달린 이후에는 <b>글을 수정 및 삭제할 수 없습니다.</b>
			</div>
			</p>
			<ul class="option">
				<li title="해시태그" class="hashtag"></li>
				<li title="첨부" class="attach"></li>
				<li title="완료"  class="submit"></li>
				<li title="익명" class="anonym active"></li>
				<li title="질문" class="question"></li>
			</ul>
			<div class="clearBothOnly"></div>
		</form>
		<a id="writeArticleButton" style="display: none;">새 글을 작성해주세요!</a>
		
				<article>
					<a class="article" href="/noticeView">
			<h2 class="medium">개인정보 처리방침 개정 안내</h2>
				<time class="small">06/07 16:51</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">3</li>
					<li title="공감" class="vote">6</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="254951379_comment_anonym" value="0">
					</a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/254950492"><h2 class="medium">서비스
					이용약관 개정 안내</h2>
				<time class="small">06/07 16:46</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">6</li>
					<li title="공감" class="vote">5</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="254950492_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/239610975"><h2 class="medium">주기적
					재인증에 관한 안내</h2>
				<time class="small">03/14 11:18</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">127</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="239610975_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/224236731"><h2 class="medium">오픈채팅을
					이용한 각종 피해 예방 안내</h2>
				<time class="small">21/12/27 13:55</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">411</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="224236731_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/196550620"><h2 class="medium">6/21(월)
					게시판 오류에 따른 롤백 안내</h2>
				<time class="small">21/06/21 13:51</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">18</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="196550620_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/165667408"><h2 class="medium">시사·이슈
					게시판 개설 및 커뮤니티 이용규칙 개정 안내</h2>
				<time class="small">21/02/08 14:25</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">483</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="165667408_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/157445147"><h2 class="medium">에브리타임
					커뮤니티 이용규칙 업데이트 안내</h2>
				<time class="small">20/12/15 18:12</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">1</li>
					<li title="공감" class="vote">30</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="157445147_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/122347989"><h2 class="medium">5/19(화)
					서비스 장애 공지</h2>
				<time class="small">20/05/19 14:43</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">20</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="122347989_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/121410378"><h2 class="medium">익명
					시스템 업데이트 안내</h2>
				<time class="small">20/05/13 17:59</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">1</li>
					<li title="공감" class="vote">1621</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="121410378_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/108413053"><h2 class="medium">커뮤니티
					이용규칙 업데이트 안내</h2>
				<time class="small">20/03/10 16:17</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">16</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="108413053_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/107029575"><h2 class="medium">서비스
					보안 강화 조치에 따른 본인인증 안내</h2>
				<time class="small">20/03/03 11:27</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">20</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="107029575_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/99865628"><h2 class="medium">에브리타임
					10주년 돌아보기</h2>
				<time class="small">20/01/17 17:18</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">11</li>
					<li title="공감" class="vote">174</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="99865628_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/57387234"><h2 class="medium">에브리타임
					개인정보 처리방침 개정 안내</h2>
				<time class="small">19/11/12 10:13</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">1</li>
					<li title="공감" class="vote">0</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="57387234_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/53003056"><h2 class="medium">에브리타임
					개인정보 처리방침 개정 안내</h2>
				<time class="small">18/09/17 18:42</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">1</li>
					<li title="공감" class="vote">2</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="53003056_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/40942051"><h2 class="medium">3/26(월)
					로그인 해제 (사용자 인증 정보 오류) 안내</h2>
				<time class="small">18/03/26 15:48</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">11</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="40942051_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/36933890"><h2 class="medium">2/7(수)
					익명 작성 오류 안내</h2>
				<time class="small">18/02/08 00:52</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">10</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="36933890_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/34656985"><h2 class="medium">강의평가/시험정보
					작성 이벤트! &lt;리틀 카카오 인형&gt; 받아가세요~</h2>
				<time class="small">17/12/20 15:39</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li class="attach">1</li>
					<li title="공감" class="vote">118</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="34656985_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/33981418"><h2 class="medium">12/8(금)
					서비스 장애 공지</h2>
				<time class="small">17/12/08 02:20</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">0</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="33981418_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/33227058"><h2 class="medium">게시판
					신설 안내</h2>
				<time class="small">17/11/21 10:49</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">2</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="33227058_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		<article>
			<a class="article" href="/1/v/32460087"><h2 class="medium">11/2(목)
					알림 반복 발송 오류 수정 공지</h2>
				<time class="small">17/11/02 17:25</time>
				<h3 class="admin small">에브리타임</h3>
				<ul class="status">
					<li title="공감" class="vote">0</li>
					<li title="댓글" class="comment">0</li>
				</ul>
				<hr>
				<input type="hidden" name="32460087_comment_anonym" value="0"></a>
			<div class="comments"></div>
		</article>
		
			
			<div class="clearBothOnly"></div>
		<div class="pagination">
			<a href="/1/p/2" class="prev">이전</a>
			<!-- 관리자만 보이게 -->
			<div>
				<button onclick="location.href='noticeRegist'">등록</button>
			</div>
			<a href="/1/p/2" class="next">다음</a>
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
					<p class="small">
						내용
					</p>
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
				<a class="list" href="/370443/v/262015479">
				<time>08/03	10:00</time>
					<p>탈광운 충들 특</p>
					<hr>
				</a>
				<a class="list" href="/370443/v/261797452">
				<time>08/01	12:03</time>
					<p>의외로 알바한테 하면 실례인 행동</p>
					<hr>
				</a>
				<a class="list" href="/370443/v/261738330">
				<time>07/31	20:47</time>
					<p>오늘의 일기</p>
					<hr>
				</a>
				<a class="list" href="/370443/v/261529808">
				<time>07/29	13:27</time>
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
<%@ include file="adminFooter.jsp"%>