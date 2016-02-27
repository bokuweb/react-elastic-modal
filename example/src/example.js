import React, {Component} from 'react';
import HelloWorld from '../../src';

const customStyles = {
  content : {
    width: '500px',
    height: '200px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //margin: '-100px 0 0 -250px'
    padding: '20px',
    overflowY: 'scroll'
  }
};

export default class Example extends Component{
  render() {
    return (
      <HelloWorld style={ customStyles.content }>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </HelloWorld>
    );
  }
}
