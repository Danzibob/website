var s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
    }
    p.draw = function(){
        p.background(255)
    }
}
var inst1 = new p5(s,"S1-1");

s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
    }
    p.draw = function(){
        p.background(51,51,51)

    }
}
var inst2 = new p5(s,"S1-2");

s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
    }
    p.draw = function(){
        p.background(51,51,51)
        p.noFill()
        p.stroke(255,0,0)
        p.strokeWeight(4)
        p.ellipse(p.width/2, p.height/2, 50, 100)
        p.rect(10,50, 100,50)
        p.line(p.width, 0, 0, p.height)
    }
}
var inst3 = new p5(s,"S1-3")

var s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
    }

    p.draw = function(){
        p.noFill()
        p.stroke(255,p.map(p.mouseX, 0, p.width, 0, 255),0)
        p.strokeWeight(4)
        p.ellipse(p.mouseX, p.mouseY, 60, 60)
    }
    p.mousePressed = function(){
        p.background(51,51,51)
    }
}
var inst4 = new p5(s,"S1-4")

var s = function(p){
    var RGBlist = []
    p.setup = function(){
        p.createCanvas(360,180).parent("#RGBSketch")
        for(var i = 0; i < 3; i++){
            RGBlist.push(p.createSlider(0,255,255,1))
            RGBlist[i].position(0, 60*i)
            RGBlist[i].size(176, 60)
            RGBlist[i].parent("#RGBSketch")
        }
        p.noStroke();
    }

    p.draw = function(){
        p.background(RGBlist[0].value(), RGBlist[1].value(), RGBlist[2].value())
        p.fill(RGBlist[0].value(),0,0)
        p.rect(0,0, 180,60)
        p.fill(0,RGBlist[1].value(),0)
        p.rect(0,60, 180,60)
        p.fill(0,0,RGBlist[2].value())
        p.rect(0,120, 180,60)
    }
}
var inst0 = new p5(s, "RGBSketch")
