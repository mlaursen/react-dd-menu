import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import DropdownMenuItem from './DropdownMenuItem';

const TAB = 9;

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.lastWindowClickEvent = null;
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleComponent: PropTypes.node.isRequired,
    inverse: PropTypes.bool,
    align: PropTypes.string,
    animAlign: PropTypes.string,
    textAlign: PropTypes.string,
    menuAlign: PropTypes.string,
    className: PropTypes.string,
    upwards: PropTypes.bool,
    animate: PropTypes.bool,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number,
    closeOnInsideClick: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      children: PropTypes.node,
      onClick: PropTypes.func,
      unrenders: PropTypes.bool,
      className: PropTypes.string,
      isSeparator: PropTypes.bool,
    })),
  }

  static defaultProps = {
    inverse: false,
    align: 'center',
    upwards: false,
    animate: true,
    enterTimeout: 150,
    leaveTimeout: 150,
    closeOnInsideClick: true,
    closeOnOutsideClick: true,
  }

  componentDidUpdate(prevProps) {
    const { isOpen, closeOnInsideClick, closeOnOutsideClick } = this.props;
    if(isOpen === prevProps.isOpen) {
      return;
    }

    const menuItems = ReactDOM.findDOMNode(this.refs.menuItems);
    if(isOpen && !prevProps.isOpen) {
      if(closeOnOutsideClick) {
        this.lastWindowClickEvent = this.handleClickOutside;
        document.addEventListener('click', this.lastWindowClickEvent);
      }

      if(closeOnInsideClick) {
        menuItems.addEventListener('click', this.handleClickInside);
      }
    } else if(!isOpen && prevProps.isOpen) {
      if(closeOnOutsideClick) {
        document.removeEventListener('click', this.lastWindowClickEvent);
        this.lastWindowClickEvent = null;
      }

      if(closeOnInsideClick) {
        menuItems.removeEventListener('click', this.handleClickInside);
      }
    }
  }

  componentWillUnmount() {
    this.lastWindowClickEvent && document.removeEventListener('click', this.lastWindowClickEvent);
  }

  handleClickOutside = (e) => {
    const node = ReactDOM.findDOMNode(this);
    let target = e.target;

    while(target.parentNode) {
      if(target === node) {
        return;
      }

      target = target.parentNode;
    }

    this.props.closeMenu();
  }

  handleClickInside = (e) => {
    if(e.target.getAttribute('role') !== 'separator' && e.target.classList.contains('dd-menu-item-separator')) {
      this.props.closeMenu();
    }
  }

  handleKeyDown = (e) => {
    if(!this.props.closeOnInsideClick) {
      return;
    }

    const key = e.which || e.keyCode;
    if(key !== TAB) {
      return;
    }

    const items = ReactDOM.findDOMNode(this.refs.menuItems).querySelectorAll('.dd-menu-item');
    const id = e.shiftKey ? 0 : items.length - 1;

    if(e.target === items[id]) {
      this.props.closeMenu();
    }
  }

  render() {
    const { isOpen, menuAlign, align, inverse, className, toggleComponent, items } = this.props;

    const menuClassName = classnames({
      'dd-menu': true,
      [`dd-menu-${menuAlign || align}`]: true,
      'dd-menu-inverse': inverse,
      className,
    });

    const { textAlign, upwards, animAlign, animate, enterTimeout, leaveTimeout } = this.props;
    const listClassName= classnames(`dd-menu-items-${textAlign || align}`, { 'dd-items-upwards': upwards });

    const transitionProps = {
      ref: 'menuItems',
      transitionName: `grow-from-${upwards ? 'up-' : ''}${animAlign || align}`,
      onKeyDown: this.handleKeyDown,
      transitionEnter: animate,
      transitionLeave: animate,
      transitionEnterTimeout: enterTimeout,
      transitionLeaveTimeout: leaveTimeout,
    };

    return (
      <div className={menuClassName}>
        {toggleComponent}
        <CSSTransitionGroup {...transitionProps}>
          {isOpen &&
            <ul key="dropdown-items" className={listClassName}>
              {items.map((itemProps, i) => {
                const { onClick, ...props } = itemProps;
                let handleClick = onClick;
                if(this.props.closeOnInsideClick) {
                  handleClick = (e) => {
                    this.props.closeMenu();
                    onClick(e);
                  };
                }
                return <DropdownMenuItem key={i} {...props} onClick={handleClick} leaveTimeout={leaveTimeout} />;
              })}
            </ul>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}
