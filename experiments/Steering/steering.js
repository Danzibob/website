var prey = []
var killCount = 0
var pred, sliderA, nom, sliderB, p
function preload() {
  nom = loadSound('nom.mp3');
}

function setup(){
    createCanvas(400,400).parent("cnv_holder")
    sliderA = createSlider(0,500,40,10).parent("pop_slider")
    sliderB = createSlider(0,1,0.4,0.001).parent("snd_slider")
    sliderC = createSlider(5,50,50,1).parent("spd_slider")
    p = createP("").parent("text")
    colorMode(HSB)
    for(var i = 0; i < 50; i++){
        prey.push(new Prey())
    }
    pred = new Predator()
}

function draw(){
    translate(width/2, height/2)
    background(0)
    ellipse(0,0,400,400)
    nom.setVolume(sliderB.value())
    var minD = 1000000
    var mini = "NA"
    var hitlist = []
    for(i in prey){
        prey[i].flee(pred.pos.x, pred.pos.y)
        prey[i].update()
        prey[i].draw()
        var d = distSq(pred.pos,prey[i].pos)
        if(d < minD){minD = d;mini = i}
        if(d < 64){hitlist.push(i)}
    }
    if(mini != "NA"){
        pred.follow(prey[mini].pos.x,prey[mini].pos.y)
    }
    hitlist.sort()
    hitlist.reverse()
    if(hitlist.length > 0){
        nom.play()
        killCount += hitlist.length
    }
    for(i in hitlist){
        prey.splice(hitlist[i],1)
        if(pred.maxSpeed > sliderC.value()){
            pred.maxSpeed = sliderC.value()
        } else {
            pred.maxSpeed += 0.05
        }
        pred.maxForce += 0.02
    }
    while(sliderA.value() > prey.length){
        prey.push(new Prey())
    }
    pred.update()
    pred.draw()
    if(frameCount % 60 == 0){
        p.html(killCount)
        killCount = 0
    }
}

function distSq(v1,v2){
    a = v1.copy()
    b = v2.copy()
    b.sub(a)
    return b.magSq()
}
