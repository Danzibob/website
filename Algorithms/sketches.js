var a = new Graph(["A","B","C","D","E"], {"AB":1,"BC":2,"CD":1,"CE":1,"DE":2,"BE":1,"DA":1,"AC":2,"DB":2,"AE":2})
a.process()

var b = new Graph(["A","B","C","D","E"], {"CE":1,"DE":1,"BE":1,"DA":1})
b.process()

var c = new Graph(["A","B","C","D","E"], {"CE":1,"BE":1,"DA":1,"BC":1})
c.process()

var d = new Graph(["A","B","C","D","E","F","G"], {"AB":6,"AC":3,"CE":12,"BE":8,"CD":5,"DE":3,"EF":5,"EG":9,"DG":20,"FG":2})
d.process()

var e = new Graph(["A","B","C","D","E"], {"AB":8,"AD":5,"BE":3,"BC":4,"DE":6,"CD":7,"CE":1})
e.process()

var scl = 1

function preload(){
    fontMono = loadFont("../styleNscripts/Fonts/DroidSansMono/DroidSansMono.ttf")
}

var physics, stress, labels, scaler, damping, settle, follow
var settling = false
var grabbed = false
var G = e
function setup(){
    createCanvas(500,500).parent("sketch")
    physics = createCheckbox().parent("Physics")
    stress  = createCheckbox().parent("Stress")
    labels  = createCheckbox().parent("Labels")
    center  = createButton("Center").parent("Center").mousePressed(center)
    settle  = createButton("Settle").parent("Settle").mousePressed(settle)
    scaler  = createSlider(0.3,20,0.01,1).parent("Scale")
    damping = createSlider(0.95,0.995,0.98,0.001).parent("Damping")
    G.setupDrawing()
    colorMode(HSB)
}

function draw(){
    if(settling > -1){settling++}
    if(settling > 20){
        var totx = 0
        var toty = 0
        for(var n in G.V){
            totx += abs(G.draw_nodes[G.V[n]].vel.x)
            toty += abs(G.draw_nodes[G.V[n]].vel.y)
        }
        if(totx < 0.2 && toty < 0.2){
            settled()
            console.log("settled")
        }
    }
    scl = scaler.value()*scaler.value()
    background(21)
    if(physics.checked()){G.simulate(damping.value())}
    G.show(stress.checked(),labels.checked())
}

function mousePressed(){
    if(grabbed === false){
        for(n in G.draw_nodes){
            if(dist(G.draw_nodes[n].pos.x,G.draw_nodes[n].pos.y,mouseX,mouseY) < 15){
                grabbed = n
                break
            }
        }
    }
}

function mouseDragged(){
    if(grabbed){
        G.draw_nodes[grabbed].pos.x = mouseX
        G.draw_nodes[grabbed].pos.y = mouseY
    }
}

function mouseReleased(){grabbed = false}
function center(){G.center()}
function settle(){
    $("#Physics input").prop('checked',true)
    $("#Stress input").prop('checked',true)
    settling = 0
}
function settled(){
    $("#Physics input").prop('checked',false)
    $("#Stress input").prop('checked',false)
    settling = -1
}
