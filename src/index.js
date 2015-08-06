'use strict'

import React, { Component, PropTypes } from 'react/addons'
import classnames from 'classnames'


const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const TAB = 9;
const SPACEBAR = 32;

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    var menuItems = React.findDOMNode(this.refs.menuItems);
    if(this.props.isOpen && !prevProps.isOpen) {
      document.addEventListener('click', this.handleClickOutside.bind(this));
      menuItems.addEventListener('click', this.props.close);
      menuItems.addEventListener('onkeydown', this.close.bind(this));
    } else if(!this.props.isOpen && prevProps.isOpen) {
      document.removeEventListener('click', this.handleClickOutside.bind(this));
      menuItems.removeEventListener('click', this.props.close);
      menuItems.removeEventListener('onkeydown', this.close.bind(this));
    }
  }

  close(e) {
    let key = e.which || e.keyCode;
    key === SPACEBAR && this.props.close();
    e.preventDefault();
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
    let id = e.shiftKey ? 1 : items.length - 1;
    
    e.target == items[id] && this.props.close(e);
  }


  render() {
    return (
      <div className={classnames('dd-menu', this.props.className)}>
        {this.props.toggle}
        <CSSTransitionGroup transitionName={'grow-from-' + this.props.direction} component="div"
                          className="dd-menu-items" onKeyDown={this.handleKeyDown.bind(this)} ref="menuItems">
          {this.props.isOpen && <ul>{this.props.children}</ul>}
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
}

DropdownMenu.defaultProps = {
  isOpen: false,
  direction: 'center',
  className: '',
};

export default DropdownMenu;
