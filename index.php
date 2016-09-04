<html>
<head>
<title>Danny's Computing</title>
</head>
<link rel="stylesheet" type="text/css" href="homepage.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="home.js"></script>
<body>
	<h1>Danny's Computing Portfolio</h1>
                <div id="left_pane">
                        <h3>Links</h3>
			<a href="https://sites.google.com/a/nhgs.co.uk/nhgs-computing/home/subject-resources/as-a-level-overview">
				<div class="button">
				<p>A-level Computing Site</p>
				</div>
			</a>
			
			<a href="/Theory">
				<div class="button">
				<p>Theory Work</p>
				</div>
			</a>
		</div>
		<div id="right_pane">
			<h3>Experiments</h3>
			<a href="http://danzibob.tk/experiments/colors/colors.html">
				<div class="button">
				<p>Colour Changer with JS</p>
				</div>
			</a>
			
			<a href="http://danzibob.tk/experiments/Lottery/lottery.html">
		        <div class="button">
				<p>Lottery with JS</p>
				</div>
			</a>
                     
                        <a href="http://danzibob.tk/experiments/Rollin/roller.html">
		        <div class="button">
				<p>Roller, No JS</p>
				</div>
			</a>
		</div>
                <div id="main_pane" style="margin-right:120px;">
                        <a href="danzibob.github.io/FractalTreeEvolution/">
                        <div class="post">
                                <p class="label">June 2016</p>
                                <h3>Evolving Fractal Trees</h3>
                                <p>Currently manual implementation of a genetic algorithm to generate fractal trees using the p5.js library developed by the Processing Foundation</p>
                                <p>Located and hosted on a <a href="https://github.com/Danzibob/FractalTreeEvolution" class="inner">github repository</a>. Feel free to file pull requests.</p>
                                <div style="float:clear;width:100%;"></div>
                        </div>
                        </a>
                        <a href="http://danzibob.tk/hugs/">
                        <div class="post">
                                <p class="label">Feb 2016</p>
                                <h3>Virtual Hugs</h3>
                                <p>Made for valentine's day - Send people virtual hugs</p>
                                <p>Created with php and MySQL</p>
                                <div style="float:clear;width:100%;"></div>
                        </div>
                        </a>
                        <a href="http://www.danzibob.tk/Translator%20Video/translators.html">
                        <div class="post">
                                <p class="label">2016</p>
                                <h3>Translators video</h3>
                                <p>Describes and explains the three basic types of translator</p>
                                <div style="float:clear;"></div>
                        </div>
                        </a>
                        <a href="http://www.danzibob.tk/experiments/higher_or_lower/higher_or_lower.html">
                        <div class="post">
                                <p class="label">2016</p>
                                <h3>Higher or lower game</h3>
                                <p>Number guessing game made using JavaScript</p>
                                <div style="float:clear;"></div>
                        </div>
                        </a>
                </div>
<?php
$datei = fopen("countlog.txt","r");
$count = fgets($datei,1000);
fclose($datei);
$count=$count + 1 ;
$datei = fopen("countlog.txt","w");
fwrite($datei, $count);
fclose($datei);
?>
<section style="position: fixed; bottom: 0px; width: 100%;text-align:center">
<h4><?php
if ($count == 80){
  echo "Congratulations! You are the 80th visitor!";
}
?></h4>
<p><?php echo "$count", " hits";?></p>
<p style="margin-top:-5px;font-size:10px;">No it doesn't check your ip, and yes you can just refresh the page over and over. Made with php. Pls don't DDOS me.</p>
</section>
</body>
</html>							