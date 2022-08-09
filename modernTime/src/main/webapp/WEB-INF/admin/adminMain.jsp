<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ include file="adminHeader.jsp"%>


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
		<input type="hidden" id="communityCampusId" value="349">	</div>
  <div id="container" class="community">
    <aside class="none">
      <form class="search">
        <input type="search" name="keyword" class="text" placeholder="전체 게시판의 글을 검색하세요!">
      </form>
      <div class="title">
        <a class="hamburger"></a>
        <h1>KG아이티대 에브리타임</h1>
        <ol class="buttons">
          <li><a id="searchArticle">글 검색</a></li>
        </ol>
      </div>
    </aside>
    <div class="banners">
      <a href="https://ad.everytime.kr/adClick?adToken=lxpDJl6bItihsyBdi7K8d7WP9Y%2BShBPaK0pXpv4jPIeg4aPIFoZhEXOr8oemGJqt%2FZJ2tXr7smLnXaMBSYN8ff33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FRG2VxE1aJBhdIGTOv%2BT1q1aJz52Mlg%2BUDFG5PEHfdu7krr8zFDd5UgTlixNPESlI0%2Fxk3aphAcITbufrf4wLzX"><img src="https://cf-eba.everytime.kr/20220801_SAMSUNG_GalaxyStudio_CampusCurator_home.jpg"></a>
    </div>
    <div class="leftside">
      <div class="card pconly">
        <form class="logged">
          <img src="https://cf-fpi.everytime.kr/0.png" class="picture">
          <p class="nickname">admin</p>
          <p class="school">관리자</p>
          <p class="school">KG아이티대학</p>
          <ul class="buttons">
            <li><a href="/my">내 정보</a></li>
            <li><a href="/adminLogout">로그아웃</a></li>
          </ul>
          <hr>
        </form>
      </div>
      <div class="card">
        <div class="menus">
          <a href="/myarticle" class="myarticle">내가 쓴 글</a>
          <a href="/mycommentarticle" class="mycommentarticle">댓글 단 글</a>
          <a href="/myscrap" class="myscrap">내 스크랩</a>
          <hr>
        </div>
      </div>
      <div class="card">
        <div class="banner">
          <a href="https://ad.everytime.kr/adClick?adToken=eCzErsV%2BkyHjuDGgfclTCET5SGAqEZ3dA0PBZflngwDH3Lx6U%2BtMTRd9P5aSE6jqUYRHFQaAkPQLvT7DzdRVqP33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FRKFIIsFnG3P%2B4uk700NL9NaNeHkMH5OA%2BSNudcSKHs5pyz7ChwrrWHHiwyICejbTxQP4GRllEaqZmqYlHWROoa"><img src="https://cf-eba.everytime.kr/20220801_Adobe_aespa_card.jpg"></a>
        </div>
      </div>
      <div class="card">
        <div class="banner">
          <a href="https://ad.everytime.kr/adClick?adToken=eCzErsV%2BkyHjuDGgfclTCET5SGAqEZ3dA0PBZflngwDH3Lx6U%2BtMTRd9P5aSE6jqUYRHFQaAkPQLvT7DzdRVqP33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FSIwfn4%2BnI9UewBsPEcR%2BrU3JQSlgxEJksnIfjRLJMocYfieFqf4loU%2BgszaSbQRfsOvQhnkPpbdoqgOSvHHUIt"><img src="https://cf-eba.everytime.kr/20220801_SEVENNIGHTS_TheFirst_card.jpg"></a>
        </div>
      </div>
      <div class="card">
        <div class="banner">
          <a href="https://ad.everytime.kr/adClick?adToken=eCzErsV%2BkyHjuDGgfclTCET5SGAqEZ3dA0PBZflngwDH3Lx6U%2BtMTRd9P5aSE6jqUYRHFQaAkPQLvT7DzdRVqP33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FQE4d5%2FmT%2BmxD8TwNehd0oVsI%2Fb7xE4YabTXtDbhw0DG88fI63Epg1%2BTLKjfuyHUKdmAQmRVV8UNWN1HUVJ00kE"><img src="https://cf-eba.everytime.kr/homecard220704.png"></a>
        </div>
      </div>
    </div>
    <div class="rightside"></div>
    <div class="main"></div>
  </div>
<%@ include file="adminFooter.jsp"%>