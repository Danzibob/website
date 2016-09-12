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
