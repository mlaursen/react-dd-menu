import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { FlatButton } from 'react-buttons';

import DropdownMenu from '../../src/js/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isMenuOpen: false };
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  }

  render() {
    const dropdownMenuProps = {
      isOpen: this.state.isMenuOpen,
      closeMenu: this.closeMenu,
      toggleMenu: this.toggleMenu,
      toggleComponent: <FlatButton onClick={this.toggleMenu} color="primary">Hello, World!</FlatButton>,
      items: [
        { onClick: () => { console.log('Woop!'); }, children: <span><i className="fa fa-user" />Hello, world!</span> },
        { isSeparator: true },
        { onClick: () => { console.log('Woop!'); }, children: <span><i className="fa fa-th-list" />Hello, world!</span> },
      ],
    };

    const dropdownMenuProps2 = Object.assign({ upwards: true, inverse: true }, dropdownMenuProps);
    const dropdownMenuProps3 = Object.assign({ align: 'right', animAlign: 'top' }, dropdownMenuProps);

    return (
      <div className="example">
        <header><h1>React Dropdown Menu Example</h1></header>
        <main>
          <DropdownMenu {...dropdownMenuProps} />
          <DropdownMenu {...dropdownMenuProps2} />
          <DropdownMenu {...dropdownMenuProps3} />
        </main>
        <footer>
          <a href="http://github.com/mlaursen/react-dd-menu">
            <span className="fa fa-github fa-4x" />
          </a>
        </footer>
      </div>
    );
  }
}
