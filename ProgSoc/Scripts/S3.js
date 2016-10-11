var s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
        p.background(51)
    }
    p.draw = function(){
        p.fill(255)
        p.noStroke()
        if(p.mouseX < p.width/2){
            p.ellipse(p.mouseX,p.mouseY,8,8)
        }
    }
}
var inst1 = new p5(s,"S3-1");

var s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
        p.background(51)
    }
    p.draw = function(){
        p.noStroke()
        if(p.mouseX < p.width/2){
            p.fill(255)
            p.ellipse(p.mouseX+p.width/2,p.mouseY,8,8)
        } else if (p.mouseX < p.width){
            p.fill(255,0,0)
            p.ellipse(p.mouseX-p.width/2,p.mouseY,8,8)
        }
    }
}
var inst1 = new p5(s,"S3-2");

var s = function(p){
    var points = []
    p.setup = function(){
        p.createCanvas(400,200)
    }
    p.draw = function(){
        p.background(51);
        p.fill(255)
        p.noStroke()
        p.ellipse(p.mouseX%100,p.mouseY,8,8)
    }
    p.mousePressed = function(){
        points.push(p.createVector(p.mouseX, p.mouseY))
    }
}
var inst2 = new p5(s,"S3-3");
