import React, { Component, PropTypes } from 'react/addons';
import classnames from 'classnames';

const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const PureRenderMixin    = React.addons.PureRenderMixin;

const TAB = 9;
const SPACEBAR = 32;
const ALIGNMENTS = ['center', 'right', 'left'];
const MENU_SIZES = ['sm', 'md', 'lg', 'xl'];

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    toggle: PropTypes.node.isRequired,
    inverse: PropTypes.bool,
    align: PropTypes.oneOf(ALIGNMENTS),
    animAlign: PropTypes.oneOf(ALIGNMENTS),
    textAlign: PropTypes.oneOf(ALIGNMENTS),
    menuAlign: PropTypes.oneOf(ALIGNMENTS),
    className: PropTypes.string,
    size: PropTypes.oneOf(MENU_SIZES),
    upwards: PropTypes.bool,
    animate: PropTypes.bool,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number,
  }

  static defaultProps = {
    inverse: false,
    align: 'center',
    animAlign: null,
    textAlign: null,
    menuAlign: null,
    className: null,
    size: null,
    upwards: false,
    animate: true,
    enterTimeout: 150,
    leaveTimeout: 150,
  }

  static MENU_SIZES = MENU_SIZES
  static ALIGNMENTS = ALIGNMENTS

  componentDidUpdate(prevProps, prevState) {
    if(this.props.isOpen === prevProps.isOpen) {
      return;
    }

    const menuItems = React.findDOMNode(this).querySelector('.dd-menu > .dd-menu-items');
    if(this.props.isOpen && !prevProps.isOpen) {
      this._lastWindowClickEvent = this.handleClickOutside;

      document.addEventListener('click', this._lastWindowClickEvent);
      menuItems.addEventListener('click', this.props.close);
      menuItems.addEventListener('onkeydown', this.close);
    } else if(!this.props.isOpen && prevProps.isOpen) {
      document.removeEventListener('click', this._lastWindowClickEvent);
      menuItems.removeEventListener('click', this.props.close);
      menuItems.removeEventListener('onkeydown', this.close);

      this._lastWindowClickEvent = null;
    }
  }

  componentWillUnmount() {
    if(this._lastWindowClickEvent) {
      document.removeEventListener('click', this._lastWindowClickEvent);
    }
  }

  _lastWindowClickEvent = null

  close = (e) => {
    const key = e.which || e.keyCode;
    if(key === SPACEBAR) {
      this.props.close();
      e.preventDefault();
    }
  }
  
  handleClickOutside = (e) => {
    const node = React.findDOMNode(this);
    let target = e.target;

    while(target.parentNode) {
      if(target === node) {
        return;
      }

      target = target.parentNode;
    }

    this.props.close(e);
  }

  handleKeyDown = (e) => {
    const key = e.which || e.keyCode;
    if(key !== TAB) {
      return;
    }

    const items = React.findDOMNode(this).querySelectorAll('button,a');
    const id = e.shiftKey ? 1 : items.length - 1;
    
    if(e.target == items[id]) {
      this.props.close(e);
    }
  }


  render() {
    const { menuAlign, align, inverse, size, className } = this.props;

    const menuClassName = classnames(
      'dd-menu',
      `dd-menu-${menuAlign || align}`,
      { 'dd-menu-inverse': inverse },
      className,
      size ? ('dd-menu-' + size) : null
    );

    const { textAlign, upwards, animAlign, animate, enterTimeout, leaveTimeout } = this.props;

    const listClassName = 'dd-items-' + (textAlign || align);
    const transitionProps = {
      transitionName: 'grow-from-' + (upwards ? 'up-' : '') + (animAlign || align),
      component: 'div',
      className: classnames('dd-menu-items', { 'dd-items-upwards': upwards }),
      onKeyDown: this.handleKeyDown,
      transitionEnter: animate,
      transitionLeave: animate,
      transitionEnterTimeout: enterTimeout,
      transitionLeaveTimeout: leaveTimeout,
    };

    return (
      <div className={menuClassName}>
        {this.props.toggle}
        <CSSTransitionGroup {...transitionProps}>
          {this.props.isOpen &&
          <ul key="items" className={listClassName}>{this.props.children}</ul>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

module.exports = DropdownMenu;


class NestedDropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  static propTypes = {
    toggle: PropTypes.node.isRequired,
    nested: PropTypes.oneOf(['inherit', 'reverse', 'left', 'right']),
    animate: PropTypes.bool,
    direction: PropTypes.oneOf(['left', 'right']),
    upwards: PropTypes.bool,
    delay: PropTypes.number,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number,
  }

  static defaultProps = {
    nested: 'reverse',
    animate: false,
    direction: 'right',
    upwards: false,
    delay: 500,
    enterTimeout: 150,
    leaveTimeout: 150,
  }

  _closeCallback = null

  open = () => {
    if(this._closeCallback) {
      clearTimeout(this._closeCallback);
      this._closeCallback = null;
    }
    this.setState({ isOpen: true });
  }

  close = () => {
    this._closeCallback = setTimeout(_ => {
      this.setState({ isOpen: false });
    }.bind(this), this.props.delay);
  }

  componentWillUnmount() {
    this._closeCallback && clearTimeout(this._closeCallback);
  }

  render() {
    const { toggle, children, nested, animate, direction, upwards, enterTimeout, leaveTimeout } = this.props;
    const { isOpen } = this.state;

    const itemProps = {
      className: classnames('nested-dd-menu', `nested-${nested}`),
      onMouseOver: this.open,
      onMouseLeave: this.close,
      onFocus: this.open,
      onBlur: this.close,
    };

    const prefix = upwards ? 'up-' : '';
    const transitionProps = {
      className: 'dd-item-ignore',
      transitionEnter: animate,
      transitionLeave: animate,
      transitionName: `grow-from-${prefix}${direction}`,
      transitionEnterTimeout: enterTimeout,
      transitionLeaveTimeout: leaveTimeout,
    };

    return (
      <li {...itemProps}>
        {toggle}
        <CSSTransitionGroup {...transitionProps}>
          {isOpen ? <ul key="items">{children}</ul> : null}
        </CSSTransitionGroup>
      </li>
    );
  }
}

module.exports.NestedDropdownMenu = NestedDropdownMenu;
