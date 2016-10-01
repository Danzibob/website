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
        // if(this.pos.x > width-5 ){this.acc.x = -this.maxForce*8; redo = true}
        // if(this.pos.x < 5       ){this.acc.x = this.maxForce*8; redo = true}
        // if(this.pos.y > height-5){this.acc.y = -this.maxForce*8; redo = true}
        // if(this.pos.y < 5       ){this.acc.y = this.maxForce*8; redo = true}
        if(this.pos.x*this.pos.x + this.pos.y*this.pos.y > 30000){
            this.acc.x = -this.pos.x*this.maxForce/8
            this.acc.y = -this.pos.y*this.maxForce/8
        }
        if(redo){
            this.vel.add(this.acc)
            this.acc.mult(0)
            this.vel.limit(this.maxSpeed)
            this.pos.add(this.vel)
        }
    }
}

var Prey = function(){
    var p = createVector(random(width)-width/2, random(height)-height/2)
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
    var p = createVector(random(width)-width/2, random(height)-height/2)
    Agent.call(this,p,200)
    this.hue = random(360)
    this.size = 16
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
        strokeWeight(this.size/2)
        line(-this.size,0,0,0)
        strokeWeight(this.size/2 -2)
        stroke(100)
        point(0,0)
        strokeWeight(this.size/4 )
        stroke(255,0,0)
        point(this.size/16,0)
        pop()
    }
}
Predator.prototype = Object.create(Agent.prototype)
Predator.prototype.constructor = Agent
