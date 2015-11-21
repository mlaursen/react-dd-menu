import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import DropdownMenuItems from './DropdownMenuItems.jsx';

export default class DropdownMenuItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isNestedMenuOpen: false,
      isHoverOpen: false,
    };
    this.closeTimeout = null;
  }

  static propTypes = {
    align: PropTypes.string.isRequired,
    animAlign: PropTypes.string,
    menuAlign: PropTypes.string,
    enterTimeout: PropTypes.number.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
    animate: PropTypes.bool.isRequired,
    upwards: PropTypes.bool.isRequired,
    closeOnInsideClick: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    closeMenu: PropTypes.func.isRequired,
    openOnMouseOver: PropTypes.bool,
    mouseOverCloseDelay: PropTypes.number,
    nested: PropTypes.string,
    onClick: PropTypes.func,
    unrenders: PropTypes.bool,
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      children: PropTypes.node,
      onClick: PropTypes.func,
      unrenders: PropTypes.bool,
      className: PropTypes.string,
    })),
  }

  static defaultProps = {
    nested: 'reverse',
    openOnMouseOver: true,
    mouseOverCloseDelay: 1000,
  }

  handleClick = (e) => {
    const { onClick, leaveTimeout, unrenders, items } = this.props;
    if(items) {
      this.toggleNestedMenu();
      onClick && onClick(e);
    } else if(!onClick) {
      return;
    } else if(unrenders) {
      setTimeout(onClick.bind(this, e), leaveTimeout);
    } else {
      onClick(e);
    }
  }

  toggleNestedMenu = () => {
    this.setState({ isNestedMenuOpen: !this.state.isNestedMenuOpen });
  }

  handleMouseOver = () => {
    if(this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    this.setState({ isNestedMenuOpen: true });
  }

  handleMouseLeave = () => {
    this.closeTimeout = setTimeout(() => {
      this.setState({ isNestedMenuOpen: false });
    }, this.props.mouseOverCloseDelay);
  }


  renderNestedMenu = () => {
    const { items, align, animAlign, menuAlign, enterTimeout, leaveTimeout, closeMenu, animate, upwards, closeOnInsideClick } = this.props;
    const menuProps = {
      leaveTimeout,
      enterTimeout,
      align,
      animAlign,
      menuAlign,
      animate,
      upwards,
      closeOnInsideClick,
      items,
      closeMenu,
      isOpen: this.state.isNestedMenuOpen,
    };
    return <DropdownMenuItems {...menuProps} />;
  }

  render() {
    const { className, children, items, nested, openOnMouseOver, ...props } = this.props;

    let liProps = {
      className: classnames('dd-menu-list-item', { 'nested-dd-menu': !!items, [`nested-${nested}`]: !!items }),
    };

    if(items && openOnMouseOver) {
      liProps.onMouseOver = this.handleMouseOver;
      liProps.onMouseLeave = this.handleMouseLeave;
    }

    return (
      <li {...liProps}>
        <button {...props} className={classnames('dd-menu-item', className)} onClick={this.handleClick}>{children}</button>
        {items && this.renderNestedMenu()}
      </li>
    );
  }
}
