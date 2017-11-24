let MAXx = 15
let MAXv = 0.05
let selfCo = 0.02
let nghCo = 0.033
let numParticles = 600
let particles = []

let MIN = 100

function setup(){
    createCanvas(600,600)
    colorMode(HSB,1)
    for(let i=0; i<numParticles; i++){
    	particles.push(new Particle())
    }
    background(0.1)
}

function draw(){
	background(1,0,1)
	strokeWeight(1)
	stroke(0)
	translate(width/2, height/2)
    for(let i=0; i<numParticles; i++){
    	if(i < numParticles - 10){
    		particles[i].step(particles.slice(i,i+5))
    	} else {
    		particles[i].step(particles.slice(5))
    	}
    	particles[i].render()
    }
    for(let i=0; i<width; i+=5){
    	noStroke()
    	fill(i/width/1.5,1,1)
    	rect(i-width/2,height/2 -20,5,20)
    }
}








function SinCircles(v){
	a = v.x
	b = v.y
	let sqsum = a*a + b*b
	return (1+(sin(sqrt(sqsum)))/(1+0.01*(sqsum)))/1.5
}

function bowl(v){
	a = v.x
	b = v.y
	let sqsum = a*a + b*b
	if(sqsum < 0.4){
		sqsum += 0.5
	}
	return (sqsum)/255

}

let f = SinCircles

function bestNeighbor(neighbors){
	let bestVal = neighbors[0].bestVal
	let bestN = neighbors[0]
	for(let i in neighbors){
		let n = neighbors[i]
		if(n.bestVal < bestVal){
			bestN = n
			bestVal = n.bestVal
		}
	}
	if(bestVal < MIN){
		MIN = bestVal
		console.log(MIN)
		fill(1,0,1)
		ellipse(bestN.pos.x*20,bestN.pos.y*20,20,20)
	}
	return bestN
}

var Particle = function(){
	this.pos = createVector(random(-MAXx,MAXx),random(-MAXx,MAXx))
	this.vel = createVector(random(-MAXv,MAXv),random(-MAXv,MAXv))
	this.best = this.pos.copy()
	this.bestVal = f(this.pos)
	this.step = function(neighbors){
		let toMyBest = p5.Vector.sub(this.best,this.pos)
		let bestN = bestNeighbor(neighbors)
		let toOtherBest = p5.Vector.sub(bestN.best,this.pos)
		toMyBest.mult(selfCo)
		toOtherBest.mult(nghCo)

		// let dMyBest = p5.Vector.add(this.pos,toMyBest)
		// stroke(0,.5,1)
		// line(this.pos.x*20,this.pos.y*20,dMyBest.x*20,dMyBest.y*20)
		// let dOthrBest = p5.Vector.add(this.pos,toOtherBest)
		// stroke(1,.5,1)
		// line(this.pos.x*20,this.pos.y*20,dOthrBest.x*20,dOthrBest.y*20)

		let acc = p5.Vector.add(toOtherBest,toMyBest)
		this.vel.add(acc)
		this.vel.limit(MAXv)
		this.pos.add(this.vel)
		let val = f(this.pos)
		if(val < this.bestVal){
			this.bestVal = val
			this.best = this.pos.copy()
		}
	}
	this.render = function(){
		let hue = f(this.pos)/2
		fill(hue,1,1)
		stroke(1,0,0)
		//noStroke()
		ellipse(this.pos.x*20,this.pos.y*20,5,5)
	}
}

function mousePressed(){
	let v = createVector((mouseX-width/2)/20,(mouseY-height/2)/20)
	console.log("test:",f(v))
}