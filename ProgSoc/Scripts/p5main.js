var penColor = 0
function setup(){
    var cnv = createCanvas(360,240)
    cnv.parent(select(".canvas_holder"))
    colorMode(HSB,255)
    background(0)
}
function draw(){
    noStroke()
    fill(penColor,255,255)
    ellipse(mouseX,mouseY,12)
    penColor = (penColor+1)%255
}
function mousePressed(){background(0)}
