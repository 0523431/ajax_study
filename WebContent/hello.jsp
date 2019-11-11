<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<% request.setCharacterEncoding("UTF-8"); %> <%-- 파라미터는 utf-9로 인코딩해야함 (약속) --%>

<h3>안녕하세요<font color="olive">${param.name}</font>입니다</h3>

<%-- 
	이 내용이 hello.html에서 div사이에 들어가게 됨 
--%>