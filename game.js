class ChessPiece {
  constructor(player) {
    this.player = player
    this.ChessPiece = this.generateChessPiece()
  }

  generateChessPiece() {
    this.color = ""
    if (this.player === "red") {
      // needs to be this.player.color when not debugging
      this.color = "red"
    } else if (this.player === "grey") {
      // needs to be this.player.color when not debugging
      this.color = "grey"
    }
    return this.color
  }

  displayChessPieces() {
    this.div = ``

    if (this.generateChessPiece() === "red") {
      this.div = `<div class='piece-${this.generateChessPiece()}'></div`
    } else if (this.generateChessPiece() === "grey") {
      this.div = `<div class ='piece-${this.generateChessPiece()}'></div`
    }
    return this.div
  }

  render() {
    return (
      this.displayChessPieces()
    )
  }
}

  class Cell {
    constructor(x, y, color) {
      this.x = x,
      this.y = y,
      this.color = color
      this.piece = null
    }

    addPiece(piece) {
      this.piece = piece

    }

    render() {
      return (
        `<div data-x='${this.x}' data-y='${this.y}'class='cell cell-${this.color}'></div>`
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
      this.board = new Board()
      this.loadPieces = this.loadPieces()
    }



    loadPieces() {
      this.array = []

      this.board.board.forEach(row => this.array.push(row.filter(e => e.color === "black")))
      this.first12 = this.array.slice(0, 3)
      this.last12 = this.array.slice(this.array.length - 3)
      this.first12.forEach(rowArray => rowArray.forEach(cell => cell.addPiece(new ChessPiece(this.playerOne))))
      this.last12.forEach(rowArray => rowArray.forEach(cell => cell.addPiece(new ChessPiece(this.playerTwo))))
    }
  }

  class App {
    constructor() {
      this.game = new Game()
    }
    render() {
      document.getElementById('container').innerHTML = this.game.board.render()
    }
  }

  checkers = new App()
  checkers.render()
