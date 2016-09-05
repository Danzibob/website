$(document).ready(function() {
	$("#header").load("http://danzibob.tk/header.html");	
});

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.position(0, 0);
	noFill();
	stroke(255);
	strokeWeight(4);
	background(51);
}

function draw() {
	background(51);
	ellipse(mouseX, mouseY, 300);
}