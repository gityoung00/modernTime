<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script>

</script>
<nav>
	<div class="wrap">
		<div id="logo">
			<a href="/"><img src="/images/new/nav.logo.png"></a>
			<p>
				<span class="name multiple">에브리타임</span><span class="subname">KG IT대</span>
			</p>
		</div>
		<div id="account">
			<a href="/message" title="쪽지함" class="icon message">쪽지함</a>
			</li> <a href="/my" title="내 정보" class="icon my">내 정보</a> <input type="hidden" id="userUserid" value="diharet"> <input type="hidden" id="userSchool"
				value="316"> <input type="hidden" id="userCampus" value="349">
		</div>
		<ul id="menu">
			<li ><a href="/">게시판</a></li>
			<li><a href="/timetable">시간표</a></li>
			<li><a href="/lecture">강의평가</a></li>
			<li class="active"><a href="/calculator">학점계산기</a></li>
			<li><a href="/bookstore">책방</a></li>
		</ul>
	</div>
</nav>