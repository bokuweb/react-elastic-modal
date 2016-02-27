import React, { Component, PropTypes } from 'react';
import Easing from './easing';

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
      isMount: false,
      x: 200,
    };
  }

  componentDidMount() {
    this.tick();
    const { wrapper } = this.refs;
    this.setState({
      isMount: true,
      height: wrapper.clientHeight,
      width: wrapper.clientWidth,
      x: wrapper.clientHeight / 2,
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
    const x = this.spring(100, this.state.x);
    this.setState({ x });
    requestAnimationFrame(this.tick.bind(this));
  }

  renderPath() {
    if (!this.state.isMount) return null;
    const { width, height } = this.state;
    const x0 = width * 0.5;
    const y0 = height * 0.5;
    const cx = width / 2 + x0;
    const x1 = width + x0;
    const y1 = height + y0;
    const cy = height / 2 + y0;
    /* TODO: if is open change svg props to `width: 100%, height: 100%, top:0, left:0` */
    return (
      <svg width="200%" height="200%" style={{ position: 'absolute', top: '-50%', left: '-50%' }}>
        <path d={ `M ${x0} ${y0}
                   Q ${cx} ${ this.state.x } ${x1} ${y0}
                   Q ${x1} ${cy} ${x1} ${y1}
                   Q ${cx} ${y1} ${x0} ${y1}
                   Q ${x0} ${cy} ${x0} ${y0}` }
              fill="#333"
        />
      </svg>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <div ref="wrapper" style={ Object.assign({}, { position: 'fixed' }, style) }>
        { this.renderPath() }
      </div>
    );
  }
}
