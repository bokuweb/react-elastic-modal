export default class Easing {
  constructor(ease, friction) {
    this.ease = ease;
    this.friction = friction;
    this.velocity = 0;
  }

  calc(destination, position) {
    this.velocity += (destination - position) * this.ease;
    this.velocity *= this.friction;
    if (this.isStop()) return destination;
    return position + this.velocity;
  }

  isStop() {
    return Math.abs(this.velocity) < 0.1;
  }
}
