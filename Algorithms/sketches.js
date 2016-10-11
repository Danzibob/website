var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
var docMX=0
var docMY=0
var physics, stress, labels, scaler, damping, settle, follow,drawmode,newgraph,speedslider
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
    var w = floor($("#left_pane").width()-2)
    var h = floor($("#left_pane").height()-8)
    createCanvas(w,h).parent("sketch")
    physics = createCheckbox().parent("Physics")
    stress  = createCheckbox().parent("Stress")
    labels  = createCheckbox("",true).parent("Labels")
    center  = createButton("Center").parent("Center").mousePressed(ctr)
    settle  = createButton("Settle").parent("Settle").mousePressed(settle)
    scaler  = createSlider(0.3,20,3,0.01).parent("Scale")
    damping = createSlider(0.95,0.995,0.97,0.001).parent("Damping")
    drawmode = createCheckbox().parent("DrawMode")
    newgraph = createButton("New Graph").parent("NewGraph").mousePressed(newG)
    speedslider = createSlider(1,200,60,1).parent("SpeedSlider")
    $("#djk").append("<select id=\"djSelA\"></select>")
    $("#djk").append("<select id=\"djSelB\"></select>")
    for(var n in G.V){
        $("#djk").children().append("<option value='{0}'>{0}</option>".format(G.V[n]))
    }
    G.setupDrawing()
    var saved = Cookies.get()
    for(var c in saved){
        $("#Saved").append(("<tr id='{0}'>"+
            "<th>{0}</th>"+
            "<td><button onclick='tmp=\"{0}\"'>Load</button></td>"+
            "<td><button onclick='delCookie(\"{0}\")'>Delete</button></td>"+
            "</tr>").format(c))
    }
    colorMode(HSB)
}

function draw(){
    if(running && frameCount % speedslider.value() == 0){
        if(running == "dijkstraEnd"){G.dijkstraEnd(); running=false} else
        if(running == "dijkstraMain"){if(G.dijkstraMain()){running="dijkstraEnd"}} else
        if(running == "dijkstraSetup"){G.dijkstraSetup($("#djSelA").val(),$("#djSelB").val()); running="dijkstraMain"} else
        if(running == "kruskalEnd"){G.kruskalEnd(); running=false} else
        if(running == "kruskalMain"){if(G.kruskalMain()){running="kruskalEnd"}} else
        if(running == "kruskalSetup"){G.kruskalSetup(); running="kruskalMain"} else
        if(running == "AStarEnd"){G.AStarEnd(); running=false} else
        if(running == "AStarMain"){if(G.AStarMain()){running="AStarEnd"}} else
        if(running == "AStarSetup"){G.AStarSetup($("#djSelA").val(),$("#djSelB").val()); running="AStarMain"} else
        if(running == "primEnd"){G.primEnd(); running=false} else
        if(running == "primMain1"){G.primMain1(); running="primMain2"} else
        if(running == "primMain2"){if(G.primMain2()){running="primEnd"} else {running="primMain1"}} else
        if(running == "primSetup"){G.primSetup(); running="primMain1"}

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

    background(21)
    if(physics.checked() && !drawmode.checked()){G.simulate(damping.value())}
    G.show(stress.checked(),labels.checked())
    if(tmp != false){
        loadSaved(tmp)
        tmp=false
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
        $("#djk").children().append("<option value='{0}'>{0}</option>".format(nam))
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
function newG(){
    G = new Graph();
    G.process();
    G.setupDrawing()
    $("#djk").children().empty()
}
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
    $("#Saved #"+name).remove()
    var all = Cookies.get()
    if(!(name in all) || confirm("{0} is already in use, and will be overwitten.\nContinue?".format(name))){
        Cookies.set(name, G.export(), {path: '', expires: 10000})
    }
    $("#Saved").append(("<tr id='{0}'>"+
        "<th>{0}</th>"+
        "<td><button onclick='tmp=\"{0}\"'>Load</button></td>"+
        "<td><button onclick='delCookie(\"{0}\")'>Delete</button></td>"+
        "</tr>").format(name))
}
function loadSaved(name){
    var data = Cookies.getJSON(name)
    if(data){
        G = new Graph(data.nodes, data.edges)
        G.process()
        if("positions" in data){G.setupDrawing(data.positions)} else {G.setupDrawing()}
        $("#djk").children().empty()
        for(var n in data.nodes){
            $("#djk").children().append("<option value='{0}'>{0}</option>".format(G.V[n]))
        }
    }else{return false}
}
function delCookie(name){
    if(!$("#DelWarn").is(":checked") ){console.log("Warning Disabled")}
    if(!$("#DelWarn").is(":checked") || confirm("Are you sure you want to delete " + name + "?")){
        Cookies.remove(name,{path: ''})
        $("#Saved #"+name).remove()
    }
}
// function saveCookies(){
//
//     var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
// }
// function loadCookies(){
//
// }
function autoScale(){
    var s = G.autoScale()
    $("#Scale input").val(pow(s,0.5));
}
