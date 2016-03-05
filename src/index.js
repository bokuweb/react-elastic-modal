import React, { Component, PropTypes } from 'react';
import Easing from './easing';

const ease = 1.5;
const friction = 0.75;
const svgMarginRatio = 0.05;
const opacityFactor = 0.08;
const scaleFactor = 0.08;

export default class ElasticModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.any,
    onRequestClose: PropTypes.func,
    modal: PropTypes.shape({
      backgroundColor: React.PropTypes.string.isRequired,
      width: React.PropTypes.string.isRequired,
      minWidth: React.PropTypes.string,
      maxWidth: React.PropTypes.string,
      height: React.PropTypes.string.isRequired,
      minHeight: React.PropTypes.string,
      maxHeight: React.PropTypes.string,
      opacity: React.PropTypes.number,
    }),
    overlay: PropTypes.shape({
      background: React.PropTypes.string,
    }),
  };

  static defaultProps = {
    isOpen: false,
    onRequestClose: () => null,
    modal: {
      opacity: 1,
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.8)',
    },
  };

  constructor(props) {
    super(props);
    this.topEasing = new Easing(ease, friction);
    this.bottomEasing = new Easing(ease, friction);
    this.rightEasing = new Easing(ease, friction);
    this.leftEasing = new Easing(ease, friction);
    this.openAnimationId = null;
    this.closeAnimationId = null;
    this.state = {
      isMount: false,
      scale: 0,
      opacity: 0,
    };
    this.resize = ::this.resize;
    window.addEventListener('resize', this.resize);
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
      top: height * (0.5 + svgMarginRatio),
      bottom: height * (0.5 + svgMarginRatio),
      right: width * (0.5 + svgMarginRatio),
      left: width * (0.5 + svgMarginRatio),
    });
  }

  setMountState() {
    this.setState({ isMount: true });
  }

  resize() {
    const { isOpen } = this.props;
    const width = this.refs.wrapper.clientWidth;
    const height = this.refs.wrapper.clientHeight;
    this.setState({
      height,
      width,
      top: isOpen ? height * svgMarginRatio : height * (0.5 + svgMarginRatio),
      bottom: isOpen ? height * (1 + svgMarginRatio) : height * (0.5 + svgMarginRatio),
      right: isOpen ? width * (1 + svgMarginRatio) : width * (0.5 + svgMarginRatio),
      left: isOpen ? width * svgMarginRatio : width * (0.5 + svgMarginRatio),
    });
  }

  conponentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  isAnimationStop() {
    return (
      this.topEasing.isStop() &&
      this.rightEasing.isStop() &&
      this.bottomEasing.isStop() &&
      this.leftEasing.isStop()
    );
  }

  open() {
    const { width, height } = this.state;
    const top = this.topEasing.calc(height * svgMarginRatio, this.state.top);
    const bottom = this.bottomEasing.calc(height * (1 + svgMarginRatio), this.state.bottom);
    const right = this.rightEasing.calc(width * (1 + svgMarginRatio), this.state.right);
    const left = this.leftEasing.calc(width * svgMarginRatio, this.state.left);
    this.openAnimationId = requestAnimationFrame(::this.open);
    const scale = this.state.scale + scaleFactor >= 1
            ? 1
            : this.state.scale + scaleFactor;
    const opacity = this.state.opacity + opacityFactor >= 1
            ? 1
            : this.state.opacity + opacityFactor;
    this.setState({ top, bottom, right, left, scale, opacity });
    if (this.isAnimationStop()) cancelAnimationFrame(this.openAnimationId);
  }

  close() {
    this.closeAnimationId = requestAnimationFrame(::this.close);
    const scale = this.state.scale - scaleFactor < 0 ? 0 : this.state.scale - scaleFactor;
    const opacity = this.state.scale - opacityFactor < 0 ? 0 : this.state.scale - opacityFactor;
    this.setState({ scale, opacity });
    if (scale === 0) cancelAnimationFrame(this.closeAnimationId);
  }

  renderPath() {
    if (!this.state.isMount) return null;
    const { width, height, top, right, bottom, left } = this.state;
    const x0 = width * svgMarginRatio;
    const y0 = height * svgMarginRatio;
    const cx = width / 2 + x0;
    const x1 = width + x0;
    const y1 = height + y0;
    const cy = height / 2 + y0;
    return (
      <svg
        width={`${100 + svgMarginRatio * 200}%`}
        height={`${100 + svgMarginRatio * 200}%`}
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          transform: `scale3d(${this.state.scale}, ${this.state.scale}, 1)`,
          opacity: this.props.modal.opacity,
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
    const { children, isOpen, onRequestClose, modal } = this.props;
    const { scale, opacity, width, height } = this.state;
    const commonStyles = {
      transform: `scale3d(${scale}, ${scale}, 1)`,
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: `-${height / 2}px`,
      marginLeft: `-${width / 2}px`,
      width: modal.width,
      minWidth: modal.minWidth,
      maxWidth: modal.maxWidth,
      height: modal.height,
      minHeight: modal.minHeight,
      maxHeight: modal.maxHeight,
    };
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
            background: this.props.overlay.background,
            visibility: isOpen ? 'visible' : 'hidden',
            opacity,
          }}
        />
        <div ref="wrapper" style={{ overflow: 'visible', ...commonStyles }} >
          { this.renderPath() }
        </div>
        <div
          style={{
            opacity,
            overflow: 'scroll',
            ...commonStyles,
            visibility: isOpen ? 'visible' : 'hidden',
          }}
        >
          { children }
        </div>
      </div>
    );
  }
}
