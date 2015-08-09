# react-dd-menu
React Dropdown Menu

Example: http://codepen.io/mlaursen03/full/PqVjMm/

> Example might not be up to date

### Installation

```bash
$ npm install -S react-dd-menu
```

#### Props

* `isOpen`    - Boolean for telling if the menu is open. This was passed in as a prop instead of having the component's own state so you can decide when to close the menu on your own.
  * __Is Required__
* `close`     - a function to call that turns the `isOpen` boolean to false
  * __Is Required__
* `toggle`    - any renderable item that will be used to toggle the menu open. So normally a button or any other content.
  * __Is Required__
* `inverse`   - boolean if it is an inversed color menu
* `align`     - the alignment for the animation, text, and menu if the specific props are not given.
  * Defaults to `center`
* `animAlign` - the alignment/direction that the menu will appear from
* `textAlign` - the alignment of each list item's text
* `menuAlign` - the alignment of the menu to the `toggle` element
* `className` - any additional css classes to add the the dropdown menu container. (`.dd-menu`)

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
    let menuOptions = {
      isOpen: this.state.isOpen,
      close: this.close.bind(this),
      toggle: <button type="button" onClick={this.toggle.bind(this)}Click me!</button>,
      align: 'right',
    };
    return (
      <DropdownMenu {...menuOptions}>
        <li><a href="#">Example 1</a></li>
        <li><button type="button" onClick={this.click.bind(this)}>Example 2</button></li>
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
    var menuOptions = {
      isOpen: this.state.isOpen,
      close: this.close,
      toggle: <button type="button" onClick={this.toggle}>Click me!</button>,
      align: 'right'
    }
    return (
      <DropdownMenu {...menuOptions}>
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

- 0.0.2 - Fixed removing the click event listener
- 0.0.3 - Positioning fixes and convenience props for different dropdown menu configs
