import React, { Component } from 'react';

var ease = 0.25;
var v = 0;
var friction = 0.75;

const spring = (target, x) => {
  v += (target - x) * ease;
  v *= friction;
  return x + v;
};

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 150,
    };
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    const x = spring(100, this.state.x);
    this.setState({ x });
    requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    return (
      <svg width="800px" height="800px">
		<path d={`M 100 100
                    Q 150 ${ this.state.x } 200 100
                    Q 200 150 200 200
                    Q 150 200 100 200
                    Q 100 150 100 100 `}
              fill='#ccc
        '/>
      </svg>
    );
  }
}

