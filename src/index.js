import React, { Component, PropTypes } from 'react';
import Easing from './easing';

export default class ElasticModal extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.topEasing = new Easing(1, 0.75);
    this.bottomEasing = new Easing(1, 0.75);
    this.rightEasing = new Easing(1, 0.75);
    this.leftEasing = new Easing(1, 0.75);
    this.animationId = null;
    this.state = {
      isOpen: false,
      isMount: false,
      scale: 0,
    };
  }

  componentDidMount() {
    const width = this.refs.wrapper.clientWidth;
    const height = this.refs.wrapper.clientHeight;
    this.setState({
      isMount: true,
      height,
      width,
      top: height * 0.75,
      bottom: height * 0.75,
      right: width * 0.75,
      left: width * 0.75,
    });
  }

  componentWillReceiveProps(next) {
    // TODO: add animtaion stop condition
    if (!this.props.isOpen && next.isOpen) {
      cancelAnimationFrame(this.closeAnimationId)
      const width = this.refs.wrapper.clientWidth;
      const height = this.refs.wrapper.clientHeight;
      this.setState({
        top: height * 0.75,
        bottom: height * 0.75,
        right: width * 0.75,
        left: width * 0.75,
        scale: 0,
      }, this.open);
    } else if (this.props.isOpen && !next.isOpen) {
      const width = this.refs.wrapper.clientWidth;
      const height = this.refs.wrapper.clientHeight;
      cancelAnimationFrame(this.openAnimationId);
      this.setState({
        top: height * 0.75,
        bottom: height * 0.75,
        right: width * 0.75,
        left: width * 0.75,
      }, this.close);
    }
  }

  open() {
    const { width, height } = this.state;
    const top = this.topEasing.calc(height * 0.25, this.state.top);
    const bottom = this.bottomEasing.calc(height * 1.25, this.state.bottom);
    const right = this.rightEasing.calc(width * 1.25, this.state.right);
    const left = this.leftEasing.calc(width * 0.25, this.state.left);
    this.openAnimationId = requestAnimationFrame(::this.open);
    const scale = this.state.scale + 0.08 >= 1 ? 1 : this.state.scale + 0.08;
    this.setState({ top, bottom, right, left, scale });
    if (this.topEasing.isStop()) cancelAnimationFrame(this.openAnimationId);
  }

  close() {
    this.closeAnimationId = requestAnimationFrame(::this.close);
    const scale = this.state.scale - 0.08 < 0 ? 0 : this.state.scale - 0.08;
    this.setState({ scale });
    if (scale === 0) cancelAnimationFrame(this.closeAnimationId);
  }

  renderPath() {
    if (!this.state.isMount) return null;
    const { width, height, top, right, bottom, left } = this.state;
    const x0 = width * 0.25;
    const y0 = height * 0.25;
    const cx = width / 2 + x0;
    const x1 = width + x0;
    const y1 = height + y0;
    const cy = height / 2 + y0;
    /* TODO: if is open change svg props to `width: 100%, height: 100%, top:0, left:0` */
    return (
      <svg
        width="150%"
        height="150%"
        style={{
          position: 'absolute',
          top: '-25%',
          left: '-25%',
          transform: `scale3d(${this.state.scale},${this.state.scale},1)`,
        }}
      >
        <path d={ `M ${x0} ${y0}
                   Q ${cx} ${top} ${x1} ${y0}
                   Q ${right} ${cy} ${x1} ${y1}
                   Q ${cx} ${bottom} ${x0} ${y1}
                   Q ${left} ${cy} ${x0} ${y0}` }
          fill="#333"
        />
      </svg>
    );
  }

  render() {
    const { style, children } = this.props;
    return (
      <div>
        <div ref="wrapper" style={ Object.assign({ position: 'fixed' }, style, { overflow: 'visible' }) }>
          { this.renderPath() }
        </div>
        <div style={ Object.assign({}, { position: 'fixed' }, style) } >
          <div style={{ transform: `scale3d(${this.state.scale}, ${this.state.scale}, 1)`, opacity: this.props.isOpen ? this.state.scale : 0 }}>
            { children }
            </div>
        </div>
      </div>
    );
  }
}
