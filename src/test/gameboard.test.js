import { Gameboard } from '../modules/gameboard';
import { Ship } from '../modules/ship';

describe('Gameboard', () => {
  test('should place ship and receive attack', () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [0, 0]); // Vertical placement
    expect(board.board[0][0]).toBe(ship);
    expect(board.board[1][0]).toBe(ship);
    board.receiveAttack(0, 0);
    expect(ship.isSunk()).toBe(false);
    expect(board.board[0][0]).toBe('hit');
    board.receiveAttack(1, 0);
    expect(ship.isSunk()).toBe(true);
    expect(board.board[1][0]).toBe('hit');
    board.receiveAttack(2, 0); // Miss
    expect(board.board[2][0]).toBe('miss');
  });
});
test('placeShipRandomly should place all ships without overlapping', () => {
  const board = new Gameboard();
  const ships = Array(10)
    .fill()
    .map((_, i) => {
      // Create ships of different lengths based on battleship game rules
      const length = i < 4 ? 1 : i < 7 ? 2 : i < 9 ? 3 : 4;
      return new Ship(length);
    });

  board.placeShipRandomly(...ships);

  // Count total ship cells on board
  let shipCells = 0;
  let expectedCells = ships.reduce((sum, ship) => sum + ship.length, 0);

  // Check if all ships are placed and don't overlap
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (board.board[x][y] instanceof Ship) {
        shipCells++;

        // Check buffer zone (adjacent cells)
        const adjacentCoords = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
          [x - 1, y - 1],
          [x + 1, y - 1],
          [x - 1, y + 1],
          [x + 1, y + 1],
        ];

        adjacentCoords.forEach(([adjX, adjY]) => {
          if (adjX >= 0 && adjX < 10 && adjY >= 0 && adjY < 10) {
            // If adjacent cell has a ship, it must be the same ship
            const adjCell = board.board[adjX][adjY];
            if (adjCell instanceof Ship && adjCell !== board.board[x][y]) {
              fail('Ships are placed too close to each other');
            }
          }
        });
      }
    }
  }

  expect(shipCells).toBe(expectedCells);
  expect(board.ships.length).toBe(10);

  // Verify all ships are within bounds
  expect(board.board.every(row => row.length === 10)).toBe(true);
});
