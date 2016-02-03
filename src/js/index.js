import DropdownMenu from './DropdownMenu';

export default DropdownMenu;

export { DropdownMenu };

export DropdownMenuItem from './DropdownMenuItem';
//import React, { Component, PropTypes } from 'react';
//import ReactDOM from 'react-dom';
//import CSSTransitionGroup from 'react-addons-css-transition-group';
//import PureRenderMixin from 'react-addons-pure-render-mixin';
//import classnames from 'classnames';
//
//
//const TAB = 9;
//const SPACEBAR = 32;
//const ALIGNMENTS = ['center', 'right', 'left'];
//const MENU_SIZES = ['sm', 'md', 'lg', 'xl'];
//
//class DropdownMenu extends Component {
//  constructor(props) {
//    super(props);
//
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
//    this.lastWindowClickEvent = null;
//  }
//
//  static propTypes = {
//    isOpen: PropTypes.bool.isRequired,
//    close: PropTypes.func.isRequired,
//    toggle: PropTypes.node.isRequired,
//    children: PropTypes.node,
//    inverse: PropTypes.bool,
//    align: PropTypes.oneOf(ALIGNMENTS),
//    animAlign: PropTypes.oneOf(ALIGNMENTS),
//    textAlign: PropTypes.oneOf(ALIGNMENTS),
//    menuAlign: PropTypes.oneOf(ALIGNMENTS),
//    className: PropTypes.string,
//    size: PropTypes.oneOf(MENU_SIZES),
//    upwards: PropTypes.bool,
//    animate: PropTypes.bool,
//    enterTimeout: PropTypes.number,
//    leaveTimeout: PropTypes.number,
//    closeOnInsideClick: PropTypes.bool,
//    closeOnOutsideClick: PropTypes.bool,
//  }
//
//  static defaultProps = {
//    inverse: false,
//    align: 'center',
//    animAlign: null,
//    textAlign: null,
//    menuAlign: null,
//    className: null,
//    size: null,
//    upwards: false,
//    animate: true,
//    enterTimeout: 150,
//    leaveTimeout: 150,
//    closeOnInsideClick: true,
//    closeOnOutsideClick: true,
//  }
//
//  static MENU_SIZES = MENU_SIZES
//  static ALIGNMENTS = ALIGNMENTS
//
//  componentDidUpdate(prevProps) {
//    if(this.props.isOpen === prevProps.isOpen) {
//      return;
//    }
//
//    const menuItems = ReactDOM.findDOMNode(this).querySelector('.dd-menu > .dd-menu-items');
//    if(this.props.isOpen && !prevProps.isOpen) {
//      this.lastWindowClickEvent = this.handleClickOutside;
//      document.addEventListener('click', this.lastWindowClickEvent);
//      if(this.props.closeOnInsideClick) {
//        menuItems.addEventListener('click', this.props.close);
//      }
//      menuItems.addEventListener('onkeydown', this.close);
//    } else if(!this.props.isOpen && prevProps.isOpen) {
//      document.removeEventListener('click', this.lastWindowClickEvent);
//      if(prevProps.closeOnInsideClick) {
//        menuItems.removeEventListener('click', this.props.close);
//      }
//      menuItems.removeEventListener('onkeydown', this.close);
//
//      this.lastWindowClickEvent = null;
//    }
//  }
//
//  componentWillUnmount() {
//    if(this.lastWindowClickEvent) {
//      document.removeEventListener('click', this.lastWindowClickEvent);
//    }
//  }
//
//  close = (e) => {
//    const key = e.which || e.keyCode;
//    if(key === SPACEBAR) {
//      this.props.close();
//      e.preventDefault();
//    }
//  }
//
//  handleClickOutside = (e) => {
//    if(!this.props.closeOnOutsideClick) {
//      return;
//    }
//
//    const node = ReactDOM.findDOMNode(this);
//    let target = e.target;
//
//    while(target.parentNode) {
//      if(target === node) {
//        return;
//      }
//
//      target = target.parentNode;
//    }
//
//    this.props.close(e);
//  }
//
//  handleKeyDown = (e) => {
//    const key = e.which || e.keyCode;
//    if(key !== TAB) {
//      return;
//    }
//
//    const items = ReactDOM.findDOMNode(this).querySelectorAll('button,a');
//    const id = e.shiftKey ? 1 : items.length - 1;
//
//    if(e.target === items[id]) {
//      this.props.close(e);
//    }
//  }
//
//
//  render() {
//    const { menuAlign, align, inverse, size, className } = this.props;
//
//    const menuClassName = classnames(
//      'dd-menu',
//      `dd-menu-${menuAlign || align}`,
//      { 'dd-menu-inverse': inverse },
//      className,
//      size ? ('dd-menu-' + size) : null
//    );
//
//    const { textAlign, upwards, animAlign, animate, enterTimeout, leaveTimeout } = this.props;
//
//    const listClassName = 'dd-items-' + (textAlign || align);
//    const transitionProps = {
//      transitionName: 'grow-from-' + (upwards ? 'up-' : '') + (animAlign || align),
//      component: 'div',
//      className: classnames('dd-menu-items', { 'dd-items-upwards': upwards }),
//      onKeyDown: this.handleKeyDown,
//      transitionEnter: animate,
//      transitionLeave: animate,
//      transitionEnterTimeout: enterTimeout,
//      transitionLeaveTimeout: leaveTimeout,
//    };
//
//    return (
//      <div className={menuClassName}>
//        {this.props.toggle}
//        <CSSTransitionGroup {...transitionProps}>
//          {this.props.isOpen &&
//          <ul key="items" className={listClassName}>{this.props.children}</ul>
//          }
//        </CSSTransitionGroup>
//      </div>
//    );
//  }
//}
//
//module.exports = DropdownMenu; // eslint-disable-line no-undef
//
//
//class NestedDropdownMenu extends Component {
//  constructor(props) {
//    super(props);
//
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
//    this.toggleComponent = null;
//    this.closeCallback = null;
//    this.state = {
//      isHoverOpen: false,
//      isClickOpen: false,
//    };
//  }
//
//  static propTypes = {
//    toggle: PropTypes.node.isRequired,
//    children: PropTypes.node,
//    nested: PropTypes.oneOf(['inherit', 'reverse', 'left', 'right']),
//    animate: PropTypes.bool,
//    direction: PropTypes.oneOf(['left', 'right']),
//    upwards: PropTypes.bool,
//    delay: PropTypes.number,
//    enterTimeout: PropTypes.number,
//    leaveTimeout: PropTypes.number,
//    openOnMouseover: PropTypes.bool,
//  }
//
//  static defaultProps = {
//    nested: 'reverse',
//    animate: false,
//    direction: 'right',
//    upwards: false,
//    delay: 500,
//    enterTimeout: 150,
//    leaveTimeout: 150,
//    openOnMouseover: true,
//  }
//
//  componentDidMount() {
//    this.toggleComponent = ReactDOM.findDOMNode(this).querySelector('*');
//    this.toggleComponent.addEventListener('click', this.handleToggleComponentClick);
//  }
//
//  componentWillUnmount() {
//    this.closeCallback && clearTimeout(this.closeCallback);
//    this.toggleComponent.removeEventListener('click', this.handleToggleComponentClick);
//  }
//
//  handleToggleComponentClick = (e) => {
//    e.stopPropagation();
//    this.setState({ isClickOpen: !this.state.isClickOpen });
//  }
//
//  handleMouseOver = () => {
//    if(this.closeCallback) {
//      clearTimeout(this.closeCallback);
//      this.closeCallback = null;
//    }
//    this.setState({ isHoverOpen: true });
//  }
//
//  handleMouseLeave = () => {
//    this.closeCallback = setTimeout(() => {
//      this.setState({ isHoverOpen: false });
//    }, this.props.delay);
//  }
//
//  render() {
//    const { toggle, children, nested, animate, direction, upwards, enterTimeout, leaveTimeout } = this.props;
//    const isOpen = this.state.isHoverOpen || this.state.isClickOpen;
//
//    let itemProps = {
//      className: classnames('nested-dd-menu', `nested-${nested}`),
//    };
//    if(this.props.openOnMouseover) {
//      itemProps.onMouseOver = this.handleMouseOver;
//      itemProps.onMouseLeave = this.handleMouseLeave;
//    }
//
//    const prefix = upwards ? 'up-' : '';
//    const transitionProps = {
//      className: 'dd-item-ignore',
//      transitionEnter: animate,
//      transitionLeave: animate,
//      transitionName: `grow-from-${prefix}${direction}`,
//      transitionEnterTimeout: enterTimeout,
//      transitionLeaveTimeout: leaveTimeout,
//    };
//
//    return (
//      <li {...itemProps}>
//        {toggle}
//        <CSSTransitionGroup {...transitionProps}>
//          {isOpen ? <ul key="items">{children}</ul> : null}
//        </CSSTransitionGroup>
//      </li>
//    );
//  }
//}
//
//module.exports.NestedDropdownMenu = NestedDropdownMenu; // eslint-disable-line no-undef
