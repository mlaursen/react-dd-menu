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
      var children = _reactAddons2['default'].findDOMNode(this).getElementsByTagName('*');
      for (var x in children) {
        if (e.target == children[x]) {
          return;
        }
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

      var menuClassName = (0, _classnames2['default'])('dd-menu', 'dd-menu-' + (menuAlign || align), { 'dd-menu-inverse': inverse }, className, size ? 'dd-menu-' + size : null);

      var listClassName = 'dd-items-' + (textAlign || align);
      var transitionProps = {
        transitionName: 'grow-from-' + (animAlign || align),
        component: 'div',
        className: 'dd-menu-items',
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
  size: _reactAddons.PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])
};

DropdownMenu.defaultProps = {
  inverse: false,
  align: 'center',
  animAlign: null,
  textAlign: null,
  menuAlign: null,
  className: null,
  size: null
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
  additionalItems: [_react2['default'].createElement('li', { role: 'separator' }), _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Woop Woop'
    )
  ), _react2['default'].createElement('li', { className: 'separator' }), _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Fred Flinstone'
    )
  ), _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Guacamole'
    )
  ), _react2['default'].createElement('li', { role: 'separator', className: 'separator' }), _react2['default'].createElement(
    'li',
    null,
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
  additionalItems: [_react2['default'].createElement('li', { role: 'separator' }), _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Woop Woop'
    )
  ), _react2['default'].createElement('li', { className: 'separator' }), _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Fred Flinstone'
    )
  ), _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Guacamole'
    )
  ), _react2['default'].createElement('li', { role: 'separator', className: 'separator' }), _react2['default'].createElement(
    'li',
    null,
    _react2['default'].createElement(
      'a',
      { href: '#' },
      'Something'
    )
  )]
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJGOi9jb2RlL3JlYWN0LWRkLW1lbnUvc3JjL2luZGV4LmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9FeGFtcGxlLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9PcHRpb25zLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUVnQyxjQUFjOzs7OzBCQUNuQyxZQUFZOzs7O0FBR25DLElBQU0sa0JBQWtCLEdBQUcseUJBQU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQzNELElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7O0lBRTNCLFlBQVk7WUFBWixZQUFZOztBQUNMLFdBRFAsWUFBWSxDQUNKLEtBQUssRUFBRTswQkFEZixZQUFZOztBQUVkLCtCQUZFLFlBQVksNkNBRVIsS0FBSyxFQUFFO0dBQ2Q7O2VBSEcsWUFBWTs7V0FLRSw0QkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3ZDLFVBQUksU0FBUyxHQUFHLHlCQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZELFVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDZCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTNELGdCQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDMUQsaUJBQVMs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Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ3pHaUIsT0FBTzs7Ozt1QkFFTCxXQUFXOzs7O0FBRS9CLG1CQUFNLE1BQU0sQ0FBQyw0REFBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QvYWRkb25zJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuXG5jb25zdCBDU1NUcmFuc2l0aW9uR3JvdXAgPSBSZWFjdC5hZGRvbnMuQ1NTVHJhbnNpdGlvbkdyb3VwO1xuY29uc3QgVEFCID0gOTtcbmNvbnN0IFNQQUNFQkFSID0gMzI7XG5cbmxldCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgPSBudWxsO1xuXG5jbGFzcyBEcm9wZG93bk1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIHZhciBtZW51SXRlbXMgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWVudUl0ZW1zKTtcbiAgICBpZih0aGlzLnByb3BzLmlzT3BlbiAmJiAhcHJldlByb3BzLmlzT3Blbikge1xuICAgICAgX2xhc3RXaW5kb3dDbGlja0V2ZW50ID0gdGhpcy5oYW5kbGVDbGlja091dHNpZGUuYmluZCh0aGlzKTtcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICAgICAgbWVudUl0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcm9wcy5jbG9zZSk7XG4gICAgICBtZW51SXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignb25rZXlkb3duJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYoIXRoaXMucHJvcHMuaXNPcGVuICYmIHByZXZQcm9wcy5pc09wZW4pIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2xhc3RXaW5kb3dDbGlja0V2ZW50KTtcbiAgICAgIG1lbnVJdGVtcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJvcHMuY2xvc2UpO1xuICAgICAgbWVudUl0ZW1zLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29ua2V5ZG93bicsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG5cbiAgICAgIF9sYXN0V2luZG93Q2xpY2tFdmVudCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgX2xhc3RXaW5kb3dDbGlja0V2ZW50ICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2xhc3RXaW5kb3dDbGlja0V2ZW50KTtcbiAgfVxuXG4gIGNsb3NlKGUpIHtcbiAgICBsZXQga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAga2V5ID09PSBTUEFDRUJBUiAmJiB0aGlzLnByb3BzLmNsb3NlKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIFxuICBoYW5kbGVDbGlja091dHNpZGUoZSkge1xuICAgIGxldCBjaGlsZHJlbiA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gICAgZm9yKHZhciB4IGluIGNoaWxkcmVuKSB7XG4gICAgICBpZihlLnRhcmdldCA9PSBjaGlsZHJlblt4XSkgeyByZXR1cm47IH1cbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLmNsb3NlKGUpO1xuICB9XG5cbiAgaGFuZGxlS2V5RG93bihlKSB7XG4gICAgbGV0IGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmKGtleSAhPT0gVEFCKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGl0ZW1zID0gUmVhY3QuZmluZERPTU5vZGUodGhpcykucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLGEnKTtcbiAgICBsZXQgaWQgPSBlLnNoaWZ0S2V5ID8gMSA6IGl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgXG4gICAgZS50YXJnZXQgPT0gaXRlbXNbaWRdICYmIHRoaXMucHJvcHMuY2xvc2UoZSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgeyBpc09wZW4sIHRvZ2dsZSwgY2xhc3NOYW1lLCBpbnZlcnNlLCBhbGlnbiwgYW5pbUFsaWduLCB0ZXh0QWxpZ24sIG1lbnVBbGlnbiwgY2hpbGRyZW4sIHNpemUgfSA9IHRoaXMucHJvcHM7IFxuXG4gICAgbGV0IG1lbnVDbGFzc05hbWUgPSBjbGFzc25hbWVzKFxuICAgICAgJ2RkLW1lbnUnLFxuICAgICAgJ2RkLW1lbnUtJyArIChtZW51QWxpZ24gfHwgYWxpZ24pLFxuICAgICAgeyAnZGQtbWVudS1pbnZlcnNlJzogaW52ZXJzZSB9LFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgc2l6ZSA/ICgnZGQtbWVudS0nICsgc2l6ZSkgOiBudWxsXG4gICAgKVxuXG4gICAgbGV0IGxpc3RDbGFzc05hbWUgPSAnZGQtaXRlbXMtJyArICh0ZXh0QWxpZ24gfHwgYWxpZ24pO1xuICAgIGxldCB0cmFuc2l0aW9uUHJvcHMgPSB7XG4gICAgICB0cmFuc2l0aW9uTmFtZTogJ2dyb3ctZnJvbS0nICsgKGFuaW1BbGlnbiB8fCBhbGlnbiksXG4gICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgY2xhc3NOYW1lOiAnZGQtbWVudS1pdGVtcycsXG4gICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgcmVmOiAnbWVudUl0ZW1zJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXttZW51Q2xhc3NOYW1lfT5cbiAgICAgICAge3RvZ2dsZX1cbiAgICAgICAgPENTU1RyYW5zaXRpb25Hcm91cCB7Li4udHJhbnNpdGlvblByb3BzfT5cbiAgICAgICAgICB7aXNPcGVuICYmIDx1bCBjbGFzc05hbWU9e2xpc3RDbGFzc05hbWV9PntjaGlsZHJlbn08L3VsPn1cbiAgICAgICAgPC9DU1NUcmFuc2l0aW9uR3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRyb3Bkb3duTWVudS5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRvZ2dsZTogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgaW52ZXJzZTogUHJvcFR5cGVzLmJvb2wsXG4gIGFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgYW5pbUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgdGV4dEFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgbWVudUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzaXplOiBQcm9wVHlwZXMub25lT2YoWydzbScsICdtZCcsICdsZycsICd4bCddKSxcbn1cblxuRHJvcGRvd25NZW51LmRlZmF1bHRQcm9wcyA9IHtcbiAgaW52ZXJzZTogZmFsc2UsXG4gIGFsaWduOiAnY2VudGVyJyxcbiAgYW5pbUFsaWduOiBudWxsLFxuICB0ZXh0QWxpZ246IG51bGwsXG4gIG1lbnVBbGlnbjogbnVsbCxcbiAgY2xhc3NOYW1lOiBudWxsLFxuICBzaXplOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd25NZW51O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IERyb3Bkb3duTWVudSBmcm9tICcuLi9pbmRleCdcblxuY2xhc3MgRXhhbXBsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJleGFtcGxlXCI+XG4gICAgICAgIDxoZWFkZXI+PGgxPlJlYWN0IERyb3Bkb3duIE1lbnUgRXhhbXBsZTwvaDE+PC9oZWFkZXI+XG4gICAgICAgIDxtYWluPlxuICAgICAgICAgIHtPcHRpb25zLm1hcChvcHRzID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8TWVudSB7Li4ub3B0c30ga2V5PXtvcHRzLnRleHR9IC8+XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvbWFpbj5cbiAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2dpdGh1Yi5jb20vbWxhdXJzZW4vcmVhY3QtZGQtbWVudVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtZ2l0aHViIGZhLTR4XCIgLz5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGVcblxuY2xhc3MgTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHsgaXNPcGVuOiBmYWxzZSB9XG4gIH1cblxuICB0b2dnbGVNZW51KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlbiB9KVxuICB9XG5cbiAgY2xvc2VNZW51KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46IGZhbHNlIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgaXNPcGVuIH0gPSB0aGlzLnN0YXRlXG4gICAgbGV0IHsgdGV4dCwgYWRkaXRpb25hbEl0ZW1zLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wc1xuICAgIGxldCBvcHRzID0ge1xuICAgICAgY2xvc2U6IHRoaXMuY2xvc2VNZW51LmJpbmQodGhpcyksXG4gICAgICBpc09wZW46IGlzT3BlbixcbiAgICAgIHRvZ2dsZTogKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygndGFiJywgeyAnYWN0aXZlJzogaXNPcGVuIH0pfT5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKX0+e3RleHR9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPERyb3Bkb3duTWVudSB7Li4ucHJvcHN9IHsuLi5vcHRzfT5cbiAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+TGluayBFeGFtcGxlPC9hPjwvbGk+XG4gICAgICAgIDxsaT48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9PkJ1dHRvbiBFeGFtcGxlPC9idXR0b24+PC9saT5cbiAgICAgICAge2FkZGl0aW9uYWxJdGVtc31cbiAgICAgIDwvRHJvcGRvd25NZW51PlxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB0ZXh0OiAnRGVmYXVsdCBzZXR0aW5ncycsXG4gIH0sXG4gIHtcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHQ6ICdBbGlnbiBMZWZ0JyxcbiAgfSxcbiAge1xuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdBbGlnbiBSaWdodCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBXaXRoIEFsaWduIENlbnRlcicsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ0ludmVyc2UgV2l0aCBBbGlnbiBMZWZ0JyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2UgV2l0aCBBbGlnbiBSaWdodCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICBhbmltQWxpZ246ICdsZWZ0JyxcbiAgICBtZW51QWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2UgQW5pbSBMZWZ0LCBNZW51IFJpZ2h0JyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgIHNpemU6ICdzbScsXG4gICAgdGV4dDogJ0xlZnQgQWxpZ24sIFRleHQgUmlnaHQgU21hbGwnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICBzaXplOiAnbWQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIFJpZ2h0IE1lZGl1bScsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHNpemU6ICdsZycsXG4gICAgdGV4dDogJ0xlZnQgQWxpZ24gTGFyZ2UnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIGFuaW1BbGlnbjogbnVsbCxcbiAgICB0ZXh0QWxpZ246IG51bGwsXG4gICAgbWVudUFsaWduOiBudWxsLFxuICAgIHNpemU6IG51bGwsXG4gICAgY2xhc3NOYW1lOiBudWxsLFxuICAgIHRleHQ6ICdEZWZhdWx0IHdpdGggU29tZSBcXCdJcHN1bVxcJycsXG4gICAgYWRkaXRpb25hbEl0ZW1zOiA8bGk+PGEgaHJlZj1cIiNcIj5Mb3JlbSBJcHN1bSBQcmV0ZW5kIFRoaXMgaXMgQWN0dWFsbHkgaXBzdW08L2E+PC9saT5cbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdEZWZhdWx0IHdpdGggYSBmZXcgc2VwYXJhdG9ycycsXG4gICAgYWRkaXRpb25hbEl0ZW1zOiBbXG4gICAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+V29vcCBXb29wPC9hPjwvbGk+LFxuICAgICAgPGxpIGNsYXNzTmFtZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+RnJlZCBGbGluc3RvbmU8L2E+PC9saT4sXG4gICAgICA8bGk+PGEgaHJlZj1cIiNcIj5HdWFjYW1vbGU8L2E+PC9saT4sXG4gICAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+U29tZXRoaW5nPC9hPjwvbGk+XG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2Ugd2l0aCBhIGZldyBzZXBhcmF0b3JzJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IFtcbiAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGk+PGEgaHJlZj1cIiNcIj5Xb29wIFdvb3A8L2E+PC9saT4sXG4gICAgICA8bGkgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGk+PGEgaHJlZj1cIiNcIj5GcmVkIEZsaW5zdG9uZTwvYT48L2xpPixcbiAgICAgIDxsaT48YSBocmVmPVwiI1wiPkd1YWNhbW9sZTwvYT48L2xpPixcbiAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGk+PGEgaHJlZj1cIiNcIj5Tb21ldGhpbmc8L2E+PC9saT5cbiAgICBdLFxuICB9LFxuLy97XG4vLyAgaW52ZXJzZTogZmFsc2UsXG4vLyAgYWxpZ246ICdjZW50ZXInLFxuLy8gIGFuaW1BbGlnbjogbnVsbCxcbi8vICB0ZXh0QWxpZ246IG51bGwsXG4vLyAgbWVudUFsaWduOiBudWxsLFxuLy8gIHNpemU6IG51bGwsXG4vLyAgY2xhc3NOYW1lOiBudWxsLFxuLy8gIHRleHQ6ICdEZWZhdWx0IHdpdGggU29tZSBcXCdJcHN1bVxcJycsXG4vLyAgYWRkaXRpb25hbEl0ZW1zOiA8bGk+PGEgaHJlZj1cIiNcIj5Mb3JlbSBJcHN1bSBQcmV0ZW5kIFRoaXMgaXMgQWN0dWFsbHkgaXBzdW08L2E+PC9saT5cbi8vfSxcbl1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi9FeGFtcGxlJ1xuXG5SZWFjdC5yZW5kZXIoPEV4YW1wbGUgLz4sIGRvY3VtZW50LmJvZHkpO1xuIl19
