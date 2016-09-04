var socket;

function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }

function setup(){
	socket = io.connect('http://91.134.143.48:3001');
    cnv = createCanvas(1200,600);
	cnv.parent("myContainer");
	sliderContainer = createDiv("") ;
	sliderContainer.parent("myContainer");
	background(51);
}

function draw(){
	background(51);
}

function mousePressed(){
	var data = 0;
	socket.emit('clear',data);
	console.log("mousePressed");
}
