var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
var docMX=0
var docMY=0
var physics, stress, labels, scaler, damping, settle, follow,drawmode,newgraph
var newA, newB, djSelA, djSelB
var settling = false
var grabbed = false
var G = f
var tmp = false
var sttl = 0
var running = false
function preload(){
    fontMono = loadFont("../styleNscripts/Fonts/DroidSansMono/DroidSansMono.ttf")
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return args[number]
        })
    }
}
function setup(){
    createCanvas(500,500).parent("sketch")
    physics = createCheckbox().parent("Physics")
    stress  = createCheckbox().parent("Stress")
    labels  = createCheckbox("",true).parent("Labels")
    center  = createButton("Center").parent("Center").mousePressed(ctr)
    settle  = createButton("Settle").parent("Settle").mousePressed(settle)
    scaler  = createSlider(0.3,20,3,0.01).parent("Scale")
    damping = createSlider(0.95,0.995,0.97,0.001).parent("Damping")
    drawmode = createCheckbox().parent("DrawMode")
    newgraph = createButton("New Graph").parent("NewGraph").mousePressed(newG)
    djSelA  = createSelect().parent("djk")
    djSelB  = createSelect().parent("djk")
    for(var n in G.V){
        djSelA.option(G.V[n])
        djSelB.option(G.V[n])
    }
    G.setupDrawing()
    colorMode(HSB)
}

function draw(){
    if(running && frameCount % 60 == 0){
        if(running == "dijkstraEnd"){G.dijkstraEnd(); running=false}
        if(running == "dijkstraMain"){if(G.dijkstraMain()){running="dijkstraEnd"}}
        if(running == "dijkstraSetup"){G.dijkstraSetup(djSelA.value(),djSelB.value()); running="dijkstraMain"}
        if(running == "kruskalEnd"){G.kruskalEnd(); running=false}
        if(running == "kruskalMain"){if(G.kruskalMain()){running="kruskalEnd"}}
        if(running == "kruskalSetup"){G.kruskalSetup(); running="kruskalMain"}
        if(running == "AStarEnd"){G.AStarEnd(); running=false}
        if(running == "AStarMain"){if(G.AStarMain()){running="AStarEnd"}}
        if(running == "AStarSetup"){G.AStarSetup(djSelA.value(),djSelB.value()); running="AStarMain"}
    }
    if(settling > -1){settling++; ctr()}
    if(settling > 20){
        var totx = 0
        var toty = 0
        for(var n in G.V){
            totx += abs(G.draw_nodes[G.V[n]].vel.x)
            toty += abs(G.draw_nodes[G.V[n]].vel.y)
        }
        if(totx < 0.2 && toty < 0.2){
            sttl += 1
            if(sttl > 10){settled()}
        } else {sttl = 0}
    }
    if(grabbed && drawmode.checked()){
        line(mouseX,mouseY,G.draw_nodes[grabbed].pos.x,G.draw_nodes[grabbed].pos.x)
    }
    scl = scaler.value()*scaler.value()

    background(51)
    if(physics.checked() && !drawmode.checked()){G.simulate(damping.value())}
    G.show(stress.checked(),labels.checked())
    if(tmp != false){
        G = tmp
        G.setupDrawing()
        tmp = false
    }
}

function mousePressed(){
    if(!grabbed){
        for(n in G.draw_nodes){
            if(dist(G.draw_nodes[n].pos.x,G.draw_nodes[n].pos.y,mouseX,mouseY) < 15){
                grabbed = n
                break
            }
        }
    }
    if(drawmode.checked() && !grabbed && bounds()){
        var nam = alphabet[G.V.length]
        G.addV(nam)
        djSelA.option(nam)
        djSelB.option(nam)
    }
}

function mouseDragged(){
    if(grabbed && !drawmode.checked() && bounds()){
        G.draw_nodes[grabbed].pos.x = mouseX
        G.draw_nodes[grabbed].pos.y = mouseY
    }
}

function mouseReleased(){
    if(drawmode.checked() && grabbed && bounds()){
        for(n in G.draw_nodes){
            newA = grabbed
            newB = n
            if(dist(G.draw_nodes[n].pos.x,G.draw_nodes[n].pos.y,mouseX,mouseY) < 15){
                $("body").append($('<input/>')
                    .attr({ type: 'text', id: 'weightInput'})
                    .css({
                        "position": "fixed",
                        "top": String(docMY),
                        "left": String(docMX),
                        "width": "20"
                    })
                    .keyup(function (e) {
                        if(e.keyCode == 13){
                            G.connect(newA,newB,parseInt($("#weightInput").val()))
                            $("#weightInput").remove()
                        }
                    }))
                $("#weightInput").focus()
                break
            }
        }
    }
    grabbed = false
}
function ctr(){G.center()}
function newG(){G = new Graph(); G.process(); G.setupDrawing()}
function settle(){
    $("#DrawMode input").prop('checked',false)
    $("#Physics input").prop('checked',true)
    $("#Stress input").prop('checked',true)
    settling = 0
}
function settled(){
    $("#Physics input").prop('checked',false)
    $("#Stress input").prop('checked',false)
    settling = -1
    sttl = 0
}
function bounds(){return (mouseX<width && 0<mouseX && 0<mouseY && mouseY<height)}
function mouseMoved(){
    var offset = $("canvas").offset()
    docMX = mouseX + offset.left
    docMY = mouseY + offset.top
}
function cnsl(text){
    var Cnsl = $("#Console")
    var str = Cnsl.html()
    str += text + "\n"
    Cnsl.html(str)
    var h = Cnsl[0].scrollHeight
    Cnsl.scrollTop(h)
    return true
}
function clrcnsl(){$("#Console").html("")}

function saveCurrent(name){
    var all = Cookies.get()
    if(!(name in all) || confirm("{0} is already in use, and will be overwitten.\nContinue?".format(name))){
        Cookies.set(name, G.export(), {path: '' })
    }
}
function loadSaved(name){
    var data = Cookies.getJSON(name)
    G = new Graph(data.nodes, data.edges)
    G.process()
    G.setupDrawing()
    $("#djSelA").find('option').remove()
    $("#djSelB").find('option').remove()
    for(var n in data.nodes){
        djSelA.option(data.nodes[n])
        djSelB.option(data.nodes[n])
    }
}
