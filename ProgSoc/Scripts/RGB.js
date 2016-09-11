var RGBlist = []
function setup(){
    createCanvas(360,180).parent("#RGBSketch")
    for(var i = 0; i < 3; i++){
        RGBlist.push(createSlider(0,255,255,1))
        RGBlist[i].position(0, 60*i)
        RGBlist[i].size(176, 60)
        RGBlist[i].parent("#RGBSketch")
    }
    noStroke();
}

function draw(){
    background(RGBlist[0].value(), RGBlist[1].value(), RGBlist[2].value())
    fill(RGBlist[0].value(),0,0)
    rect(0,0, 180,60)
    fill(0,RGBlist[1].value(),0)
    rect(0,60, 180,60)
    fill(0,0,RGBlist[2].value())
    rect(0,120, 180,60)

}
