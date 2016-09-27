var s = function(p){
    var SliderA
    p.setup = function(){
        p.createCanvas(400,200)
        SliderA = p.createSlider(0,100,50,1).parent("slider_holder")
        var SliderB = p.createSlider(0,100,50,1).parent("slider_holder")
    }
    p.draw = function(){
        p.background(51)
        p.fill(255)
        p.textSize(50)
        var A = SliderA.value()
        // var B = SliderB.value()
        p.text("A: " + String(A),10,75)
        p.text("B: " + "undefined",10,175)
    }
}
var inst1 = new p5(s,"S2-1");

var s = function(p){
    var points = []
    p.setup = function(){
        p.createCanvas(400,200)
    }
    p.draw = function(){
        p.background(255);
        p.textSize(20);
        p.text(String(points),10,10,300, 200);
    }
    p.mousePressed = function(){
        points.push(String([p.mouseX, p.mouseY]))
    }
}
var inst2 = new p5(s,"S2-2");

var s = function(p){
    var points = []
    p.setup = function(){
        p.createCanvas(400,200)
        p.stroke(255,0,0);
        p.strokeWeight(10);
    }
    p.draw = function(){
        p.background(255);
        for(var i = 0; i < points.length; i++){
            p.point(points[i].x, points[i].y)
        }
    }
    p.mousePressed = function(){
        points.push(p.createVector(p.mouseX, p.mouseY))
        if(points.length > 10){points.splice(0,1);}
    }
}
var inst2 = new p5(s,"S2-3");
