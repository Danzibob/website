var prey = []
var killCount = 0
var totalKills = 0
var maxKills = 0
var pred, sliderA, nom, sliderB, p
function preload() {
  nom = loadSound('nom.mp3');
}

function setup(){
    createCanvas(400,500).parent("cnv_holder")
    pop_slider = createSlider(0,500,2,1).parent("pop_slider")
    trn_slider = createSlider(0,12,12,0.01).parent("trn_slider")
    spd_slider = createSlider(1,25,25,0.1).parent("spd_slider")
    checkbox = createCheckbox("",true).parent("sound_button").style("zoom","3")
    p = createP("").parent("text")
    colorMode(HSB)
    for(var i = 0; i < 2; i++){
        prey.push(new Prey())
    }
    pred = new Predator()
}

function draw(){
    //setup
    translate(width/2, 200)
    background(0)
    ellipse(0,0,400,400)
    nom.setVolume(0.4)
    //simulate Predator
    pred.ai()
    pred.update()
    //respawn worms
    while(pop_slider.value() > prey.length){
        prey.push(new Prey())
    }
    //simulate and draw worms
    for(i in prey){
        prey[i].ai()
        prey[i].update()
        prey[i].draw()
    }
    //draw predator
    pred.draw()
    //update readout
    if(frameCount % 60 == 0 && frameCount != 0){
        if(killCount > maxKills){maxKills = killCount}
        totalKills += killCount
        var age = frameCount/60
        $("#age").html(age)
        $("#eaten").html(totalKills)
        $("#speed").html(nfc(pred.maxSpeed*60,0))
        $("#force").html(nfc(pred.maxForce,2))
        $("#wps").html(killCount)
        $("#avg").html(nfc(totalKills/age,2))
        $("#max").html(maxKills)
        killCount = 0
    }
}

function distSq(v1,v2){
    a = v1.copy()
    b = v2.copy()
    b.sub(a)
    return b.magSq()
}
