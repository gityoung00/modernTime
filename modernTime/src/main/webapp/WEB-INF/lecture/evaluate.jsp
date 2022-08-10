<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko">
<head>
<title>에브리타임</title>
<meta charset="utf-8">
<meta name="referrer" content="origin">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta property="fb:app_id" content="258676027581965">
<meta property="og:type" content="website">
<meta property="og:image" content="https://everytime.kr/images/og_image.png">
<meta property="og:url" content="https://everytime.kr/lecture">
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
<link type="text/css" href="/css/container.lectureindex.css" rel="stylesheet">
<link href="/favicon.ico" rel="shortcut icon">
<!--[if lt IE 9]>
  <script src="/js/extensions.html5shiv.js"></script>
  <script src="/js/extensions.respond.min.js"></script>
  <script src="/js/extensions.excanvas.min.js"></script>
  <![endif]-->
<!--[if lt IE 8]>
  <script src="/js/extensions.json3.min.js"></script>
  <![endif]-->
<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript" src="/js/extensions.jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/extensions.underscore-min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/lecture.index.js"></script>
</head>
<body style="">

	<nav>
		<div class="wrap">
			<div id="logo">
				<a href="/"><img src="/images/new/nav.logo.png"></a>
				<p>
					<span class="name multiple">에브리타임</span><span class="subname">경북대</span>
				</p>
			</div>
			<div id="account">
				<a href="/message" title="쪽지함" class="icon message">쪽지함</a> <a href="/my" title="내 정보" class="icon my">내 정보</a> <input type="hidden" id="userUserid"
					value="jiyoung1329"> <input type="hidden" id="userSchool" value="116"> <input type="hidden" id="userCampus" value="405">
			</div>
			<ul id="menu">
				<li><a href="/">게시판</a></li>
				<li><a href="/timetable">시간표</a></li>
				<li class="active"><a href="/lecture">강의평가</a></li>
				<li><a href="/calculator">학점계산기</a></li>
				<li><a href="/friend">친구</a></li>
				<li><a href="https://bookstore.everytime.kr/">책방</a></li>
				<li><a href="https://www.campuspick.com/">캠퍼스픽</a></li>
			</ul>
		</div>
	</nav>
	<div id="container" class="lectureindex">
		<aside class="none">
			<div class="title">
				<a class="hamburger"></a>
				<h1>강의평가</h1>
			</div>
		</aside>
		<form class="search">
			<input type="search" name="keyword" placeholder="과목명, 교수명으로 검색" class="keyword" autocomplete="off"> <input type="submit" class="submit">
		</form>
		<div class="section">
			<div class="mypoint">
				<span class="text">포인트</span> <span class="value">0P</span> <a href="/lecture/point" class="history">자세히</a>
			</div>
			<h2>내 강의평</h2>
			<div class="mylectures">
				<div class="empty">
					<p>아직 확인할 수 있는 과목이 없습니다.</p>
				</div>
				<div class="loading" style="display: none;"></div>
			</div>
		</div>
		<div class="section">
			<h2>최근 강의평</h2>
			<div class="articles" data-campus-id="0">
				<a class="article" href="/lecture/view/520735"><h3>실용한자 : 이혁</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">교수님 학생편의 잘봐주시고 양이많아서 변별력 잘됨 한자만 열심히 외우면 좋은 성적받을수있음</p></a><a class="article" href="/lecture/view/1827301"><h3>한국 좋은 정부론 : 강우진</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 60%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">
						출결은 신경안쓰신다. 교수님 인품도 개인적으로 홀륭하신 것 같다.<br>하지만 정외과라는 특성을 고려하더라도 정치적으로 편향된 국립대학 교수로서는 부적절한 발언들이 종종 있다. 교수님 본인은 ''굉장히 어려운 문제다'' 라고 항상 말을 끝맺으시지만 그 전에 한 말들로
						교수님의 의도를 다 파악할 수 있다. 본인이 보수진영논리에 찬동하는 사람이라면 수업 듣는 동안 불만이 있을 것.
					</p></a><a class="article" href="/lecture/view/2127395"><h3>재배학개론 : 김윤하</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 60%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">외울게 진짜 많아요 한두문제 차이로 성적 갈리는듯 해요</p></a><a class="article" href="/lecture/view/1827300"><h3>지정학 : 손무정</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">교수님 친절하십니다. 수업 내용도 지리적 위치에 따른 전략적 특성에 관한 것이라서 관심있는 사람한테는 매우 재밌습니다. 시험 문제도 대부분 알려주시고 피피티만 잘봐도 성적은 문제없을듯.</p></a><a class="article"
					href="/lecture/view/2413584"><h3>정치사상과 윤리교육 : 최경용</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">정치사상에 대한 것은 학우들이 시대순으로 1인당 한 학자씩 맡아서 개별 발표와 질의응답으로 진행하고, 교수님께서는 발표에서 언급되는 핵심 내용을 세계사적 이해를 바탕으로 통사적으로 설명해주십니다. 윤교 다른 전공과목들 보다는 부담이 적어요.
						교수님 목소리가 까랑까랑하고 화법이 조금 빡세긴 한데 적응해서 관심 가지고 듣다보면 배경지식도 많이 얻어갈 수 있어요 :)</p></a><a class="article" href="/lecture/view/522154"><h3>유기화학1 : 이동석</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">여름 계절로 들었습니당 설명 잘해주시고 어려운 내용은 다시 짚어주십니다 공부할 내용은 많지만 그만큼 열심히 한다면 계절로 듣기 좋은거같아요 !!</p></a><a class="article" href="/lecture/view/2127246"><h3>사회복지학개론
						: 이명현</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">
						학기 초에 전자출결하다가 중후반쯤에 조교님이 직접 호명하심<br>교수님 재밌고 좋은데 아침이라 그런지 다들 반응이 없어서 내가 다 안타까웠음ㅜㅜ 시험도 꼬아서 내거나 지엽적인거 없고 딱 나올 문제라고 생각했음! 정말 사회복지학개론 이라는 이름에 딱 맞는 수업이었당
						추천함
					</p></a><a class="article" href="/lecture/view/1657326"><h3>수학 I : 이현진</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">진짜 제가 들을 강의 중에 제일 좋아요. 매주 두번씩 과제가 있어서 좀 많긴 하지만 그래도 한 과제가 그렇게 많은 건 아니라 할 만 해요. 교수님 진짜 좋으십니다.</p></a><a class="article"
					href="/lecture/view/1827301"><h3>한국 좋은 정부론 : 강우진</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 80%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">
						출석은 두번인가 세번 불렀음 근데 딱히 신경안쓰시는듯<br>수업을 암기해서 치는 시험 절대아님 교수님이 시험 문제 알려주시는데 그 주제에 대한 내 생각을 쓰면 됨<br>수강하고나면 내 생각도 꽤 정리되고 괜찮은듯
					</p></a><a class="article" href="/lecture/view/1827300"><h3>지정학 : 손무정</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">
						시험 전에 문제 다 알려주심 <br>수업 들으면 꽤 재밌음 근데 꼭 안들어도 시험 칠 수 있음
					</p></a><a class="article" href="/lecture/view/521847"><h3>국제정치사 : 정희석</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">
						정외과라면 이 교수님 수업 다 좋아할듯<br>타과생도 어렵지 않게 들을 수 있음<br>시험범위도 다 찝어주심<br>다만 정외과면 팀플 발표해야하는데 발표 피드백이 엄청 꼼꼼하심 그러나 도움되는 이야기임
					</p></a><a class="article" href="/lecture/view/521031"><h3>화학 I : 서연숙</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 60%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">시험 난이도는 공부만 하면 점수 잘 받을 수 있을만큼 나오는데 매주 과제가 있고 출석이 진짜 깐깐해요. 직접 출석 부르시는데 자기 이름 불리고 바로 들어가도 부를 때 없으면 지각 처리 됩니다.</p></a><a class="article"
					href="/lecture/view/520712"><h3>실용화법 : 김령환</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">
						교수님 너무 좋으심 <br>수업도 듣기 편하고 시험도 피피티만 외우면 다 쓸 수 있음
					</p></a><a class="article" href="/lecture/view/1975404"><h3>생물학실험 I : 이영미</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">교수님 정말 친절하시고 실험도 잘 알려주십니다. 실험보고서도 쓰는 방법을 따로 알려주시고 익숙해질 수 있도록 도와주십니다</p></a><a class="article" href="/lecture/view/2413270"><h3>확률및통계 :
						이종택</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">신임교수님이라 진행이 매끄럽진 않지만 설명 잘해주셔요! 수업하실때 학생들을 생각하시는게 보여서 좋았어요</p></a><a class="article" href="/lecture/view/520994"><h3>물리학 I : 김찬</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">교수님 정말 좋으십니다. 개별적인 문제 질문에도 열정적으로 알려주시고 수업도 열정적으로 진행하십니다. 학생들과의 긴장을 풀려는듯 강의 중간중간에 재밌게 설명도 해주십니다</p></a><a class="article"
					href="/lecture/view/1729000"><h3>화학 I : 조형화</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 80%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">교수님도 친절학시고 잘 가르쳐 주십니다. 과제는 교재 문제를 시험범위만큼 풀어오는건데 미리미리 풀어놔야할것같습니다</p></a><a class="article" href="/lecture/view/2413309"><h3>프로그래밍기초 :
						김지영</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">교수님이 학생들을 생각하시고 열정적으로 수업하세요! 꼼꼼하게 잘 가르쳐주십니다</p></a><a class="article" href="/lecture/view/2157721"><h3>SW진로설계 : 안현숙</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 100%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">얻어가는게 많았던 수업... 스스로의 진로에 대해서 생각해볼 수 있어서 좋았어요 꼭 들어보세요</p></a><a class="article" href="/lecture/view/531630"><h3>문화콘텐츠 기획론 : 김연식</h3>
					<p class="rate">
						<span class="star"><span class="on" style="width: 80%;"></span></span>
					</p>
					<p class="info">
						<span class="semester">22년 1학기 수강자</span>
					</p>
					<p class="text">여름 계절로 들었습니다 시험 정보 다 긁어가면 객관, 단답은 다 맞을 수 있을정도예요 서술형 한문젠데 그걸로 차이나는듯 서술형은 매시험마다 다르게 내는듯</p></a>
				<div class="loading" style="display: none;"></div>
			</div>
		</div>
	</div>
	<div id="bottom">
		<ul class="links">
			<li><a href="/page/serviceagreement">이용약관</a></li>
			<li class="privacy"><a href="/page/privacy">개인정보처리방침</a></li>
			<li><a href="/page/rules">커뮤니티이용규칙</a></li>
			<li><a href="/notice">공지사항</a></li>
			<li><a href="/page/faq">문의하기</a></li>
			<li class="copyright"><a href="/">© 에브리타임</a></li>
		</ul>
	</div>
	<script type="text/javascript">
		var _serverTime = 1660126168920;
		var _clientTime = new Date().getTime();
		var _diffTime = _clientTime - _serverTime;
		var _apiServerUrl = 'https://api.everytime.kr';
	</script>
	<script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4"></script>
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