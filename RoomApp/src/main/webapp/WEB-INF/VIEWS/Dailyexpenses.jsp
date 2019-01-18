<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/resources/demos/style.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="css/jquery-ui-1.10.0.custom.min.css"
	type="text/css" />
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath}/css/styles.css" />
<script type="text/javascript" src="Javascripts/jquery-1.9.0.min.js"></script>
<script type="text/javascript" src="Javascripts/jquery.ui.core.min.js"></script>
<link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="./css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<script>
	$(function() {
		$("#datepicker").datepicker({
			changeMonth : true,
			changeYear : true,
			changeDay : true,
		});
	});
</script>
<style>
html, body {
	margin: 0;
	padding: 0;
	height: 100%;
}
#wrapper {
	min-height: 130%;
	background-size: 100% 100%;
}

#sideMenu {
	padding: 0px;
	padding-bottom: 2px; /* Height of the footer element */
	height: 19px;
	position: relative;
}
input { font-size: 16px; }
select { font-size: 16px; }
textarea { font-size: 16px; }
#content {
	 padding-top: 10px;
	 padding-bottom: 10px; /* Height of the footer element */
     font-family: Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;
     color: #181818;
     font-weight: normal;
     font-size: 15px;
     position: absolute;
     float: none;
     margin-left: 240px;
	 width: 80%;
}
body {
        background-image: url("http://www.greenc.in/colours-of-life-10-x12-modern-art-vertical-oil-painting-on-canvas-board.php ");
} 

</style>


</head>

<body>
	<form action="dailyExpenses" method="post">

		<%
			Integer name = (Integer) session.getAttribute("name");
		%>


		<table align="left" bgcolor="orange">
			<%-- <tr align="left">
		
				<th>YourID:<input value="<%=name%>" /></th>
			</tr> --%>
		</table>
		<table align="center" width="100%" height="100%" bgcolor="skyblue">


			<tr>
				<td align="right" colspan="2">YOU ARE LOGEED IN AS: <a><%=name%></a>
				</td>
			</tr>
			
			<tr>
				<td>ExpensesType</td>
				<td><input type="text" name="type">
			</tr>
			<tr>
				<td>Amount</td>
				<td><input type="text" name="amount">
			</tr>
			<tr>
				<td>Date</td>
				<td><input type="date" name="expenseDate"></td>
			</tr>
			<tr>
				<td><input type="submit" value="submit"></td>
			</tr>



		</table>
		<table>
		<tr></tr>
		<a href="http://localhost:8080/roomApp/mvc/home">Back</a>
		</table>
	</form>
</body>
</html>