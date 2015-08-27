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

var NestedDropdownMenu = (function (_Component2) {
  _inherits(NestedDropdownMenu, _Component2);

  function NestedDropdownMenu(props) {
    _classCallCheck(this, NestedDropdownMenu);

    _get(Object.getPrototypeOf(NestedDropdownMenu.prototype), 'constructor', this).call(this, props);

    this.state = { isOpen: false };
  }

  _createClass(NestedDropdownMenu, [{
    key: 'setOpen',
    value: function setOpen(isOpen) {
      this.setState({ isOpen: isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var toggle = _props2.toggle;
      var children = _props2.children;
      var nested = _props2.nested;
      var animate = _props2.animate;
      var direction = _props2.direction;
      var isOpen = this.state.isOpen;

      var itemProps = {
        className: (0, _classnames2['default'])('nested-dd-menu', 'nested-' + nested),
        onMouseOver: this.setOpen.bind(this, true),
        onMouseLeave: this.setOpen.bind(this, false),
        onFocus: this.setOpen.bind(this, true),
        onBlur: this.setOpen.bind(this, false)
      };

      var transitionProps = {
        className: 'dd-item-ignore',
        transitionEnter: animate,
        transitionLeave: animate,
        transitionName: 'grow-from-' + direction
      };

      return _reactAddons2['default'].createElement(
        'li',
        itemProps,
        toggle,
        _reactAddons2['default'].createElement(
          CSSTransitionGroup,
          transitionProps,
          isOpen ? _reactAddons2['default'].createElement(
            'ul',
            { key: 'items' },
            children
          ) : null
        )
      );
    }
  }]);

  return NestedDropdownMenu;
})(_reactAddons.Component);

NestedDropdownMenu.propTypes = {
  toggle: _reactAddons.PropTypes.node.isRequired,
  nested: _reactAddons.PropTypes.oneOf(['inherit', 'reverse', 'left', 'right']),
  animate: _reactAddons.PropTypes.bool,
  direction: _reactAddons.PropTypes.oneOf(['left', 'right'])
};

NestedDropdownMenu.defaultProps = {
  nested: 'reverse',
  animate: false,
  direction: 'right'
};

exports.NestedDropdownMenu = NestedDropdownMenu;

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
      var nestedProps = _props.nestedProps;

      var props = _objectWithoutProperties(_props, ['text', 'additionalItems', 'nestedProps']);

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

      var toggle = null;
      if (nestedProps) {
        var nested = null;
        switch (nestedProps.nested) {
          case 'left':
          case 'right':
            nested = nestedProps.nested;
            break;
          case 'inherit':
            nested = props.align;
            break;
          default:
            nested = props.align == 'left' ? 'right' : 'left';
        }

        var icon = _react2['default'].createElement('span', { className: 'fa fa-chevron-' + nested });
        toggle = _react2['default'].createElement(
          'a',
          { href: '#' },
          nested === 'left' && icon,
          'Hover for Nested menu',
          nested === 'right' && icon
        );
      }
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
        additionalItems,
        nestedProps && _react2['default'].createElement(
          _index.NestedDropdownMenu,
          _extends({ toggle: toggle }, nestedProps),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'a',
              { href: '#' },
              'Abcd'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'a',
              { href: '#' },
              'Kjkfdas jfkdas'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'a',
              { href: '#' },
              'Jfkdsaf'
            )
          )
        )
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

var _index = require('../index');

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
}, {
  inverse: false,
  align: 'left',
  text: 'Default Left Nested Menu',
  upwards: true,
  nestedProps: {
    animate: false
  }
}, {
  inverse: true,
  align: 'right',
  text: 'Inverse Right Nested Menu Animated',
  upwards: true,
  nestedProps: {
    animate: true
  }
}, {
  inverse: true,
  align: 'left',
  text: 'Default Nested Menu Nested Inherit',
  nestedProps: {
    nested: 'inherit'
  }
}, {
  inverse: true,
  align: 'right',
  text: 'Default Nested Menu Animate Left',
  nestedProps: {
    animate: true,
    direction: 'left'
  }
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

},{"../index":1,"react":"react"}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Example = require('./Example');

var _Example2 = _interopRequireDefault(_Example);

