export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.status = 'alive';
  }

  hit() {
    this.timesHit += 1;
  }

  isSunk(length, timesHit) {
    return length <= timesHit ? 'the ship sunked' : 'the ship alive';
  }
}
