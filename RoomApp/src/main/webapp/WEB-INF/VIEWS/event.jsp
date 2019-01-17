<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
  <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Event</title>
</head>
<body>
<form:form method="POST" action="setEvent" 
          enctype="multipart/form-data">
<%-- <form action="setEvent" method="post" enctype="multipart/form-data"> --%>
<%
			Integer name = (Integer) session.getAttribute("name");
		%>


<table style="background-color: green" align="right">

  <tr align="right" >
				<td align="right" colspan="2">YOU ARE LOGEED IN AS: <a><%=name%></a>
				</td>
			</tr>
			</table>
		<tr>
		<td>Event:</td>	
      <td> <input type="text" name="event" placeholder="Write somthing"></td>
      	<td>Image:</td>	
      <td> <input type="file" name="eventImage" ></td>
      <td>Date:</td>	
   <td> <input type="Date" name="eventDate"> </td>
   <td> <input type="submit" value="set"></td>




<table>


</table>

 <div class="imgcontainer" style="size: 20px">
    <img src="https://renotahoenace.net/Image/news/events.png">
    </div>





<a href="http://localhost:8080/roomApp/mvc/home">Back</a>

</tr></form:form>
</form>

</body>
</html>