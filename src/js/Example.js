import React, { Component } from 'react'
import classnames from 'classnames'

import Options from './Options'
import DropdownMenu from '../index'

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
    let { text, additionalItems, ...props } = this.props
    let opts = {
      close: this.closeMenu.bind(this),
      isOpen: isOpen,
      toggle: (
        <div className={classnames('tab', { 'active': isOpen })}>
          <button type="button" onClick={this.toggleMenu.bind(this)}>{text}</button>
        </div>
      )
    }
    return (
      <DropdownMenu {...props} {...opts}>
        <li><a href="#">Link Example</a></li>
        <li><button type="button" onClick={this.onClick}>Button Example</button></li>
        {additionalItems}
      </DropdownMenu>
    )
  }
}
