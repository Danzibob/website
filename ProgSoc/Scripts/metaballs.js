var balls = []

function setup(){
    createCanvas(360, 240).parent("canvas_holder")
    for(var i = 0; i < 3; i++){
        balls.push(new Ball())
    }
}

function draw(){
    for(var b = 0; b < 3; b++){
        balls[b].update()
    }
    loadPixels()
        for(var x = 0; x < width; x++){
            for(var y = 0; y < height; y++){
                var index = 4*(x + y*width)
                // var rgb = []
                for(var b = 0; b < 3; b++){
                    var v = balls[b].d(x,y)*255*2
                    pixels[index+b] = v
                    // rgb.push(balls[b].d(x,y)*255)
                }
                pixels[index+3] = 255
                // console.log(rgb)
            }
        }
    updatePixels()
    console.log(frameRate())
}

var Ball = function(){
    this.pos = createVector(random(width), random(height))
    this.vel = p5.Vector.random2D()
    this.vel.mult(5)
    this.r = 40
    this.update = function(){
        this.pos.add(this.vel)
        if(this.pos.x > width || this.pos.x < 0){
            this.vel.x *= -1
        }
        if(this.pos.y > height || this.pos.y < 0){
            this.vel.y *= -1
        }
    }
    this.d = function(x,y){
        var distance = dist(this.pos.x, this.pos.y, x, y)+40
        return this.r/distance
    }

}
