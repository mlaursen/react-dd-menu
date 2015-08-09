# react-dd-menu
React Dropdown Menu

Example: http://codepen.io/mlaursen03/full/PqVjMm/

> Example might not be up to date

### Installation

```bash
$ npm install -S react-dd-menu
```

#### Props

* `isOpen` - Boolean for telling if the menu is open. This was passed in as a prop instead of having the component's own state so you can decide when to close the menu on your own.
  * Defaults to `false`
* `close`  - a function to call that turns the `isOpen` boolean to false
* `toggle` - any renderable item that will be used to toggle the menu open. So normally a button or any other content.
* `direction` - the direction that the menu will appear from. Valid values are `center`, `right`, and `left`. Check the `src/scss/_animations.scss` file for how these work. The direction is used for the appearing animation. `grow-from-${direction}`
  * Defaults to `center`
* className   - any additional css classes to add the the dropdown menu container. (`.dd-menu`)
  * Defaults to `''`

### Styling
In the `dist` folder, there is a `react-dd-menu.css` and a `react-dd-menu.min.css` with the default css stylings. If you have SASS, the source is located in `src/scss`.

If you don't want the default css or to edit the default, the layout is this:

```
.dd-menu
| -- toggle component
| -- .dd-menu-items
|    | -- ul
```

### Usage

```javascript
'use strict';

import React from 'react'
import DropdownMenu from 'react-dd-menu'

class Example extends React.Component {
  constructor() {
    this.state = {
      isMenuOpen: false
    }
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  close() {
    this.setState({ isMenuOpen: false })
  }

  click() {
    console.log('You clicked an item');
  }

  render() {
    let Toggle = (<button type="button" onClick={this.toggle}>Click me!</button>);
    return (
      <DropdownMenu close={this.close} isOpen={this.state.isOpen} 
          toggle={Toggle}>
        <li><a href="#">Example 1</a></li>
        <li><button type="button" onClick={this.click}>Example 2</button></li>
      </DropdownMenu>
    );
  }
}
```

or..

```javascript
var React = require('react');
var DropdownMenu = require('react-dd-menu');

var Example = React.createClass({
  getInitialState: function() {
    return { isMenuOpen: false };
  },

  toggle: function() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  },

  close: function() {
    this.setState({ isMenuOpen: false });
  },

  click: function() {
    console.log('You clicked an item');
  },

  render: function() {
    var Toggle = (<button type="button" onClick={this.toggle}>Click me!</button>);
    return (
      <DropdownMenu close={this.close} isOpen={this.state.isOpen} 
          toggle={Toggle}>
        <li><a href="#">Example 1</a></li>
        <li><button type="button" onClick={this.click}>Example 2</button></li>
      </DropdownMenu>
    );
  }
});
```


### Building
```bash
$ npm run build
```


### Versions

0.0.2 - Fixed removing the click event listener
