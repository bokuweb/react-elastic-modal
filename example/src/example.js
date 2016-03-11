import React, { Component } from 'react';
import Modal from '../../src';

const key = 'react-elastic-modal-example';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = (JSON.parse(localStorage.getItem(key)) || { isOpen: false });
  }

  componentDidUpdate() {
    localStorage.setItem(key, JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        <div className='button--open' onClick={ () => this.setState({ isOpen: true }) }>open modal</div>
        <Modal
          isOpen={ this.state.isOpen }
          onRequestClose={ () => this.setState({ isOpen: false }) }
          modal={{
            width: '50%',
            height: '360px',
            backgroundColor: '#fff',
            opacity: 0.5,
          }}
          overlay={{
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ padding: '50px', overflowY: 'scroll', position: 'relative' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div className="button--close" onClick={ () => this.setState({ isOpen: false }) }>close modal</div>
            <i
               className="fa fa-close"
               onClick={ () => this.setState({ isOpen: false }) }
               style={{ color: '#fff', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', fontSize: '20px' }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
