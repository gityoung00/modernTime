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

	<form action="lectureRegist" method="post">
		<table>
			<tr>
				<th>번호</th>
				<th>구분</th>
				<th colspan="2">강의명</th>
				<th>강사</th>
				<th>학점</th>
			</tr>
			<tr>
				<td><input type="text" name="lecture_id"></td>
				<td><input type="radio" value="교양" name="type">교양<input
					type="radio" value="전공" name="type">전공</td>
				<td colspan="2"><input type="text" name="name" width="500px"></td>
				<td><input type="text" name="teacher"></td>
				<td><input type="number" name="credit"></td>

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
				<td><input type="text" name="time1"></td>
				<td><input type="text" name="time2" value=""></td>
				<td><input type="text" name="place"></td>
				<td><input type="number" name="lecture_time"></td>
				<td><input type="number" name="max_student"></td>
				<td><input type="number" name="listen_student"></td>
			</tr>
		</table>
		<input type="submit" value="강의 등록">
	</form>
</div>
	<div id="subjects" style="display: block;" class="subjects">
		<div class="filter">
			<a class="item" data-id="keyword"> 
				<span class="key">검색어:</span><span	class="value">없음</span><span class="reset"></span>
			</a> 
			<a class="item" data-id="order"> 
				<span class="key">정렬:</span><span class="value">기본</span><span class="reset"></span>
			</a> 
			<a class="item" data-id="type">
				<span class="key">구분:</span><span class="value">전체</span><span class="reset"></span>
			</a> 
			<a class="item" data-id="credit">
				<span class="key">학점:</span><span class="value">전체</span><span class="reset"></span>
			</a>
		</div>
		<div class="list">
			<div class="thead"></div>
			<table>
				<thead>
					<tr>
						<th>구분
							<div>구분</div>
						</th>
						<th>강의시간
							<div>강의시간</div>
						</th>
						<th>교과목명
							<div>교과목명</div>
						</th>
						<th>교수
							<div>교수</div>
						</th>
						<th>학점
							<div>학점</div>
						</th>
						<th>강의실
							<div>강의실</div>
						</th>
						<th>강의평
							<div>강의평</div>
						</th>
						<th>담은 인원
							<div>담은 인원</div>
						</th>
						<th>수강 정원
							<div>수강 정원</div>
						</th>
					</tr>
				</thead>
				<tbody id = "tbody">
<!-- <td><a href="/lecture/view/2314908" target="_blank" title="4.86" class="star"><span class="on" style="width: 97.2%;"></span></a></td> -->
				</tbody>
				<tr>
					<td colspan="8"></td>
					<td><button id="deleteLecture">삭제</button></td>
					<td><button id="updateLecture">수정</button></td>
				</tr>
				<!-- <tfoot>
					<tr>
						<td colspan="9"></td>
					</tr>
				</tfoot> -->
			</table>
		</div>
	</div>

<%@ include file="adminFooter.jsp"%>