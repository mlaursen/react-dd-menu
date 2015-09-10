# react-dd-menu
Live Example: [React Dropdown Menu](http://mlaursen.github.io/react-dd-menu)

### Installation

```bash
$ npm install -S react-dd-menu
```

#### Props

##### DropdownMenu

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
* `upwards`   - boolean if the menu should go upwards. Defaults to `false`

##### NestedDropdownMenu

* `toggle`  - an renderable item that will open the nested menu on hover. It gets wrapped in a `li` element, so it might be best to have a button or a link tag.
  * __Is Required__
* `nested`  - the nested menu's expansion direction. The default case *should* hopefully be the only used case.
  * One of `inherit`, `reverse`, `left`, `right`. Defaults reverse.
  * Inherit - If the main dropdown menu is aligned left, the nested menu will appear to the left as well.
  * Reverse - If the main dropdown menu is aligned left, the nested menu will appear to the right.
  * Left    - Force the menu to appear to the left of the menu.
  * Right   - Force the menu to appear to the right of the menu.
* `animate` - boolean if the nested menu should animate when appearing. Defaults to `false`
* `direction` - The animation direction.
  * One of `left`, `right`
* `upwards`   - boolean if the nested menu should render upwards. Defaults to `false`
* `delay`   - A number in ms to allow the mouse to be off of the dropdown menu to close it. Defaults to `500ms`

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

#### Nested Menu Example
```javascript
'use strict';

import React from 'react'
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu'

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
    }

    let nestedProps = {
      toggle: <a href="#">Hover me for Nested Menu!</a>,
      animate: true,
    }
    return (
      <DropdownMenu {...menuOptions}>
        <li><a href="#">Example 1</a></li>
        <li><button type="button" onClick={this.click.bind(this)}>Example 2</button></li>
        <li role="separator" className="separator" />
        <NestedDropdownMenu {...nestedProps}>
          <li><a href="#">I am in a Nested Menu!</a></li>
        </NestedDropdownMenu>
      </DropdownMenu>
    );
  }
}
```

### Building
```bash
$ npm run build
```

or

```bash
$ ./bin/build
```


### Modifying
If you are modifying the dropdown menu, the builds are based on gulp. To start the example app and watch any changes to js files, run

```bash
$ gulp serve --examples
```

To test this in a _production_ state (minified), run

```bash
$ gulp serve --examples --production
```

When adding new options or additions, make sure to update `src/js/Options.js` with a new example using your options.

To clean the dist and examples folders run

```bash
$ gulp clean
```

### Versions

- 0.0.2 - Fixed removing the click event listener
- 0.0.3 - Positioning fixes and convenience props for different dropdown menu configs
- 0.0.4 - Fixed width for firefox and added convenience props for sizes
- 0.0.5 - Fixed Button font size, added examples
- 1.0.0 - Added nested dropdown menus, a separator class, drop-up? menus.
- 1.0.1 - Fixed exports for ES5 :(
- 1.0.2 - Simplified examples and added github page for live example
