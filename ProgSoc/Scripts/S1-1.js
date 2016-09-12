var s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
    }
    p.draw = function(){
        p.background(255)
    }
}
var inst1 = new p5(s,"S1-1");
