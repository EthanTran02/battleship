import { Ship } from './modules/ship';
import { Gameboard } from './modules/gameboard';

describe('Ship', () => {
  const ship = new Ship(3);

  describe('hit', () => {
    it('not getting hit', () => {
      expect(ship.timesHit).toBe(0);
    });
    it('got hit first time', () => {
      ship.hit();
      expect(ship.timesHit).toBe(1);
    });
    it('got hit seconnd time', () => {
      ship.hit();
      expect(ship.timesHit).toBe(2);
    });
  });

  describe('isSunk', () => {
    it('sunk', () => {
      expect(ship.isSunk(3, 3)).toBe('the ship sunked');
    });
    it('alive', () => {
      expect(ship.isSunk(5, 2)).toBe('the ship alive');
    });
  });
});

describe('Gameboard', () => {
  describe('place ship', () => {
    const gameBoard = new Gameboard();
    const ship = new Ship(3);
    gameBoard.placeShip(ship, [0, 0]);

    it('place succes', () => {
      expect(gameBoard.board[0][0]).toBe(ship);
      expect(gameBoard.board[1][0]).toBe(ship);
      expect(gameBoard.board[2][0]).toBe(ship);
      expect(gameBoard.board[3][0]).toBe(null);
    });
  });
});
