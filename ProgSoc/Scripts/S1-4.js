var s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
    }

    p.draw = function(){
        console.log("running")
        p.background(51,51,51)
        p.noFill()
        p.stroke(255,0,0)
        p.strokeWeight(4)
        p.ellipse(p.mouseX, p.mouseY, 60, 60)
    }
}
var inst4 = new p5(s,"S1-4")
