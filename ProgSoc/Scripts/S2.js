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
