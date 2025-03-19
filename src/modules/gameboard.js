export class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
  }

  placeShip(ship, [x, y]) {
    for (let i = 0; i < ship.length; i++) {
      this.board[x + i][y] = ship;
    }
  }

  receiveAttack(x, y) {
    const target = this.board[x][y];
    if (target !== null) {
      target.hit();
      return true;
    }
    return false;
  }
}
