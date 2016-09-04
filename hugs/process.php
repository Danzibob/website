<?php

define('DB_NAME','u146780749_hugs');
define('DB_USER','u146780749_danzi');
define('DB_PASSWORD','Plebism');
define('DB_HOST','localhost');

$link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);

if (!$link) {
	die('Could not connect: ' . mysqli_error($link));
}

$db_selected = mysqli_select_db($link,DB_NAME);

if (!$db_selected) {
	die('Can\'t use ' . DB_NAME . ': ' . mysqli_error($link));
}
$hashid = md5(uniqid(rand(), true));
$sender = mysqli_real_escape_string($link,$_POST['sender']);
$recipient = mysqli_real_escape_string($link,$_POST['recipient']);
$gif = mysqli_real_escape_string($link,$_POST['gif']);
$message = mysqli_real_escape_string($link,$_POST['message']);

$sql = "INSERT INTO hugs (hashid,sender,recipient,gif,message) VALUES ('$hashid','$sender','$recipient','$gif','$message')";

if (!mysqli_query($link,$sql)) {
	die('Error: ' . mysqli_error($link));
}
mysqli_close($link);
?>
<html>
<head><title>Virtual Hugs</title></head>
<body>
<link rel="stylesheet" type="text/css" href="hugform.css">
<div class="post">
<h2>Send this link to your friend:
<h1><?php echo "http://danzibob.tk/hugs/hugme.php?id=".$hashid; ?></h1>
<p>Shorten or customise the link at <a href="http://bit.do" target="_blank">bit.do</a></p>
</div>
<p class="subtext">Website and animations by Danny Roberts © 2016 </p>

<iframe style="width:100%;height:450px;" src="http://bit.do"></iframe>

</body>
</html>