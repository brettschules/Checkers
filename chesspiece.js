class ChessPiece {
  constructor(player, cell) {
    this.player = player
    this.cell = cell
    this.moveAgain = false
    this.king = false
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
