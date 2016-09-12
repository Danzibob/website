var s = function(p){
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
