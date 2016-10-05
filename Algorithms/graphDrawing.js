var Node = function(pos, name, size = 24, hue = false){
    if(!hue){this.hue = random(360)}else{this.hue = hue}
    this.size = size
    this.pos = pos
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.show = function(){
        noStroke()
        fill(this.hue, 100, 100)
        textFont(fontMono)
        textSize(this.size/1.4)
        ellipse(this.pos.x, this.pos.y, this.size, this.size)
        fill(0)
        text(name, this.pos.x-(name.length*this.size/4), this.pos.y+(this.size/4))
    }
    this.applyForce = function(vect){this.acc.add(vect)}
    this.update = function(dmp){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
        this.vel.mult(dmp)
    }
}
var Edge = function(a,b,base_length, force=0.001){
    this.base_len = base_length
    this.k = force
    this.a = a
    this.b = b
    this.applyForce = function(){
        var v = p5.Vector.sub(this.b.pos, this.a.pos)
        var x = v.mag()-this.base_len*scl
        x = x
        if(x > 0){
            v.setMag(x)
        } else {
            v.mult(-1)
            v.setMag(-x)
        }
        v.mult(this.k)
        this.a.applyForce(v)
        v.mult(-1)
        this.b.applyForce(v)
    }
    this.show = function(stress = true){
        if(stress){
            var v = p5.Vector.sub(this.b.pos, this.a.pos)
            var x = v.mag()-this.base_len*scl
            var tension = map(x,-100,100,0,200)
            stroke(tension,60,100)
        } else {stroke(100)}
        strokeWeight(3)
        line(a.pos.x, a.pos.y, b.pos.x, b.pos.y)
    }
}
