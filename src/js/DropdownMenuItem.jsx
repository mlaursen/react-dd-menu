import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class DropdownMenuItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    unrenders: PropTypes.bool,
    className: PropTypes.string,
  }

  handleClick = (e) => {
    const { onClick, leaveTimeout, unrenders } = this.props;
    if(unrenders) {
      setTimeout(onClick.bind(this, e), leaveTimeout);
    } else {
      onClick(e);
    }
  }

  render() {
    const { className, children, ...props } = this.props;
    return (
      <li className="dd-menu-list-item">
        <button {...props} className={classnames('dd-menu-item', className)} onClick={this.handleClick}>{children}</button>
      </li>
    );
  }
}
