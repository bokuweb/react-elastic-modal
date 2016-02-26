import React, { Component, PropTypes } from 'react';

const ease = 1;
const friction = 0.85;

export default class ElasticModal extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.velocity = 0;
    this.state = {
      isOpen: false,
      x: -100,
    };
  }

  componentDidMount() {
    this.tick();
    const { wrapper } = this.refs;
    this.setState({
      height: wrapper.clientHeight,
      width: wrapper.clientWidth,
    });
  }

  componentWillReceiveProps(next) {
    if (next.isOpen) {

    }
  }

  spring(destination, position) {
    if (this.state.isOpen) return destination;
    this.velocity += (destination - position) * ease;
    this.velocity *= friction;
    //if (Math.abs(this.velocity) < 0.5) this.setState({ isOpen: true });
    return position + this.velocity;
  }

  tick() {
    const x = this.spring(20, this.state.x);
    this.setState({ x });
    requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    const { style } = this.props;
    const { width, height } = this.state;
    const org = {
      x: width * 0.1,
      y: height * 0.1,
    };
    return (
      <div ref="wrapper" style={ Object.assign({}, { position: 'fixed' }, style) }>
        {/* TODO: if is open change svg props to `width: 100%, height: 100%, top:0, left:0` */}
        <svg width="120%" height="120%" style={{ position: 'absolute', top: '-10%', left: '-10%' }}>
          <path d={ `M ${org.x} ${org.y}
                     Q ${width / 2 + org.x} ${ this.state.x } ${width + org.x} ${org.y}
                     Q ${width + org.x} ${height / 2 + org.y} ${width + org.x} ${height + org.y}
                     Q ${width / 2 + org.x} ${height + org.y} ${org.x} ${height + org.y}
                     Q ${org.x} ${height / 2 + org.y} ${org.x} ${org.y} ` }
            fill="#ddd"
          />
        </svg>
      </div>
    );
  }
}
