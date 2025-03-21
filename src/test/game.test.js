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
});
