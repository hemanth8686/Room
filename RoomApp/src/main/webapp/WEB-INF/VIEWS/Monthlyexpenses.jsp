<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
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

</style>

<script type="text/css">
body {
	font-family:Arial, Helvetica, sans-serif;
	font-size:12px;
	background-color: #333333;
}

#container {
	margin: auto;
	width: 490px;
}

#header {
	background-image: url(images/header.png);
	background-repeat: no-repeat;
	height: 35px;
	width: 490px;
	margin-bottom: 20px;
}

#button {
	height: 32px;
	width: 184px;
	margin: auto;
}

ul, li {
	margin:0;
	padding:0;
	list-style:none;
}

.menu_class {
	border:1px solid #1c1c1c;
}

.the_menu {
	display:none;
	width:300px;
	border: 1px solid #1c1c1c;
}

.the_menu li {
	background-color: #302f2f;
	vertical-align: text-bottom;
	overflow: scroll;
}

.the_menu li a {
	color:#000;
	text-decoration:none;
	padding:10px;
	display:block;
}

.the_menu li a:hover {
	padding:10px;
	font-weight:bold;
	color: #F00880;
}

.myHRow tr:hover {
          background-color: #ffff99 !important;
          cursor: pointer;
        }

        
        
        
        
/* Button */


.animate
{
	transition: all 0.1s;
	-webkit-transition: all 0.1s;
}

.action-button
{
	position: relative;
	border-radius: 10px;
	font-family: 'Pacifico', cursive;
	font-size: 15px;
	color: #FFF;
	text-decoration: none;	
	cursor: pointer;
	padding: 0px 5px 0px 5px;
}

.blue
{
	background-color: #3498DB;
	border-bottom: 5px solid #2980B9;
	text-shadow: 0px -2px #2980B9;
}

.red
{
	background-color: #E74C3C;
	border-bottom: 5px solid #BD3E31;
	text-shadow: 0px -2px #BD3E31;
}

.green
{
	background-color: #82BF56;
	border-bottom: 5px solid #669644;
	text-shadow: 0px -2px #669644;
}

.yellow
{
	background-color: #F2CF66;
	border-bottom: 5px solid #D1B358;
	text-shadow: 0px -2px #D1B358;
}

.action-button:active
{
	transform: translate(0px,5px);
  -webkit-transform: translate(0px,5px);
	border-bottom: 1px solid;
}     
</script>

</head>

<body>
	<form action="monthlyExpenses" method="post">

		<%
			Integer name = (Integer) session.getAttribute("name");
		%>


		<table align="left" bgcolor="orange">
			<%-- <tr align="left">
		
				<th>YourID:<input value="<%=name%>" /></th>
			</tr> --%>
		</table>
		<table align="center" width="100%" bgcolor="skyblue">


			<tr>
				<td align="right" colspan="2">YOU ARE LOGEED IN AS: <a><%=name%></a>
				</td>
			</tr>
			
			<tr>
				<td>AmountType</td>
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
		<tr>
				<td>Back</td>
				<a><a href="http://localhost:8080/roomApp/mvc/home">Back</a></a>
			</tr>
		
	</form>
</body>
</html>