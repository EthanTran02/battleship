import { Ship } from './modules/ship';

describe('Ship', () => {
  const ship = new Ship(3);

  it('have hit 1 time', () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });

  it('have hit seconnd time', () => {
    ship.hit();
    expect(ship.timesHit).toBe(2);
  });
});
