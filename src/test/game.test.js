import { Game } from '../modules/game';
import { Player } from '../modules/player';
import { Ship } from '../modules/ship';

describe('Game', () => {
  test('should detect when the game is over', () => {
    const realPlayer = new Player('real');
    const computerPlayer = new Player('computer');
    const ship = new Ship(3);
    computerPlayer.gameboard.placeShip(ship, [0, 0]);
    realPlayer.gameboard.placeShip(ship, [0, 0]);
    const game = new Game(realPlayer, computerPlayer);

    expect(game.checkGameOver()).toBe(false);
    computerPlayer.gameboard.receiveAttack(0, 0);
    computerPlayer.gameboard.receiveAttack(1, 0);
    computerPlayer.gameboard.receiveAttack(2, 0);
    expect(game.checkGameOver()).toBe(true);
  });

  test('after real player take turn, check if realplayer got shoot randomly back', () => {
    const realPlayer = new Player('real');
    const computerPlayer = new Player('computer');
    const game = new Game(realPlayer, computerPlayer);
    const ship1 = new Ship(3);
    const ship2 = new Ship(2);
    realPlayer.gameboard.placeShip(ship1, [1, 2]); // add ship
    computerPlayer.gameboard.placeShip(ship2, [2, 3]); // add ship

    expect(game.currentTurn).toBe('real');
    game.handleTurnComplete();
    expect(game.currentTurn).toBe('computer');

    computerPlayer.attackRandomly(realPlayer);

    const attacked = realPlayer.gameboard.board
      .flat()
      .some(cell => cell === 'hit' || cell === 'miss');
    expect(attacked).toBe(true);
  });
});
