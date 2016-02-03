import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DropdownMenuItem from './DropdownMenuItem';

export default class DropdownMenuItems extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    enterTimeout: PropTypes.number.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
    closeOnInsideClick: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
  }

  getItemProps = (item) => {
    const { onClick, ...props } = item;

    let handleClick = onClick;
    if(this.props.closeOnInsideClick && !item.items) {
      handleClick = (e) => {
        this.props.closeMenu();
        onClick(e);
      };
    }

    return {
      ...props,
      onClick: handleClick,
      enterTimeout: this.props.enterTimeout,
      leaveTimeout: this.props.leaveTimeout,
      closeMenu: this.props.closeMenu,
      closeOnInsideClick: this.props.closeOnInsideClick,
    };
  }

  render() {
    const { className, items } = this.props;
    return (
      <ul className={className}>
        {items.map((item, i) => {
          return <DropdownMenuItem key={i} {...this.getItemProps(item)} />;
        })}
      </ul>
    );
  }
}
