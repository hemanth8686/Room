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
<script type="text/javascript">
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()
</script>
	
<style>
  .bordered {
    width: 900px;
    color:black
    height: 500px;
    padding: 20px;
    border: 5px solid black;
    border-radius: 8px;
  }
</style>
</head>
<body style="background-color:;color:black;">
	<form action="expensesReport" method="get">
		<%
			Integer name = (Integer) session.getAttribute("name");
		%>
		<%
			List dailyList = (ArrayList) session.getAttribute("dailyList");
			request.setAttribute("dailyList", dailyList);
		%>
<input type="button" onclick="tableToExcel('testTable', 'REPORT')" value="Export to Excel">

		<table bgcolor="green" width="60%">
		 
			<tr align="right">
				<td align="right" colspan="2">YOU ARE LOGEED IN AS: <a><%=name%></a>
				</td>
			</tr>
			<tr>
				<td>from:</td>
				<td><input type="text" name="fromDate" id="fromdate"></td>
				<td>to:</td>
				<td><input type="text" name="toDate" id="todate"></td>
				<td><input type="submit" value="getReport" onclick="return validateForm() "></td>
			</tr>

			
			<tr>
				
			</tr>
			

		</table>
		<!-- <div class="bordered"> -->
	
		
		<table id="testTable" width="60%" align="left" height="30px"style="background: linear-gradient(#AACBEE 5%, #fff 120%);
			style="border-collapse: separate; border-spacing: 2px" border="3" >
			<tr >
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
			
			<th align="right" colspan="4">Total Amount:${total}</th>
			
</table>
</table>


<table align="center" style="color: blue" >

<tr> 
<th>TotalAmount:</th>
</tr>

<tr >
<th>${total}</th>

</tr>
</table>
</table>





<a href="/roomApp/mvc/home?userID=<%=name%>">Back</a>


	</form>

</body>
</html>