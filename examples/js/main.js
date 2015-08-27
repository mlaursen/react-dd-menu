(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var CSSTransitionGroup = _reactAddons2['default'].addons.CSSTransitionGroup;
var TAB = 9;
var SPACEBAR = 32;

var _lastWindowClickEvent = null;

var DropdownMenu = (function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    _get(Object.getPrototypeOf(DropdownMenu.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var menuItems = _reactAddons2['default'].findDOMNode(this.refs.menuItems);
      if (this.props.isOpen && !prevProps.isOpen) {
        _lastWindowClickEvent = this.handleClickOutside.bind(this);

        document.addEventListener('click', _lastWindowClickEvent);
        menuItems.addEventListener('click', this.props.close);
        menuItems.addEventListener('onkeydown', this.close.bind(this));
      } else if (!this.props.isOpen && prevProps.isOpen) {
        document.removeEventListener('click', _lastWindowClickEvent);
        menuItems.removeEventListener('click', this.props.close);
        menuItems.removeEventListener('onkeydown', this.close.bind(this));

        _lastWindowClickEvent = null;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _lastWindowClickEvent && document.removeEventListener('click', _lastWindowClickEvent);
    }
  }, {
    key: 'close',
    value: function close(e) {
      var key = e.which || e.keyCode;
      key === SPACEBAR && this.props.close();
      e.preventDefault();
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      var target = e.target,
          node = _reactAddons2['default'].findDOMNode(this);

      while (target.parentNode) {
        if (target === node) {
          return;
        }

        target = target.parentNode;
      }

      this.props.close(e);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var key = e.which || e.keyCode;
      if (key !== TAB) {
        return;
      }

      var items = _reactAddons2['default'].findDOMNode(this).querySelectorAll('button,a');
      var id = e.shiftKey ? 1 : items.length - 1;

      e.target == items[id] && this.props.close(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var isOpen = _props.isOpen;
      var toggle = _props.toggle;
      var className = _props.className;
      var inverse = _props.inverse;
      var align = _props.align;
      var animAlign = _props.animAlign;
      var textAlign = _props.textAlign;
      var menuAlign = _props.menuAlign;
      var children = _props.children;
      var size = _props.size;
      var upwards = _props.upwards;

      var menuClassName = (0, _classnames2['default'])('dd-menu', 'dd-menu-' + (menuAlign || align), { 'dd-menu-inverse': inverse }, className, size ? 'dd-menu-' + size : null);

      var listClassName = 'dd-items-' + (textAlign || align);
      var transitionProps = {
        transitionName: 'grow-from-' + (upwards ? 'up-' : '') + (animAlign || align),
        component: 'div',
        className: (0, _classnames2['default'])('dd-menu-items', { 'dd-items-upwards': upwards }),
        onKeyDown: this.handleKeyDown.bind(this),
        ref: 'menuItems'
      };

      return _reactAddons2['default'].createElement(
        'div',
        { className: menuClassName },
        toggle,
        _reactAddons2['default'].createElement(
          CSSTransitionGroup,
          transitionProps,
          isOpen && _reactAddons2['default'].createElement(
            'ul',
            { className: listClassName },
            children
          )
        )
      );
    }
  }]);

  return DropdownMenu;
})(_reactAddons.Component);

DropdownMenu.propTypes = {
  isOpen: _reactAddons.PropTypes.bool.isRequired,
  close: _reactAddons.PropTypes.func.isRequired,
  toggle: _reactAddons.PropTypes.node.isRequired,
  inverse: _reactAddons.PropTypes.bool,
  align: _reactAddons.PropTypes.oneOf(['center', 'right', 'left']),
  animAlign: _reactAddons.PropTypes.oneOf(['center', 'right', 'left']),
  textAlign: _reactAddons.PropTypes.oneOf(['center', 'right', 'left']),
  menuAlign: _reactAddons.PropTypes.oneOf(['center', 'right', 'left']),
  className: _reactAddons.PropTypes.string,
  size: _reactAddons.PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  upwards: _reactAddons.PropTypes.bool
};

DropdownMenu.defaultProps = {
  inverse: false,
  align: 'center',
  animAlign: null,
  textAlign: null,
  menuAlign: null,
  className: null,
  size: null,
  upwards: false
};

