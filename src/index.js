import React, { Component, PropTypes } from 'react';

const ease = 1.5;
const friction = 0.95;

export default class ElasticModal extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.velocity = 0;
    this.state = {
      isOpen: false,
      x: -40,
    };
  }

  componentDidMount() {
    this.tick();
  }

  spring(destination, position) {
    if (this.state.isOpen) return destination;
    this.velocity += (destination - position) * ease;
    this.velocity *= friction;
    if (Math.abs(this.velocity) < 0.5) this.setState({ isOpen: true });
    return position + this.velocity;
  }

  tick() {
    const x = this.spring(10, this.state.x);
    this.setState({ x });
    requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    const { style } = this.props;
    return (
      <div ref="wrapper" style={ Object.assign({}, style, { position: 'fixed' }) }>
        {/* TODO: if is open change svg props to `width: 100%, height: 100%, top:0, left:0` */}
        <svg width="120%" height="120%" style={{ position: 'absolute', top: '-10%', left: '-10%' }}>
          <path d={ `M 10 10
                     Q 60 ${ this.state.x } 110 10
                     Q 110 60 110 110
                     Q 60 110 10 110
                     Q 10 60 10 10 ` }
            fill="#ddd"
          />
        </svg>
      </div>
    );
  }
}
