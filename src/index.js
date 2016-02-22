import React, { Component } from 'react';

const ease = 1.5;
const friction = 0.95;

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.velocity = 0;
    this.state = {
      isMount: false,
      isOpen: false,
      x: -40,
    };
  }

  componentDidMount() {
    console.log(this.refs.wrapper.clientWidth)
    console.log(this.refs.wrapper.clientHeight)
    this.setState({
      isMount: true,
    });
    this.tick();
  }

  spring(destination, position) {
    //if (this.state.isOpen) return destination;
    this.velocity += (destination - position) * ease;
    this.velocity *= friction;
    //if (destination - position < 0.01) this.setState({ isOpen: true });
    return position + this.velocity;
  };

  tick() {
    const x = this.spring(10, this.state.x);
    this.setState({ x });
    requestAnimationFrame(this.tick.bind(this));
  }

  renderBox() {
    
  }

  render() {
    const { style } = this.props;
    return (
      <div ref='wrapper' style={ Object.assign({}, style, { position: 'fixed' }) }>
        <svg width="120%" height="120%" style={{ position: 'absolute', top: '-10%', left: '-10%'}}>
  	      <path d={`M 10 10
                    Q 60 ${ this.state.x } 110 10
                    Q 110 60 110 110
                    Q 60 110 10 110
                    Q 10 60 10 10 `}
                fill='#ccc'
          />
        </svg>
      </div>
    );
  }
}

