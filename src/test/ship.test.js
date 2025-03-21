import { Ship } from '../modules/ship';

describe('Ship', () => {
  test('should hit and sink when hits equal length', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
