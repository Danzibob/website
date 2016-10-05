var s = function(p){
    p.setup = function(){
        p.createCanvas(600,400)
        p.stroke(255,0,0)
        p.strokeWeight(8)
        p.noFill()
    }
    p.draw = function(){
        p.background(51)
        p.ellipse(p.mouseX, p.mouseY, 100, 100)
    }
}
var inst1 = new p5(s,"demo-1");
var s = function(p){
    p.setup = function(){
        p.createCanvas(600,400)
        p.colorMode(p.HSB)
    }
    p.draw = function(){
        hue = p.map(p.mouseX, 0, p.width, 0, 360)
        lum = p.map(-p.mouseY, -p.height, 0, 0, 100)
        p.fill(hue, 100, lum)
        p.background(100)
        p.ellipse(p.mouseX, p.mouseY, 100, 100)
    }
}
var inst2 = new p5(s,"demo-2");







var s = function(p){
    var x
    var y
    p.setup = function(){
        p.createCanvas(600,400)
        p.background(51)
        x = p.width/2 -10
        y = p.height/2 -10
        p.rect(x, y, 20,20)
        p.noStroke()
    }
    p.draw = function(){
        if(p.keyIsDown(65)){x-=5}
        if(p.keyIsDown(68)){x+=5}
        if(p.keyIsDown(87)){y-=5}
        if(p.keyIsDown(83)){y+=5}
        p.rect(x, y, 20,20)
    }
    p.mousePressed = function(){
        p.background(51)
    }
}
var inst3 = new p5(s,"demo-3");

var s = function(p){
    var particles = []
    var launches = []
    p.setup = function(){
        p.createCanvas(1000,400)
        p.colorMode(p.HSB)
    }
    p.draw = function(){
        p.background(0)
        if(p.random(100) < 5){
            particles = particles.concat(explode(p.random(p.width),p.random(p.height/3)+30))
        }
        for(var i = particles.length-1; i >= 0; i--){
            particles[i].update(p)
            particles[i].show(p)
            if(particles[i].pos.y > p.height){
                particles.splice(i,1)
            }
        }
    }

    function explode(x,y){
        var particles = []
        var hue = p.random(360)
        for(var i = 0; i < SIZE; i++){
            particles.push(new Particle(x,y,hue))
        }
        return particles
    }

    var GRAVITY = 9.81/60
    var SIZE = 60
    function Particle(x,y, hue){
        this.pos = p.createVector(x,y)
        this.vel = p5.Vector.random2D().mult(p.random(5))
        this.hue = hue
        this.update = function(){
            this.vel.y = this.vel.y + GRAVITY
            this.pos.add(this.vel)
        }
        this.show = function(){
            p.strokeWeight(2)
            p.stroke(this.hue, 100, 100)
            p.point(this.pos.x, this.pos.y)
        }
    }
}
var inst1 = new p5(s,"demo-4");
