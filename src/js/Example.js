import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import Options from './Options';
import DropdownMenu, { NestedDropdownMenu } from '../index';

class Example extends Component {
  render() {
    return (
      <div className="example">
        <header><h1>React Dropdown Menu Example</h1></header>
        <main>
          {Options.map(opts => {
            return <Menu {...opts} key={opts.text} />;
          })}
          <SelectDropdown />
          <SearchDropdown />
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

export default Example;

class SelectDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedItem: 'Item 1',
    };
  }

  setMenu = (isOpen) => {
    this.setState({ isOpen: isOpen });
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  }

  setItem = (item) => {
    this.setState({ selectedItem: item });
  }

  render() {
    const menuProps = {
      className: 'select-dropdown',
      isOpen: this.state.isOpen,
      close: this.closeMenu,
      toggle: (
        <button type="button" className="select-dropdown-toggle" onClick={this.setMenu.bind(this, true)}>
          {this.state.selectedItem}
          <i className={`fa fa-chevron-down${this.state.isOpen ? ' flip' : ''}`} />
        </button>
      ),
      align: 'left',
      animAlign: 'top',
    };
    return (
      <DropdownMenu {...menuProps}>
        <li><button type="button" onClick={this.setItem.bind(this, 'Item 1')}>Item 1</button></li>
        <li><button type="button" onClick={this.setItem.bind(this, 'Item 2')}>Item 2</button></li>
        <li><button type="button" onClick={this.setItem.bind(this, 'Item 3')}>Item 3</button></li>
      </DropdownMenu>
    );
  }
}

// Super amazing way to increase chance of spaces!
const possible = "ABCDEFGHI JKLMNOPQRST UVWXYZabcde fghijklmn opqrstuvwxy z0123 456789 ";
const items = Array.apply(null, new Array(100)).map(() => {
  const wordLength = Math.floor(Math.random() * 25);
  let text = '';
  for(let i = 0; i < wordLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
});
class SearchDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      inputValue: '',
      filteredItems: items,
    };
  }

  setMenu = (isOpen) => {
    this.setState({ isOpen: isOpen });
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  }

  handleChange = (e) => {
    const value = e.target.value;
    const lv = value.toLowerCase();
    // Some amazing fuzzy search <.<
    const filteredItems = items.filter(item => {
      const li = item.toLowerCase();
      let lastFound = -1;
      for(let i = 0; i < lv.length; i++) {
        lastFound = li.indexOf(lv[i], lastFound + 1);
        if(lastFound === -1) {
          return false;
        }
      }
      return true;
    });
    this.setState({ inputValue: value, filteredItems: filteredItems });
  }

  render() {
    const { isOpen, inputValue, filteredItems } = this.state;
    const menuProps = {
      className: 'select-dropdown',
      isOpen: isOpen,
      close: this.closeMenu,
      toggle: (
        <div className="underlined-input-container">
          <label htmlFor="something" className={`${isOpen || inputValue ? 'active' : ''}`}>Some filter thing</label>
          <input id="something" type="text" name="search" className={`underlined-input${inputValue ? ' active' : ''}`}
            onChange={this.handleChange} onFocus={this.setMenu.bind(this, true)} value={this.state.inputValue} />
          <span className="underline" />
          <i className={`fa fa-chevron-down${isOpen ? ' flip' : ''}`} />
        </div>
      ),
      align: 'left',
      animAlign: 'top',
    };
    return (
      <DropdownMenu {...menuProps}>
        <CSSTransitionGroup transitionName="opacity" transitionEnterTimeout={150} transitionLeave={false}>
        {filteredItems.map((item, i) => {
          return (
            <li key={`${item}-${i}`}>
              <button type="button">{item}</button>
            </li>
          );
        })}
        {filteredItems.length === 0 &&
          <li key="no-results"><a href="#"><i>No results found</i></a></li>
        }
        </CSSTransitionGroup>
      </DropdownMenu>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  static propTypes = {
    text: PropTypes.string,
    additionalItems: PropTypes.node,
    nestedProps: PropTypes.object,
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    const { text, additionalItems, nestedProps, ...props } = this.props;
    const opts = {
      close: this.closeMenu,
      isOpen: isOpen,
      toggle: (
        <div className={classnames('tab', { 'active': isOpen })}>
          <button type="button" onClick={this.toggleMenu}>{text}</button>
        </div>
      ),
    };

    let toggle = null;
    if(nestedProps) {
      let nested = null;
      switch(nestedProps.nested) {
        case 'left':
        case 'right':
          nested = nestedProps.nested;
          break;
        case 'inherit':
          nested = props.align;
          break;
        default:
          nested = props.align === 'left' ? 'right' : 'left';
      }

      const icon = <span className={`fa fa-chevron-${nested}`} />;
      toggle = (
        <button type="button">
          {nested === 'left' && icon}
          Hover for Nested menu
          {nested === 'right' && icon}
        </button>
      );
    }
    return (
      <DropdownMenu {...props} {...opts}>
        <li><a href="#">Link Example</a></li>
        <li><button type="button" onClick={this.onClick}>Button Example</button></li>
        {additionalItems}
        {nestedProps &&
        <NestedDropdownMenu toggle={toggle} {...nestedProps}>
          <li><a href="#">Woop Woop</a></li>
          <li><a href="#">Thats the Sound of</a></li>
          <li><a href="#">The Police</a></li>
        </NestedDropdownMenu>
        }
      </DropdownMenu>
    );
  }
}
