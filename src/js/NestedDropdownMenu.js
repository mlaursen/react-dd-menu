import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import DropdownMenuItems from './DropdownMenuItems';

export default class NestedDropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.closeTimeout = null;
    this.state = {
      isHoverOpen: false,
      isClickOpen: false,
    };
  }

  static propTypes = {
    enterTimeout: PropTypes.number.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
    closeOnInsideClick: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    nested: PropTypes.string,
    animate: PropTypes.bool,
    direction: PropTypes.string,
    upwards: PropTypes.bool,
    openOnMouseOver: PropTypes.bool,
    delay: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      children: PropTypes.node,
      onClick: PropTypes.func,
      unrenders: PropTypes.bool,
      className: PropTypes.string,
      isSeparator: PropTypes.bool,
    })),
  }

  static defaultProps = {
    nested: 'reverse',
    direction: 'right',
    upwards: false,
    delay: 500,
    openOnMouseOver: true,
  }

  componentWillUnmount() {
    this.closeTimeout && clearTimeout(this.closeTimeout);
  }

  closeMenu = () => {
    this.setState({ isClickOpen: false });
  }

  handleClick = (e) => {
    const { onClick } = this.props;

    if(onClick) {
      onClick(e);
    }

    this.setState({ isClickOpen: !this.state.isClickOpen });
  }

  handleMouseOver = () => {
    if(this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    this.setState({ isHoverOpen: true });
  }

  handleMouseLeave = () => {
    this.closeTimeout = setTimeout(() => {
      this.setState({ isHoverOpen: false });
    }, this.props.delay);
  }

  render() {
    const { nested, animate, direction, upwards, enterTimeout, leaveTimeout, openOnMouseOver, children, items, closeOnInsideClick, closeMenu } = this.props;
    let itemProps = {
      className: classnames('nested-dd-menu', `nested-${nested}`),
    };

    if(openOnMouseOver) {
      itemProps.onMouseOver = this.handleMouseOver;
      itemProps.onMouseLeave = this.handleMouseLeave;
    }

    const transitionProps = {
      className: classnames('dd-item-ignore', { 'dd-items-upwards': upwards }),
      transitionEnter: animate,
      transitionLeave: animate,
      transitionName: `grow-from-${upwards ? 'up-' : ''}${direction}`,
      transitionEnterTimeout: enterTimeout,
      transitionLeaveTimeout: leaveTimeout,
    };

    const isOpen = this.state.isHoverOpen || this.state.isClickOpen;
    const menuItemProps = {
      key: 'dropdownItems',
      className: 'dd-menu-items',
      items: items,
      enterTimeout: enterTimeout,
      leaveTimeout: leaveTimeout,
      closeOnInsideClick: closeOnInsideClick,
      closeMenu: closeMenu,
    };
    return (
      <li {...itemProps}>
        <button type="button" className="dd-menu-item" onClick={this.handleClick}>{children}</button>
        <CSSTransitionGroup {...transitionProps}>
          {isOpen && <DropdownMenuItems {...menuItemProps} />}
        </CSSTransitionGroup>
      </li>
    );
  }
}
