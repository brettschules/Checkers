require './board.js'
require './checkerrules.js'
require './chesspiece.js'
require './game.js'
require './GamePlay.js'
require './player.js'

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


checkers = new App()
checkers.render()

let g = new GamePlay()
