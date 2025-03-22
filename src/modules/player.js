import { Gameboard } from './gameboard';

export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.attackedCoordinates = new Set();
    // Track last hit for computer targeting
    this.lastHit = null;
    this.potentialTargets = [];
  }

  attackRandomly(enemy) {
    let x, y;

    if (this.name === 'computer' && this.potentialTargets.length > 0) {
      [x, y] = this.getNextTarget();
    } else {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (this.attackedCoordinates.has(`${x},${y}`));
    }

    this.attackedCoordinates.add(`${x},${y}`);
    const cellContent = enemy.gameboard.board[x][y];
    enemy.gameboard.receiveAttack(x, y);

    if (
      this.name === 'computer' &&
      cellContent !== null &&
      cellContent !== 'hit' &&
      cellContent !== 'miss'
    ) {
      this.lastHit = [x, y];
      this.addAdjacentCells(x, y);

      // Check if the hit caused the ship to sink
      if (cellContent.isSunk()) {
        this.lastHit = null;
        this.potentialTargets = [];
      }
    }
  }

  // Get the next target from potential targets
  getNextTarget() {
    // Keep trying until we find a valid target
    while (this.potentialTargets.length > 0) {
      const target = this.potentialTargets.shift();
      const [x, y] = target;

      // Check if this coordinate has already been attacked
      if (!this.attackedCoordinates.has(`${x},${y}`)) {
        return [x, y];
      }
    }

    // If no valid targets in potential targets, fall back to random
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.attackedCoordinates.has(`${x},${y}`));

    return [x, y];
  }

  // Add adjacent cells to potential targets
  addAdjacentCells(x, y) {
    const directions = [
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
      [-1, 0], // up
    ];

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // Check if within bounds and not already attacked
      if (
        newX >= 0 &&
        newX < 10 &&
        newY >= 0 &&
        newY < 10 &&
        !this.attackedCoordinates.has(`${newX},${newY}`)
      ) {
        // Add to beginning of the array to prioritize adjacent cells
        this.potentialTargets.unshift([newX, newY]);
      }
    }
  }
}
