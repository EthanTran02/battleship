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
  let gameBoard;
  let ship;

  beforeEach(() => {
    gameBoard = new Gameboard();
    ship = new Ship(3);
    gameBoard.placeShip(ship, [0, 0]);
    ship.timesHit = 0;
  });

  describe('place ship', () => {
    it('place succes', () => {
      expect(gameBoard.board[0][0]).toBe(ship);
      expect(gameBoard.board[1][0]).toBe(ship);
      expect(gameBoard.board[2][0]).toBe(ship);
      expect(gameBoard.board[3][0]).toBe(null);
    });
    it('check place not get place', () => {
      expect(gameBoard.board[4][0]).toBe(null);
      expect(gameBoard.board[1][7]).toBe(null);
      expect(gameBoard.board[5][4]).toBe(null);
      expect(gameBoard.board[7][0]).toBe(null);
    });
  });

  describe('recieveAttack', () => {
    it('ship got hit', () => {
      expect(ship.timesHit).toBe(0);
      expect(gameBoard.receiveAttack(0, 0)).toBe(true);
      expect(ship.timesHit).toBe(1);
    });

    it('miss the hit', () => {
      expect(ship.timesHit).toBe(0);
      expect(gameBoard.receiveAttack(3, 5)).toBe(false);
      expect(ship.timesHit).toBe(0);
    });
  });
});
