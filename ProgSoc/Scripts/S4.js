var s = function(p){
    var a
    p.setup = function(){
        p.createCanvas(400,200)
        a = new Ball(p,p.createVector(p.width/2, p.height/2))
    }
    p.draw = function(){
        p.background(255)
        a.pos.add(a.vel)
        if(a.pos.x > p.width || a.pos.x < 0){
            a.vel.x = -a.vel.x
        }
        if(a.pos.y > p.height || a.pos.y < 0){
            a.vel.y = -a.vel.y
        }
        p.ellipse(a.pos.x, a.pos.y, 20, 20)
    }
}
var inst1 = new p5(s,"S4-2");
var s = function(p){
    var a
    p.setup = function(){
        p.createCanvas(400,200)
        a = new BetterBall(p,p.createVector(p.width/2, p.height/2))
    }
    p.draw = function(){
        p.background(255)
        a.update()
        a.show()
    }
}
var inst1 = new p5(s,"S4-3");


Ball = function(p,position){
    this.pos = position
    this.vel = p.createVector(p.random(-3,3),p.random(-3,3))
}

BetterBall = function(p,position){
    this.pos = position
    this.vel = p.createVector(p.random(-3,3),p.random(-3,3))
    this.update = function(){
        this.pos.add(this.vel)
        this.pos.add(this.vel)
        if(this.pos.x > p.width || this.pos.x < 0){
            this.vel.x = -this.vel.x
        }
        if(this.pos.y > p.height || this.pos.y < 0){
            this.vel.y = -this.vel.y
        }
    }
    this.show = function(){
        p.ellipse(this.pos.x, this.pos.y, 20, 20)
    }
}
