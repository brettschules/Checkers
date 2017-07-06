Class GamePlay {
  constructor() {
    self = this
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
    this.disabledPiece = "grey"
    this.enabledPiece = "red"


    // this.redTurn = true
    // this.greyTurn = true

  if (this.moveDefault === false) {


    $(`.piece-${this.currentPlayPiece}`).draggable({

      revert: true
    });
}
// $(`.piece-${this.currentPlayPiece}`).draggable({
//   start: function(event, ui) {
//     console.log(this.currentPlayPiece + " current")
//
//     this.originX = ui.helper.parent('div').data().x;
//     this.originY = ui.helper.parent('div').data().y;
//   }.bind(this)
// });

    $(".cell-black").droppable({
      drop: function(event, ui) {
        console.log("fires")
debugger
        self.play(checkers.game.board[this.dataset.x][this.dataset.y])
        let droppableId = $(this).attr("class");
        if (self.valid) {
          $(this).html(`<div class="piece-${self.addClassColor}"></div>`)
          ui.draggable.remove()
        }
      }
    });
  }

checkPieceTurn(currentPlayPiece) {
    if (currentPlayPiece === "grey") {
      this.addClassColor = "grey"
      this.currentPlayPiece = "red"
      this.disabledPiece = "grey"
      this.enabledPiece = "red"
    } else if (currentPlayPiece === "red") {
      this.addClassColor = "red"
      this.currentPlayPiece = "grey"
      this.disabledPiece = "red"
      this.enabledPiece = "grey"
    }
  }
validMove(destination, origin, originNode) {
  if (checkers.game.rules.validMove(destination, origin)) {

    this.valid = true
    if (this.currentPlayPiece === "red") {
      checkers.game.board[destination.x][destination.y].piece = checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece
      checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece = null
      this.checkPieceTurn(this.currentPlayPiece)


    } else if (this.currentPlayPiece === "grey") {
      checkers.game.board[destination.x][destination.y].piece = checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece
      checkers.game.board[originNode.dataset.x][originNode.dataset.y].piece = null
      this.checkPieceTurn(this.currentPlayPiece)
    }

  } else {

    this.valid = false
  }
}

moveOnce() {
  console.log(this.currentPlayPiece)
  console.log(this.valid)

  $(`.piece-${this.currentPlayPiece}`).draggable({

    revert: !this.valid
  });

  $(`.piece-${this.disabledPiece}`).draggable({ disabled: true });
  $(`.piece-${this.enabledPiece}`).draggable('enable');
  console.log(this.disabledPiece + " disabled")
  console.log(this.enabledPiece + " enabled")

  $(`.piece-${this.currentPlayPiece}`).draggable({
    opacity: 0.35
  });

}

moveAgain() {
  $(`.piece-${this.currentPlayPiece}`).draggable({

    revert: !self.valid
  });


  $(`.piece-${this.enabledPiece}`).draggable({ disabled: true });
  $(`.piece-${this.disabledPiece}`).draggable('enable');
  console.log(this.enabledPiece + " disabled")
  console.log(this.disabledPiece + " enabled")

  $(`.piece-${this.currentPlayPiece}`).draggable({
    opacity: 0.35
  });



}


  play(destination) {
    let originNode = event.target.parentElement

    let origin = checkers.game.board[originNode.dataset.x][originNode.dataset.y]
    console.log(destination)

    this.validMove(destination, origin, originNode)

    this.moveOnce()

    this.moveDefault = true
  // onClick() {
  //   $(`.piece-${this.currentPlayPiece}`).mousedown()
  }
}
