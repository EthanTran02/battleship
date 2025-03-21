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
