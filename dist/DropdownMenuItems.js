'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _DropdownMenuItem = require('./DropdownMenuItem');

var _DropdownMenuItem2 = _interopRequireDefault(_DropdownMenuItem);

var DropdownMenuItems = (function (_Component) {
  _inherits(DropdownMenuItems, _Component);

  function DropdownMenuItems(props) {
    var _this = this;

    _classCallCheck(this, DropdownMenuItems);

    _get(Object.getPrototypeOf(DropdownMenuItems.prototype), 'constructor', this).call(this, props);

    this.getItemProps = function (item) {
      var onClick = item.onClick;

      var props = _objectWithoutProperties(item, ['onClick']);

      var handleClick = onClick;
      if (_this.props.closeOnInsideClick && !item.items) {
        handleClick = function (e) {
          _this.props.closeMenu();
          onClick(e);
        };
      }

      return _extends({}, props, {
        onClick: handleClick,
        enterTimeout: _this.props.enterTimeout,
        leaveTimeout: _this.props.leaveTimeout,
        closeMenu: _this.props.closeMenu,
        closeOnInsideClick: _this.props.closeOnInsideClick
      });
    };

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
  }

  _createClass(DropdownMenuItems, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var items = _props.items;

      return _react2['default'].createElement(
        'ul',
        { className: className },
        items.map(function (item, i) {
          return _react2['default'].createElement(_DropdownMenuItem2['default'], _extends({ key: i }, _this2.getItemProps(item)));
        })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string,
      items: _react.PropTypes.array,
      enterTimeout: _react.PropTypes.number.isRequired,
      leaveTimeout: _react.PropTypes.number.isRequired,
      closeOnInsideClick: _react.PropTypes.bool.isRequired,
      closeMenu: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return DropdownMenuItems;
})(_react.Component);

exports['default'] = DropdownMenuItems;
module.exports = exports['default'];