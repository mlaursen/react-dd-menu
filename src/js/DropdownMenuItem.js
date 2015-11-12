import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import NestedDropdownMenu from './NestedDropdownMenu';

export default class DropdownMenuItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    children: PropTypes.node,
    enterTimeout: PropTypes.number.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    unrenders: PropTypes.bool,
    className: PropTypes.string,
    isSeparator: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      children: PropTypes.node,
      onClick: PropTypes.func,
      unrenders: PropTypes.bool,
      className: PropTypes.string,
      isSeparator: PropTypes.bool,
    })),
  }

  static defaultProps = {
    unrender: false,
    isSeparator: false,
  }

  handleClick = (e) => {
    const { onClick, leaveTimeout, unrenders } = this.props;
    if(unrenders) {
      setTimeout(() => {
        onClick(e);
      }, leaveTimeout);
    } else {
      onClick(e);
    }
  }

  render() {
    const { children, className, isSeparator, items, ...props } = this.props;

    if(isSeparator) {
      return <li role="separator"><span className="dd-menu-item-separator" /></li>;
    } else if(items) {
      return <NestedDropdownMenu {...props} items={items} children={children} className={className} />;
    } else {
      return (
        <li>
          <button {...props} className={classnames('dd-menu-item', className)} onClick={this.handleClick}>{children}</button>
        </li>
      );
    }
  }
}
