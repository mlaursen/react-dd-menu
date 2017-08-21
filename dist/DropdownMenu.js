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

var TAB = 9;
var SPACEBAR = 32;
var ALIGNMENTS = ['center', 'right', 'left'];
var MENU_SIZES = ['sm', 'md', 'lg', 'xl'];

var DropdownMenu = function (_PureComponent) {
  _inherits(DropdownMenu, _PureComponent);

  function DropdownMenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DropdownMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.close = function (e) {
      // ensure eventual event handlers registered by consumers via React props are evaluated first
      setTimeout(function () {
        return _this.props.close(e);
      });
    }, _this.handleMenuItemKeyDown = function (e) {
      var key = e.which || e.keyCode;
      if (key === SPACEBAR) {
        _this.close(e);
        e.preventDefault();
      }
    }, _this.handleClickOutside = function (e) {
      if (!_this.props.closeOnOutsideClick) {
        return;
      }

      var node = _reactDom2.default.findDOMNode(_this);
      var target = e.target;

      while (target.parentNode) {
        if (target === node) {
          return;
        }

        target = target.parentNode;
      }

      _this.close(e);
    }, _this.handleKeyDown = function (e) {
      var key = e.which || e.keyCode;
      if (key !== TAB) {
        return;
      }

      var items = _reactDom2.default.findDOMNode(_this).querySelectorAll('button,a');
      var id = e.shiftKey ? 1 : items.length - 1;

      if (e.target === items[id]) {
        _this.close(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen === prevProps.isOpen) {
        return;
      }

      var menuItems = _reactDom2.default.findDOMNode(this).querySelector('.dd-menu > .dd-menu-items');
      if (this.props.isOpen && !prevProps.isOpen) {
        this.lastWindowClickEvent = this.handleClickOutside;
        document.addEventListener('click', this.lastWindowClickEvent);
        if (this.props.closeOnInsideClick) {
          menuItems.addEventListener('click', this.close);
        }
        menuItems.addEventListener('onkeydown', this.handleMenuItemKeyDown);
      } else if (!this.props.isOpen && prevProps.isOpen) {
        document.removeEventListener('click', this.lastWindowClickEvent);
        if (prevProps.closeOnInsideClick) {
          menuItems.removeEventListener('click', this.close);
        }
        menuItems.removeEventListener('onkeydown', this.handleMenuItemKeyDown);

        this.lastWindowClickEvent = null;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.lastWindowClickEvent) {
        document.removeEventListener('click', this.lastWindowClickEvent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          menuAlign = _props.menuAlign,
          align = _props.align,
          inverse = _props.inverse,
          size = _props.size,
          className = _props.className;


      var menuClassName = (0, _classnames2.default)('dd-menu', 'dd-menu-' + (menuAlign || align), { 'dd-menu-inverse': inverse }, className, size ? 'dd-menu-' + size : null);

      var _props2 = this.props,
          textAlign = _props2.textAlign,
          upwards = _props2.upwards,
          animAlign = _props2.animAlign,
          animate = _props2.animate,
          enterTimeout = _props2.enterTimeout,
          leaveTimeout = _props2.leaveTimeout;


      var listClassName = 'dd-items-' + (textAlign || align);
      var transitionProps = {
        transitionName: 'grow-from-' + (upwards ? 'up-' : '') + (animAlign || align),
        component: 'div',
        className: (0, _classnames2.default)('dd-menu-items', { 'dd-items-upwards': upwards }),
        onKeyDown: this.handleKeyDown,
        transitionEnter: animate,
        transitionLeave: animate,
        transitionEnterTimeout: enterTimeout,
        transitionLeaveTimeout: leaveTimeout
      };

      return _react2.default.createElement(
        'div',
        { className: menuClassName },
        this.props.toggle,
        _react2.default.createElement(
          _CSSTransitionGroup2.default,
          transitionProps,
          this.props.isOpen && _react2.default.createElement(
            'ul',
            { key: 'items', className: listClassName },
            this.props.children
          )
        )
      );
    }
  }]);

  return DropdownMenu;
}(_react.PureComponent);

DropdownMenu.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  close: _propTypes2.default.func.isRequired,
  toggle: _propTypes2.default.node.isRequired,
  children: _propTypes2.default.node,
  inverse: _propTypes2.default.bool,
  align: _propTypes2.default.oneOf(ALIGNMENTS),
  animAlign: _propTypes2.default.oneOf(ALIGNMENTS),
  textAlign: _propTypes2.default.oneOf(ALIGNMENTS),
  menuAlign: _propTypes2.default.oneOf(ALIGNMENTS),
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(MENU_SIZES),
  upwards: _propTypes2.default.bool,
  animate: _propTypes2.default.bool,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number,
  closeOnInsideClick: _propTypes2.default.bool,
  closeOnOutsideClick: _propTypes2.default.bool
};
DropdownMenu.defaultProps = {
  inverse: false,
  align: 'center',
  animAlign: null,
  textAlign: null,
  menuAlign: null,
  className: null,
  size: null,
  upwards: false,
  animate: true,
  enterTimeout: 150,
  leaveTimeout: 150,
  closeOnInsideClick: true,
  closeOnOutsideClick: true
};
DropdownMenu.MENU_SIZES = MENU_SIZES;
DropdownMenu.ALIGNMENTS = ALIGNMENTS;
exports.default = DropdownMenu;
module.exports = exports['default'];