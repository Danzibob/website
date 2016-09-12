var s = function(p){
    p.setup = function(){
        p.createCanvas(400,200)
    }
    p.draw = function(){
        p.background(51,51,51)

    }
}
var inst2 = new p5(s,"S1-2");
