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
        if(this.pos.x*this.pos.x + this.pos.y*this.pos.y > 36000){
            this.acc.x = -this.pos.x*this.maxForce/20
            this.acc.y = -this.pos.y*this.maxForce/20
        }
        if(redo){
            this.vel.add(this.acc)
            this.acc.mult(0)
            this.vel.limit(this.maxSpeed)
            this.pos.add(this.vel)
        }
    }
}
