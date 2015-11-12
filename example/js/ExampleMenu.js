import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { FlatButton } from 'react-buttons';

import DropdownMenu from '../../src/js/index';

export default class ExampleMenu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  static propTypes = {
    toggleText: PropTypes.string.isRequired,
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { toggleText, ...props } = this.props;

    const toggleComponent = <FlatButton color="primary" onClick={this.toggleMenu}>{toggleText}</FlatButton>;

    return (
      <DropdownMenu {...props} toggleComponent={toggleComponent} isOpen={this.state.isOpen} closeMenu={this.closeMenu} />
    );
  }
}
