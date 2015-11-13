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

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _SelectDropdownToggle = require('./SelectDropdownToggle');

var _SelectDropdownToggle2 = _interopRequireDefault(_SelectDropdownToggle);

var SelectDropdown = (function (_Component) {
  _inherits(SelectDropdown, _Component);

  function SelectDropdown(props) {
    var _this = this;

    _classCallCheck(this, SelectDropdown);

    _get(Object.getPrototypeOf(SelectDropdown.prototype), 'constructor', this).call(this, props);

    this.handleToggleClick = function () {
      _this.props.onClick && _this.props.onClick();

      _this.setState({ isOpen: !_this.state.isOpen });
    };

    this.closeMenu = function () {
      _this.setState({ isOpen: false });
    };

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  _createClass(SelectDropdown, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var items = _props.items;

      var toggleProps = _objectWithoutProperties(_props, ['items']);

      var props = {
        isOpen: this.state.isOpen,
        closeMenu: this.closeMenu,
        items: items,
        align: 'left',
        animAlign: 'top',
        className: 'select-dropdown',
        toggleComponent: _react2['default'].createElement(_SelectDropdownToggle2['default'], _extends({}, toggleProps, { onClick: this.handleToggleClick }))
      };
      return _react2['default'].createElement(_DropdownMenu2['default'], props);
    }
  }], [{
    key: 'propTypes',
    value: {
      items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        onClick: _react.PropTypes.func,
        children: _react.PropTypes.node,
        unrenders: _react.PropTypes.bool,
        isSeparator: _react.PropTypes.bool
      })),
      onClick: _react.PropTypes.func,
      children: _react.PropTypes.node.isRequired
    },
    enumerable: true
  }]);

  return SelectDropdown;
})(_react.Component);

exports['default'] = SelectDropdown;
module.exports = exports['default'];