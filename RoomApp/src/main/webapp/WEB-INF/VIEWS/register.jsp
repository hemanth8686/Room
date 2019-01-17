<!DOCTYPE html>
 <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<style>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="css/jquery-ui-1.10.0.custom.min.css"
	type="text/css" />
<script type="text/javascript" src="Javascripts/jquery-1.9.0.min.js"></script>
<script type="text/javascript" src="Javascripts/jquery.ui.core.min.js"></script>
<link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="./css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<script>
	$(function() {
		$("#datepicker").datepicker({
			changeMonth : true,
			changeYear : true
		});
	});
</script>
/* Full-width input fields */
input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Set a style for all buttons */
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

/* Extra styles for the cancel button */
.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,.signupbtn {
    float: left;
    width: 50%;
}

/* Add padding to container elements */
.container {
    padding: 16px;
}

/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
    .cancelbtn, .signupbtn {
       width: 100%;
    }
}
</style>
<body>

<h2>Signup Form</h2>

	
	<form:form method="POST" action="register" 
          enctype="multipart/form-data">
  <div class="container">
    <label><b>firstName</b></label>
    <input type="text" placeholder="Enter firstName" name="firstName" required>
	    <label><b>lastName</b></label>
    <input type="text" placeholder="Enter lastName" name="lastName" required>
	 <label><b>age</b></label>
    <input type="text" placeholder="Enter age" name="age" required>
	 <label><b>mobile</b></label>
    <input type="text" placeholder="Enter mobile" name="mobile" required>
	 <label><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" required>
	 <label><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required>
	
   

   
	  <label><b>dateofbirth</b></label>
    <input type="Date" placeholder="Enter dateOfBirth" name="dateOfBirth" id="datepicker" required>
	
	   
    <label><b>PROFILEPICTURE</b></label>
    <input type="file" placeholder="Enter dateOfBirth" name="profilePic" required>
	
  
    <input type="checkbox" checked="checked"> Remember me
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
   

    <div class="clearfix">
      <button type="button" class="cancelbtn">Cancel</button>
      <button type="submit" class="signupbtn">Sign Up</button>
    </div>
     <a href="/roomApp/mvc/">Back</a>
  </div>
</form:form>

</body>
</html>
