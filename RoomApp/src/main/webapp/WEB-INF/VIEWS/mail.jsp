<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Mail</title>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script type="text/javascript"
	src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<title>Spring Auto-complete</title>







<script type="text/javascript">
	function emailChange(mode) {

		if (mode == "all") {
			$("#email").hide();
			$("#toId").hide();

		} else {
			$("#email").show();
			$("#toId").show();

		}

	}

	function batchValidationEdit(batch) {

		try {
			$.get("getMailforAjax.action", {
				Id : batch,

			}, function(serverResponse) {

				if (serverResponse != 'serverResponse') {
					$('#toId').val(serverResponse);

				} else {

				}
			});
		} catch (e) {
			alert(e);
		}
	}
</script>

<!-- <script>
	$(function() {
		var email=$('#email').val();
		alert(email);
	
			
		$(".searchBox").autocomplete({
			
			source : function(request, response) {
				
				$.ajax({
					url : "http://localhost:8080/roomApp/mvc/getMailforAjax?Id="+ email,
					dataType : "json",
					data : {
						q : request.term
					},
					success : function(data) {
						alert(data);
						$('#email').val('data');
						console.log(data);
						response(data);
					}
				});
			},
			minLength : 2
		});
	});
</script> -->
</head>
<body>
	<%
		Integer name = (Integer) session.getAttribute("name");
	%>
	<center>
		<h1>Send e-mail</h1>
		<form method="post" action="sendMail" enctype="multipart/form-data">
			<table border="0" width="80%">

				<tr>
					<td>Mail: <select name="mailChoose"
						onchange="emailChange(this.value)">
							<option value="select">select</option>
							<option value="all">all</option>
							<option value="member">member</option>

					</select>
					</td>
				</tr>

				<tr>
					<td>Email Search:</td>
					<td><input type="text" name="" id="email"
						onkeyup="batchValidationEdit(this.value)" size="65" /></td>
				</tr>
				<tr>
					<td>To:</td>
					<td><input type="text" name="recipientMail" id="toId"
						size="65" /></td>
				</tr>
				<tr>
					<td>Subject:</td>

					<td><input type="text" name="subject" size="65" /></td>
				</tr>
				<tr>
					<td>Message:</td>
					<td><textarea cols="50" rows="10" name="message"></textarea></td>
				</tr>
				<tr>
					<td>Message:</td>
					<td><input type="file" name="attachment" /></td>
				</tr>
				<tr>
					<td colspan="2" align="center"><input type="submit"
						value="Send E-mail" /></td>
				</tr>

			</table>
			<a href="/roomApp/mvc/home?userID=<%=name%>">Back</a>
		</form>
	</center>
</body>
</html>