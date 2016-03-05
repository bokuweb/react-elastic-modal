import React, {Component} from 'react';
import Modal from '../../src';

const customStyles = {
  content : {
    width: '600px',
    height: '400px',
    top: '50%',
    left: '50%',
    //transform: 'translate(0,0)',
    transform: 'translate(-50%, -50%)',
    //margin: '-100px 0 0 -250px'
    padding: '20px',
    overflowY: 'scroll',
    backgroundColor: '#ccc',
  }
};

export default class Example extends Component{
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
  }

  render() {
    return (
      <div>
        <a onClick={() => this.setState({isOpen: !this.state.isOpen})}>modal toggle</a>
        <Modal
           isOpen={this.state.isOpen}
           onRequestClose={() => this.setState({isOpen: false})}
           modal={{
             width: '50%',
             height: '50%',
             backgroundColor: '#ccc',
           }}
         >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Modal>
      </div>
    );
  }
}
