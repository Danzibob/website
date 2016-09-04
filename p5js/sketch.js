var socket;

function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }

function setup(){
	socket = io.connect('http://91.134.143.48:3001');
	socket.on('mouse',newDrawing);
	socket.on('clear',clearCanvas);
    cnv = createCanvas(1200,600);
	cnv.parent("myContainer");
	sliderContainer = createDiv("") ;
	sliderContainer.parent("myContainer");
	background(51);
	Rslider = createSlider(0, 255, 100);
	Gslider = createSlider(0, 255, 100);
	Bslider = createSlider(0, 255, 100);
	Rslider.parent(sliderContainer);
	Gslider.parent(sliderContainer);
	Bslider.parent(sliderContainer);
	colorSample = createDiv("");
	colorSample.parent(sliderContainer);
	colorSample.style("width", "20px");
	colorSample.style("height", "60px");
        button = createButton('Clear');
        button.position(10,10);
        button.mousePressed(clearer);
        createP("Created by that guy sat at the back of the room (Danny Roberts, Y12 student), using Javascript, Node.js and p5.js");
}

function draw(){
	strokeWeight(4);
	stroke(0);
	fill(Rslider.value(),Gslider.value(),Bslider.value());
	ellipse(width-25, height-25,40,40);
}

function clearer(){
        background(51);
        socket.emit('clear',0);
}

function clearCanvas(data){
	background(51);
        console.log("cleared canvas");
}

function mouseDragged(){
	var data = {
		x: mouseX,
		y: mouseY,
		R: Rslider.value(),
		G: Gslider.value(),
		B: Bslider.value()
	}
	noStroke();
	fill(data.R,data.G,data.B);
	ellipse(mouseX,mouseY,20,20);
	socket.emit('SFW');
}

function newDrawing(data){
	noStroke();
	fill(data.R,data.G,data.B);
	ellipse(data.x,data.y,20,20);
}	