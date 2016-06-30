import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'power-assert';
import sinon from 'sinon';
import Modal from '../src/index';

describe('Modal test', () => {
  let div;
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });


  it('should It rendered with expected element', () => {
    const wrapper = shallow(
      <Modal
        isOpen={false}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '100px',
          height: '200px',
        }}
      >
        test
      </Modal>
    );
    const div = wrapper.children();
    assert.equal(wrapper.type(), 'div');
    assert.equal(div.at(0).type(), 'div');
    assert.equal(div.at(1).type(), 'div');
    assert.equal(div.at(1).children().at(0).type(), null);
    assert.equal(div.at(2).type(), 'div');
    assert(div.at(2).children().at(0).contains('test'));
  });

  it('should first div rendered with expected props when pass requred props', () => {
    const wrapper = shallow(
      <Modal
        isOpen={false}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '100px',
          height: '200px',
        }}
      >
        test
      </Modal>
    );
    const div = wrapper.children().at(0);
    const expectedStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      visibility: 'hidden',
      opacity: 0,
      zIndex: 100,
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
    assert.deepEqual(typeof div.prop('onClick'), 'function');
  });

  it('should first div rendered with expected props when pass all props', () => {
    const wrapper = shallow(
      <Modal
        isOpen={false}
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    const div = wrapper.children().at(0);
    const expectedStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: 'rgba(1, 1, 1, 0.5)',
      visibility: 'hidden',
      opacity: 0,
      zIndex: 9998,
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
    assert.deepEqual(typeof div.prop('onClick'), 'function');
  });

  it('should first div rendered with expected props when pass all props with isOepn true', () => {
    const wrapper = shallow(
      <Modal
        isOpen
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    const div = wrapper.children().at(0);
    const expectedStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: 'rgba(1, 1, 1, 0.5)',
      visibility: 'visible',
      opacity: 0,
      zIndex: 9998,
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
    assert.deepEqual(typeof div.prop('onClick'), 'function');
  });

  it('should called onRequestClose callback when overlay clicked', () => {
    const onRequestClose = sinon.spy();
    const wrapper = mount(
      <Modal
        isOpen
        onRequestClose={ onRequestClose }
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    const div = wrapper.children().at(0);
    div.simulate('click');
    assert(onRequestClose.calledOnce);
  });

  it('should second div rendered with expected props when pass requred props', () => {
    const wrapper = mount(
      <Modal
        isOpen={false}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '100px',
          height: '200px',
        }}
      >
        test
      </Modal>
    );

    wrapper.setState({
      width: 100,
      height: 200,
      top: 10,
      bottom: 210,
      right: 105,
      left: 5,
    });
    wrapper.update();
    const div = wrapper.children().at(1);
    const expectedStyle = {
      overflow: 'visible',
      transform: 'scale3d(0, 0, 1)',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-100px',
      marginLeft: '-50px',
      width: '100px',
      height: '200px',
      zIndex: 101,
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
  });

  it('should second div rendered with expected props when pass all props', () => {
    const wrapper = mount(
      <Modal
        isOpen={false}
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    wrapper.setState({
      width: 100,
      height: 200,
      top: 10,
      bottom: 210,
      right: 105,
      left: 5,
    });
    wrapper.update();
    const div = wrapper.children().at(1);
    const expectedStyle = {
      overflow: 'visible',
      transform: 'scale3d(0, 0, 1)',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-100px',
      marginLeft: '-50px',
      width: '199px',
      height: '299px',
      zIndex: 9999,
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
  });

  it('should second div rendered with expected props when pass all props with isOepn true', done => {
    const wrapper = mount(
      <Modal
        isOpen={ false }
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>,
      { attachTo: div }
    );

    wrapper.setState({
      width: 100,
      height: 200,
      top: 100,
      bottom: 100,
      right: 50,
      left: 50,
      scale: 0,
      opacity: 0,
    });
    wrapper.setProps({ isOpen: true });
    wrapper.update();
    setTimeout(() => {
      const div = wrapper.children().at(1);
      const expectedStyle = {
        overflow: 'visible',
        transform: 'scale3d(1, 1, 1)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-149.5px',
        marginLeft: '-99.5px',
        width: '199px',
        height: '299px',
        zIndex: 9999,
      };
      assert.deepEqual(div.prop('style'), expectedStyle);
      wrapper.detach();
      done();
    }, 1000);
  });

  it('should svg rendered with expected props when pass requred props', () => {
    const wrapper = mount(
      <Modal
        isOpen={false}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '100px',
          height: '200px',
        }}
      >
        test
      </Modal>
    );
    const expectedStyle = {
      position: 'absolute',
      top: '-5%',
      left: '-5%',
      transform: 'scale3d(0, 0, 1)',
      opacity: 1,
    };
    const div = wrapper.children().at(1);
    const svg = div.children().at(0);
    assert.equal(svg.prop('width'), '110%');
    assert.equal(svg.prop('height'), '110%');
    assert.deepEqual(svg.prop('style'), expectedStyle);
  });

  it('should svg rendered with expected props when pass all props', () => {
    const wrapper = mount(
      <Modal
        isOpen={false}
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    const expectedStyle = {
      position: 'absolute',
      top: '-5%',
      left: '-5%',
      transform: 'scale3d(0, 0, 1)',
      opacity: 0.8,
    };
    const div = wrapper.children().at(1);
    const svg = div.children().at(0);
    assert.equal(svg.prop('width'), '110%');
    assert.equal(svg.prop('height'), '110%');
    assert.deepEqual(svg.prop('style'), expectedStyle);
  });

  it('should svg path rendered with expected props when pass all props', () => {
    const wrapper = mount(
      <Modal
        isOpen={false}
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    wrapper.setState({
      width: 100,
      height: 200,
      top: 10,
      bottom: 210,
      right: 105,
      left: 5,
    });
    wrapper.update();
    const div = wrapper.children().at(1);
    const path = div.children().at(0).children().at(0);
    const expectedPath = `M 5 10
                   Q 55 10 105 10
                   Q 105 110 105 210
                   Q 55 210 5 210
                   Q 5 110 5 10`;
    assert.equal(path.prop('fill'), '#f5f5f5');
    assert.equal(path.prop('d'), expectedPath);
  });

  it('should svg rendered with expected props when pass all props with isOepn true', done => {
    const wrapper = mount(
      <Modal
        isOpen={ false }
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    wrapper.setState({
      width: 100,
      height: 200,
      top: 100,
      bottom: 100,
      right: 50,
      left: 50,
      scale: 0,
      opacity: 0,
    });
    wrapper.setProps({ isOpen: true });
    wrapper.update();
    setTimeout(() => {
      const div = wrapper.children().at(1);
      const svg = div.children().at(0);
      const expectedStyle = {
        position: 'absolute',
        top: '-5%',
        left: '-5%',
        transform: 'scale3d(1, 1, 1)',
        opacity: 0.8,
      };
      assert.deepEqual(svg.prop('style'), expectedStyle);
      done();
    }, 1000);
  });

  it('should third div rendered with expected styles when pass requred props', () => {
    const wrapper = mount(
      <Modal
        isOpen={false}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '100px',
          height: '200px',
        }}
      >
        test
      </Modal>
    );
    wrapper.setState({
      width: 100,
      height: 200,
      top: 10,
      bottom: 210,
      right: 105,
      left: 5,
    });
    wrapper.update();
    const div = wrapper.children().at(2);
    const expectedStyle = {
      opacity: 0,
      overflow: 'scroll',
      transform: 'scale3d(0, 0, 1)',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-100px',
      marginLeft: '-50px',
      width: '100px',
      height: '200px',
      zIndex: 101,
      visibility: 'hidden',
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
  });


  it('should third div rendered with expected props when pass all props', () => {
    const wrapper = mount(
      <Modal
        isOpen={false}
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
    );
    wrapper.setState({
      width: '100',
      height: '200',
      top: '10',
      bottom: '210',
      right: '105',
      left: '5',
    });
    wrapper.update();
    const div = wrapper.children().at(2);
    const expectedStyle = {
      opacity: 0,
      overflow: 'scroll',
      transform: 'scale3d(0, 0, 1)',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-100px',
      marginLeft: '-50px',
      width: '199px',
      height: '299px',
      zIndex: 9999,
      visibility: 'hidden',
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
  });

  it('should third div rendered with expected props when pass all props with isOepn true', done => {
    const wrapper = mount(
      <Modal
        isOpen={ false }
        onRequestClose={() => console.log('test')}
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
      ,{ attachTo: div }
    );

    wrapper.setState({
      width: 100,
      height: 200,
      top: 100,
      bottom: 100,
      right: 50,
      left: 50,
      scale: 0,
      opacity: 0,
    });
    wrapper.setProps({ isOpen: true });
    wrapper.update();
    setTimeout(() => {
      const div = wrapper.children().at(2);
      const expectedStyle = {
        opacity: 1,
        overflow: 'scroll',
        transform: 'scale3d(1, 1, 1)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-149.5px',
        marginLeft: '-99.5px',
        width: '199px',
        height: '299px',
        zIndex: 9999,
        visibility: 'visible',
      };
      assert.deepEqual(div.prop('style'), expectedStyle);
      wrapper.detach();
      done();
    }, 1000);
  });

  it('#19 should be open automatically if specify `<ElasticModal isOpen={true} />`', done => {
    sinon.spy(Modal.prototype, 'componentDidMount');
    sinon.spy(Modal.prototype, 'componentWillReceiveProps');
    sinon.spy(Modal.prototype, 'open');

    const wrapper = mount(
      <Modal
        isOpen
        modal={{
          backgroundColor: '#f5f5f5',
          width: '199px',
          height: '299px',
          opacity: 0.8,
          zIndex: 9999,
        }}
        overlay={{
          background: 'rgba(1, 1, 1, 0.5)',
          zIndex: 9998,
        }}
      >
        test
      </Modal>
      ,{ attachTo: div }
    );

    setTimeout(() => {
      assert(Modal.prototype.componentDidMount.calledOnce);
      assert(Modal.prototype.open.calledOnce);
      assert(wrapper.instance().isAnimationStop());

      done();
    }, 0);
  });
});
