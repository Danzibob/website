var Prey = function(){
    var p = createVector(random(width)-width/2, random(400)-400/2)
    Agent.call(this,p,150)
    this.hue = random(360)
    this.ai = function(){
        this.flee(pred.pos.x, pred.pos.y)
    }
    this.idle = function(){
        var rnd = frameCount/40 + this.hue
        var v = p5.Vector.fromAngle(noise(rnd)*TWO_PI)
        v.mult(this.maxForce/1.5)
        this.acc.add(v)
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
