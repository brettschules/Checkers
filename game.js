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
      `<div data-x='${this.x}' data-y='${this.y}'class='cell cell-${this.color}'>
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
    this.first12.forEach(rowArray => rowArray.forEach(cell => cell.addPiece(new ChessPiece(this.playerOne, cell))))
    this.last12.forEach(rowArray => rowArray.forEach(cell => cell.addPiece(new ChessPiece(this.playerTwo, cell))))
  }
}

class App {
  constructor() {
    this.game = new Game()
    this.game.rules = new CheckerRules
    this.boardContainer = document.getElementById("container")

    this.boardContainer.addEventListener("click", this.onClick.bind(this))
  }

  onClick() {
    const clickedEvent = event.target

    // console.log(clickedEvent.className)
    // this.game.board[parseInt(event.target.dataset.x)][parseInt(event.target.dataset.y)]
  }

  render() {
    document.getElementById('container').innerHTML = this.game.boardObj.render()
  }
}

class CheckerRules {
  constructor() {

  }

  validMove(destination, origin) {
    let currentPlayerChessPieceColor = origin.piece.player.color

    if (destination.x < 0 || destination.y < 0) {
      return false
    }

    if (destination.piece !== null) {
      return false
    }

    if (destination.piece !== null && currentPlayerChessPieceColor === destination.piece.player.color) {
      return false
    }

    switch (currentPlayerChessPieceColor) {
      case "grey":

        if (origin.x - 1 === destination.x && origin.y - 1 === destination.y) {
          return true
        } else if (origin.x - 1 === destination.x && origin.y + 1 === destination.y) {
          return true
        } else if (true) {

        };
      case "red":
        if (origin.x + 1 === destination.x && origin.y - 1 === destination.y) {
          return true
        } else if (origin.x + 1 === destination.x && origin.y + 1 === destination.y) {
          return true
        } else if (true) {

        }
      default:
        return false
    }
  }
}


checkers = new App()
checkers.render()


class GamePlay {
  constructor() {
    var self = this
    this.currentPlayPiece = "red"
    this.greyPlayerChips = 12
    this.redPlayerChips = 12
    this.greyPlayerMoves = 0
    this.redPlayerMoves = 0
    this.greyPlayerScore = 0
    this.redPlayerScore = 0
    this.time = "0:00"
    this.revert = true

    this.originX = 1
    this.originY = 1
    this.destinationX = 1
    this.destinationY = 1

    $(`.piece-${this.currentPlayPiece}`).draggable({
      start: function(event, ui) {

        this.originX = ui.helper.parent('div').data().x;

        this.originY = ui.helper.parent('div').data().y;

      }.bind(this)
    });





    $(".cell-black").droppable({
      drop: function(event, ui) {

        let draggableId = ui.draggable.attr("class");
        let droppableId = $(this).attr("class");
        self.destinationX = $(this).data().x
        self.destinationY = $(this).data().y

        $(this).html(`<div class="piece-red ui-draggable ui-draggable-handle" style="position: relative;"></div>`)
        ui.draggable.remove()
        ui.draggable.removeClass(`.piece-${this.currentPlayPiece}`)
      }
    });
  }


  play() {
    let origin = checkers.game.board[this.originX][this.originY]
    let destination = checkers.game.board[this.destinationX][this.destinationY]

    if (checkers.game.rules.validMove(destination, origin)) {
      this.originX = 1
      this.originY = 1
      this.destinationX = 1
      this.destinationY = 1
      this.revert = true

}


    $(`.piece-${this.currentPlayPiece}`).draggable({

      revert: self.revert
    });

  }

  onClick() {
    $( `.piece-${this.currentPlayPiece}`).mousedown(function() {
      this.play()
    }.bind(this))
  }
}

g = new GamePlay()
g.onClick()


// $( ".selector" ).draggable({
//   disabled: true
// });

// $( ".piece-grey" ).draggable({
//   opacity: 0.35
// });

// $(".cell-black").droppable({ drop: Drop });
//
// function Drop(event, ui) {
//   var draggableId = ui.draggable.attr("class");
//   var droppableId = $(this).attr("class");
//   console.log(draggableId)
//   console.log(droppableId)
// }



// get parent div
// $(".cell-black").droppable({
//     drop: function(event, ui) {
//         var id = ui.draggable.attr("class");
//         console.log(id);
//     }
// });