exports['default'] = DropdownMenu;
module.exports = exports['default'];

},{"classnames":"classnames","react/addons":"react/addons"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var Example = (function (_Component) {
  _inherits(Example, _Component);

  function Example() {
    _classCallCheck(this, Example);

    _get(Object.getPrototypeOf(Example.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Example, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'example' },
        _react2['default'].createElement(
          'header',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            'React Dropdown Menu Example'
          )
        ),
        _react2['default'].createElement(
          'main',
          null,
          _Options2['default'].map(function (opts) {
            return _react2['default'].createElement(Menu, _extends({}, opts, { key: opts.text }));
          })
        ),
        _react2['default'].createElement(
          'footer',
          null,
          _react2['default'].createElement(
            'a',
            { href: 'http://github.com/mlaursen/react-dd-menu' },
            _react2['default'].createElement('span', { className: 'fa fa-github fa-4x' })
          )
        )
      );
    }
  }]);

  return Example;
})(_react.Component);

exports['default'] = Example;

var Menu = (function (_Component2) {
  _inherits(Menu, _Component2);

  function Menu(props) {
    _classCallCheck(this, Menu);

    _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);
    this.state = { isOpen: false };
  }

  _createClass(Menu, [{
    key: 'toggleMenu',
    value: function toggleMenu() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'closeMenu',
    value: function closeMenu() {
      this.setState({ isOpen: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.state.isOpen;
      var _props = this.props;
      var text = _props.text;
      var additionalItems = _props.additionalItems;

      var props = _objectWithoutProperties(_props, ['text', 'additionalItems']);

      var opts = {
        close: this.closeMenu.bind(this),
        isOpen: isOpen,
        toggle: _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])('tab', { 'active': isOpen }) },
          _react2['default'].createElement(
            'button',
            { type: 'button', onClick: this.toggleMenu.bind(this) },
            text
          )
        )
      };
      return _react2['default'].createElement(
        _index2['default'],
        _extends({}, props, opts),
        _react2['default'].createElement(
          'li',
          null,
          _react2['default'].createElement(
            'a',
            { href: '#' },
            'Link Example'
          )
        ),
        _react2['default'].createElement(
          'li',
          null,
          _react2['default'].createElement(
            'button',
            { type: 'button', onClick: this.onClick },
            'Button Example'
          )
        ),
        additionalItems
      );
    }
  }]);

  return Menu;
})(_react.Component);

module.exports = exports['default'];

},{"../index":1,"./Options":3,"classnames":"classnames","react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = [{
  text: 'Default settings'
}, {
  align: 'left',
  text: 'Align Left'
}, {
  align: 'right',
  text: 'Align Right'
}, {
  inverse: true,
  align: 'center',
  text: 'Inverse With Align Center'
}, {
  inverse: true,
  align: 'left',
  text: 'Inverse With Align Left'
}, {
  inverse: true,
  align: 'right',
  text: 'Inverse With Align Right'
}, {
  inverse: true,
  align: 'center',
  animAlign: 'left',
  menuAlign: 'right',
  text: 'Inverse Anim Left, Menu Right'
}, {
  inverse: false,
  align: 'left',
  textAlign: 'right',
  size: 'sm',
  text: 'Left Align, Text Right Small'
}, {
  inverse: true,
  align: 'right',
  size: 'md',
  text: 'Inverse Right Medium'
}, {
  inverse: false,
  align: 'left',
  size: 'lg',
  text: 'Left Align Large'
}, {
  inverse: false,
  align: 'center',
  animAlign: null,
  textAlign: null,
  menuAlign: null,
  size: null,
  className: null,
  text: 'Default with Some \'Ipsum\'',
  additionalItems: _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Lorem Ipsum Pretend This is Actually ipsum'
    )
  )
}, {
  inverse: false,
  align: 'right',
  text: 'Default with a few separators',
  additionalItems: [_react2['default'].createElement('li', { key: 'sep1', role: 'separator' }), _react2['default'].createElement(
    'li',
    { key: 'woop' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Woop Woop'
    )
  ), _react2['default'].createElement('li', { key: 'sep2', className: 'separator' }), _react2['default'].createElement(
    'li',
    { key: 'fred' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Fred Flinstone'
    )
  ), _react2['default'].createElement(
    'li',
    { key: 'guac' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Guacamole'
    )
  ), _react2['default'].createElement('li', { key: 'sep3', role: 'separator', className: 'separator' }), _react2['default'].createElement(
    'li',
    { key: 'some' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Something'
    )
  )]
}, {
  inverse: true,
  align: 'right',
  text: 'Inverse with a few separators',
  additionalItems: [_react2['default'].createElement('li', { key: 'sep1', role: 'separator' }), _react2['default'].createElement(
    'li',
    { key: 'woop' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Woop Woop'
    )
  ), _react2['default'].createElement('li', { key: 'sep2', className: 'separator' }), _react2['default'].createElement(
    'li',
    { key: 'fred' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Fred Flinstone'
    )
  ), _react2['default'].createElement(
    'li',
    { key: 'guac' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Guacamole'
    )
  ), _react2['default'].createElement('li', { key: 'sep3', role: 'separator', className: 'separator' }), _react2['default'].createElement(
    'li',
    { key: 'some' },
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Something'
    )
  )]
}, {
  inverse: false,
  align: 'left',
  text: 'Upwards Left Align',
  upwards: true
}, {
  inverse: true,
  align: 'center',
  text: 'Inverse Upwards Center Align',
  upwards: true
}, {
  inverse: false,
  align: 'right',
  text: 'Upwards Right Align',
  upwards: true
}];
module.exports = exports['default'];

