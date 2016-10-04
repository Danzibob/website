var Predator = function(){
    var p = createVector(random(width)-width/2, random(400)-400/2)
    Agent.call(this,p,50)
    this.hue = random(360)
    this.size = 16
    this.idling = false
    this.idle = function(){
        this.idling = true
        var rnd = frameCount/40 + this.hue
        var v = p5.Vector.fromAngle(noise(rnd)*TWO_PI)
        var p = this.pos.copy()
        p.mult(1/150)
        v.sub(p)
        v.mult(this.maxForce/2)
        this.acc.add(v)
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
        strokeWeight(0.5)
        noFill()
        if(this.idling){stroke(0)}
        else {stroke(0,100,100)}
        ellipse(0,0,100,100)
        pop()
    }
    this.ai = function(){
        var minD = 100000000
        var mini = "NA"
        var hitlist = []
        for(i in prey){
            var d = distSq(this.pos,prey[i].pos)
            if(d < minD){minD = d;mini = i}
            if(d < 64){hitlist.push(i)}
        }
        if(mini != "NA"){
            this.idling = false
            this.follow(prey[mini].pos.x,prey[mini].pos.y)
        } else {
            this.idle()
        }
        hitlist.sort()
        hitlist.reverse()
        if(hitlist.length > 0){
            if(checkbox.checked()){nom.play()}
            killCount += hitlist.length
            this.size += hitlist.length/100
            this.maxSpeed += hitlist.length/50
            this.maxSpeed = constrain(this.maxSpeed,0,spd_slider.value())
            this.maxForce += hitlist.length/100
            this.maxForce = constrain(this.maxForce,0,trn_slider.value())
        }
        for(i in hitlist){
            prey.splice(hitlist[i],1)
        }
    }
}
Predator.prototype = Object.create(Agent.prototype)
Predator.prototype.constructor = Agent
