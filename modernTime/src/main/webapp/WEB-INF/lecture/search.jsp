<%@page import="com.care.moderntime.lecture.dto.LectureDTO"%>
<%@page import="java.util.ArrayList"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<html lang="ko"><head>
    <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script src="https://www.googletagmanager.com/gtag/js?id=UA-22022140-4" async=""></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-22022140-4');
</script>
    <meta charset="utf-8">
    <meta name="referrer" content="origin">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="naver-site-verification" content="7366738375e320e44bd1c743b364db13086a7b0e">
    <meta name="color-scheme" content="dark light">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta property="fb:app_id" content="258676027581965">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://everytime.kr/images/og_image.png">
    <meta property="og:site_name" content="에브리타임">
    <meta property="og:url" content="https://everytime.kr/lecture/search?keyword=%E3%85%87%E3%85%87&amp;condition=name">
    <title>강의실 - 에브리타임</title><meta data-vue-meta="ssr" name="robots" content="noindex"><link data-vue-meta="ssr" rel="preload" href="/css/d7456c4268a6cf03f5cd.css" as="style"><link data-vue-meta="ssr" rel="preload" href="/js/1971a17385e40ace0e39.js" as="script"><link data-vue-meta="ssr" rel="preload" href="/css/670a55337c17dc07d32e.css" as="style"><link data-vue-meta="ssr" rel="preload" href="/js/5e89073f1e43d6981393.js" as="script"><link data-vue-meta="ssr" rel="stylesheet" href="/css/233234eea2854d91088f.css"><script data-vue-meta="ssr" src="/js/64be8ba2aee4a4eceb7b.js" defer=""></script><script data-vue-meta="ssr" src="/js/ac9a4861169e5341e1a1.js" defer=""></script><script data-vue-meta="ssr" src="/js/26fdf1e2ebe19eb34452.js" defer=""></script>
  <script charset="utf-8" src="/js/f0fe7bce8ef0e6112bde.js"></script><script charset="utf-8" src="/js/6322d48cc1aa35f16740.js"></script><link rel="stylesheet" type="text/css" href="/js/../css/670a55337c17dc07d32e.css"><script charset="utf-8" src="/js/5e89073f1e43d6981393.js"></script><link rel="stylesheet" type="text/css" href="/js/../css/d7456c4268a6cf03f5cd.css"><script charset="utf-8" src="/js/1971a17385e40ace0e39.js"></script></head>
  <body>
    
    <div data-v-4c08457e=""><header data-v-ffaea544="" data-v-4c08457e=""><div data-v-ffaea544="" class="head"><div data-v-ffaea544="" class="wrap"><div data-v-ffaea544="" class="logo"><a data-v-ffaea544="" href="/"><figure data-v-ffaea544="" class="logoimage"></figure></a> <h1 data-v-ffaea544=""><p data-v-ffaea544="" class="subname">
            에브리타임
          </p> <p data-v-ffaea544="" class="name">
            경북대
          </p></h1></div> <nav data-v-ffaea544=""><div data-v-ffaea544="" class=""><a data-v-ffaea544="" href="/">
            게시판
          </a></div><div data-v-ffaea544="" class=""><a data-v-ffaea544="" href="/timetable">
            시간표
          </a></div><div data-v-ffaea544="" class="active"><a data-v-ffaea544="" href="/lecture">
            강의실
          </a></div><div data-v-ffaea544="" class=""><a data-v-ffaea544="" href="/calculator">
            학점계산기
          </a></div><div data-v-ffaea544="" class=""><a data-v-ffaea544="" href="/friend">
            친구
          </a></div><div data-v-ffaea544="" class=""><a data-v-ffaea544="" href="https://bookstore.everytime.kr">
            책방
          </a></div><div data-v-ffaea544="" class=""><a data-v-ffaea544="" href="https://www.campuspick.com">
            캠퍼스픽
          </a></div></nav> <div data-v-ffaea544="" class="account"><a data-v-ffaea544="" href="/message" title="쪽지함" class="icon message">
            쪽지함
          </a> <a data-v-ffaea544="" href="/my" title="내 정보" class="icon my">
            내 정보
          </a></div></div> <div data-v-ffaea544="" class="backdrop"></div></div> <div data-v-ffaea544="" class="navbar"><a data-v-ffaea544="" class="hamburger">메뉴 열기</a> <h1 data-v-ffaea544="">강의실</h1></div></header> <div data-v-4c08457e="" class="container"><div data-v-4c08457e="" class="header"><form data-v-4c08457e="" class="searchbar"><input data-v-4c08457e="" type="search"> <input data-v-4c08457e="" type="submit" class="submit"></form> <div data-v-4c08457e="" class="filters"><div data-v-4c08457e="" class="categories"><label data-v-4c08457e=""><input data-v-4c08457e="" value="name" type="radio"> <span data-v-4c08457e="" class="icon"></span> <span data-v-4c08457e="" class="title">과목명</span></label> <label data-v-4c08457e=""><input data-v-4c08457e="" value="professor" type="radio"> <span data-v-4c08457e="" class="icon"></span> <span data-v-4c08457e="" class="title">교수명</span></label></div> <!----></div></div> <div data-v-4c08457e="" class="lectures"><div data-v-4c08457e="" class="alert"><p data-v-4c08457e="" class="primary noresult">
          검색된 강의가 없습니다
        </p></div></div></div> <!----> <footer data-v-ecf89622="" data-v-4c08457e=""><a data-v-ecf89622="" href="/page/serviceagreement">
    이용약관
  </a> <a data-v-ecf89622="" href="/page/privacy" class="privacy">
    개인정보처리방침
  </a> <a data-v-ecf89622="" href="/page/rules">
    커뮤니티이용규칙
  </a> <a data-v-ecf89622="" href="/page/faq">
    문의하기
  </a> <a data-v-ecf89622="" href="/" class="copyright">
    © 에브리타임
  </a></footer></div>
    <script id="__INITIAL_STATE__" type="application/json">{"apiServerUrl":"https://api.everytime.kr","appInfo":{"appName":"","appVersion":"","osName":"","osVersion":""},"campusData":{"schoolId":116,"campusId":405,"communityName":"경북대"},"isLogged":true,"pageName":"pages/lecture/search","pageTitle":"강의실","campuses":[],"campusId":0}</script>
  

</body></html>