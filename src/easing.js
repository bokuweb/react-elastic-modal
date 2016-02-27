export default class Easing {
  constructor(ease, friction) {
    this.ease = ease;
    this.friction = friction;
    this.velocity = 0;
  }

  get(destination, position) {
    this.velocity += (destination - position) * this.ease;
    this.velocity *= this.friction;
    return position + this.velocity;
  }
}
