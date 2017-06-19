class ChessPiece() {


}

class Cell {
  constructor(x,y,color) {
    this.x = x,
    this.y = y
    this.color = color
  }
}

class Board {
  constructor() {

    this.board = [
                    [ new Cell(1,0),new Cell(2,0),new Cell(3,0),new Cell(4,0),new Cell(5,0),new Cell(6,0),new Cell(7,0),new Cell(8,0)],
                    [ new Cell(1,1),new Cell(2,1),new Cell(3,1),new Cell(4,1),new Cell(5,1),new Cell(6,1),new Cell(7,1),new Cell(8,1)],
                    [ new Cell(1,2),new Cell(2,2),new Cell(3,2),new Cell(4,2),new Cell(5,2),new Cell(6,2),new Cell(7,2),new Cell(8,2)],
                    [ new Cell(1,3),new Cell(2,3),new Cell(3,3),new Cell(4,3),new Cell(5,3),new Cell(6,3),new Cell(7,3),new Cell(8,3)],
                    [ new Cell(1,4),new Cell(2,4),new Cell(3,4),new Cell(4,4),new Cell(5,4),new Cell(6,4),new Cell(7,4),new Cell(8,4)],
                    [ new Cell(1,5),new Cell(2,5),new Cell(3,5),new Cell(4,5),new Cell(5,5),new Cell(6,5),new Cell(7,5),new Cell(8,5)],
                    [ new Cell(1,6),new Cell(2,6),new Cell(3,6),new Cell(4,6),new Cell(5,6),new Cell(6,6),new Cell(7,6),new Cell(8,6)],
                    [ new Cell(1,7),new Cell(2,7),new Cell(3,7),new Cell(4,7),new Cell(5,7),new Cell(6,7),new Cell(7,7),new Cell(8,7)]
                                                                                                                                        ]
  }

  gameStart() {
  for (let i = 0; i < this.board.length; i++) {
   let rows = this.board[i]
     for (let e = 0; e < rows.length; e++) {
      console.log(rows[e])
    }
  }
}




class App {
  constructor() {

  }
}
