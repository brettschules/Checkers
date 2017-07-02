class ChessPiece {
  constructor(player, cell) {
    this.player = player
    this.cell = cell
  }

  render() {
    return `<div class='piece-${this.player.color}'></div>`
  }
}

class Cell {
  constructor(x, y, color) {
    this.x = x,
      this.y = y,
      this.color = color
    this.piece = null
  }

  getCoordinates(clicked) {
    this.x = x
    this.y = y
  }

  addPiece(piece) {
    this.piece = piece

  }

  render() {
    return (
      `<div id='${this.x}${this.y}' data-x='${this.x}' data-y='${this.y}'class='cell cell-${this.color}'>
          ${this.piece !== null ? this.piece.render() : ""}
        </div>`
    )
  }
}

class Board {
  constructor() {
    this.boardSize = 8
    this.board = this.generateBoard()
  }

  generateBoard() {
    let colors = ['white', 'black']
    var boardArray = []

    for (let x = 0; x < this.boardSize; x++) {
      let colorNum = 0
      if (x % 2 === 0) {
        colorNum = 0
      } else {
        colorNum = 1
      }
      let rowArray = []
      for (let y = 0; y < this.boardSize; y++) {
        colorNum === 1 ? colorNum = 0 : colorNum = 1
        rowArray.push(new Cell(x, y, colors[colorNum]))
      }
      boardArray.push(rowArray)
    }
    return boardArray
  }

  render() {
    return (
      `<div class='board'>${this.board.map( row => row.map( cell => cell.render() ).join('') ).join('')}</div>`
    )
  }
}

class Player {
  constructor(color) {
    this.color = color
    return this.color
  }
}

class Game {
  constructor() {
    this.playerOne = new Player("red")
    this.playerTwo = new Player("grey")
    this.boardObj = new Board()
    this.board = this.boardObj.board
    this.loadPieces = this.loadPieces()
  }


  loadPieces() {
    this.array = []

    this.board.forEach(row => this.array.push(row.filter(e => e.color === "black")))
    this.first12 = this.array.slice(0, 3)
    this.last12 = this.array.slice(this.array.length - 3)
    this.first12.forEach(rowArray => rowArray.forEach((cell, index) => cell.addPiece(new ChessPiece(this.playerOne, cell ))))
    this.last12.forEach(rowArray => rowArray.forEach((cell,index) => cell.addPiece(new ChessPiece(this.playerTwo, cell ))))
  }
}

class App {
  constructor() {
    this.game = new Game()
    this.game.rules = new CheckerRules
    this.boardContainer = document.getElementById("container")
  }

  render() {
    document.getElementById('container').innerHTML = this.game.boardObj.render()
  }
}

class CheckerRules {
  constructor() {
    this.removeClass = ""
    this.playerRedCheckmateCount = 0
    this.playerGreyCheckmateCount = 0
    this.checkForGreyPieceLeft = ""
    this.checkForGreyPieceRight = ""
  }

  removeChessPieceWhenCheckmated(originX, originY, removeClass) {
    document.getElementById(`${originX}${originY}`).childNodes[0].remove(removeClass);
  }

  validMove(destination, origin) {

    if(checkers.game.board[origin.x+1][origin.y-1].piece !==null) {
      this.checkForGreyPieceLeft = checkers.game.board[origin.x+1][origin.y-1].piece
    }

    let currentPlayerChessPieceColor = origin.piece.player.color

    if (destination.x < 0 && destination.y < 0) {
      return false
    }


    switch (currentPlayerChessPieceColor) {
      case "grey":

        if (origin.x - 1 === destination.x && origin.y - 1 === destination.y) {
          return true
        } else if (origin.x - 1 === destination.x && origin.y + 1 === destination.y) {
          return true


        };
      case "red":
        if (origin.x + 1 === destination.x && origin.y - 1 === destination.y) {
          return true
        } else if (origin.x + 1 === destination.x && origin.y + 1 === destination.y) {
          return true
        }
        else if (origin.x+2 === destination.x && origin.y-2 === destination.y && this.checkForGreyPieceLeft) {
          this.removeChessPieceWhenCheckmated(origin.x+1, origin.y-1, "piece-grey")
          this.playerRedCheckmateCount++
          return true
        }
          // checkmate
        else if (origin.x+2 === destination.x && origin.y+2 === destination.y && this.checkForGreyPiece[origin.x+1][origin.y+1].piece.player.color) {
          this.playerRedCheckmateCount++
          return true
        }
      default:
        return false
    }
  }
}


class GamePlay {
  constructor() {
    var self = this
    this.defaultColor = 0
    this.addClassColor = "red"
    this.currentPlayPiece = "red"
    this.greyPlayerChips = 12
    this.redPlayerChips = 12
    this.greyPlayerMoves = 0
    this.redPlayerMoves = 0
    this.greyPlayerScore = 0
    this.redPlayerScore = 0
    this.time = "0:00"
    this.valid = false
    this.moveDefault = false
    // this.redTurn = true
    // this.greyTurn = true

  if (this.moveDefault === false) {


    $(`.piece-${this.currentPlayPiece}`).draggable({

      revert: true
    });
}
$(`.piece-${this.currentPlayPiece}`).draggable({
  start: function(event, ui) {

    this.originX = ui.helper.parent('div').data().x;
    this.originY = ui.helper.parent('div').data().y;
  }.bind(this)
});

    $(".cell-black").droppable({

      drop: function(event, ui) {

        self.play.bind(self)(checkers.game.board[this.dataset.x][this.dataset.y])
        let droppableId = $(this).attr("class");
        self.destinationX = $(this).data().x
        self.destinationY = $(this).data().y
        if (self.valid) {
          $(this).html(`<div class="piece-${self.addClassColor} ui-draggable ui-draggable-handle" style="position: relative;"></div>`)

          ui.draggable.remove()
        }
      }
    });
  }

  play(destination) {
    let originNode = event.target.parentElement
    let origin = checkers.game.board[originNode.dataset.x][originNode.dataset.y]


    if (checkers.game.rules.validMove(destination, origin)) {

      this.valid = true
      if (this.currentPlayPiece === "red") {

        checkers.game.board[destination.x][destination.y].piece = checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece
        checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece = null
        this.addClassColor = "red"
        this.currentPlayPiece = "grey"
        this.redTurn = true

      } else if (this.currentPlayPiece === "grey") {
        checkers.game.board[destination.x][destination.y].piece = checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece
        checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece = null
        this.addClassColor = "grey"
        this.currentPlayPiece = "red"
      }

    } else {

      this.valid = false
    }

    console.log(this.currentPlayPiece)
    console.log(this.valid)

    $(`.piece-${this.currentPlayPiece}`).draggable({

      revert: !self.valid
    });

    $(`.piece-${this.currentPlayPiece}`).draggable({
      opacity: 0.35
    });

    this.moveDefault = true
  }

  onClick() {
    $(`.piece-${this.currentPlayPiece}`).mousedown()
  }
}

checkers = new App()
checkers.render()

g = new GamePlay()
g.onClick()



// $( ".selector" ).draggable({
//   disabled: true
// });
