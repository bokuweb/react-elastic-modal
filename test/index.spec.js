import React from 'react';
import { shallow, mount, render } from 'enzyme';
import assert from 'power-assert';
import Modal from '../src/index';

describe('Modal test', () => {
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

  it('should first div rendered with expected styles when pass requred props', () => {
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
  });

  it('should second div rendered with expected styles when pass requred props', () => {
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
    const div = wrapper.children().at(1);
    const expectedStyle = {
      overflow: 'visible',
      transform: 'scale3d(0, 0, 1)',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-0px', // FIXME: this.refs.wrapper.scrollWidth return 0 on test
      marginLeft: '-0px', // FIXME: this.refs.wrapper.scrollWidth return 0 on test
      width: '100px',
      height: '200px',
      zIndex: 101,
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
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
    const div = wrapper.children().at(2);
    const expectedStyle = {
      opacity: 0,
      overflow: 'scroll',
      transform: 'scale3d(0, 0, 1)',
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-0px', // FIXME: this.refs.wrapper.scrollWidth return 0 on test
      marginLeft: '-0px', // FIXME: this.refs.wrapper.scrollWidth return 0 on test
      width: '100px',
      height: '200px',
      zIndex: 101,
      visibility: 'hidden',
    };
    assert.deepEqual(div.prop('style'), expectedStyle);
  });
});
