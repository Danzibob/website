$(document).ready(function() {
	$("#header").load("http://danzibob.co.uk/header.html");	
});

$(window).resize(function(){
    var newwidth = $(window).width();
    var newheight = $(window).height();      
    $("canvas").height(newheight).width(newwidth);
});


var cells = [];
var W = 40;

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.position(0, 0);
	
	for(var i = -1; i < width/W + 1; i ++){
		for(var j = -1; j < height/W + 1; j ++){
			cells.push(new Cell(i,j));
		}
	}
	
	colorMode(HSB,100);
	stroke(255);
	strokeWeight(4);
	background(0,0,20);
	for(var i = 0; i < cells.length; i++){
		cells[i].show();
	}
}

function draw() {
	if ($('body:hover').length != 0) {
		background(0,0,20);
		for(var i = 0; i < cells.length; i++){
			cells[i].increment();
			cells[i].show();
		}
	}
}



var Cell = function(x,y){
	this.x = x*W;
	this.y = y*W;
	this.hue = 0;
	this.sat = 100;
	this.show = function(){
		noStroke();
		fill(this.hue,this.sat,80)
		rect(this.x , this.y , W-2, W-2, 5);
	}
	this.increment = function(){
		var d = dist(this.x + W/2, this.y + W/2, mouseX, mouseY);
		if(d < 300){
			d = 60/(d+50) -0.18;
			this.hue += d;
			this.hue = this.hue%100;
		
		}
	}
}
