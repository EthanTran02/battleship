export class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    this.ships = [];
  }

  placeShip(ship, [x, y]) {
    for (let i = 0; i < ship.length; i++) {
      this.board[x + i][y] = ship;
    }
  }

  receiveAttack(x, y) {
    if (x >= 10 || y >= 10) return false;
    const target = this.board[x][y];
    if (target !== null) {
      target.hit();
      this.board[x][y] = 'hit';
    } else {
      this.board[x][y] = 'miss';
    }
  }

  placeShipRandomly(
    ship11,
    ship12,
    ship13,
    ship14,
    ship21,
    ship22,
    ship23,
    ship31,
    ship32,
    ship41
  ) {
    const ships = [
      ship11,
      ship12,
      ship13,
      ship14,
      ship21,
      ship22,
      ship23,
      ship31,
      ship32,
      ship41,
    ];

    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));

    for (const ship of ships) {
      let placed = false;

      while (!placed) {
        // Randomly decide orientation (horizontal or vertical)
        const isHorizontal = Math.random() < 0.5;

        // Choose random coordinates
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        // Check if ship can be placed at the chosen position
        if (this.canPlaceShip(ship, [x, y], isHorizontal)) {
          this.placeShipWithOrientation(ship, [x, y], isHorizontal);
          placed = true;
        }
      }
    }
  }

  // Helper method to check if a ship can be placed at given coordinates with given orientation
  canPlaceShip(ship, [x, y], isHorizontal) {
    // Check if ship fits within the board
    if (isHorizontal) {
      if (y + ship.length > 10) return false;
    } else {
      if (x + ship.length > 10) return false;
    }

    // Check if there are no other ships in the way (including buffer zone)
    // We need to check an area around the ship
    const startX = Math.max(0, x - 1);
    const startY = Math.max(0, y - 1);
    const endX = Math.min(9, isHorizontal ? x + 1 : x + ship.length);
    const endY = Math.min(9, isHorizontal ? y + ship.length : y + 1);

    for (let checkX = startX; checkX <= endX; checkX++) {
      for (let checkY = startY; checkY <= endY; checkY++) {
        // Check if cell is already occupied
        if (this.board[checkX][checkY] !== null) {
          return false;
        }
      }
    }

    return true;
  }

  // Helper method to place a ship with specified orientation
  placeShipWithOrientation(ship, [x, y], isHorizontal) {
    this.ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      const placeX = isHorizontal ? x : x + i;
      const placeY = isHorizontal ? y + i : y;
      this.board[placeX][placeY] = ship;
    }
  }
}
