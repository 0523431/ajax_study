<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<% request.setCharacterEncoding("UTF-8"); %> <%-- 파라미터는 utf-9로 인코딩해야함 (약속) --%>

<%-- 
	DB를 연결해서 member의 정보를 가져와야함
	그 방법은 마이바티스 연결하는게 있고
	지금은 JSTL을 이용할 거야 그러기 위해서 jstl.jar파일이랑 mariadb.jar파일을 WEB-INF > lib에 복사
	
	JSTL은 우리가 3개를 배웠어
	- co tag
	- fmt tag
	- function
	그리고 지금 배우는게
	- sql
--%>

<%-- 파라미터 name의 값을 포함하는 member 목록 전송받기? --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>

<fmt:requestEncoding value="UTF-8" /> <%-- 파라미터 값을 인코딩 --%>
<%-- 데이터베이스의 Connection 객체 생성 --%>
<sql:setDataSource var="conn" driver="org.mariadb.jdbc.Driver"
				   url="jdbc:mariadb://localhost:3306/classdb"
				   user="scott"
				   password="1234" />
<%--
	executeQuery(sql)의 결과를 rs가 받게 됨
	resultSet의 기능을 가진 객체가 되는 거
--%>
<sql:query var="rs" dataSource="${conn}">
	select * from member where name like ?
	<sql:param> <%-- ?에 들어가는 값 --%>
		%${param.name}%
	</sql:param>
</sql:query>

<table border="1" style="border-collapse: collapse;">
	<tr><th>아이디</th> <th>이름</th> <th>전화</th>
		<th>이메일</th> <th>성별</th>
	</tr>
	<c:forEach var="data" items="${rs.rows}">
	<%--
		rs는 sql의 결과 그리고 rows는 그 결과를 한줄한줄 배열로 저장한 아이
		그리고 그 한줄 한줄을 data라는 변수명으로 치환
		그래서 rs에 있는 객체를 하나씩 꺼낼 수 있게 되고
		표현식이 data.name ===> rs.rows[index].name이 됨
	--%>
	<tr><td>${data.id}</td> <td>${data.name}</td> <td>${data.tel}</td>
		<td>${data.email}</td> <td>${data.gender==1? '남자':'여자'}</td>
	</tr>
	</c:forEach>
</table>
