<html>
<?php

$host = "localhost";
$user = "u146780749_Danzi";
$pass = "NekoTatakai";
$db = "u146780749_Neko";

$con = mysqli_connect($host,$user,$pass,$db);

if (isset($_POST['username'])) {
	$username = $_POST['username'];
	$password = $_POST['password'];
	$sql = "SELECT * FROM Users WHERE username='".$user."' AND password='".$pass."' LIMIT 1";
	$res = mysqli_query($con,$sql);
	if (mysqli_num_rows($res) == 1) {
		echo "you have successfully wasted some time!";
		exit();
	} else{
		echo "you reeeeally wasted your time XD";
		exit();
	};
};
?>
<head>
<title>Neko Tatakai - Login</title>
</head>

<body>
	<form method="post" action="login.php">
	Username: <input type="text" name="username"/>
	Password: <input type="password" name="password"/>
	<input type="submit" name="submit" value="Log in"/>
	</form>
</body>
</html>