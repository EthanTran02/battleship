import { Ship } from './modules/ship';
import { Gameboard } from './modules/gameboard';
import { Player } from './modules/player';

describe('Ship', () => {
  const ship = new Ship(3);

  beforeEach(() => {
    ship.timesHit = 0;
  });

  describe('hit', () => {
    it('not getting hit', () => {
      expect(ship.timesHit).toBe(0);
    });
    it('got hit first time', () => {
      expect(ship.timesHit).toBe(0);
      ship.hit();
      expect(ship.timesHit).toBe(1);
    });
    it('got hit seconnd time', () => {
      expect(ship.timesHit).toBe(0);
      ship.hit();
      ship.hit();
      expect(ship.timesHit).toBe(2);
    });
  });

  describe('isSunk', () => {
    it('sunk', () => {
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
    it('alive', () => {
      expect(ship.isSunk()).toBe(false);
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
    it('check place where ship not get place', () => {
      expect(gameBoard.board[4][0]).toBe(null);
      expect(gameBoard.board[1][7]).toBe(null);
      expect(gameBoard.board[5][4]).toBe(null);
      expect(gameBoard.board[7][0]).toBe(null);
    });
  });

  describe('recieveAttack', () => {
    it('ship got hit', () => {
      expect(ship.timesHit).toBe(0);
      gameBoard.receiveAttack(0, 0);
      expect(ship.timesHit).toBe(1);
      expect(gameBoard.board[0][0]).toBe('X');
    });

    it('miss the hit', () => {
      expect(ship.timesHit).toBe(0);
      gameBoard.receiveAttack(3, 5);
      expect(ship.timesHit).toBe(0);
      expect(gameBoard.board[3][5]).toBe('O');
    });
  });
});

describe('Player', () => {
  it('player have gameboard', () => {
    const player = new Player('player1');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });
  it('check player board', () => {
    const player = new Player('player1');
    const gameboard = new Gameboard();
    expect(player.gameboard.board).toStrictEqual(gameboard.board);
  });
  it('player real', () => {
    const player = new Player('real');
    expect(player.name).toBe('real');
  });
  it('player machine', () => {
    const player = new Player('machine');
    expect(player.name).toBe('machine');
  });
});
