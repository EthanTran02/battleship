import { Player } from './player';

export class Game {
  constructor(realPlayer, computerPlayer) {
    this.realPlayer = realPlayer;
    this.computerPlayer = computerPlayer;
  }

  checkGameOver() {
    const realSunk = this.realPlayer.gameboard.board.every(row =>
      row.every(
        cell =>
          cell === null ||
          cell === 'X' ||
          cell === 'O' ||
          (typeof cell === 'object' && cell.isSunk())
      )
    );
    const computerSunk = this.computerPlayer.gameboard.board.every(row =>
      row.every(
        cell =>
          cell === null ||
          cell === 'X' ||
          cell === 'O' ||
          (typeof cell === 'object' && cell.isSunk())
      )
    );

    return realSunk || computerSunk;
  }
}
