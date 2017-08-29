var board,sticks,bg,turn,P1,P2,winner,plays,waiting,moves,spaces,pause
function initBoard(){
  board = "XOXOXOXOXOXOXO................".split("")
}
initBoard()

var Player = function(name,color){
  this.name = name
  this.color = color
  this.throwSticks = autoSticks
  this.choose_RoT = autoRoT
  this.choose_move = autoMove
}

function setup(){
  createCanvas(1050,270)
  bg = loadImage("./SenetBoard.png");
  sticks = [0,0,0,0]
  turn = 0
  Player1 = new Player("Human","X")
  Player2 = new Player("CPU","O")
  Player1.choose_RoT = manualRoT
  Player1.choose_move = manualMove
  turn = -1
  initBoard()
  winner = null
  plays = 1
  waiting = false
  moves = {}
  spaces = 0
  pause = 10
}

function draw(){
  console.log("looping")
  frameRate(30)
  background(100)
  image(bg,0,0,900,270)
  drawSticks(sticks)
  drawBoard()
  if(pause){
    pause--
    return
  }
  if(!waiting){
    if(winner == null){
      console.log(board)
      if(turn > 0){
        console.log("Player 1's turn")
        let ret = takeTurn(Player1,turn)
        if(ret.length == 3){
          moves = ret[0]
          spaces = ret[1]
          waiting = true
        } else {
          winner = ret[0]
          turn = ret[1]
          pause = 10
        }
      } else if (winner == null){
        console.log("Player 2's turn")
        let ret = takeTurn(Player2,turn)
        winner = ret[0]
        turn = ret[1]
        pause = 10
      }
      plays++
    } else {
      if(winner == "X"){
        console.log("Yay,",Player1.name,"won")
        alert("You won!")
      } else if(winner == "O"){
        console.log("Yay,",Player2.name,"won")
        alert("You lost.")
      } else {
        console.log("Whoops, an error occurred")
        alert("Whoops, an error occurred. Press ctrl-shift-j and send the screenshot to Danny")
      }
      noLoop()
    }
  } else {
    if(pointIsHouse(mouseX,mouseY) && typeof moves != "number"){
      let hover = pointToHouse(mouseX,mouseY)
      for(let m in moves){
        highlight(m,color(255,100,0))
      }
      if(hover in moves){
        highlight(hover,color(0,255,0))
        highlight(moves[hover],color(0,0,255))
      } else {
        highlight(hover,color(255,0,0))
      }
    }
    if(typeof moves == "number"){
      let ret = finishTurn(Player1,turn,moves,spaces)
      winner = ret[0]
      turn = ret[1]
      moving = {}
      waiting = false
      pause = 10
    }
  }
}

function drawSticks(sticks){
  push()
  strokeWeight(2)
  stroke(0)
  translate(900,0)
  if(sticks[0] != null){
    for(var i=0; i<4; i++){
      fill(sticks[i]*255)
      rect(20+i*30,20,20,height-40,4)
    }
  }
  pop()
}

function drawBoard(){
  push()
  translate(3,3)
  scale(.99,.99)
  for(var i=0; i<30; i++){
    strokeWeight(2)
    stroke(0) 
    let [x,y] = houseToPoint(i)
    if(board[i] != '.'){
      if(board[i] == "X"){
        fill(0)
      } else  {
        fill(255)
      }
      ellipse(x,y,60,60)
    }
  }
  pop()
}

function highlight(house,color){
  noFill()
  stroke(color)
  strokeWeight(4)
  let [xPiece,yPiece] = houseToPoint(house)
  rect(xPiece-42,yPiece-42,84,84)
  [xPiece,yPiece] = houseToPoint(moves[house])
  rect(xPiece-42,yPiece-42,84,84)
}


function mousePressed(){
  console.log(moves)
  if(pointIsHouse(mouseX,mouseY) && typeof moves != "number"){
    let house = pointToHouse(mouseX,mouseY)
    if(house in moves){
      moves = house
    }
  }
}