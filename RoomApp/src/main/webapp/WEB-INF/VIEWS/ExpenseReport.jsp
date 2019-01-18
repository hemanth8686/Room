<%@page import="com.vrsbuilding.roomapp.model.Expenses"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ page isELIgnored="false"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
                                 "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Report</title>
	<title>Table V04</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css">
<!--===============================================================================================-->
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
    height: 500px;
    padding: 20px;
    border: 5px solid black;
    border-radius: 8px;
  }
</style>
</head>
<body style="background-color:skyblue;color:white;">
	<form action="expensesReport" method="get">
		<%
			Integer name = (Integer) session.getAttribute("name");
		%>
		<%
			List dailyList = (ArrayList) session.getAttribute("dailyList");
			request.setAttribute("dailyList", dailyList);
		%>


		<table bgcolor="green" width="100%">
		 
			<tr align="right">
				<td align="right" colspan="2">YOU ARE LOGEED IN AS: <a><%=name%></a>
				</td>
			</tr>
			<tr>
				<td>from:</td>
				<td><input type="text" name="fromDate" id="fromdate"></td>
				<td>to:</td>
				<td><input type="text" name="toDate" id="todate"></td>
				<td><input type="submit" value="getReport"></td>
			</tr>

			
			<tr>
				
			</tr>
			

		</table>
		<div class="bordered">
	
		<table align="center" nowrap >
			<tr style="bgcolor:4682B4"  bordercolor="blue">
			<th ></th>
				<th nowrap="nowrap">USER ID</th>
				<th></th>
				<th>AMOUNT</th>
				<th></th>
				<th>TYPE</th>
				<th></th>
				<th >DATE</th>
			</tr>

			<tr>
				<td></td>
				<c:forEach items="${dailyList}" var="dlist">
					<tr>
					<td></td>
						<td><c:out value="${dlist.userID}" /></td>
						<td></td>
						<td><c:out value="${dlist.amount}" /></td>
						
						<td></td>
						<td><c:out value="${dlist.type}" /></td>
						<td></td>
						<td nowrap="nowrap"> <c:out value="${dlist.expenseDate}" /></td>
						<td></td>
						<c:set var="total" value="${0}"/>
						<c:forEach items="${dailyList}" var="dlist">
						<c:set var="total" value="${total+dlist.amount}" />
						
						</c:forEach>
					</tr>
				</c:forEach>
			</tr>
</table>


<table align="right" >

<tr> 
<th>TotalAmount:</th>
</tr>

<tr >
<th>${total}</th>

</tr>
</table>
</div>			





<a href="http://localhost:8080/roomApp/mvc/home">Back</a>


	</form>

</body>
</html>