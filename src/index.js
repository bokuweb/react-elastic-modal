import React, { Component, PropTypes } from 'react';
import Easing from './easing';

export default class ElasticModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.any,
    onRequestClose: PropTypes.func,
    modal: PropTypes.shape({
      backgroundColor: React.PropTypes.string.isRequired,
      width: React.PropTypes.string.isRequired,
      height: React.PropTypes.string.isRequired,
    }),
    overlay: PropTypes.shape({
      background: React.PropTypes.string,
    }),
  };

  static defaultProps = {
    isOpen: false,
    onRequestClose: () => null,
    overlay: {
      background: 'rgba(0, 0, 0, 0.8)',
    },
  };

  constructor(props) {
    super(props);
    this.topEasing = new Easing(1.2, 0.75);
    this.bottomEasing = new Easing(1.2, 0.75);
    this.rightEasing = new Easing(1.2, 0.75);
    this.leftEasing = new Easing(1.2, 0.75);
    this.openAnimationId = null;
    this.closeAnimationId = null;
    this.state = {
      isMount: false,
      scale: 0,
      opacity: 0,
    };
  }

  componentDidMount() {
    this.setMountState();
    this.setDefaultState();
  }

  componentWillReceiveProps(next) {
    if (!this.props.isOpen && next.isOpen) {
      cancelAnimationFrame(this.closeAnimationId);
      this.setDefaultState();
      this.open();
    } else if (this.props.isOpen && !next.isOpen) {
      cancelAnimationFrame(this.openAnimationId);
      this.setDefaultState();
      this.close();
    }
  }

  setDefaultState() {
    const width = this.refs.wrapper.clientWidth;
    const height = this.refs.wrapper.clientHeight;
    this.setState({
      height,
      width,
      top: height * 0.55,
      bottom: height * 0.55,
      right: width * 0.55,
      left: width * 0.55,
    });
  }

  setMountState() {
    this.setState({ isMount: true });
  }

  isAnimationStop() {
    return (
      this.topEasing.isStop() ||
      this.rightEasing.isStop() ||
      this.bottomEasing.isStop() ||
      this.leftEasing.isStop()
    );
  }

  open() {
    const { width, height } = this.state;
    const top = this.topEasing.calc(height * 0.05, this.state.top);
    const bottom = this.bottomEasing.calc(height * 1.05, this.state.bottom);
    const right = this.rightEasing.calc(width * 1.05, this.state.right);
    const left = this.leftEasing.calc(width * 0.05, this.state.left);
    this.openAnimationId = requestAnimationFrame(::this.open);
    const scale = this.state.scale + 0.08 >= 1 ? 1 : this.state.scale + 0.08;
    const opacity = this.state.opacity + 0.08 >= 1 ? 1 : this.state.opacity + 0.08;
    this.setState({ top, bottom, right, left, scale, opacity });
    if (this.isAnimationStop()) cancelAnimationFrame(this.openAnimationId);
  }

  close() {
    this.closeAnimationId = requestAnimationFrame(::this.close);
    const scale = this.state.scale - 0.08 < 0 ? 0 : this.state.scale - 0.08;
    const opacity = this.state.scale - 0.08 < 0 ? 0 : this.state.scale - 0.08;
    this.setState({ scale, opacity });
    if (scale === 0) cancelAnimationFrame(this.closeAnimationId);
  }

  renderPath() {
    if (!this.state.isMount) return null;
    const { width, height, top, right, bottom, left } = this.state;
    const x0 = width * 0.05;
    const y0 = height * 0.05;
    const cx = width / 2 + x0;
    const x1 = width + x0;
    const y1 = height + y0;
    const cy = height / 2 + y0;
    return (
      <svg
        width="110%"
        height="110%"
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          transform: `scale3d(${this.state.scale}, ${this.state.scale}, 1)`,
        }}
      >
        <path d={ `M ${x0} ${y0}
                   Q ${cx} ${top} ${x1} ${y0}
                   Q ${right} ${cy} ${x1} ${y1}
                   Q ${cx} ${bottom} ${x0} ${y1}
                   Q ${left} ${cy} ${x0} ${y0}` }
          fill={ this.props.modal.backgroundColor }
        />
      </svg>
    );
  }

  render() {
    const { children, isOpen, onRequestClose, modal: { width, height } } = this.props;
    const { scale, opacity } = this.state;
    return (
      <div>
        <div
          onClick={ onRequestClose }
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            visibility: isOpen ? 'visible' : 'hidden',
            opacity,
          }}
        />
        <div
          ref="wrapper"
          style={{
            position: 'fixed',
            overflow: 'visible',
            width,
            height,
          }}
        >
          { this.renderPath() }
        </div>
        <div
          style={{
            transform: `scale3d(${scale}, ${scale}, 1)`,
            position: 'fixed',
            opacity,
            visibility: isOpen ? 'visible' : 'hidden',
            width,
            height,
          }}
        >
          { children }
        </div>
      </div>
    );
  }
}
