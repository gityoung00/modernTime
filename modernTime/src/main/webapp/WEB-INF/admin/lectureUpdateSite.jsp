<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="adminHeader.jsp"%>
<div id="submenu">
	<div class="wrap"></div>
</div>
<div id="container" class="timetable">
<form id="subjectKeywordFilter" class="modal" style="margin-left: -200px; margin-top: -102px; display: none;">
	<a title="닫기" class="close"></a>
	<h3>검색어</h3>
	<div class="filter">
		<label class="inline">
			<input type="radio" name="keyword_type"	checked="checked"><span>과목명</span>
		</label>
		<label class="inline">
			<input type="radio" name="keyword_type"><span>교수명</span>
		</label>
		<label class="inline">
			<input type="radio" name="keyword_type"><span>장소</span>
		</label>
		<input class="keyword" type="search" name="keyword" placeholder="검색어">
	</div>
	<input type="submit" value="검색" class="button">
</form>
<form id="subjectOrderFilter" class="modal">
	<a title="닫기" class="close"></a>
	<h3>정렬</h3>
	<div class="filter"></div>
	<input type="submit" value="적용" class="button">
</form>
<form id="subjectTypeFilter" class="modal">
	<!-- style="margin-left: -200px; margin-top: -230px; display: none;"> -->
	<a title="닫기" class="close"></a>
	<h3>구분</h3>
	<div class="filter">
		<label>
		<input type="checkbox" name="type" checked="checked"><span>교양</span>
		</label>
		<label>
		<input type="checkbox" name="type" checked="checked"><span>전공</span>
		</label>
	</div>
	<input type="button" value="전체 선택" class="button light floatLeft"
		data-action="select"> <input type="button" value="전체 취소"
		class="button light floatLeft" data-action="deselect"> <input
		type="submit" value="적용" class="button">
</form>
<form id="subjectCreditFilter" class="modal" name="subjectCreditFilter">
	<a title="닫기" class="close"></a>
	<h3>학점</h3>
	<div class="filter"></div>
	<input type="button" value="전체 선택" class="button light floatLeft"
		data-action="select"> <input type="button" value="전체 취소"
		class="button light floatLeft" data-action="deselect"> <input
		type="submit" value="적용" class="button">
</form>
</div>
<!-- 관리자 로그인 인증 필요 -->
<div id="container" class="lectureRegist">

	<form action="lectureUpdateSite" method="post">
		<table>
			<tr>
				<th>번호</th>
				<th>구분</th>
				<th colspan="2">강의명</th>
				<th>강사</th>
				<th>학점</th>
			</tr>
			<tr>
				<td><input type="text" name="lecture_id"readonly="readonly" value="${lectureSel.lecture_id }"></td>
				<td>
					<input type="radio" value="교양" name="type">교양
					<input type="radio" value="전공" name="type">전공
				</td>
				<td colspan="2"><input type="text" name="name" width="500px" value="${lectureSel.name }"></td>
				<td><input type="text" name="teacher" value="${lectureSel.teacher }"></td>
				<td><input type="number" name="credit" value="${lectureSel.credit }"></td>

			</tr>
			<tr>
				<th>시간1</th>
				<th>시간2</th>
				<th>강의실</th>
				<th>주간강의시간</th>
				<th>정원</th>
				<th>신청한 인원</th>
			</tr>
			<tr>
				<td><input type="text" name="time1" value="${lectureSel.time1 }"></td>
				<td><input type="text" name="time2" value="${lectureSel.time2 }" ></td>
				<td><input type="text" name="place" value="${lectureSel.place }"></td>
				<td><input type="number" name="lecture_time" value="${lectureSel.lecture_time }"></td>
				<td><input type="number" name="max_student" value="${lectureSel.max_student }"></td>
				<td><input type="number" name="listen_student" value="${lectureSel.listen_student }"></td>
				<input type="hidden" value = "${lectureSel.score}">
			</tr>
		</table>
		<input type="submit" value="수정" style="width:250px;">
	</form>
</div>

<%@ include file="adminFooter.jsp"%>