<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ page isELIgnored="false"%>
 <%@ page import = "java.io.*,java.util.*" %>
<%@ page import = "javax.servlet.*,java.text.*" %>


 

<html>
<head>

<style>
<style>
.container {
    position: relative;
    text-align: center;
    color: white;
}

.bottom-left {
    position: absolute;
    bottom: 8px;
    left: 16px;
}

.top-left {
    position: absolute;
    top: 8px;
    left: 16px;
}

.top-right {
    position: absolute;
    top: 8px;
    right: 16px;
}

.bottom-right {
    position: absolute;
    bottom: 8px;
    right: 16px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
img {
  border-radius: 100%;
}
#mySidenav a {
    position: absolute;
    left: -10px;
    transition: 0.1s;
    padding: 15px;
    width: 150px;
    text-decoration: none;
    font-size: 20px;
    color: white;
    border-radius: 0 5px 5px 0;
}

#mySidenav a:hover {
    left: 0;
}

#about {
    top: 30px;
    background-color: #4CAF50;
}

#blog {
    top: 85px;
    background-color: #2196F3;
}

#projects {
    top: 140px;
    background-color: #f44336;
}

#contact {
    top: 200px;
    background-color: #555;
}
 #event {
    top: 260px;
    background-color: skyblue;
}
#projects {
    top:140px;
    background-color: #f44336;
}
#list {
    top:330px;
    background-color: orange;
}
#mail {
    top:390px;
    background-color: #FA8072;
}
#profile {
    top:390px;
    background-color: #008080;
}
#calculate{
    top:450px;
    background-color: #f44336;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
}
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
<script type="text/javascript" src="Javascripts/myAuto.js"></script>
<script type="text/javascript" src="Javascripts/myAuto2.js"></script>
<script>
	function image(img) {
    var src = img.src;
    window.open(src);
}
</script>
</style>
</head>
<title>HOME</title>
<body>
<%
		Integer name = (Integer) session.getAttribute("name");
		Date fromDate=(Date)session.getAttribute("fromDate");
		String firstName =(String)  session.getAttribute("firstName");
	%>
	
	
	
	<%--  <%
         Date dNow = new Date( );
         SimpleDateFormat ft = 
         new SimpleDateFormat ("E yyyy.MM.dd ");
         out.print( "<h2 align=\"center\">" + ft.format(dNow) + "</h2>");
      %> --%>
      <form action="home" method="get">
      
      <div class="container">
      <img src="img_fjords_wide.jpg" alt="Norway" style="width:100%;">
  <div class="bottom-left">Bottom Left</div>
  <div class="top-left">Top Left</div>
  <div class="top-right">Top Right</div>
  <div class="bottom-right">Bottom Right</div>

 
					</tr>
			
			</td>
		</tr>
		</table>
	
		<tr></tr>
		  <div class="centered">Centered
    <img src= "https://icdn4.digitaltrends.com/image/pubg-4k-06.jpg?ver=1" class="avatar">
    </div>
    <div class="top-right">Top Right
    <marquee behavior="blink" direction="left" bgcolor="red">Welcome to roomapp <a><%=firstName%></a> have a nice day!</marquee>
<table align="right">
   <tr align="right" style="color: white">
	
   			
    
			<td align="right"  colspan="2" >YOU ARE LOGEED IN AS: <a><%=name%></a>
	
			 <td>
				<a href="/roomApp/mvc/logout">LogOut</a>
			<td align="right"><img src="data:image/jpeg;base64,${proPic}" width="100" height="200" class="avatar" onclick="image(this)" >
			
			</td> 
				<td align="right"></td>
				</td>
					
			<table >
			<table>
		<c:forEach items="${eventText}" var="dlist">
					<tr>
					<td></td>
						<tr style="background-color: red">
						<tr style="margin-left:80px;"><marquee behavior="scroll" direction="left"  style="size: 15px" >Today Event : <c:out value="${dlist.event}" /><img src="data:image/jpeg;base64,${image}" width="100" height="200" class="avatar"></marquee>
						</tr>
						</tr>
						<td></td>
						
						
						</c:forEach>
						</table>
							</div>	
 


<div id="mySidenav" class="sidenav">
  <a href="gotoDailyExpenses" id="about">DailyExpenses</a>
  <a href="gotoMonthlyExpenses" id="blog">Advance</a>
  <a href="getExpensesReport" id="projects">ExpenseReport</a>
  <a href="gotoUserWise" id="contact">UserWiseReport</a>
  <a href="gotoEvent" id="event">Event</a>
   <a href="gotoUserList" id="list">UserList</a>
  <a href="gotoMail" id="mail">Mail</a>
   <a href="gotoCalculate" id="calculate">Amount calculator</a>
   

</div>

<div style="margin-left:80px;">
 Room Application Developed by Hemanth
</div>
</div>
</form>
     
</body>
</html> 
