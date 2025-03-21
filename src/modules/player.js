import { Gameboard } from './gameboard';

export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.attackedCoordinates = new Set();
  }

  attackRandomly(enemy) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.attackedCoordinates.has(`${x},${y}`));
    this.attackedCoordinates.add(`${x},${y}`);
    enemy.gameboard.receiveAttack(x, y);
  }
}
