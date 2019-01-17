<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
 <style type="text/css">
.textBox {
       background: white;
       border: 0px solid #6DA6D5;
       border-radius: 5px;
    
       color: blue;
       outline: none;
       height: 400px;
       width: 600px;
}
</style>
</head>
<body>
<form action="gotoUserList" method="get">
<div id="textBox" class="textBox">
	<table align="center" frame="box" width=50%"" nowrap >
			<tr style="bgcolor:4682B4"  bordercolor="blue">
		<td></td>
		
		<td >DeActive users:</td>
				<th nowrap="nowrap">USER ID</th>
				<th></th>
				<th></th>
				<th></th>
				<th>Name</th>
				<th></th>
				<th></th>
				<th></th>
				<th>Mobile</th>
				<th></th>
				<th >Age</th>
			</tr>

			<tr>
				<td></td>
				<c:forEach items="${DeactivatedList}" var="dlist">
					<tr>
					<td></td>
						<th></th>
						<th></th>
						<th></th>
						<td><c:out value="${dlist.id}" /></td>
						<td></td>
						<th></th>
						<td><c:out value="${dlist.firstName}" /></td>
						
						<td></td>
						<th></th>
						<td><c:out value="${dlist.mobile}" /></td>
						<td></td>
						<td><c:out value="${dlist.age}" /></td>
						<td></td>
						
						
					</tr>
				</c:forEach>
			</tr>
</table>

<table align="center" frame="box" width=50%"" nowrap >
			<tr style="bgcolor:4682B4"  bordercolor="blue">
		<td></td>
		
		<td >Active users:</td>
				<th nowrap="nowrap">USER ID</th>
				<th></th>
				<th></th>
				<th></th>
				<th>Name</th>
				<th></th>
				<th></th>
				<th></th>
				<th>Mobile</th>
				<th></th>
				<th >Age</th>
			</tr>

			<tr>
				<td></td>
				<c:forEach items="${activatedList}" var="dlist">
					<tr>
					<td></td>
						<th></th>
						<th></th>
						<th></th>
						<td><c:out value="${dlist.id}" /></td>
						<td></td>
						<th></th>
						<td><c:out value="${dlist.firstName}" /></td>
						
						<td></td>
						<th></th>
						<td><c:out value="${dlist.mobile}" /></td>
						<td></td>
						<td><c:out value="${dlist.age}" /></td>
						<td></td>
						
						
					</tr>
				</c:forEach>
			</tr>
</table>
<table>
<tr>
<th>
<input type="text" name="userID">
<button type="submit" formaction="activateUser" value="activate"> </button>

</tr>




</table>
</div>





</form>

</body>
</html>