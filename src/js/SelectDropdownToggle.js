import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class SelectDropdownToggle extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  render() {
    return (
      <button type="button" className={classnames('select-dropdown-toggle', this.props.className)} onClick={this.props.onClick}>
        {this.props.children}
        <span className="fa fa-chevron-down" />
      </button>
    );
  }
}
