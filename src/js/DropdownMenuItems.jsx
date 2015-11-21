import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import DropdownMenuItem from './DropdownMenuItem.jsx';

const TAB = 9;

export default class DropdownMenuItems extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    closeOnInsideClick: PropTypes.bool.isRequired,
    enterTimeout: PropTypes.number.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
    animate: PropTypes.bool.isRequired,
    upwards: PropTypes.bool.isRequired,
    transitionName: PropTypes.string,
    align: PropTypes.string.isRequired,
    animAlign: PropTypes.string,
    menuAlign: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      children: PropTypes.node,
      onClick: PropTypes.func,
      unrenders: PropTypes.bool,
      isSeparator: PropTypes.bool,
    })),
    children: PropTypes.arrayOf(PropTypes.node),
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

    // close if first or last item
    if(e.target === items[id]) {
      this.props.closeMenu();
    }
  }

  renderMenuItems = () => {
    const { items, children, ...props } = this.props;
    return items.map((itemProps, i) => {
      if(itemProps.isSeparator) {
        return <li key={`separator-${i}`} role="separator" className="dd-item-separator" />;
      } else {
        let onClick = itemProps.onClick;
        if(props.closeOnInsideClick && !itemProps.items) {
          onClick = (e) => {
            console.log('ITEM', props.closeMenu);
            props.closeMenu();
            itemProps.onClick && itemProps.onClick(e);
          };
        }
        return <DropdownMenuItem key={`menu-item-${i}`} {...itemProps} {...props} onClick={onClick} />;
      }
    }).concat(children);
  }

  render() {
    const { isOpen, transitionName, upwards, align, animAlign, menuAlign, animate, enterTimeout, leaveTimeout } = this.props;
    const transitionProps = {
      ref: 'menuItems',
      transitionName: transitionName || `grow-from-${upwards ? 'up-' : ''}${animAlign || align}`,
      className: classnames('dd-items-container', `dd-items-${menuAlign || align}`, { 'dd-items-upwards': upwards }),
      onKeyDown: this.handleKeyDown,
      transitionEnter: animate,
      transitionLeave: animate,
      transitionEnterTimeout: enterTimeout,
      transitionLeaveTimeout: leaveTimeout,
    };

    return (
      <CSSTransitionGroup {...transitionProps}>
        {isOpen && <ul key="dd-items" className="dd-items">{this.renderMenuItems()}</ul>}
      </CSSTransitionGroup>
    );
  }
}
