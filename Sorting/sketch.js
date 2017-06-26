//Parameters
var S = 512
var n = 8
//Other vars
var w = S/n
var N = n*n
var L = []
var t = 0
var T = {}

//Bubble
var current = 0
var swapped = false
//improved bubble
var itr = 1
//quick
var l = 0
var r = N-1
var piv = l
var todo = []
var working = false
current = N-1

function createData(){
	L = []
	w = S/n
	N = n*n
	t = frameCount
	for(var i=0; i<N; i++){
		L.push(Math.floor(random()*256))
	}
}

function reset(){
	swapped = false
	itr = 1
	l = 0
	r = N-1
}

function setup(){
	createCanvas(S+1,S+1)
	createData()
}

function draw(){
	background(51)
	//Draw grid
	stroke(0)
	strokeWeight(1)
	for(var x=0; x < n; x++){
		for(var y=0; y < n; y++){
			var i = x+y*n
			fill(L[i])
			rect(x*w,y*w,w,w)
			fill((L[i]+128)%256)
			textSize(w/2)
			text(nfc(L[i],0),x*w,(y+1)*w)
		}
	}

	//Style for selection box
	noFill()
	strokeWeight(5)
	stroke(255,255,0)

	//Perform sort
	quickSort()

	frameRate(60)
}

function bubble(){
	//Draw selection
	rect((current%n)*w,floor(current/n)*w,w*2,w)
	//Perform sort (every cycle)
	if(L[current] > L[current+1]){
		var swapper = L[current]
		L[current] = L[current+1]
		L[current+1] = swapper
		swapped = true
	}
	//At end of cycle
	if(current == N-1){
		if(!swapped){
			T[n] = frameCount - t
			console.log(T)
			n++
			createData()
			reset()
			current = 0
		}
		current = 0
		swapped = false
	} else { //If not at end
		current++
	}
}

function improvedBubble(){
	//Draw selection
	rect((current%n)*w,floor(current/n)*w,w*2,w)
	//Perform sort (every cycle)
	if(L[current] > L[current+1]){
		var swapper = L[current]
		L[current] = L[current+1]
		L[current+1] = swapper
		swapped = true
	}
	//At end of cycle
	if(current >= N-itr){
		if(!swapped){
			T[n] = frameCount - t
			n++
			createData()
			reset()
			current = 0
		}
		current = 0
		swapped = false
		itr++
	} else {
		current++
	}
}

function quickSort(){
	console.log(l,piv,current,r)
	//Draw selection
	stroke(0,0,255,100)
	rect((l%n)*w,floor(l/n)*w,w,w)
	rect((r%n)*w,floor(r/n)*w,w,w)
	strokeWeight(3)
	stroke(255,255,0)
	rect((current%n)*w,floor(current/n)*w,w,w)
	stroke(255,0,0)
	rect((piv%n)*w,floor(piv/n)*w,w,w)
	
	if(piv == current){
		if(piv-l > 1){
			if(r-piv > 1){todo.push([piv+1,r])}
			r = piv-1
		} else if(r-piv > 1) {
			l = piv+1
		} else {
			if(todo.length == 0){
				T[n] = frameCount - t
				n++
				createData()
				reset()
				current = N-1
			} else {
				var x = todo.pop()
				l = x[0]
				r = x[1]
			}
		}
		piv = l
		current = r
	}

	if(L[piv] > L[current]){
		changed = L.slice(l,piv).concat(L[current],L.slice(piv,current),L.slice(current+1))
		L.splice(l,changed.length,...changed)
		piv++
	} else {
		current--
	}
}