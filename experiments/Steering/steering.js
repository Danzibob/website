var Agent = function(pos,t){
    this.pos = pos
    this.track = pow(t,2)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.maxSpeed = 3
    this.maxForce = 0.05
    this.follow = function(Tx,Ty, flee = false){
        var target = createVector(Tx, Ty)
        var desired = p5.Vector.sub(target,this.pos)
        if(this.track > desired.magSq()){
            if(flee){
                desired.mult(-1)
            }
            desired.normalize()
            desired.mult(this.maxSpeed)
            var steering = p5.Vector.sub(desired,this.vel)
            steering.limit(this.maxForce)
            this.acc.add(steering)
        } else {
            this.idle()
        }
    }
    this.flee = function(x,y){
        this.follow(x,y,true)
    }
    this.update = function(){
        this.vel.add(this.acc)
        this.acc.mult(0)
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel)
        var redo = false
        // if(this.pos.x > width-5 ){this.pos.x = width-5}
        // if(this.pos.x < 5       ){this.pos.x = 5}
        // if(this.pos.y > height-5){this.pos.y = height-5}
        // if(this.pos.y < 5       ){this.pos.y = 5}
        // if(this.pos.x > width ){this.pos.x -= width}
        // if(this.pos.x < 0     ){this.pos.x += width}
        // if(this.pos.y > height){this.pos.y -= height}
        // if(this.pos.y < 0     ){this.pos.y += height}
        if(this.pos.x > width-5 ){this.acc.x = -0.4; redo = true}
        if(this.pos.x < 5       ){this.acc.x = 0.4; redo = true}
        if(this.pos.y > height-5){this.acc.y = -0.4; redo = true}
        if(this.pos.y < 5       ){this.acc.y = 0.4; redo = true}
        if(redo){
            this.vel.add(this.acc)
            this.acc.mult(0)
            this.vel.limit(this.maxSpeed)
            this.pos.add(this.vel)
        }
    }
}

var Prey = function(){
    var p = createVector(random(width), random(height))
    Agent.call(this,p,200)
    this.hue = random(360)
    this.idle = function(){
        this.acc.sub(p5.Vector.mult(this.vel,0.1))
    }
    this.draw = function(){
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading());
        stroke(this.hue,100,100)
        strokeWeight(5)
        line(-10,0,0,0)
        strokeWeight(3)
        stroke(100)
        point(0,0)
        strokeWeight(2)
        stroke(0)
        point(1,0)
        pop()
    }

}
Prey.prototype = Object.create(Agent.prototype)
Prey.prototype.constructor = Agent

var Predator = function(){
    var p = createVector(random(width), random(height))
    Agent.call(this,p,200)
    this.hue = random(360)
    this.idle = function(){
        if(this.vel.x == 0){
            this.vel.x += random(0.05,0.15)
            this.vel.y += random(0.05,0.15)
        }
        this.acc.add(p5.Vector.mult(this.vel,0.1))
    }
    this.draw = function(){
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading());
        stroke(this.hue,100,100)
        strokeWeight(8)
        line(-16,0,0,0)
        strokeWeight(6)
        stroke(100)
        point(0,0)
        strokeWeight(4)
        stroke(255,0,0)
        point(2,0)
        pop()
    }
}
Predator.prototype = Object.create(Agent.prototype)
Predator.prototype.constructor = Agent

var prey = []
var pred
function setup(){
    createCanvas(400,400).parent("cnv_holder")
    colorMode(HSB)
    for(var i = 0; i < 50; i++){
        prey.push(new Prey())
    }
    pred = new Predator()
}

function draw(){
    background(0)
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
    for(i in hitlist){
        prey.splice(hitlist[i],1)
        pred.maxSpeed += 0.1
        pred.maxForce += 0.01
        prey.push(new Prey())
    }
    pred.update()
    pred.draw()
}

function distSq(v1,v2){
    a = v1.copy()
    b = v2.copy()
    b.sub(a)
    return b.magSq()
}