_react2['default'].render(_react2['default'].createElement(_Example2['default'], null), document.body);

},{"./Example":2,"react":"react"}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJGOi9jb2RlL3JlYWN0LWRkLW1lbnUvc3JjL2luZGV4LmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9FeGFtcGxlLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9PcHRpb25zLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUVnQyxjQUFjOzs7OzBCQUNuQyxZQUFZOzs7O0FBR25DLElBQU0sa0JBQWtCLEdBQUcseUJBQU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQzNELElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7O0lBRTNCLFlBQVk7WUFBWixZQUFZOztBQUNMLFdBRFAsWUFBWSxDQUNKLEtBQUssRUFBRTswQkFEZixZQUFZOztBQUVkLCtCQUZFLFlBQVksNkNBRVIsS0FBSyxFQUFFO0dBQ2Q7O2VBSEcsWUFBWTs7V0FLRSw0QkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3ZDLFVBQUksU0FBUyxHQUFHLHlCQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZELFVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDZCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTNELGdCQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDMUQsaUJBQVMs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dCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdC9hZGRvbnMnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuXG5cbmNvbnN0IENTU1RyYW5zaXRpb25Hcm91cCA9IFJlYWN0LmFkZG9ucy5DU1NUcmFuc2l0aW9uR3JvdXA7XG5jb25zdCBUQUIgPSA5O1xuY29uc3QgU1BBQ0VCQVIgPSAzMjtcblxubGV0IF9sYXN0V2luZG93Q2xpY2tFdmVudCA9IG51bGw7XG5cbmNsYXNzIERyb3Bkb3duTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgdmFyIG1lbnVJdGVtcyA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5tZW51SXRlbXMpO1xuICAgIGlmKHRoaXMucHJvcHMuaXNPcGVuICYmICFwcmV2UHJvcHMuaXNPcGVuKSB7XG4gICAgICBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgPSB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9sYXN0V2luZG93Q2xpY2tFdmVudCk7XG4gICAgICBtZW51SXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByb3BzLmNsb3NlKTtcbiAgICAgIG1lbnVJdGVtcy5hZGRFdmVudExpc3RlbmVyKCdvbmtleWRvd24nLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSBpZighdGhpcy5wcm9wcy5pc09wZW4gJiYgcHJldlByb3BzLmlzT3Blbikge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICAgICAgbWVudUl0ZW1zLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcm9wcy5jbG9zZSk7XG4gICAgICBtZW51SXRlbXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25rZXlkb3duJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcblxuICAgICAgX2xhc3RXaW5kb3dDbGlja0V2ZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICB9XG5cbiAgY2xvc2UoZSkge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBrZXkgPT09IFNQQUNFQkFSICYmIHRoaXMucHJvcHMuY2xvc2UoKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgXG4gIGhhbmRsZUNsaWNrT3V0c2lkZShlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LFxuICAgICAgbm9kZSA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgd2hpbGUodGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgIGlmKHRhcmdldCA9PT0gbm9kZSkgeyByZXR1cm4gfVxuXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuY2xvc2UoZSk7XG4gIH1cblxuICBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBsZXQga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYoa2V5ICE9PSBUQUIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaXRlbXMgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24sYScpO1xuICAgIGxldCBpZCA9IGUuc2hpZnRLZXkgPyAxIDogaXRlbXMubGVuZ3RoIC0gMTtcbiAgICBcbiAgICBlLnRhcmdldCA9PSBpdGVtc1tpZF0gJiYgdGhpcy5wcm9wcy5jbG9zZShlKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCB7IGlzT3BlbiwgdG9nZ2xlLCBjbGFzc05hbWUsIGludmVyc2UsIGFsaWduLCBhbmltQWxpZ24sIHRleHRBbGlnbiwgbWVudUFsaWduLCBjaGlsZHJlbiwgc2l6ZSwgdXB3YXJkcyB9ID0gdGhpcy5wcm9wczsgXG5cbiAgICBsZXQgbWVudUNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXG4gICAgICAnZGQtbWVudScsXG4gICAgICAnZGQtbWVudS0nICsgKG1lbnVBbGlnbiB8fCBhbGlnbiksXG4gICAgICB7ICdkZC1tZW51LWludmVyc2UnOiBpbnZlcnNlIH0sXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzaXplID8gKCdkZC1tZW51LScgKyBzaXplKSA6IG51bGxcbiAgICApXG5cbiAgICBsZXQgbGlzdENsYXNzTmFtZSA9ICdkZC1pdGVtcy0nICsgKHRleHRBbGlnbiB8fCBhbGlnbik7XG4gICAgbGV0IHRyYW5zaXRpb25Qcm9wcyA9IHtcbiAgICAgIHRyYW5zaXRpb25OYW1lOiAnZ3Jvdy1mcm9tLScgKyAodXB3YXJkcyA/ICd1cC0nIDogJycpICsgKGFuaW1BbGlnbiB8fCBhbGlnbiksXG4gICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCdkZC1tZW51LWl0ZW1zJywgeyAnZGQtaXRlbXMtdXB3YXJkcyc6IHVwd2FyZHMgfSksXG4gICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgcmVmOiAnbWVudUl0ZW1zJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXttZW51Q2xhc3NOYW1lfT5cbiAgICAgICAge3RvZ2dsZX1cbiAgICAgICAgPENTU1RyYW5zaXRpb25Hcm91cCB7Li4udHJhbnNpdGlvblByb3BzfT5cbiAgICAgICAgICB7aXNPcGVuICYmIDx1bCBjbGFzc05hbWU9e2xpc3RDbGFzc05hbWV9PntjaGlsZHJlbn08L3VsPn1cbiAgICAgICAgPC9DU1NUcmFuc2l0aW9uR3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRyb3Bkb3duTWVudS5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRvZ2dsZTogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgaW52ZXJzZTogUHJvcFR5cGVzLmJvb2wsXG4gIGFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgYW5pbUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgdGV4dEFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgbWVudUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzaXplOiBQcm9wVHlwZXMub25lT2YoWydzbScsICdtZCcsICdsZycsICd4bCddKSxcbiAgdXB3YXJkczogUHJvcFR5cGVzLmJvb2wsXG59XG5cbkRyb3Bkb3duTWVudS5kZWZhdWx0UHJvcHMgPSB7XG4gIGludmVyc2U6IGZhbHNlLFxuICBhbGlnbjogJ2NlbnRlcicsXG4gIGFuaW1BbGlnbjogbnVsbCxcbiAgdGV4dEFsaWduOiBudWxsLFxuICBtZW51QWxpZ246IG51bGwsXG4gIGNsYXNzTmFtZTogbnVsbCxcbiAgc2l6ZTogbnVsbCxcbiAgdXB3YXJkczogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bk1lbnVcblxuXG5jbGFzcyBOZXN0ZWREcm9wZG93bk1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHsgaXNPcGVuOiBmYWxzZSB9XG4gIH1cblxuICBzZXRPcGVuKGlzT3Blbikge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46IGlzT3BlbiB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCB7IHRvZ2dsZSwgY2hpbGRyZW4sIG5lc3RlZCwgYW5pbWF0ZSwgZGlyZWN0aW9uIH0gPSB0aGlzLnByb3BzXG4gICAgbGV0IHsgaXNPcGVuIH0gPSB0aGlzLnN0YXRlXG5cbiAgICBsZXQgaXRlbVByb3BzID0ge1xuICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCduZXN0ZWQtZGQtbWVudScsIGBuZXN0ZWQtJHtuZXN0ZWR9YCksXG4gICAgICBvbk1vdXNlT3ZlcjogdGhpcy5zZXRPcGVuLmJpbmQodGhpcywgdHJ1ZSksXG4gICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuc2V0T3Blbi5iaW5kKHRoaXMsIGZhbHNlKSxcbiAgICAgIG9uRm9jdXM6IHRoaXMuc2V0T3Blbi5iaW5kKHRoaXMsIHRydWUpLFxuICAgICAgb25CbHVyOiB0aGlzLnNldE9wZW4uYmluZCh0aGlzLCBmYWxzZSksXG4gICAgfVxuXG4gICAgbGV0IHRyYW5zaXRpb25Qcm9wcyA9IHtcbiAgICAgIGNsYXNzTmFtZTogJ2RkLWl0ZW0taWdub3JlJyxcbiAgICAgIHRyYW5zaXRpb25FbnRlcjogYW5pbWF0ZSxcbiAgICAgIHRyYW5zaXRpb25MZWF2ZTogYW5pbWF0ZSxcbiAgICAgIHRyYW5zaXRpb25OYW1lOiAnZ3Jvdy1mcm9tLScgKyBkaXJlY3Rpb24sXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSB7Li4uaXRlbVByb3BzfT5cbiAgICAgICAge3RvZ2dsZX1cbiAgICAgICAgPENTU1RyYW5zaXRpb25Hcm91cCB7Li4udHJhbnNpdGlvblByb3BzfT5cbiAgICAgICAgICB7aXNPcGVuID8gPHVsIGtleT1cIml0ZW1zXCI+e2NoaWxkcmVufTwvdWw+IDogbnVsbH1cbiAgICAgICAgPC9DU1NUcmFuc2l0aW9uR3JvdXA+XG4gICAgICA8L2xpPlxuICAgIClcbiAgfVxufVxuXG5OZXN0ZWREcm9wZG93bk1lbnUucHJvcFR5cGVzID0ge1xuICB0b2dnbGU6IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG5lc3RlZDogUHJvcFR5cGVzLm9uZU9mKFsnaW5oZXJpdCcsICdyZXZlcnNlJywgJ2xlZnQnLCAncmlnaHQnXSksXG4gIGFuaW1hdGU6IFByb3BUeXBlcy5ib29sLFxuICBkaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59XG5cbk5lc3RlZERyb3Bkb3duTWVudS5kZWZhdWx0UHJvcHMgPSB7XG4gIG5lc3RlZDogJ3JldmVyc2UnLFxuICBhbmltYXRlOiBmYWxzZSxcbiAgZGlyZWN0aW9uOiAncmlnaHQnLFxufVxuXG5leHBvcnQgeyBOZXN0ZWREcm9wZG93bk1lbnUgfVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IERyb3Bkb3duTWVudSwgeyBOZXN0ZWREcm9wZG93bk1lbnUgfSBmcm9tICcuLi9pbmRleCdcblxuY2xhc3MgRXhhbXBsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJleGFtcGxlXCI+XG4gICAgICAgIDxoZWFkZXI+PGgxPlJlYWN0IERyb3Bkb3duIE1lbnUgRXhhbXBsZTwvaDE+PC9oZWFkZXI+XG4gICAgICAgIDxtYWluPlxuICAgICAgICAgIHtPcHRpb25zLm1hcChvcHRzID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8TWVudSB7Li4ub3B0c30ga2V5PXtvcHRzLnRleHR9IC8+XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvbWFpbj5cbiAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2dpdGh1Yi5jb20vbWxhdXJzZW4vcmVhY3QtZGQtbWVudVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtZ2l0aHViIGZhLTR4XCIgLz5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGVcblxuY2xhc3MgTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHsgaXNPcGVuOiBmYWxzZSB9XG4gIH1cblxuICB0b2dnbGVNZW51KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlbiB9KVxuICB9XG5cbiAgY2xvc2VNZW51KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46IGZhbHNlIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgaXNPcGVuIH0gPSB0aGlzLnN0YXRlXG4gICAgbGV0IHsgdGV4dCwgYWRkaXRpb25hbEl0ZW1zLCBuZXN0ZWRQcm9wcywgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgIGNsb3NlOiB0aGlzLmNsb3NlTWVudS5iaW5kKHRoaXMpLFxuICAgICAgaXNPcGVuOiBpc09wZW4sXG4gICAgICB0b2dnbGU6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3RhYicsIHsgJ2FjdGl2ZSc6IGlzT3BlbiB9KX0+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy50b2dnbGVNZW51LmJpbmQodGhpcyl9Pnt0ZXh0fTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG5cbiAgICBsZXQgdG9nZ2xlID0gbnVsbFxuICAgIGlmKG5lc3RlZFByb3BzKSB7XG4gICAgICBsZXQgbmVzdGVkID0gbnVsbFxuICAgICAgc3dpdGNoKG5lc3RlZFByb3BzLm5lc3RlZCkge1xuICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIG5lc3RlZCA9IG5lc3RlZFByb3BzLm5lc3RlZDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5oZXJpdCc6XG4gICAgICAgICAgbmVzdGVkID0gcHJvcHMuYWxpZ247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmVzdGVkID0gcHJvcHMuYWxpZ24gPT0gJ2xlZnQnID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgIH1cblxuICAgICAgbGV0IGljb24gPSA8c3BhbiBjbGFzc05hbWU9e2BmYSBmYS1jaGV2cm9uLSR7bmVzdGVkfWB9IC8+XG4gICAgICB0b2dnbGUgPSAoXG4gICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAge25lc3RlZCA9PT0gJ2xlZnQnICYmIGljb259XG4gICAgICAgICAgSG92ZXIgZm9yIE5lc3RlZCBtZW51XG4gICAgICAgICAge25lc3RlZCA9PT0gJ3JpZ2h0JyAmJiBpY29ufVxuICAgICAgICA8L2E+XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25NZW51IHsuLi5wcm9wc30gey4uLm9wdHN9PlxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5MaW5rIEV4YW1wbGU8L2E+PC9saT5cbiAgICAgICAgPGxpPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMub25DbGlja30+QnV0dG9uIEV4YW1wbGU8L2J1dHRvbj48L2xpPlxuICAgICAgICB7YWRkaXRpb25hbEl0ZW1zfVxuICAgICAgICB7bmVzdGVkUHJvcHMgJiZcbiAgICAgICAgPE5lc3RlZERyb3Bkb3duTWVudSB0b2dnbGU9e3RvZ2dsZX0gey4uLm5lc3RlZFByb3BzfT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5BYmNkPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+S2prZmRhcyBqZmtkYXM8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5KZmtkc2FmPC9hPjwvbGk+XG4gICAgICAgIDwvTmVzdGVkRHJvcGRvd25NZW51PlxuICAgICAgICB9XG4gICAgICA8L0Ryb3Bkb3duTWVudT5cbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5lc3RlZERyb3Bkb3duTWVudSB9IGZyb20gJy4uL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB0ZXh0OiAnRGVmYXVsdCBzZXR0aW5ncycsXG4gIH0sXG4gIHtcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHQ6ICdBbGlnbiBMZWZ0JyxcbiAgfSxcbiAge1xuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdBbGlnbiBSaWdodCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBXaXRoIEFsaWduIENlbnRlcicsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ0ludmVyc2UgV2l0aCBBbGlnbiBMZWZ0JyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2UgV2l0aCBBbGlnbiBSaWdodCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICBhbmltQWxpZ246ICdsZWZ0JyxcbiAgICBtZW51QWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2UgQW5pbSBMZWZ0LCBNZW51IFJpZ2h0JyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgIHNpemU6ICdzbScsXG4gICAgdGV4dDogJ0xlZnQgQWxpZ24sIFRleHQgUmlnaHQgU21hbGwnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICBzaXplOiAnbWQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIFJpZ2h0IE1lZGl1bScsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHNpemU6ICdsZycsXG4gICAgdGV4dDogJ0xlZnQgQWxpZ24gTGFyZ2UnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIGFuaW1BbGlnbjogbnVsbCxcbiAgICB0ZXh0QWxpZ246IG51bGwsXG4gICAgbWVudUFsaWduOiBudWxsLFxuICAgIHNpemU6IG51bGwsXG4gICAgY2xhc3NOYW1lOiBudWxsLFxuICAgIHRleHQ6ICdEZWZhdWx0IHdpdGggU29tZSBcXCdJcHN1bVxcJycsXG4gICAgYWRkaXRpb25hbEl0ZW1zOiA8bGk+PGEgaHJlZj1cIiNcIj5Mb3JlbSBJcHN1bSBQcmV0ZW5kIFRoaXMgaXMgQWN0dWFsbHkgaXBzdW08L2E+PC9saT5cbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdEZWZhdWx0IHdpdGggYSBmZXcgc2VwYXJhdG9ycycsXG4gICAgYWRkaXRpb25hbEl0ZW1zOiBbXG4gICAgICA8bGkga2V5PVwic2VwMVwiIHJvbGU9XCJzZXBhcmF0b3JcIiAvPixcbiAgICAgIDxsaSBrZXk9XCJ3b29wXCI+PGEgaHJlZj1cIiNcIj5Xb29wIFdvb3A8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwic2VwMlwiIGNsYXNzTmFtZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cImZyZWRcIj48YSBocmVmPVwiI1wiPkZyZWQgRmxpbnN0b25lPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cImd1YWNcIj48YSBocmVmPVwiI1wiPkd1YWNhbW9sZTwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJzZXAzXCIgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cInNvbWVcIj48YSBocmVmPVwiI1wiPlNvbWV0aGluZzwvYT48L2xpPlxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIHdpdGggYSBmZXcgc2VwYXJhdG9ycycsXG4gICAgYWRkaXRpb25hbEl0ZW1zOiBbXG4gICAgICA8bGkga2V5PVwic2VwMVwiIHJvbGU9XCJzZXBhcmF0b3JcIiAvPixcbiAgICAgIDxsaSBrZXk9XCJ3b29wXCI+PGEgaHJlZj1cIiNcIj5Xb29wIFdvb3A8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwic2VwMlwiIGNsYXNzTmFtZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cImZyZWRcIj48YSBocmVmPVwiI1wiPkZyZWQgRmxpbnN0b25lPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cImd1YWNcIj48YSBocmVmPVwiI1wiPkd1YWNhbW9sZTwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJzZXAzXCIgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cInNvbWVcIj48YSBocmVmPVwiI1wiPlNvbWV0aGluZzwvYT48L2xpPlxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHQ6ICdVcHdhcmRzIExlZnQgQWxpZ24nLFxuICAgIHVwd2FyZHM6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBVcHdhcmRzIENlbnRlciBBbGlnbicsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdVcHdhcmRzIFJpZ2h0IEFsaWduJyxcbiAgICB1cHdhcmRzOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0OiAnRGVmYXVsdCBMZWZ0IE5lc3RlZCBNZW51JyxcbiAgICB1cHdhcmRzOiB0cnVlLFxuICAgIG5lc3RlZFByb3BzOiB7XG4gICAgICBhbmltYXRlOiBmYWxzZSxcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIFJpZ2h0IE5lc3RlZCBNZW51IEFuaW1hdGVkJyxcbiAgICB1cHdhcmRzOiB0cnVlLFxuICAgIG5lc3RlZFByb3BzOiB7XG4gICAgICBhbmltYXRlOiB0cnVlLFxuICAgIH1cbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0OiAnRGVmYXVsdCBOZXN0ZWQgTWVudSBOZXN0ZWQgSW5oZXJpdCcsXG4gICAgbmVzdGVkUHJvcHM6IHtcbiAgICAgIG5lc3RlZDogJ2luaGVyaXQnLFxuICAgIH1cbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0RlZmF1bHQgTmVzdGVkIE1lbnUgQW5pbWF0ZSBMZWZ0JyxcbiAgICBuZXN0ZWRQcm9wczoge1xuICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgIGRpcmVjdGlvbjogJ2xlZnQnLFxuICAgIH1cbiAgfSxcbi8ve1xuLy8gIGludmVyc2U6IGZhbHNlLFxuLy8gIGFsaWduOiAnY2VudGVyJyxcbi8vICBhbmltQWxpZ246IG51bGwsXG4vLyAgdGV4dEFsaWduOiBudWxsLFxuLy8gIG1lbnVBbGlnbjogbnVsbCxcbi8vICBzaXplOiBudWxsLFxuLy8gIGNsYXNzTmFtZTogbnVsbCxcbi8vICB0ZXh0OiAnRGVmYXVsdCB3aXRoIFNvbWUgXFwnSXBzdW1cXCcnLFxuLy8gIGFkZGl0aW9uYWxJdGVtczogPGxpPjxhIGhyZWY9XCIjXCI+TG9yZW0gSXBzdW0gUHJldGVuZCBUaGlzIGlzIEFjdHVhbGx5IGlwc3VtPC9hPjwvbGk+XG4vL30sXG5dXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBFeGFtcGxlIGZyb20gJy4vRXhhbXBsZSdcblxuUmVhY3QucmVuZGVyKDxFeGFtcGxlIC8+LCBkb2N1bWVudC5ib2R5KTtcbiJdfQ==
