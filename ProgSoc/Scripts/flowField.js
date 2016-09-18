var scl = 20
var pScl = 10
var cols, rows
var zoff
var particles = []
var flowField
var h = 0
function setup(){
    createCanvas(560,400).parent("canvas_holder")
    colorMode(HSB,1)
    zoff = random(1000)
    cols = floor(width/scl)
    rows = floor(height/scl)
    flowField = new Array(cols*rows)
    for(var i=0; i < 500; i++){
        particles.push(new Particle())
    }
    background(100)
}

function draw(){
    for(var y = 0; y < rows; y++){
        for(var x = 0; x < cols; x++){
            var v = p5.Vector.fromAngle(noise(x/pScl,y/pScl,zoff)*TWO_PI)
            var index = x+y*cols
            flowField[index] = v
            // push()
            // translate(x*scl, y*scl)
            // rotate(v.heading())
            // stroke(0,50)
            // strokeWeight(2)
            // line(0,0,scl,0)
            // pop()
        }
    }
    for(var i=0; i < particles.length; i++){
        particles[i].follow(flowField)
        particles[i].update()
        particles[i].show(h%1)
    }

    zoff += 0.002
    h += 0.001
    if(h > 1){
        h = 0
    }
}

var Particle = function(){
    this.pos = createVector(random(width),random(height))
    this.prev = createVector(this.pos.x, this.pos.y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.update = function(){
        this.vel.add(this.acc)
        this.vel.limit(10)
        this.prev.x = this.pos.x
        this.prev.y = this.pos.y
        this.pos.add(this.vel)
        this.acc.mult(0)
        if(this.pos.x > width){
            this.pos.x = this.pos.x - width
            this.prev.x = this.pos.x
        }
        if(this.pos.x < 0){
            this.pos.x = this.pos.x + width
            this.prev.x = this.pos.x
        }
        if(this.pos.y > height){
            this.pos.y = this.pos.y - height
            this.prev.y = this.pos.y
        }
        if(this.pos.y < 0){
            this.pos.y = this.pos.y + height
            this.prev.y = this.pos.y
        }
    }
    this.applyForce = function(force){
        this.acc.add(force)
    }
    this.show = function(h){
        stroke(h,1,1,0.02)
        strokeWeight(1)
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y)
    }
    this.follow = function(vectors){
        var x = floor(this.pos.x / scl)
        var y = floor(this.pos.y / scl)
        var index = x+y*cols
        this.applyForce(vectors[index])
    }
}
