import React, {Component} from 'react';
import HelloWorld from '../../src';

const customStyles = {
  content : {
    width: '200px',
    height: '200px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
};

export default class Example extends Component{
  render() {
    return (
      <HelloWorld style={ customStyles.content }/>
    );
  }
}
