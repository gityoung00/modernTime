<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
  <meta property="og:url" content="https://everytime.kr/lecture/point">
  <meta property="og:site_name" content="에브리타임">
  <meta property="og:title" content="에브리타임">
  <meta property="og:description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
  <meta name="description" content="전국 400개 대학을 지원하는 대학교 커뮤니티 및 시간표 서비스. 시간표 작성 및 학업 관리, 학교 생활 정보, 학교별 익명 커뮤니티 기능을 제공합니다.">
  <meta name="keywords" content="에브리타임, 에타, everytime, 시간표, 수강신청, 강의평가, 학점계산기, 학식, 오늘의학식, 책방, 중고책, 대학생, 대학교, 대학, 대학생 시간표, 대학교 시간표, 대학생 커뮤니티, 대학교 커뮤니티, 시간표 앱, 시간표 어플">
  <meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
  <meta name="robots" content="noindex">
  <link type="text/css" href="/css/common.css" rel="stylesheet">
  <link type="text/css" href="/css/common.partial.css" rel="stylesheet">
  <link type="text/css" href="/css/container.lecturepoint.css" rel="stylesheet">
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
  <script type="text/javascript" src="/js/lecture.point.js"></script>
</head>
<body>

<nav>
    <div class="wrap">
      <div id="logo">
        <a href="/"><img src="/images/new/nav.logo.png"></a>
        <p><span class="name multiple">에브리타임</span><span class="subname">울산과학대</span></p>
      </div>
      <div id="account">
        <a href="/message" title="쪽지함" class="icon message">쪽지함</a></li>
        <a href="/my" title="내 정보" class="icon my">내 정보</a>
        <input type="hidden" id="userUserid" value="diharet">
        <input type="hidden" id="userSchool" value="316">
        <input type="hidden" id="userCampus" value="349">
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
<div id="container" class="lecturepoint">
    <aside class="none">
      <div class="title">
        <a class="hamburger"></a>
        <h1>강의평가 포인트</h1>
      </div>
    </aside>
    <div class="section">
      <div class="mypoint">
        <span class="text">총 포인트</span>
        <span class="value">0P</span>
      </div>
      <h2>내 포인트 내역</h2>
      <ol class="history"></ol>
    </div>
    <div class="section">
      <h2>포인트 제도 안내</h2>
      <div class="description">
        <ul>
          <li>포인트는 강의평가 서비스 내에서만 이용되는 제도입니다. 그 외의 커뮤니티 활동 등에는 이용되지 않습니다.</li>
          <li>다른 계정으로 학교 인증 시 해당 계정으로 포인트가 합산되며, 기존 계정의 포인트는 초기화됩니다.</li>
          <li>단, 다른 계정이더라도 학교 등이 변경될 경우에는 포인트가 합산되지 않습니다.</li>
          <li>포인트 획득을 위해 허위/중복/성의없는 정보를 작성할 경우, 서비스 이용이 영구 제한될 수 있습니다.</li>
          <li>허위 신고를 남용하는 이용자 또한 제재가 가해질 수 있습니다.</li>
        </ul>
        <h3>포인트 획득</h3>
        <ul>
          <li>강의평 작성: <strong class="positive">+10점</strong></li>
          <li>시험 정보 공유: <strong class="positive">+20점</strong></li>
          <li>신고 보상: <strong class="positive">+1점</strong></li>
        </ul>
        <h3>포인트 차감</h3>
        <ul>
          <li>시험 정보 조회: <strong class="negative">-5점</strong></li>
        </ul>
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
      <li class="copyright"><a href="/">&copy; 에브리타임</a></li>
    </ul>
  </div>
  <script type="text/javascript">
    var _serverTime = 1659527784570;
    var _clientTime = new Date().getTime();
    var _diffTime = _clientTime - _serverTime;
    var _apiServerUrl = 'https://api.everytime.kr';
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-22022140-4');
  </script>
</body>
</html>