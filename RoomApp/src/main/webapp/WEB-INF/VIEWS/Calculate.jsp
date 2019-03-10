<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ page isELIgnored="false"%>


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
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script>
	$(function() {
		$("#fromdate").datepicker();
		$("#todate").datepicker();
	});
</script>
<script type="text/javascript">
function validateForm() {
	 var fdate =  $('#fromdate').val();
	 var tdate = $('#todate').val();
	  if (fdate == "") {
	    alert("please select fromdate");
	    return false;
	  }
	  if (tdate == "") {
		    alert("please select todate");
		    return false;
		  }
	 
	}
</script>
</head>
<body>
<form action="calculationReport" method="post">



<table bgcolor="green" width="60%">
<%
			Integer name = (Integer) session.getAttribute("name");
Long sumPerHead = (Long) session.getAttribute("sumPerHead");
Long userAmountMonth = (Long) session.getAttribute("userAmountMonth");
		%>
		 
			<tr align="right">
				<td align="right" colspan="2">YOU ARE LOGEED IN AS: <a><%=name%></a>
				
				</td>
			</tr>
			<tr>
				<td>Month Start:</td>
				<td><input type="text" name="fromDate" id="fromdate"></td>
				<td>Month End:</td>
				<td><input type="text" name="toDate" id="todate"></td>
				<td><input type="submit" value="setmonth" onclick="return validateForm() "></td>
			</tr>
			<table bgcolor="green" width="60%">
			<tr><td>userId:</td>
				<th><input type="text" name="userName" id="userName">
				<input type="submit" formaction="calculate" value="calculate"/></th>
				</tr>
			

			
			<tr>
			
			<td align="right" colspan="2">Per Head Amount is: <a><%=sumPerHead%></br></a>
				<td align="right" colspan="2">User Amount is: <a><%=userAmountMonth%></a>
				
			</tr>
			</table>
			

		</table>
		<a href="/roomApp/mvc/home?userID=<%=name%>">Back</a>
		</form>

</body>
</html>