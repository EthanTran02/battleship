import { updateBoardReal } from './dom';

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

    if (realSunk) {
      this.currentTurn = 'computer';
      return true;
    }
    if (computerSunk) {
      this.currentTurn = 'real';
      return true;
    }
    return false;
  }

  handleTurnComplete() {
    if (this.checkGameOver()) return;
    this.currentTurn = 'computer';
    setTimeout(() => {
      this.computerPlayer.attackRandomly(this.realPlayer);
      updateBoardReal(this.realPlayer, 'board-container1');
      if (!this.checkGameOver()) {
        this.currentTurn = 'real';
      }
    }, 700);
  }
}
