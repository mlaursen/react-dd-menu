import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DropdownMenu from './DropdownMenu';
import SelectDropdownToggle from './SelectDropdownToggle';

export default class SelectDropdown extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      onClick: PropTypes.func,
      children: PropTypes.node,
      unrenders: PropTypes.bool,
      isSeparator: PropTypes.bool,
    })),
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  handleToggleClick = () => {
    this.props.onClick && this.props.onClick();

    this.setState({ isOpen: !this.state.isOpen });
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  }


  render() {
    const { items, ...toggleProps } = this.props;
    const props = {
      isOpen: this.state.isOpen,
      closeMenu: this.closeMenu,
      items: items,
      align: 'left',
      animAlign: 'top',
      className: 'select-dropdown',
      toggleComponent: <SelectDropdownToggle {...toggleProps} onClick={this.handleToggleClick} />,
    };
    return <DropdownMenu {...props} />;
  }
}
