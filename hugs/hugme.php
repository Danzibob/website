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

$hashid = mysqli_real_escape_string($link,$_GET['id']);
$sql = "SELECT sender,recipient,gif,message FROM hugs WHERE hashid='$hashid'";
$result = mysqli_query($link, $sql);

if (!$result) {
	die('Error: ' . mysqli_error($link));
}

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $sender = $row["sender"];
	$recipient  = $row["recipient"];
	$gif = $row["gif"]. ".gif";
        $message = $row["message"];
    }
} else {
    echo "Error: Invalid URL";
}

mysqli_close($link);
?>
<html>
<head><title>Virtual Hugs</title></head>
<link rel="stylesheet" type="text/css" href="hugform.css">
<body>
<div class="post">
<h3><?php echo $recipient; ?> - you recieved a hug from <?php echo $sender; ?></h3>
<div style="background-color:#FFFFFF;">
<img src="<?php echo $gif;?>" />
</div>
<p><?php echo $message;?></p>
</div>

<a href="http://danzibob.tk/hugs">
<div class="post">
<h3>Send a hug back, or send one to someone else</h3>
</div>
</a>
<p class="subtext">Website and animations by Danny Roberts © 2016 </p>
</body>
</html>