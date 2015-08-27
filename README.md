# react-dd-menu
React Dropdown Menu

Live Example: http://codepen.io/mlaursen03/full/PqVjMm/

> Live Example might not be up to date

An up-to-date example is available in the `examples` folder. You can run `gulp --examples` to start up the example.

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
* `align`     - the alignment for the animation, text, and menu if the specific props are not given. Defaults to `center`
  * One of `center`, `right`, `left`
* `animAlign` - the alignment/direction that the menu will appear from
  * One of `center`, `right`, `left`
* `textAlign` - the alignment of each list item's text
  * One of `center`, `right`, `left`
* `menuAlign` - the alignment of the menu to the `toggle` element
  * One of `center`, `right`, `left`
* `size`      - the size of the menu. Defaults to auto size.
  * One of `sm`, `md`, `lg`, `xl`
* `className` - any additional css classes to add the the dropdown menu container. (`.dd-menu`)

### Styling
In the `dist` folder, there is a `react-dd-menu.css` and a `react-dd-menu.min.css` with the default css stylings. If you have SASS, the source is located in `src/scss`.

If you don't want the default css or to edit the default, the layout is this:

```
.dd-menu
| -- toggle component
| -- .dd-menu-items
|    | -- ul
|    |    | [role="separator"], .separator
```

The separator can be any element with a classname of `.separator` or any element with a role of separator (or both). To get the best styling, it *should* probably be applied to an `li` element.

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


### Modifying
If you are modifying the dropdown menu, the builds are based on gulp. To start the example app and watch any changes to js files, run

```bash
gulp --examples
```

To test this in a _production_ state (minified), run

```bash
gulp --examples --production
```

When adding new options or additions, make sure to update `src/js/Options.js` with a new example using your options.

To clean the dist run

```bash
gulp clean
```

and to clean the examples, run

```bash
gulp clean --examples
```

### Versions

- 0.0.2 - Fixed removing the click event listener
- 0.0.3 - Positioning fixes and convenience props for different dropdown menu configs
- 0.0.4 - Fixed width for firefox and added convenience props for sizes
- 0.0.5 - Fixed Button font size, added examples
