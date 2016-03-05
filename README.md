# react-elastic-modal

React elastic modal component

[![Build Status](https://travis-ci.org/bokuweb/react-elastic-modal.svg?branch=master)](https://travis-ci.org/bokuweb/react-elastic-modal)
[![Code Climate](https://codeclimate.com/github/bokuweb/react-elastic-modal/badges/gpa.svg)](https://codeclimate.com/github/bokuweb/react-elastic-modal)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Screenshot

![screenshot](https://github.com/bokuweb/react-elastic-modal/blob/master/screenshot.gif?raw=true)

## DEMO

http://bokuweb.github.io/react-elastic-modal/

## Example


``` jsx
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
```

## Props

### `isOepn`: PropTypes.bool.isRequired

If true, the modal is open. If false, the modal is closed.

### `onRequestClose`: PropTypes.func

This callback is called when overlay element clicked.
If you want to close modal when overlay clicked, please set `isOpen` state `false` in this callback. 

### `modal`: PropTypes.shape

This props specify modal styles.

``` javascript
modal: PropTypes.shape({
  backgroundColor: React.PropTypes.string.isRequired,
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  opacity: React.PropTypes.number,
  zIndex: React.PropTypes.number,
})
```

- backgroundColor: Specify modal background color.
- width: Specify modal width. i.e. `width: '100px'` or `width: '50%'`.
- height: Specify modal width. i.e. `height: '100px'` or `height: '50%'`.
- opacity: Specify modal opacity. Default value is `1`.
- zIndex: Specify modal zIndex. Default value is `101`.
    
#### Attention

react-elastic-modal rendered by svg.
if you set modal size `{width: 100px, height: 200px}`, svg width and height is set `{width: 110px, height: 220px}`.
    
### `overlay`: PropTypes.shape

This props specify overlay styles.

``` javascript
overlay: PropTypes.shape({
  background: React.PropTypes.string,
  zIndex: React.PropTypes.number,
})
```

- background: Specify overlay background. Default value is `rgba(0, 0, 0, 0.8)`. 
- zIndex: Specify overlay zIndex. Default value is `100`.

## License

The MIT License (MIT)

Copyright (c) 2016 Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
