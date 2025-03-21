import { Player } from '../modules/player';

describe('Player', () => {
  test('computer should attack randomly and mark enemy board', () => {
    const player = new Player('computer');
    const enemy = new Player('real');
    enemy.attackRandomly(player);
    const attacked = player.gameboard.board
      .flat()
      .some(cell => cell === 'hit' || cell === 'miss');
    expect(attacked).toBe(true);
    expect(enemy.attackedCoordinates.size).toBe(1); // Tracks one attack
    enemy.attackRandomly(player);
    expect(enemy.attackedCoordinates.size).toBe(2);
  });
});
