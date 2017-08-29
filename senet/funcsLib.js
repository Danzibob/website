const REBIRTH = 14
const BEAUTY = 25
const WATER = 26
const THREE = 27
const TWO = 28
const LAST = 29
const BEAR_OFF = 30

function getPlayerPieces(player,gameBoard){
  pieces = []
  for(let i=0; i<30; i++){
    if (player == gameBoard[i]){
      pieces.push(i)
    }
  }  
  return pieces
}

function protected(p,gameBoard,house){
  if(gameBoard[house] == '.' || house == WATER){
    return false
  } 
  //console.log(house,p,gameBoard[house-1] == p,gameBoard[house+1] == p,gameBoard[house] == p)
  return (gameBoard[house-1] == p || gameBoard[house+1] == p)

}

function opponent(player){
  if(player == "O"){
    return "X"
  } else {
    return "O"
  }
}

function getForwardMoves(player,gameBoard,spaces){
  pieces = getPlayerPieces(player,gameBoard)
  //console.log(pieces)

  if(pieces.indexOf(WATER) > -1){
    if(spaces == 4){
      return {WATER:BEAR_OFF}
    } else {
      return {}
    }
  }

  validMoves = {}
  for(piece in pieces){
    piece = parseInt(pieces[piece])
    let dest = piece+spaces
    //console.log(piece,"piece","dest",dest)

    if(piece < BEAUTY){
      if(dest == BEAUTY && gameBoard[BEAUTY] != player){
        validMoves[piece] = BEAUTY
      } else if (dest > BEAUTY){
        continue
      }
    }
    if(dest == BEAR_OFF){
      validMoves[piece] = BEAR_OFF
    } else if(piece == THREE || piece == TWO){
      continue
    } else if(piece == LAST){
      validMoves[piece] = BEAR_OFF
    } else if(gameBoard[dest] == "."){
      validMoves[piece] = dest
    } else if(gameBoard[dest] == player){
      continue
    } else {
      //console.log("got here")
      if(!protected(opponent(player),gameBoard,dest)){
        validMoves[piece] = dest
      }
    }
  }
  return validMoves
}

function getBackwardMoves(player,gameBoard,spaces){
  pieces = getPlayerPieces(player,gameBoard)

  if(pieces.indexOf(WATER) > -1){
    return {}
  }

  validMoves = {}
  for(piece in pieces){
    piece = parseInt(pieces[piece])
    let dest = piece-spaces
    if(spaces <= piece && piece < WATER){
      if(gameBoard[dest] == '.' || gameBoard[dest] == opponent(player) && !protected(player,gameBoard,dest)){
        validMoves[piece] = dest
      } else if(piece == THREE || piece == TWO){
        validMoves[piece] = WATER
      }
    }
  }
  return validMoves
}

function get_valid_moves(player,gameBoard,spaces){
  let moves = getForwardMoves(player,gameBoard,spaces)
  //console.log("found moves", moves)
  if(moves == {}){
    return getBackwardMoves(player,gameBoard,spaces)
  }
  return moves
}

function throwSticks(n){
  let sticks = []
  for(var i=0; i<n; i++){
    sticks.push(floor(random(2)))
  }
  return sticks
}

function sticksToSpaces(sticks){
  //console.log(sticks)
  light = sticks.filter(x => x == 1).length
  if(light == 0){
    light = 5
  }
  return parseInt(light)
}

function updateMove(player,move,spaces){
  let moves = get_valid_moves(player,board,spaces)
  var dest
  if(move in moves){
    dest = moves[move]
    console.log("Updating",move,dest,spaces)
    if(dest == BEAR_OFF){
      board[move] = '.'
    } else if (board[dest] == '.'){
      board[move] = '.'
      board[dest] = player
    } else if (board[dest] == opponent(player)){
      board[move] = opponent(player)
      board[dest] = player
    } else {
      throw Error("Whoops, invalid move attempted");
    }
  }
  //console.log(move,dest)
  //console.log(board)
}

function takeTurn(Player,turn){
  let player = Player.color
  let winner = null
  if(board[WATER] == player){
    if(board[REBIRTH] == '.'){
      let choice = Player.choose_RoT(board)
      if(choice == "REBIRTH"){
        board[REBIRTH] = player
        board[WATER] = '.'
      } else {
        let spaces = sticksToSpaces(Player.throwSticks())
        if(spaces == 4){
          board[WATER] = '.'
        } else{
          turn *= -1
        }
      }
    } else {
      turn *= -1
    } 
  } else {
    let spaces = sticksToSpaces(Player.throwSticks())
    let opts = get_valid_moves(player,board,spaces)
    //console.log("rolled a",spaces)
    //console.log(moves)
    if(len(opts) > 0){
      console.log(opts)
      if(player == "O"){
        let move = Player.choose_move(opts)
        updateMove(player,move,spaces)

        if([2,3].indexOf(spaces) > -1 || board[WATER] == player){
          turn *= -1
        }

        if(winner == null && isWinner(player)){
          winner = player
        }
      } else {
        console.log(spaces)
        return [opts,spaces,"Hi"]
      }
    } else {
      turn *= -1
    }
  }
  return [winner,turn]
}

function finishTurn(Player,turn,move,spaces){
  let player = Player.color
  console.log("finishing move",move,spaces)
  updateMove(player,move,spaces)
  if([2,3].indexOf(spaces) > -1 || board[WATER] == player){
    turn *= -1
  }
  if(isWinner(player)){
    winner = player
  }
  return [winner,turn]
}

function isWinner(player){
  console.log(player,board,!(board.indexOf(player)+1))
  return !(board.indexOf(player)+1)
}

function autoSticks(){
  sticks = throwSticks(4)
  return sticks
}
function autoRoT(){
  return "REBIRTH"
}
function autoMove(moves){
  for(var house in moves){
    return house
  }
}


function manualRoT(){
  if(confirm("Choose Yes to use House or Rebirth, or try to roll out of the House of Water with Cancel (Must roll a 4)",)){
    return "REBIRTH"
  } else {
    return "TOSS"
  }
}

function manualMove(moves){
  waiting = true
  moving = moves
  while(moving == moves){
    console.log("redrawing")
    redraw()
  }
  let move = moving
  moving = false
  return move

  //ENTIRELY REDO THIS. CAN'T JUST BE A FUNCTION.

}

function houseToPoint(house){
  let y = 45 + 90*floor(house/10)
  let x = 45
  if(house < 10 || house >= 20){
    x += (house%10)*90
  } else {
    x += (19-house)*90
  }
  return [x,y]
}

function pointIsHouse(x,y){
  return 0<x && x<900 && 0<y && y<270
}

function pointToHouse(x,y){
  let house = floor(y/90)*10
  let col = floor(x/90)
  if(house < 10 || house >= 20){
    house += col
  } else {
    house += 9-col
  }
  return house
}

function len(obj){
  let l = 0
  for(let i in obj){
    l++
  }
  return l
}