class ChessPiece {
  constructor(player) {
    this.player = player
  }

  generateChessPiece() {
  }
}

class Cell {
  constructor(x, y, color) {
    this.x = x,
    this.y = y,
    this.color = color
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
}

class Player {
  constructor() {
    this.start = false
  }
}

class Game {
  constructor() {
    this.playerOne = new Player()
    this.playerTwo = new Player()
    this.board = new Board().board
  }



  loadPieces() {
    this.first12 = []
    this.board.forEach(row => this.first12.push(row.filter(e => e.color === "black")))
    this.first12.splice(0,4)
    this.first12.forEach(rowArray => rowArray.forEach(cell => cell.addPiece(new ChessPiece(this.playerOne))))
    this.first12.forEach(rowArray => rowArray.forEach(cell => cell.addPiece(new ChessPiece(this.playerTwo))))
  }
}
