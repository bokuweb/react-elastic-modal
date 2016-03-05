import React, { Component } from 'react';
import Modal from '../../src';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
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
            height: '50%',
            backgroundColor: '#fff',
            opacity: 0.5,
          }}
          overlay={{
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ padding: '30px', overflowY: 'scroll' }}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <div className="button--close" onClick={ () => this.setState({ isOpen: false }) }>close modal</div>
          </div>
        </Modal>
      </div>
    );
  }
}
