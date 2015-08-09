'use strict'

import React, { Component, PropTypes } from 'react/addons'
import classnames from 'classnames'


const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const TAB = 9;
const SPACEBAR = 32;

let _lastWindowClickEvent = null;

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    var menuItems = React.findDOMNode(this.refs.menuItems);
    if(this.props.isOpen && !prevProps.isOpen) {
      _lastWindowClickEvent = this.handleClickOutside.bind(this);

      document.addEventListener('click', _lastWindowClickEvent);
      menuItems.addEventListener('click', this.props.close);
      menuItems.addEventListener('onkeydown', this.close.bind(this));
    } else if(!this.props.isOpen && prevProps.isOpen) {
      document.removeEventListener('click', _lastWindowClickEvent);
      menuItems.removeEventListener('click', this.props.close);
      menuItems.removeEventListener('onkeydown', this.close.bind(this));

      _lastWindowClickEvent = null;
    }
  }

  componentWillUnmount() {
    _lastWindowClickEvent && document.removeEventListener('click', _lastWindowClickEvent);
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
    let { isOpen, toggle, className, inverse,
      align, animAlign, textAlign, menuAlign,
      children } = this.props;

    let menuClassName = classnames('dd-menu', 'dd-menu-' + (menuAlign || align), { 'dd-menu-inverse': inverse }, className),
        listClassName = 'dd-items-' + (textAlign || align);
    let transitionProps = {
      transitionName: 'grow-from-' + (animAlign || align),
      component: 'div',
      className: 'dd-menu-items',
      onKeyDown: this.handleKeyDown.bind(this),
      ref: 'menuItems',
    };

    return (
      <div className={menuClassName}>
        {toggle}
        <CSSTransitionGroup {...transitionProps}>
          {isOpen && <ul className={listClassName}>{children}</ul>}
        </CSSTransitionGroup>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  toggle: PropTypes.node.isRequired,
  inverse: PropTypes.bool,
  align: PropTypes.oneOf(['center', 'right', 'left']),
  animAlign: PropTypes.oneOf(['center', 'right', 'left']),
  textAlign: PropTypes.oneOf(['center', 'right', 'left']),
  menuAlign: PropTypes.oneOf(['center', 'right', 'left']),
  className: PropTypes.string,
}

DropdownMenu.defaultProps = {
  inverse: false,
  align: 'center',
  animAlign: null,
  textAlign: null,
  menuAlign: null,
  className: null,
};

export default DropdownMenu;
