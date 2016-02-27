import React, { Component, PropTypes } from 'react';
import Easing from './easing';

export default class ElasticModal extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // FIXME
    this.topEasing = new Easing(0.9,0.7);
    this.bottomEasing = new Easing(0.9,0.7);
    this.rightEasing = new Easing(0.9,0.7);
    this.leftEasing = new Easing(0.9,0.7);

    this.state = {
      isOpen: false,
      isMount: false,
      scale: 0,
    };
  }

  componentDidMount() {
    const { wrapper } = this.refs;
    this.setState({
      isMount: true,
      height: wrapper.clientHeight,
      width: wrapper.clientWidth,
      // FIXME: 
      top: wrapper.clientHeight,
      bottom: wrapper.clientHeight,
      right: wrapper.clientWidth,
      left: wrapper.clientWidth,
    }, this.tick);
  }

  componentWillReceiveProps(next) {
    if (next.isOpen) {

    }
  }

  //spring(destination, position) {
  //  if (this.state.isOpen) return destination;
  //  this.velocity += (destination - position) * ease;
  //  this.velocity *= friction;
  //  //if (Math.abs(this.velocity) < 0.5) this.setState({ isOpen: true });
  //  return position + this.velocity;
  //}

  tick() {
    const top = this.topEasing.get(this.state.height * 0.5, this.state.top);
    const bottom = this.bottomEasing.get(this.state.height * 1.5, this.state.bottom);
    const right = this.rightEasing.get(this.state.width * 1.5, this.state.right);
    const left = this.leftEasing.get(this.state.width * 0.5, this.state.left);
    this.setState({ top, bottom, right, left, scale: this.state.scale + 0.1 >= 1 ? 1 : this.state.scale + 0.1 });
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
    console.log(this.state.scale)
    return (
      <svg width="200%" height="200%" style={{ position: 'absolute', top: '-50%', left: '-50%', transform: `scale3d(${this.state.scale},${this.state.scale},1)` }}>
        <path d={ `M ${x0} ${y0}
                   Q ${cx} ${ this.state.top } ${x1} ${y0}
                   Q ${ this.state.right } ${cy} ${x1} ${y1}
                   Q ${cx} ${ this.state.bottom } ${x0} ${y1}
                   Q ${ this.state.left } ${cy} ${x0} ${y0}` }
              fill="#333"
              />
      </svg>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <div>
        <div ref="wrapper" style={ Object.assign({}, style, { position: 'fixed', overflow: 'visible' }) }>
          { this.renderPath() }
        </div>
        <div style={ Object.assign({}, { position: 'fixed',  color: '#fff' }, style) } >
          { this.props.children }
        </div>
      </div>
    );
  }
}
