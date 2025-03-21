export class Game {
  constructor(realPlayer, computerPlayer) {
    this.realPlayer = realPlayer;
    this.computerPlayer = computerPlayer;
    this.currentTurn = 'real';
  }

  checkGameOver() {
    const realSunk = this.realPlayer.gameboard.board.every(row =>
      row.every(
        cell =>
          cell === null ||
          cell === 'hit' ||
          cell === 'miss' ||
          (typeof cell === 'object' && cell.isSunk())
      )
    );
    const computerSunk = this.computerPlayer.gameboard.board.every(row =>
      row.every(
        cell =>
          cell === null ||
          cell === 'hit' ||
          cell === 'miss' ||
          (typeof cell === 'object' && cell.isSunk())
      )
    );

    return realSunk || computerSunk;
  }

  handleTurnComplete() {
    if (this.checkGameOver()) return;
    this.currentTurn = 'computer';
    this.computerPlayer.attackRandomly(this.realPlayer);
    if (!this.checkGameOver()) {
      this.currentTurn = 'real';
    }
  }
}
