'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NestedDropdownMenu = function (_PureComponent) {
  _inherits(NestedDropdownMenu, _PureComponent);

  function NestedDropdownMenu(props) {
    _classCallCheck(this, NestedDropdownMenu);

    var _this = _possibleConstructorReturn(this, (NestedDropdownMenu.__proto__ || Object.getPrototypeOf(NestedDropdownMenu)).call(this, props));

    _this.handleToggleComponentClick = function (e) {
      e.stopPropagation();
      _this.setState({ isClickOpen: !_this.state.isClickOpen });
    };

    _this.handleMouseOver = function () {
      if (_this.closeCallback) {
        clearTimeout(_this.closeCallback);
        _this.closeCallback = null;
      }
      _this.setState({ isHoverOpen: true });
    };

    _this.handleMouseLeave = function () {
      _this.closeCallback = setTimeout(function () {
        _this.setState({ isHoverOpen: false });
      }, _this.props.delay);
    };

    _this.toggleComponent = null;
    _this.closeCallback = null;
    _this.state = {
      isHoverOpen: false,
      isClickOpen: false
    };
    return _this;
  }

  _createClass(NestedDropdownMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.toggleComponent = _reactDom2.default.findDOMNode(this).querySelector('*');
      this.toggleComponent.addEventListener('click', this.handleToggleComponentClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.closeCallback && clearTimeout(this.closeCallback);
      this.toggleComponent.removeEventListener('click', this.handleToggleComponentClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          toggle = _props.toggle,
          children = _props.children,
          nested = _props.nested,
          animate = _props.animate,
          direction = _props.direction,
          upwards = _props.upwards,
          enterTimeout = _props.enterTimeout,
          leaveTimeout = _props.leaveTimeout;

      var isOpen = this.state.isHoverOpen || this.state.isClickOpen;

      var itemProps = {
        className: (0, _classnames2.default)('nested-dd-menu', 'nested-' + nested)
      };
      if (this.props.openOnMouseover) {
        itemProps.onMouseOver = this.handleMouseOver;
        itemProps.onMouseLeave = this.handleMouseLeave;
      }

      var prefix = upwards ? 'up-' : '';
      var transitionProps = {
        className: 'dd-item-ignore',
        transitionEnter: animate,
        transitionLeave: animate,
        transitionName: 'grow-from-' + prefix + direction,
        transitionEnterTimeout: enterTimeout,
        transitionLeaveTimeout: leaveTimeout
      };

      return _react2.default.createElement(
        'li',
        itemProps,
        toggle,
        _react2.default.createElement(
          _CSSTransitionGroup2.default,
          transitionProps,
          isOpen ? _react2.default.createElement(
            'ul',
            { key: 'items' },
            children
          ) : null
        )
      );
    }
  }]);

  return NestedDropdownMenu;
}(_react.PureComponent);

NestedDropdownMenu.propTypes = {
  toggle: _propTypes2.default.node.isRequired,
  children: _propTypes2.default.node,
  nested: _propTypes2.default.oneOf(['inherit', 'reverse', 'left', 'right']),
  animate: _propTypes2.default.bool,
  direction: _propTypes2.default.oneOf(['left', 'right']),
  upwards: _propTypes2.default.bool,
  delay: _propTypes2.default.number,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number,
  openOnMouseover: _propTypes2.default.bool
};
NestedDropdownMenu.defaultProps = {
  nested: 'reverse',
  animate: false,
  direction: 'right',
  upwards: false,
  delay: 500,
  enterTimeout: 150,
  leaveTimeout: 150,
  openOnMouseover: true
};
exports.default = NestedDropdownMenu;
module.exports = exports['default'];