//{
//  inverse: false,
//  align: 'center',
//  animAlign: null,
//  textAlign: null,
//  menuAlign: null,
//  size: null,
//  className: null,
//  text: 'Default with Some \'Ipsum\'',
//  additionalItems: <li><a href="#">Lorem Ipsum Pretend This is Actually ipsum</a></li>
//},

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Example = require('./Example');

var _Example2 = _interopRequireDefault(_Example);

_react2['default'].render(_react2['default'].createElement(_Example2['default'], null), document.body);

},{"./Example":2,"react":"react"}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJGOi9jb2RlL3JlYWN0LWRkLW1lbnUvc3JjL2luZGV4LmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9FeGFtcGxlLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9PcHRpb25zLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUVnQyxjQUFjOzs7OzBCQUNuQyxZQUFZOzs7O0FBR25DLElBQU0sa0JBQWtCLEdBQUcseUJBQU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQzNELElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7O0lBRTNCLFlBQVk7WUFBWixZQUFZOztBQUNMLFdBRFAsWUFBWSxDQUNKLEtBQUssRUFBRTswQkFEZixZQUFZOztBQUVkLCtCQUZFLFlBQVksNkNBRVIsS0FBSyxFQUFFO0dBQ2Q7O2VBSEcsWUFBWTs7V0FLRSw0QkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3ZDLFVBQUksU0FBUyxHQUFHLHlCQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZELFVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDZCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTNELGdCQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDMUQsaUJBQVMs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QUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsV0FBVyxHQUFHLEVBQ2xDOztNQUFJLEdBQUcsRUFBQyxNQUFNO0lBQUM7O1FBQUcsSUFBSSxFQUFDLEdBQUc7O0tBQWM7R0FBSyxFQUM3Qyx5Q0FBSSxHQUFHLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxXQUFXLEdBQUcsRUFDdkM7O01BQUksR0FBRyxFQUFDLE1BQU07SUFBQzs7UUFBRyxJQUFJLEVBQUMsR0FBRzs7S0FBbUI7R0FBSyxFQUNsRDs7TUFBSSxHQUFHLEVBQUMsTUFBTTtJQUFDOztRQUFHLElBQUksRUFBQyxHQUFHOztLQUFjO0dBQUssRUFDN0MseUNBQUksR0FBRyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxXQUFXLEdBQUcsRUFDeEQ7O01BQUksR0FBRyxFQUFDLE1BQU07SUFBQzs7UUFBRyxJQUFJLEVBQUMsR0FBRzs7S0FBYztHQUFLLENBQzlDO0NBQ0YsRUFDRDtBQUNFLFNBQU8sRUFBRSxLQUFLO0FBQ2QsT0FBSyxFQUFFLE1BQU07QUFDYixNQUFJLEVBQUUsb0JBQW9CO0FBQzFCLFNBQU8sRUFBRSxJQUFJO0NBQ2QsRUFDRDtBQUNFLFNBQU8sRUFBRSxJQUFJO0FBQ2IsT0FBSyxFQUFFLFFBQVE7QUFDZixNQUFJLEVBQUUsOEJBQThCO0FBQ3BDLFNBQU8sRUFBRSxJQUFJO0NBQ2QsRUFDRDtBQUNFLFNBQU8sRUFBRSxLQUFLO0FBQ2QsT0FBSyxFQUFFLE9BQU87QUFDZCxNQUFJLEVBQUUscUJBQXFCO0FBQzNCLFNBQU8sRUFBRSxJQUFJO0NBQ2QsQ0FZRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDM0hpQixPQUFPOzs7O3VCQUVMLFdBQVc7Ozs7QUFFL0IsbUJBQU0sTUFBTSxDQUFDLDREQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdC9hZGRvbnMnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuXG5cbmNvbnN0IENTU1RyYW5zaXRpb25Hcm91cCA9IFJlYWN0LmFkZG9ucy5DU1NUcmFuc2l0aW9uR3JvdXA7XG5jb25zdCBUQUIgPSA5O1xuY29uc3QgU1BBQ0VCQVIgPSAzMjtcblxubGV0IF9sYXN0V2luZG93Q2xpY2tFdmVudCA9IG51bGw7XG5cbmNsYXNzIERyb3Bkb3duTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgdmFyIG1lbnVJdGVtcyA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5tZW51SXRlbXMpO1xuICAgIGlmKHRoaXMucHJvcHMuaXNPcGVuICYmICFwcmV2UHJvcHMuaXNPcGVuKSB7XG4gICAgICBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgPSB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9sYXN0V2luZG93Q2xpY2tFdmVudCk7XG4gICAgICBtZW51SXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByb3BzLmNsb3NlKTtcbiAgICAgIG1lbnVJdGVtcy5hZGRFdmVudExpc3RlbmVyKCdvbmtleWRvd24nLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSBpZighdGhpcy5wcm9wcy5pc09wZW4gJiYgcHJldlByb3BzLmlzT3Blbikge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICAgICAgbWVudUl0ZW1zLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcm9wcy5jbG9zZSk7XG4gICAgICBtZW51SXRlbXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25rZXlkb3duJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcblxuICAgICAgX2xhc3RXaW5kb3dDbGlja0V2ZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICB9XG5cbiAgY2xvc2UoZSkge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBrZXkgPT09IFNQQUNFQkFSICYmIHRoaXMucHJvcHMuY2xvc2UoKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgXG4gIGhhbmRsZUNsaWNrT3V0c2lkZShlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LFxuICAgICAgbm9kZSA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgd2hpbGUodGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgIGlmKHRhcmdldCA9PT0gbm9kZSkgeyByZXR1cm4gfVxuXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuY2xvc2UoZSk7XG4gIH1cblxuICBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBsZXQga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYoa2V5ICE9PSBUQUIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaXRlbXMgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24sYScpO1xuICAgIGxldCBpZCA9IGUuc2hpZnRLZXkgPyAxIDogaXRlbXMubGVuZ3RoIC0gMTtcbiAgICBcbiAgICBlLnRhcmdldCA9PSBpdGVtc1tpZF0gJiYgdGhpcy5wcm9wcy5jbG9zZShlKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCB7IGlzT3BlbiwgdG9nZ2xlLCBjbGFzc05hbWUsIGludmVyc2UsIGFsaWduLCBhbmltQWxpZ24sIHRleHRBbGlnbiwgbWVudUFsaWduLCBjaGlsZHJlbiwgc2l6ZSwgdXB3YXJkcyB9ID0gdGhpcy5wcm9wczsgXG5cbiAgICBsZXQgbWVudUNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXG4gICAgICAnZGQtbWVudScsXG4gICAgICAnZGQtbWVudS0nICsgKG1lbnVBbGlnbiB8fCBhbGlnbiksXG4gICAgICB7ICdkZC1tZW51LWludmVyc2UnOiBpbnZlcnNlIH0sXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzaXplID8gKCdkZC1tZW51LScgKyBzaXplKSA6IG51bGxcbiAgICApXG5cbiAgICBsZXQgbGlzdENsYXNzTmFtZSA9ICdkZC1pdGVtcy0nICsgKHRleHRBbGlnbiB8fCBhbGlnbik7XG4gICAgbGV0IHRyYW5zaXRpb25Qcm9wcyA9IHtcbiAgICAgIHRyYW5zaXRpb25OYW1lOiAnZ3Jvdy1mcm9tLScgKyAodXB3YXJkcyA/ICd1cC0nIDogJycpICsgKGFuaW1BbGlnbiB8fCBhbGlnbiksXG4gICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCdkZC1tZW51LWl0ZW1zJywgeyAnZGQtaXRlbXMtdXB3YXJkcyc6IHVwd2FyZHMgfSksXG4gICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgcmVmOiAnbWVudUl0ZW1zJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXttZW51Q2xhc3NOYW1lfT5cbiAgICAgICAge3RvZ2dsZX1cbiAgICAgICAgPENTU1RyYW5zaXRpb25Hcm91cCB7Li4udHJhbnNpdGlvblByb3BzfT5cbiAgICAgICAgICB7aXNPcGVuICYmIDx1bCBjbGFzc05hbWU9e2xpc3RDbGFzc05hbWV9PntjaGlsZHJlbn08L3VsPn1cbiAgICAgICAgPC9DU1NUcmFuc2l0aW9uR3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRyb3Bkb3duTWVudS5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRvZ2dsZTogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgaW52ZXJzZTogUHJvcFR5cGVzLmJvb2wsXG4gIGFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgYW5pbUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgdGV4dEFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgbWVudUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzaXplOiBQcm9wVHlwZXMub25lT2YoWydzbScsICdtZCcsICdsZycsICd4bCddKSxcbiAgdXB3YXJkczogUHJvcFR5cGVzLmJvb2wsXG59XG5cbkRyb3Bkb3duTWVudS5kZWZhdWx0UHJvcHMgPSB7XG4gIGludmVyc2U6IGZhbHNlLFxuICBhbGlnbjogJ2NlbnRlcicsXG4gIGFuaW1BbGlnbjogbnVsbCxcbiAgdGV4dEFsaWduOiBudWxsLFxuICBtZW51QWxpZ246IG51bGwsXG4gIGNsYXNzTmFtZTogbnVsbCxcbiAgc2l6ZTogbnVsbCxcbiAgdXB3YXJkczogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bk1lbnU7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuXG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgRHJvcGRvd25NZW51IGZyb20gJy4uL2luZGV4J1xuXG5jbGFzcyBFeGFtcGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4YW1wbGVcIj5cbiAgICAgICAgPGhlYWRlcj48aDE+UmVhY3QgRHJvcGRvd24gTWVudSBFeGFtcGxlPC9oMT48L2hlYWRlcj5cbiAgICAgICAgPG1haW4+XG4gICAgICAgICAge09wdGlvbnMubWFwKG9wdHMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxNZW51IHsuLi5vcHRzfSBrZXk9e29wdHMudGV4dH0gLz5cbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9tYWluPlxuICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgIDxhIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9tbGF1cnNlbi9yZWFjdC1kZC1tZW51XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1naXRodWIgZmEtNHhcIiAvPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhhbXBsZVxuXG5jbGFzcyBNZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0geyBpc09wZW46IGZhbHNlIH1cbiAgfVxuXG4gIHRvZ2dsZU1lbnUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogIXRoaXMuc3RhdGUuaXNPcGVuIH0pXG4gIH1cblxuICBjbG9zZU1lbnUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogZmFsc2UgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgeyBpc09wZW4gfSA9IHRoaXMuc3RhdGVcbiAgICBsZXQgeyB0ZXh0LCBhZGRpdGlvbmFsSXRlbXMsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICBjbG9zZTogdGhpcy5jbG9zZU1lbnUuYmluZCh0aGlzKSxcbiAgICAgIGlzT3BlbjogaXNPcGVuLFxuICAgICAgdG9nZ2xlOiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCd0YWInLCB7ICdhY3RpdmUnOiBpc09wZW4gfSl9PlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlTWVudS5iaW5kKHRoaXMpfT57dGV4dH08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25NZW51IHsuLi5wcm9wc30gey4uLm9wdHN9PlxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5MaW5rIEV4YW1wbGU8L2E+PC9saT5cbiAgICAgICAgPGxpPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMub25DbGlja30+QnV0dG9uIEV4YW1wbGU8L2J1dHRvbj48L2xpPlxuICAgICAgICB7YWRkaXRpb25hbEl0ZW1zfVxuICAgICAgPC9Ecm9wZG93bk1lbnU+XG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHRleHQ6ICdEZWZhdWx0IHNldHRpbmdzJyxcbiAgfSxcbiAge1xuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ0FsaWduIExlZnQnLFxuICB9LFxuICB7XG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0FsaWduIFJpZ2h0JyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHRleHQ6ICdJbnZlcnNlIFdpdGggQWxpZ24gQ2VudGVyJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBXaXRoIEFsaWduIExlZnQnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBXaXRoIEFsaWduIFJpZ2h0JyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIGFuaW1BbGlnbjogJ2xlZnQnLFxuICAgIG1lbnVBbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBBbmltIExlZnQsIE1lbnUgUmlnaHQnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgc2l6ZTogJ3NtJyxcbiAgICB0ZXh0OiAnTGVmdCBBbGlnbiwgVGV4dCBSaWdodCBTbWFsbCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHNpemU6ICdtZCcsXG4gICAgdGV4dDogJ0ludmVyc2UgUmlnaHQgTWVkaXVtJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgc2l6ZTogJ2xnJyxcbiAgICB0ZXh0OiAnTGVmdCBBbGlnbiBMYXJnZScsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgYW5pbUFsaWduOiBudWxsLFxuICAgIHRleHRBbGlnbjogbnVsbCxcbiAgICBtZW51QWxpZ246IG51bGwsXG4gICAgc2l6ZTogbnVsbCxcbiAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgdGV4dDogJ0RlZmF1bHQgd2l0aCBTb21lIFxcJ0lwc3VtXFwnJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IDxsaT48YSBocmVmPVwiI1wiPkxvcmVtIElwc3VtIFByZXRlbmQgVGhpcyBpcyBBY3R1YWxseSBpcHN1bTwvYT48L2xpPlxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0RlZmF1bHQgd2l0aCBhIGZldyBzZXBhcmF0b3JzJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IFtcbiAgICAgIDxsaSBrZXk9XCJzZXAxXCIgcm9sZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cIndvb3BcIj48YSBocmVmPVwiI1wiPldvb3AgV29vcDwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJzZXAyXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwiZnJlZFwiPjxhIGhyZWY9XCIjXCI+RnJlZCBGbGluc3RvbmU8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwiZ3VhY1wiPjxhIGhyZWY9XCIjXCI+R3VhY2Ftb2xlPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cInNlcDNcIiByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwic29tZVwiPjxhIGhyZWY9XCIjXCI+U29tZXRoaW5nPC9hPjwvbGk+XG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2Ugd2l0aCBhIGZldyBzZXBhcmF0b3JzJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IFtcbiAgICAgIDxsaSBrZXk9XCJzZXAxXCIgcm9sZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cIndvb3BcIj48YSBocmVmPVwiI1wiPldvb3AgV29vcDwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJzZXAyXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwiZnJlZFwiPjxhIGhyZWY9XCIjXCI+RnJlZCBGbGluc3RvbmU8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwiZ3VhY1wiPjxhIGhyZWY9XCIjXCI+R3VhY2Ftb2xlPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cInNlcDNcIiByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwic29tZVwiPjxhIGhyZWY9XCIjXCI+U29tZXRoaW5nPC9hPjwvbGk+XG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ1Vwd2FyZHMgTGVmdCBBbGlnbicsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHRleHQ6ICdJbnZlcnNlIFVwd2FyZHMgQ2VudGVyIEFsaWduJyxcbiAgICB1cHdhcmRzOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ1Vwd2FyZHMgUmlnaHQgQWxpZ24nLFxuICAgIHVwd2FyZHM6IHRydWUsXG4gIH0sXG4vL3tcbi8vICBpbnZlcnNlOiBmYWxzZSxcbi8vICBhbGlnbjogJ2NlbnRlcicsXG4vLyAgYW5pbUFsaWduOiBudWxsLFxuLy8gIHRleHRBbGlnbjogbnVsbCxcbi8vICBtZW51QWxpZ246IG51bGwsXG4vLyAgc2l6ZTogbnVsbCxcbi8vICBjbGFzc05hbWU6IG51bGwsXG4vLyAgdGV4dDogJ0RlZmF1bHQgd2l0aCBTb21lIFxcJ0lwc3VtXFwnJyxcbi8vICBhZGRpdGlvbmFsSXRlbXM6IDxsaT48YSBocmVmPVwiI1wiPkxvcmVtIElwc3VtIFByZXRlbmQgVGhpcyBpcyBBY3R1YWxseSBpcHN1bTwvYT48L2xpPlxuLy99LFxuXVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgRXhhbXBsZSBmcm9tICcuL0V4YW1wbGUnXG5cblJlYWN0LnJlbmRlcig8RXhhbXBsZSAvPiwgZG9jdW1lbnQuYm9keSk7XG4iXX0=
