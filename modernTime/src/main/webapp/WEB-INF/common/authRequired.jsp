<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script>
$.ajax({
	url: '/auth/check',
	type: 'GET',
	success: function(res){
		console.log("auth", res)
		if (res == 0) {
			alert("회원 인증 후 이용 가능합니다.");
			location.href = "/my"
		}
	}
});

</script>