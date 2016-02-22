import React, {Component} from 'react';
import HelloWorld from '../../src';

export default class Example extends Component{
  render() {
    return (
      <HelloWorld style={{ width: '100px', height: '100px' }}/>
    );
  }
}
