class CheckerRules {
  constructor() {
    this.removeClass = ""
    this.playerRedCheckmateCount = 0
    this.playerGreyCheckmateCount = 0
    // this.checkForGreyPieceLeft = ""
    // this.checkForGreyPieceRight = ""
    // this.checkForRedPieceLeft = ""
    // this.checkForRedPieceRight = ""
  }



  removeChessPieceWhenCheckmated(originX, originY, removeClass) {
    document.getElementById(`${originX}${originY}`).childNodes[0].remove(removeClass);
  }

  checkForGreyPieceLeft() {

  }

  validMove(destination, origin) {

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
        } else if (origin.x - 2 === destination.x && origin.y - 2 === destination.y && checkers.game.board[origin.x-1][origin.y-1].piece !==null) {
          this.removeChessPieceWhenCheckmated(origin.x - 1, origin.y - 1, "piece-red")
          this.playerGreyCheckmateCount++
          return true
        } else if (origin.x - 2 === destination.x && origin.y + 2 === destination.y && checkers.game.board[origin.x-1][origin.y+1].piece !== null) {
          this.removeChessPieceWhenCheckmated(origin.x - 1, origin.y + 1, "piece-red")
          this.playerGreyCheckmateCount++
          return true
        } else {
          return false;
        }
      case "red":
        if (origin.x + 1 === destination.x && origin.y - 1 === destination.y) {
          return true
        } else if (origin.x + 1 === destination.x && origin.y + 1 === destination.y) {
          return true
        }
        else if (origin.x + 2 === destination.x && origin.y - 2 === destination.y && checkers.game.board[origin.x+1][origin.y-1].piece !== null) {
          this.removeChessPieceWhenCheckmated(origin.x + 1, origin.y - 1, "piece-grey")
          this.playerRedCheckmateCount++
          return true
        }
          // checkmate
        else if (origin.x + 2 === destination.x && origin.y + 2 === destination.y && checkers.game.board[origin.x+1][origin.y+1].piece !== null) {
          this.removeChessPieceWhenCheckmated(origin.x + 1, origin.y + 1, "piece-grey")
          this.playerRedCheckmateCount++
          return true
        }
      default:
        return false
    }
  }
}
