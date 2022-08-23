<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:import url="./common/loginRequired.jsp" />
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
<link type="text/css" href="/css/container.community.css" rel="stylesheet">
<link href="/favicon.ico" rel="shortcut icon">
<!--[if lt IE 9]>
  <script src="/js/extensions.html5shiv.js"></script>
  <script src="/js/extensions.respond.min.js"></script>
  <script src="/js/extensions.excanvas.min.js"></script>
  <![endif]-->
<!--[if lt IE 8]>
  <script src="/js/extensions.json3.min.js"></script>
  <![endif]-->
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/index.js"></script>
<script type="text/javascript" src="/js/community.side.js"></script>
<script type="text/javascript" src="/js/community.index.js"></script>
</head>
<body>
	<script>
		var msg = "${msg }";
		console.log(msg);
		if (msg) {
			alert(msg);
		}
	</script>
	<nav>
		<div class="wrap">
			<div id="logo">
				<a href="/"><img src="/images/new/nav.logo.png"></a>
				<p>
					<span class="name multiple">에브리타임</span><span class="subname">울산과학대</span>
				</p>
			</div>
			<div id="account">
				<a href="/message" title="쪽지함" class="icon message">쪽지함</a>
				</li> <a href="/my" title="내 정보" class="icon my">내 정보</a> <input type="hidden" id="userUserid" value="diharet"> <input type="hidden" id="userSchool"
					value="316"> <input type="hidden" id="userCampus" value="349">
			</div>
			<ul id="menu">
				<li class="active"><a href="/">게시판</a></li>
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
			<ul>
				<li><a href="/freedom" data-id="393862" class="new">자유게시판</a></li>
				<li><a href="/259677" data-id="259677" class="new">비밀게시판</a></li>
				<li><a href="/420831" data-id="420831" class="new">졸업생게시판</a></li>
				<li><a href="/412735" data-id="412735" class="new">새내기게시판</a></li>
				<li><a href="/482868" data-id="482868">시사·이슈</a></li>
				<li><a href="/420924" data-id="420924" class="new">장터게시판</a></li>
				<li><a href="/259679" data-id="259679">정보게시판</a></li>
				<li><a href="/420832" data-id="420832">취업·진로</a></li>
				<li><a href="/367739" data-id="367739">홍보게시판</a></li>
				<li><a href="/419065" data-id="419065">동아리·학회</a></li>
				<li><a href="/462203" data-id="462203" class="new">간호학과 게시판</a></li>
				<li><a href="/465278" data-id="465278" class="new">치위생학과 게시판</a></li>
				<li><a href="/455159" data-id="455159" class="new">퀴어</a></li>
				<li><a href="/455305" data-id="455305">애니/만화 게시판</a></li>
				<li><a href="/community/search" class="search">게시판 찾기</a></li>
			</ul>
			<hr>
		</div>
		<input type="hidden" id="communityCampusId" value="349">
	</div>
	<div id="container" class="community">
		<aside class="none">
			<form class="search">
				<input type="search" name="keyword" class="text" placeholder="전체 게시판의 글을 검색하세요!">
			</form>
			<div class="title">
				<a class="hamburger"></a>
				<h1>KG IT대 에브리타임</h1>
				<ol class="buttons">
					<li><a id="searchArticle">글 검색</a></li>
				</ol>
			</div>
		</aside>
		<div class="banners">
			<a
				href="https://ad.everytime.kr/adClick?adToken=lxpDJl6bItihsyBdi7K8d7WP9Y%2BShBPaK0pXpv4jPIeg4aPIFoZhEXOr8oemGJqt%2FZJ2tXr7smLnXaMBSYN8ff33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FRG2VxE1aJBhdIGTOv%2BT1q1aJz52Mlg%2BUDFG5PEHfdu7krr8zFDd5UgTlixNPESlI0%2Fxk3aphAcITbufrf4wLzX"><img
				src="https://cf-eba.everytime.kr/20220801_SAMSUNG_GalaxyStudio_CampusCurator_home.jpg"></a>
		</div>
		<div class="leftside">
			<div class="card pconly">
				<form class="logged">
					<img src="https://cf-fpi.everytime.kr/0.png" class="picture">
					<p class="nickname">${sessionScope.nickname }</p>
					<p class="school">${sessionScope.name }</p>
					<p class="school">${sessionScope.id }</p>
					<ul class="buttons">
						<li><a href="/my">내 정보</a></li>
						<li><a href="javascript:void(0)" onclick="logout();">로그아웃</a></li>
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
					<a
						href="https://ad.everytime.kr/adClick?adToken=eCzErsV%2BkyHjuDGgfclTCET5SGAqEZ3dA0PBZflngwDH3Lx6U%2BtMTRd9P5aSE6jqUYRHFQaAkPQLvT7DzdRVqP33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FRKFIIsFnG3P%2B4uk700NL9NaNeHkMH5OA%2BSNudcSKHs5pyz7ChwrrWHHiwyICejbTxQP4GRllEaqZmqYlHWROoa"><img
						src="https://cf-eba.everytime.kr/20220801_Adobe_aespa_card.jpg"></a>
				</div>
			</div>
			<div class="card">
				<div class="banner">
					<a
						href="https://ad.everytime.kr/adClick?adToken=eCzErsV%2BkyHjuDGgfclTCET5SGAqEZ3dA0PBZflngwDH3Lx6U%2BtMTRd9P5aSE6jqUYRHFQaAkPQLvT7DzdRVqP33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FSIwfn4%2BnI9UewBsPEcR%2BrU3JQSlgxEJksnIfjRLJMocYfieFqf4loU%2BgszaSbQRfsOvQhnkPpbdoqgOSvHHUIt"><img
						src="https://cf-eba.everytime.kr/20220801_SEVENNIGHTS_TheFirst_card.jpg"></a>
				</div>
			</div>
			<div class="card">
				<div class="banner">
					<a
						href="https://ad.everytime.kr/adClick?adToken=eCzErsV%2BkyHjuDGgfclTCET5SGAqEZ3dA0PBZflngwDH3Lx6U%2BtMTRd9P5aSE6jqUYRHFQaAkPQLvT7DzdRVqP33nOXAj1s16DFnso85wxs8Wf2uKdOZ12Mk4kUa3VC3Xjx6qibIKEKjhR0MkYs9DE%2Bs1IZOR1HHQKGT9m7lA%2FQE4d5%2FmT%2BmxD8TwNehd0oVsI%2Fb7xE4YabTXtDbhw0DG88fI63Epg1%2BTLKjfuyHUKdmAQmRVV8UNWN1HUVJ00kE"><img
						src="https://cf-eba.everytime.kr/homecard220704.png"></a>
				</div>
			</div>
		</div>
		<div class="rightside"></div>
		<div class="main"></div>
	</div>
	<div id="bottom">
		<ul class="links">
			<li><a href="/page/serviceagreement">이용약관</a></li>
			<li class="privacy"><a href="/page/privacy">개인정보처리방침</a></li>
			<li><a href="/page/rules">커뮤니티이용규칙</a></li>
			<li><a href="/notice">공지사항</a></li>
			<li><a href="/page/faq">문의하기</a></li>
			<li class="copyright"><a href="/">&copy; 에브리타임</a></li>
		</ul>
	</div>
	<script type="text/javascript">
		var _serverTime = 1659351777286;
		var _clientTime = new Date().getTime();
		var _diffTime = _clientTime - _serverTime;
		var _apiServerUrl = 'https://api.everytime.kr';
	</script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'UA-22022140-4');
	</script>
</body>
</html>