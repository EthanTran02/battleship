export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.status = 'alive';
  }

  hit() {
    this.timesHit += 1;
  }
}
