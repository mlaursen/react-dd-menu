'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _DropdownMenuItems = require('./DropdownMenuItems');

var _DropdownMenuItems2 = _interopRequireDefault(_DropdownMenuItems);

var TAB = 9;

var DropdownMenu = (function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    var _this = this;

    _classCallCheck(this, DropdownMenu);

    _get(Object.getPrototypeOf(DropdownMenu.prototype), 'constructor', this).call(this, props);

    this.handleClickOutside = function (e) {
      var node = _reactDom2['default'].findDOMNode(_this);
      var target = e.target;

      while (target.parentNode) {
        if (target === node) {
          return;
        }

        target = target.parentNode;
      }

      _this.props.closeMenu();
    };

    this.handleKeyDown = function (e) {
      if (!_this.props.closeOnInsideClick) {
        return;
      }

      var key = e.which || e.keyCode;
      if (key !== TAB) {
        return;
      }

      var items = _reactDom2['default'].findDOMNode(_this.refs.menuItems).querySelectorAll('.dd-menu-item');
      var id = e.shiftKey ? 0 : items.length - 1;

      if (e.target === items[id]) {
        _this.props.closeMenu();
      }
    };

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
    this.lastWindowClickEvent = null;
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var isOpen = _props.isOpen;
      var closeOnOutsideClick = _props.closeOnOutsideClick;

      if (isOpen === prevProps.isOpen) {
        return;
      }

      if (isOpen && !prevProps.isOpen) {
        if (closeOnOutsideClick) {
          this.lastWindowClickEvent = this.handleClickOutside;
          document.addEventListener('click', this.lastWindowClickEvent);
        }
      } else if (!isOpen && prevProps.isOpen) {
        if (closeOnOutsideClick) {
          document.removeEventListener('click', this.lastWindowClickEvent);
          this.lastWindowClickEvent = null;
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.lastWindowClickEvent && document.removeEventListener('click', this.lastWindowClickEvent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props2 = this.props;
      var isOpen = _props2.isOpen;
      var menuAlign = _props2.menuAlign;
      var align = _props2.align;
      var inverse = _props2.inverse;
      var className = _props2.className;
      var toggleComponent = _props2.toggleComponent;
      var items = _props2.items;

      var menuClassName = (0, _classnames3['default'])((_classnames = {
        'dd-menu': true
      }, _defineProperty(_classnames, 'dd-menu-' + (menuAlign || align), true), _defineProperty(_classnames, 'dd-menu-inverse', inverse), _defineProperty(_classnames, 'className', className), _classnames));

      var _props3 = this.props;
      var textAlign = _props3.textAlign;
      var upwards = _props3.upwards;
      var animAlign = _props3.animAlign;
      var animate = _props3.animate;
      var enterTimeout = _props3.enterTimeout;
      var leaveTimeout = _props3.leaveTimeout;

      var transitionProps = {
        transitionName: 'grow-from-' + (upwards ? 'up-' : '') + (animAlign || align),
        className: 'dd-menu-items',
        onKeyDown: this.handleKeyDown,
        transitionEnter: animate,
        transitionLeave: animate,
        transitionEnterTimeout: enterTimeout,
        transitionLeaveTimeout: leaveTimeout
      };

      var menuItemProps = {
        key: 'dropdownItems',
        className: (0, _classnames3['default'])('dd-menu-items-' + (textAlign || align), { 'dd-items-upwards': upwards }),
        items: items,
        enterTimeout: enterTimeout,
        leaveTimeout: leaveTimeout,
        closeOnInsideClick: this.props.closeOnInsideClick,
        closeMenu: this.props.closeMenu
      };
      return _react2['default'].createElement(
        'div',
        { className: menuClassName },
        toggleComponent,
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
      isOpen: _react.PropTypes.bool.isRequired,
      closeMenu: _react.PropTypes.func.isRequired,
      toggleComponent: _react.PropTypes.node.isRequired,
      inverse: _react.PropTypes.bool,
      align: _react.PropTypes.string,
      animAlign: _react.PropTypes.string,
      textAlign: _react.PropTypes.string,
      menuAlign: _react.PropTypes.string,
      className: _react.PropTypes.string,
      upwards: _react.PropTypes.bool,
      animate: _react.PropTypes.bool,
      enterTimeout: _react.PropTypes.number,
      leaveTimeout: _react.PropTypes.number,
      closeOnInsideClick: _react.PropTypes.bool,
      closeOnOutsideClick: _react.PropTypes.bool,
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
      inverse: false,
      align: 'center',
      upwards: false,
      animate: true,
      enterTimeout: 150,
      leaveTimeout: 150,
      closeOnInsideClick: true,
      closeOnOutsideClick: true
    },
    enumerable: true
  }]);

  return DropdownMenu;
})(_react.Component);

exports['default'] = DropdownMenu;
module.exports = exports['default'];