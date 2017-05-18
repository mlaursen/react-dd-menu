import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classnames from 'classnames';

export default class NestedDropdownMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleComponent = null;
    this.closeCallback = null;
    this.state = {
      isHoverOpen: false,
      isClickOpen: false,
    };
  }

  static propTypes = {
    toggle: PropTypes.node.isRequired,
    children: PropTypes.node,
    nested: PropTypes.oneOf(['inherit', 'reverse', 'left', 'right']),
    animate: PropTypes.bool,
    direction: PropTypes.oneOf(['left', 'right']),
    upwards: PropTypes.bool,
    delay: PropTypes.number,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number,
    openOnMouseover: PropTypes.bool,
  };

  static defaultProps = {
    nested: 'reverse',
    animate: false,
    direction: 'right',
    upwards: false,
    delay: 500,
    enterTimeout: 150,
    leaveTimeout: 150,
    openOnMouseover: true,
  };

  componentDidMount() {
    this.toggleComponent = ReactDOM.findDOMNode(this).querySelector('*');
    this.toggleComponent.addEventListener('click', this.handleToggleComponentClick);
  }

  componentWillUnmount() {
    this.closeCallback && clearTimeout(this.closeCallback);
    this.toggleComponent.removeEventListener('click', this.handleToggleComponentClick);
  }

  handleToggleComponentClick = (e) => {
    e.stopPropagation();
    this.setState({ isClickOpen: !this.state.isClickOpen });
  };

  handleMouseOver = () => {
    if(this.closeCallback) {
      clearTimeout(this.closeCallback);
      this.closeCallback = null;
    }
    this.setState({ isHoverOpen: true });
  };

  handleMouseLeave = () => {
    this.closeCallback = setTimeout(() => {
      this.setState({ isHoverOpen: false });
    }, this.props.delay);
  };

  render() {
    const { toggle, children, nested, animate, direction, upwards, enterTimeout, leaveTimeout } = this.props;
    const isOpen = this.state.isHoverOpen || this.state.isClickOpen;

    let itemProps = {
      className: classnames('nested-dd-menu', `nested-${nested}`),
    };
    if(this.props.openOnMouseover) {
      itemProps.onMouseOver = this.handleMouseOver;
      itemProps.onMouseLeave = this.handleMouseLeave;
    }

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
