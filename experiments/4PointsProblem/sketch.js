var points = []
var grabbed = false
function setup() {
	var cnv = createCanvas(400,400)
    cnv.parent("holder")
	for(var i = 0; i < 4; i++){
		points.push(createVector(random(width), random(height)))
	}
	background(51)
}

function draw() {
	if(grabbed !== false){
		points[grabbed].x = mouseX
		points[grabbed].y = mouseY
		background(51)
	}
	//draw points
	stroke(255,0,0)
	strokeWeight(8)
	for(p in points){
		point(points[p].x, points[p].y)
	}
}

function mousePressed(){
	for(p in points){
		if(dist(points[p].x,points[p].y, mouseX, mouseY) < 16){
			grabbed = p
		}
	}
}
function mouseReleased(){
	grabbed = false
	calcPixels()
}
function calcPixels(){
	var maxSum = dist(0,0,width,height)*4
	vals = []
	for(var x = 0; x < width; x++){
		for(var y = 0; y < height; y++){
			var sum = 0
			for(p in points){
				sum += dist(x,y,points[p].x, points[p].y)
			}
			var b = sum
			vals.push(b)
		}
	}
	var minB = min(vals)
	var maxB = max(vals)
	loadPixels()
	for(var i = 0; i < width*height; i++){
		var idx = i*4
		var b = map(-vals[i], -maxSum, -minB, 0, 255)
		pixels[idx] = b
		pixels[idx+1] = b
		pixels[idx+2] = b
		pixels[idx+3] = 255
	}
	updatePixels()
	var mindex = vals.indexOf(minB)
	stroke(0)
	strokeWeight(16)
	point(int(mindex/width),mindex%width)
	solve()
}
function count(l,item){
	var count = 0
	for(i in l){
		if(l[i] == item){
			count++
		}
	}
	return count
}
function dSquared(x1,y1,x2,y2){
	var x = x1-x2
	var y = y1-y2
	return x*x + y*y
}


function solve(){
	average()
	cross()
}

function average(){
	var xtot = 0
	var ytot = 0
	for(p in points){
		xtot += points[p].x
		ytot += points[p].y
	}
	xtot = xtot/4
	ytot = ytot/4
	stroke(0,255,0)
	strokeWeight(16)
	point(xtot,ytot)
}

function cross(){
	strokeWeight(1)
	stroke(0)
	inner = false;
	for(i in points){
		for(j in points){
			if(i != j){
				line(points[i].x, points[i].y, points[j].x, points[j].y)
			}
		}
	}
}
