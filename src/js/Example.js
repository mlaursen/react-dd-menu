import React, { Component } from 'react'
import classnames from 'classnames'

import Options from './Options'
import DropdownMenu, { NestedDropdownMenu } from '../index'

class Example extends Component {
  render() {
    return (
      <div className="example">
        <header><h1>React Dropdown Menu Example</h1></header>
        <main>
          {Options.map(opts => {
            return <Menu {...opts} key={opts.text} />
          })}
        </main>
        <footer>
          <a href="http://github.com/mlaursen/react-dd-menu">
            <span className="fa fa-github fa-4x" />
          </a>
        </footer>
      </div>
    )
  }
}

export default Example

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  closeMenu() {
    this.setState({ isOpen: false })
  }

  render() {
    let { isOpen } = this.state
    let { text, additionalItems, nestedProps, ...props } = this.props
    let opts = {
      close: this.closeMenu.bind(this),
      isOpen: isOpen,
      toggle: (
        <div className={classnames('tab', { 'active': isOpen })}>
          <button type="button" onClick={this.toggleMenu.bind(this)}>{text}</button>
        </div>
      )
    }

    let toggle = null
    if(nestedProps) {
      let nested = null
      switch(nestedProps.nested) {
        case 'left':
        case 'right':
          nested = nestedProps.nested;
          break;
        case 'inherit':
          nested = props.align;
          break;
        default:
          nested = props.align == 'left' ? 'right' : 'left';
      }

      let icon = <span className={`fa fa-chevron-${nested}`} />
      toggle = (
        <a href="#">
          {nested === 'left' && icon}
          Hover for Nested menu
          {nested === 'right' && icon}
        </a>
      )
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
    )
  }
}
