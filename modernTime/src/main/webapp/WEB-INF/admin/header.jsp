<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<nav>
    <div class="wrap">
      <div id="logo">
        <a href="/admin"><img src="/images/new/nav.logo.png"></a>
        <p><span class="name multiple">에브리타임</span><span class="subname">KG IT대</span></p>
      </div>
      <div id="account">
        <input type="hidden" id="userUserid" value="diharet">
        <input type="hidden" id="userSchool" value="316">
        <input type="hidden" id="userCampus" value="349">
      </div>
      <ul id="menu">
        <li><a href="/admin/notice">공지사항 관리</a></li>
        <li><a href="/admin/lecture/regist">강의 관리</a></li>
        <li><a href="/school/auth">학교인증 관리</a></li>
      </ul>
    </div>
  </nav>
  
 <script>
 var url = new URL(location.href);
var menus = document.querySelectorAll("#menu > li > a");
menus.forEach((menu) => {
	var aurl = new URL(menu.href);
	if (url.pathname == aurl.pathname){
		console.log(url.pathname, aurl.pathname)
		menu.parentElement.classList.add("active");
	}
})
 </script>