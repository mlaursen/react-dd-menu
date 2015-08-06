'use strint'

import React, { Component, PropTypes } from 'react/addons'


const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const TAB = 9;
const SPACEBAR = 32;

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.handleClickOutside.bind(this));
    } else if(!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('click', this.handleClickOutside.bind(this));
    }
  }
  
  handleClickOutside(e) {
    let children = React.findDOMNode(this).getElementsByTagName('*');
    for(var x in children) {
      if(e.target == children[x]) { return; }
    }

    this.props.close(e);
  }

  handleKeyDown(e) {
    let key = e.which || e.keyCode;
    if(key !== TAB) {
      return;
    }

    let items = React.findDOMNode(this).querySelectorAll('button,a');
    let id = e.shiftKey ? 1 : items.length -1;
    
    if(e.target == items[id]) {
      this.props.close(e);
    }
  }


  render() {
    return (
      <div className={'dd-menu' + (this.props.className ? ' ' + this.props.className : '')}>
        {this.props.toggle}
        <CSSTransitionGroup transitionName={'grow-from-' + this.props.direction} component="div"
                          className="dd-menu-items" onKeyDown={this.handleKeyDown.bind(this)}>
          {this.props.isOpen && this.props.children}
        </CSSTransitionGroup>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  toggle: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['center', 'right', 'left']),
  className: PropTypes.string,
  component: PropTypes.oneOf(['div', 'span', 'li']),
}

DropdownMenu.defaultProps = {
  isOpen: false,
  direction: 'center',
  className: '',
  component: 'div',
};

class DropdownMenuItem extends Component {
  constructor(props) {
    super(props);
  }

  handleKeyDown(e) {
    var key = e.which || e.keyCode;
    if(key === SPACEBAR) {
      e.preventDefault();
      this.props.action && this.props.action();
    }
  }

  render() {
    let children = React.createElement(this.props.component, this.props.childrenProps, this.props.children);
    return (
      <li className={this.props.className} onClick={this.props.action} onKeyDown={this.handleKeyDown.bind(this)}>
        {children}
      </li>
    );
  }
}

DropdownMenuItem.propTypes = {
  action: PropTypes.func,
  childrenProps: PropTypes.object,
  tabIndex: PropTypes.number,
  component: PropTypes.oneOf(['button', 'a']),
  className: PropTypes.string,
}

DropdownMenuItem.defaultProps = {
  tabIndex: 0,
  component: 'button',
  className: '',
  childrenProps: {},
}

DropdownMenu.DropdownMenuItem = DropdownMenuItem;


export default DropdownMenu;
