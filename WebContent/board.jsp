<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<% request.setCharacterEncoding("UTF-8"); %> <%-- 파라미터는 utf-9로 인코딩해야함 (약속) --%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<fmt:requestEncoding value="UTF-8" /> <%-- 파라미터 값을 인코딩 --%>

<%-- 데이터베이스의 Connection 객체 생성 --%>
<sql:setDataSource var="conn" driver="org.mariadb.jdbc.Driver"
				   url="jdbc:mariadb://localhost:3306/classdb"
				   user="scott"
				   password="1234" />
				   
<sql:query var="rs" dataSource="${conn}">
	select * from board where ${param.column} like ?
	<sql:param>
		%${param.find}%
	</sql:param>
</sql:query>

<table border="1" style="border-collapse: collapse;">
	<tr><th>글번호</th> <th>글쓴이</th> <th>제목</th>
		<th>내용</th> <th>등록일</th> <th>조회수</th>
	</tr>
	<c:forEach var="data" items="${rs.rows}"> <%--rs에 있는 객체를 하나씩 꺼냄 --%>
	<tr><td>${data.num}</td> <td>${data.name}</td> <td>${data.title}</td>
		<%-- 내용은 20글자까지만 나타내고 그 이상이면 ...을 써주자 --%>
		<td>${fn:substring(data.content, 0, 20)}
			<c:if test="${fn:length(data.content)>20}">
				...
			</c:if>
		</td> <td>${data.regdate}</td> <td>${data.readcnt}</td>
	</tr>
	</c:forEach>
</table>