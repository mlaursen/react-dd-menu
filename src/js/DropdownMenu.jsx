import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import DropdownMenuItems from './DropdownMenuItems.jsx';

const CLICK = 'click';

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    toggleComponent: PropTypes.node.isRequired,
    className: PropTypes.string,
    align: PropTypes.string,
    animAlign: PropTypes.string,
    textAlign: PropTypes.string,
    menuAlign: PropTypes.string,
    closeOnInsideClick: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    inverse: PropTypes.bool,
    animate: PropTypes.bool,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number,
    transitionName: PropTypes.string,
  }

  static defaultProps = {
    align: 'right',
    inverse: false,
    upwards: false,
    animate: true,
    enterTimeout: 150,
    leaveTimeout: 150,
    closeOnInsideClick: true,
    closeOnOutsideClick: true,
  }

  componentDidUpdate(prevProps) {
    const { isOpen, closeOnOutsideClick } = this.props;
    if(!closeOnOutsideClick || isOpen === prevProps.isOpen) {
      return;
    }

    if(isOpen) {
      this.lastWindowClickEvent = this.handleClickOutside;
      document.addEventListener(CLICK, this.lastWindowClickEvent);
    } else {
      document.removeEventListener(CLICK, this.lastWindowClickEvent);
      this.lastWindowClickEvent = null;
    }
  }

  componentWillUnmount() {
    this.lastWindowClickEvent && document.removeEventListener(CLICK, this.lastWindowClickEvent);
  }

  handleClickOutside = (e) => {
    const menu = ReactDOM.findDOMNode(this.refs.menu);
    let target = e.target;

    while(target.parentNode) {
      if(target === menu) {
        return;
      }

      target = target.parentNode;
    }

    this.props.closeMenu();
  }

  render() {
    const { toggleComponent, className, inverse, ...props } = this.props;

    const menuClassName = classnames('dd-menu', className, {
      'dd-menu-inverse': inverse,
    });
    return (
      <div className={menuClassName} ref="menu">
        {toggleComponent}
        <DropdownMenuItems {...props} inverse={inverse} />
      </div>
    );
  }
}
