<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
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
<script type="text/javascript" src="Javascripts/myAuto.js"></script>
<script type="text/javascript" src="Javascripts/myAuto2.js"></script>
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
<script type="text/javascript">
function validateForm() {
	 var userID =  $('#userID').val();
	  if (userID == "") {
	    alert("please enter ID");
	    return false;
	  }
	 
	} 
function numbersonly(evt){
	var charcode = (evt.which) ? evt.which : event.keyCode
	if(charcode > 31 && (charcode < 48 || charcode > 57))
	return false;
	return true;
	}
</script>
</head>
<body>
<form action="gotoUserList" method="get" >
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
<input type="text" name="userID" id="userID">
<input type="submit" formaction="activateUser" value="activate" onclick="return validateForm()" /> 

</tr>




</table>
</div>





</form>

</body>
</html>