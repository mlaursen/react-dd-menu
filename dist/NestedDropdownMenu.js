'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownMenuItems = require('./DropdownMenuItems');

var _DropdownMenuItems2 = _interopRequireDefault(_DropdownMenuItems);

var NestedDropdownMenu = (function (_Component) {
  _inherits(NestedDropdownMenu, _Component);

  function NestedDropdownMenu(props) {
    var _this = this;

    _classCallCheck(this, NestedDropdownMenu);

    _get(Object.getPrototypeOf(NestedDropdownMenu.prototype), 'constructor', this).call(this, props);

    this.closeMenu = function () {
      _this.setState({ isClickOpen: false });
    };

    this.handleClick = function (e) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }

      _this.setState({ isClickOpen: !_this.state.isClickOpen });
    };

    this.handleMouseOver = function () {
      if (_this.closeTimeout) {
        clearTimeout(_this.closeTimeout);
        _this.closeTimeout = null;
      }

      _this.setState({ isHoverOpen: true });
    };

    this.handleMouseLeave = function () {
      _this.closeTimeout = setTimeout(function () {
        _this.setState({ isHoverOpen: false });
      }, _this.props.delay);
    };

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
    this.closeTimeout = null;
    this.state = {
      isHoverOpen: false,
      isClickOpen: false
    };
  }

  _createClass(NestedDropdownMenu, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.closeTimeout && clearTimeout(this.closeTimeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var nested = _props.nested;
      var animate = _props.animate;
      var direction = _props.direction;
      var upwards = _props.upwards;
      var enterTimeout = _props.enterTimeout;
      var leaveTimeout = _props.leaveTimeout;
      var openOnMouseOver = _props.openOnMouseOver;
      var children = _props.children;
      var items = _props.items;
      var closeOnInsideClick = _props.closeOnInsideClick;
      var closeMenu = _props.closeMenu;

      var itemProps = {
        className: (0, _classnames2['default'])('nested-dd-menu', 'nested-' + nested)
      };

      if (openOnMouseOver) {
        itemProps.onMouseOver = this.handleMouseOver;
        itemProps.onMouseLeave = this.handleMouseLeave;
      }

      var transitionProps = {
        className: (0, _classnames2['default'])('dd-item-ignore', { 'dd-items-upwards': upwards }),
        transitionEnter: animate,
        transitionLeave: animate,
        transitionName: 'grow-from-' + (upwards ? 'up-' : '') + direction,
        transitionEnterTimeout: enterTimeout,
        transitionLeaveTimeout: leaveTimeout
      };

      var isOpen = this.state.isHoverOpen || this.state.isClickOpen;
      var menuItemProps = {
        key: 'dropdownItems',
        className: 'dd-menu-items',
        items: items,
        enterTimeout: enterTimeout,
        leaveTimeout: leaveTimeout,
        closeOnInsideClick: closeOnInsideClick,
        closeMenu: closeMenu
      };
      return _react2['default'].createElement(
        'li',
        itemProps,
        _react2['default'].createElement(
          'button',
          { type: 'button', className: 'dd-menu-item', onClick: this.handleClick },
          children
        ),
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          transitionProps,
          isOpen && _react2['default'].createElement(_DropdownMenuItems2['default'], menuItemProps)
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      enterTimeout: _react.PropTypes.number.isRequired,
      leaveTimeout: _react.PropTypes.number.isRequired,
      closeOnInsideClick: _react.PropTypes.bool.isRequired,
      closeMenu: _react.PropTypes.func.isRequired,
      nested: _react.PropTypes.string,
      animate: _react.PropTypes.bool,
      direction: _react.PropTypes.string,
      upwards: _react.PropTypes.bool,
      openOnMouseOver: _react.PropTypes.bool,
      delay: _react.PropTypes.number,
      onClick: _react.PropTypes.func,
      children: _react.PropTypes.node,
      items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        children: _react.PropTypes.node,
        onClick: _react.PropTypes.func,
        unrenders: _react.PropTypes.bool,
        className: _react.PropTypes.string,
        isSeparator: _react.PropTypes.bool
      }))
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      nested: 'reverse',
      direction: 'right',
      upwards: false,
      delay: 500,
      openOnMouseOver: false
    },
    enumerable: true
  }]);

  return NestedDropdownMenu;
})(_react.Component);

exports['default'] = NestedDropdownMenu;
module.exports = exports['default'];