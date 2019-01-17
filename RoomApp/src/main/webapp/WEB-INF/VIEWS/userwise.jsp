<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ page isELIgnored="false"%>
 <%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@ page import = "java.io.*,java.util.*" %>
<%@ page import = "javax.servlet.*,java.text.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Userwise report</title>
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link
	href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css"
	rel="stylesheet" type="text/css" />
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script>
	$(function() {
		$("#fromdate").datepicker();
		$("#todate").datepicker();
	});
</script>
<style>
  .bordered {
    width: 900px;
    height: 700px;
    padding: 20px;
    border: 5px solid black;
    border-radius: 8px;
  }
</style>
</head>
<body>


	<form action="userWise" method="get">
		<%
			Integer name = (Integer) session.getAttribute("name");
		
		%>
		 <%
         Date dNow = new Date( );
         SimpleDateFormat ft = 
         new SimpleDateFormat (" yyyy-MM-dd");
         out.print( "<h2 align=\"center\">" + ft.format(dNow) + "</h2>");
      %>
		<table bgcolor="green" width="58%">
		 
			<tr align="right">
				<td align="right" colspan="2">YOU ARE LOGEED IN AS: <a><%=name%></a>
				</td>
			</tr>
			<tr>
			<tr>
				<td>userId:</td>
				<th><input type="text" name="userName"></th>
				<td>from::</td>
				<th><input type="Date" name="fromDate" id="fromDate"></th>
				<td>To:</td>
				<th><input type="Date" name="toDate" id="toDate"></th>
				<th><input type="submit" value="get"></th>
			</tr>
			</tr>

			
			<tr>
				
			</tr>
			

		</table>
		
		
			
		<div class="bordered">
		<table width="60%" align="center" height="30px"
			style="border-collapse: separate; border-spacing: 0px" border="3">

		
			<tr>
			<th></th>
				<th>USER ID</th>
				<th></th>
				<th>AMOUNT</th>
				<th></th>
				<th>TYPE</th>
				<th></th>
				<th>DATE</th>
				<th></th>
				<th>Total</th>
			</tr>

			<tr>
				<td></td>
				<c:forEach items="${userWiseList}" var="dlist">
					<tr>
					<td></td>
						<td><c:out value="${dlist.userID}" /></td>
						<td></td>
						<td><c:out value="${dlist.amount}" /></td>
						<td></td>
						<td><c:out value="${dlist.type}" /></td>
						<td></td>
						<td> <c:out value="${dlist.expenseDate}" /></td>
						<td></td>
						<c:set var="total" value="${0}"/>
						<c:forEach items="${userWiseList}" var="dlist">
						<c:set var="total" value="${total+dlist.amount}" />
						</c:forEach>
						<td>${total}</td>
					</tr>
				</c:forEach>
			</tr>




			<tr>

			</tr>
			<tr>
		</table>
		</div>
		<table>
		<a href="http://localhost:8080/roomApp/mvc/home">Back</a>
		</table>
		
		
		







	</form>
	

</body>
</div>	
</html>