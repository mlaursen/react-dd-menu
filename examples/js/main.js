(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

module.exports = DropdownMenu;

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
      var upwards = _props2.upwards;
      var isOpen = this.state.isOpen;

      var itemProps = {
        className: (0, _classnames2['default'])('nested-dd-menu', 'nested-' + nested),
        onMouseOver: this.setOpen.bind(this, true),
        onMouseLeave: this.setOpen.bind(this, false),
        onFocus: this.setOpen.bind(this, true),
        onBlur: this.setOpen.bind(this, false)
      };

      var prefix = upwards ? 'up-' : '';
      var transitionProps = {
        className: 'dd-item-ignore',
        transitionEnter: animate,
        transitionLeave: animate,
        transitionName: 'grow-from-' + prefix + direction
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
  direction: _reactAddons.PropTypes.oneOf(['left', 'right']),
  upwards: _reactAddons.PropTypes.bool
};

NestedDropdownMenu.defaultProps = {
  nested: 'reverse',
  animate: false,
  direction: 'right',
  upwards: false
};

module.exports.NestedDropdownMenu = NestedDropdownMenu;

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
              'Woop Woop'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'a',
              { href: '#' },
              'Thats the Sound of'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'a',
              { href: '#' },
              'The Police'
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
  text: 'Inverse With Align Left Multi-Nested Menus',
  additionalItems: _react2['default'].createElement(
    _index.NestedDropdownMenu,
    { toggle: _react2['default'].createElement(
        'a',
        { href: '#' },
        'Multi-level Menu',
        _react2['default'].createElement('span', { className: 'fa fa-chevron-right' })
      ) },
    _react2['default'].createElement(
      'li',
      null,
      _react2['default'].createElement(
        'a',
        { href: '#' },
        'Wee wooo'
      )
    ),
    _react2['default'].createElement(
      'li',
      null,
      _react2['default'].createElement(
        'a',
        { href: '#' },
        'Wee wooo'
      )
    ),
    _react2['default'].createElement('li', { role: 'separator', className: 'separator' }),
    _react2['default'].createElement(
      _index.NestedDropdownMenu,
      { toggle: _react2['default'].createElement(
          'a',
          { href: '#' },
          'Multi-level Menu',
          _react2['default'].createElement('span', { className: 'fa fa-chevron-right' })
        ) },
      _react2['default'].createElement(
        'li',
        null,
        _react2['default'].createElement(
          'a',
          { href: '#' },
          'Wee wooo 1'
        )
      ),
      _react2['default'].createElement(
        'li',
        null,
        _react2['default'].createElement(
          'a',
          { href: '#' },
          'Wee wooo 2'
        )
      ),
      _react2['default'].createElement(
        'li',
        null,
        _react2['default'].createElement(
          'a',
          { href: '#' },
          'Wee wooo 3'
        )
      ),
      _react2['default'].createElement(
        _index.NestedDropdownMenu,
        { toggle: _react2['default'].createElement(
            'a',
            { href: '#' },
            'Multi-level Menu',
            _react2['default'].createElement('span', { className: 'fa fa-chevron-right' })
          ) },
        _react2['default'].createElement(
          'li',
          null,
          _react2['default'].createElement(
            'a',
            { href: '#' },
            'I Think You Got It'
          )
        )
      )
    )
  )
}, {
  inverse: true,
  align: 'right',
  text: 'Inverse With Align Right Aniamted Multi-Nested Menus',
  additionalItems: _react2['default'].createElement(
    _index.NestedDropdownMenu,
    { animate: true, toggle: _react2['default'].createElement(
        'a',
        { href: '#' },
        _react2['default'].createElement('span', { className: 'fa fa-chevron-left' }),
        'Multi-level Menu'
      ) },
    _react2['default'].createElement(
      'li',
      null,
      _react2['default'].createElement(
        'a',
        { href: '#' },
        'Wee wooo'
      )
    ),
    _react2['default'].createElement(
      'li',
      null,
      _react2['default'].createElement(
        'a',
        { href: '#' },
        'Wee wooo'
      )
    ),
    _react2['default'].createElement('li', { role: 'separator', className: 'separator' }),
    _react2['default'].createElement(
      _index.NestedDropdownMenu,
      { animate: true, toggle: _react2['default'].createElement(
          'a',
          { href: '#' },
          _react2['default'].createElement('span', { className: 'fa fa-chevron-left' }),
          'Multi-level Menu'
        ) },
      _react2['default'].createElement(
        'li',
        null,
        _react2['default'].createElement(
          'a',
          { href: '#' },
          'Wee wooo 1'
        )
      ),
      _react2['default'].createElement(
        'li',
        null,
        _react2['default'].createElement(
          'a',
          { href: '#' },
          'Wee wooo 2'
        )
      ),
      _react2['default'].createElement(
        'li',
        null,
        _react2['default'].createElement(
          'a',
          { href: '#' },
          'Wee wooo 3'
        )
      ),
      _react2['default'].createElement(
        _index.NestedDropdownMenu,
        { animate: true, toggle: _react2['default'].createElement(
            'a',
            { href: '#' },
            _react2['default'].createElement('span', { className: 'fa fa-chevron-left' }),
            'Multi-level Menu'
          ) },
        _react2['default'].createElement(
          'li',
          null,
          _react2['default'].createElement(
            'a',
            { href: '#' },
            'I Think You Got It'
          )
        )
      )
    )
  )
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
    animate: true,
    upwards: true
  }
}, {
  inverse: true,
  align: 'left',
  text: 'Default Nested Menu Nested Inherit',
  upwards: true,
  nestedProps: {
    nested: 'inherit'
  }
}, {
  inverse: true,
  align: 'right',
  text: 'Default Nested Menu Animate Left',
  upwards: true,
  nestedProps: {
    animate: true,
    direction: 'left',
    upwards: true
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJGOi9jb2RlL3JlYWN0LWRkLW1lbnUvc3JjL2luZGV4LmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9FeGFtcGxlLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9PcHRpb25zLmpzIiwiRjovY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7MkJBRWdDLGNBQWM7Ozs7MEJBQ25DLFlBQVk7Ozs7QUFHbkMsSUFBTSxrQkFBa0IsR0FBRyx5QkFBTSxNQUFNLENBQUMsa0JBQWtCLENBQUM7QUFDM0QsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVwQixJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQzs7SUFFM0IsWUFBWTtZQUFaLFlBQVk7O0FBQ0wsV0FEUCxZQUFZLENBQ0osS0FBSyxFQUFFOzBCQURmLFlBQVk7O0FBRWQsK0JBRkUsWUFBWSw2Q0FFUixLQUFLLEVBQUU7R0FDZDs7ZUFIRyxZQUFZOztXQUtFLDRCQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDdkMsVUFBSSxTQUFTLEdBQUcseUJBQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkQsVUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDekMsNkJBQXFCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFM0QsZ0JBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUMxRCxpQkFBUyxDQUFD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Q2IsYUFBVyxFQUFFO0FBQ1gsV0FBTyxFQUFFLEtBQUs7R0FDZjtDQUNGLEVBQ0Q7QUFDRSxTQUFPLEVBQUUsSUFBSTtBQUNiLE9BQUssRUFBRSxPQUFPO0FBQ2QsTUFBSSxFQUFFLG9DQUFvQztBQUMxQyxTQUFPLEVBQUUsSUFBSTtBQUNiLGFBQVcsRUFBRTtBQUNYLFdBQU8sRUFBRSxJQUFJO0FBQ2IsV0FBTyxFQUFFLElBQUk7R0FDZDtDQUNGLEVBQ0Q7QUFDRSxTQUFPLEVBQUUsSUFBSTtBQUNiLE9BQUssRUFBRSxNQUFNO0FBQ2IsTUFBSSxFQUFFLG9DQUFvQztBQUMxQyxTQUFPLEVBQUUsSUFBSTtBQUNiLGFBQVcsRUFBRTtBQUNYLFVBQU0sRUFBRSxTQUFTO0dBQ2xCO0NBQ0YsRUFDRDtBQUNFLFNBQU8sRUFBRSxJQUFJO0FBQ2IsT0FBSyxFQUFFLE9BQU87QUFDZCxNQUFJLEVBQUUsa0NBQWtDO0FBQ3hDLFNBQU8sRUFBRSxJQUFJO0FBQ2IsYUFBVyxFQUFFO0FBQ1gsV0FBTyxFQUFFLElBQUk7QUFDYixhQUFTLEVBQUUsTUFBTTtBQUNqQixXQUFPLEVBQUUsSUFBSTtHQUNkO0NBQ0YsQ0FZRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDak1pQixPQUFPOzs7O3VCQUVMLFdBQVc7Ozs7QUFFL0IsbUJBQU0sTUFBTSxDQUFDLDREQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdC9hZGRvbnMnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuXG5cbmNvbnN0IENTU1RyYW5zaXRpb25Hcm91cCA9IFJlYWN0LmFkZG9ucy5DU1NUcmFuc2l0aW9uR3JvdXA7XG5jb25zdCBUQUIgPSA5O1xuY29uc3QgU1BBQ0VCQVIgPSAzMjtcblxubGV0IF9sYXN0V2luZG93Q2xpY2tFdmVudCA9IG51bGw7XG5cbmNsYXNzIERyb3Bkb3duTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgdmFyIG1lbnVJdGVtcyA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5tZW51SXRlbXMpO1xuICAgIGlmKHRoaXMucHJvcHMuaXNPcGVuICYmICFwcmV2UHJvcHMuaXNPcGVuKSB7XG4gICAgICBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgPSB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9sYXN0V2luZG93Q2xpY2tFdmVudCk7XG4gICAgICBtZW51SXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByb3BzLmNsb3NlKTtcbiAgICAgIG1lbnVJdGVtcy5hZGRFdmVudExpc3RlbmVyKCdvbmtleWRvd24nLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSBpZighdGhpcy5wcm9wcy5pc09wZW4gJiYgcHJldlByb3BzLmlzT3Blbikge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICAgICAgbWVudUl0ZW1zLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcm9wcy5jbG9zZSk7XG4gICAgICBtZW51SXRlbXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25rZXlkb3duJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcblxuICAgICAgX2xhc3RXaW5kb3dDbGlja0V2ZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICB9XG5cbiAgY2xvc2UoZSkge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBrZXkgPT09IFNQQUNFQkFSICYmIHRoaXMucHJvcHMuY2xvc2UoKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgXG4gIGhhbmRsZUNsaWNrT3V0c2lkZShlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LFxuICAgICAgbm9kZSA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgd2hpbGUodGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgIGlmKHRhcmdldCA9PT0gbm9kZSkgeyByZXR1cm4gfVxuXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMuY2xvc2UoZSk7XG4gIH1cblxuICBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBsZXQga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYoa2V5ICE9PSBUQUIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaXRlbXMgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24sYScpO1xuICAgIGxldCBpZCA9IGUuc2hpZnRLZXkgPyAxIDogaXRlbXMubGVuZ3RoIC0gMTtcbiAgICBcbiAgICBlLnRhcmdldCA9PSBpdGVtc1tpZF0gJiYgdGhpcy5wcm9wcy5jbG9zZShlKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCB7IGlzT3BlbiwgdG9nZ2xlLCBjbGFzc05hbWUsIGludmVyc2UsIGFsaWduLCBhbmltQWxpZ24sIHRleHRBbGlnbiwgbWVudUFsaWduLCBjaGlsZHJlbiwgc2l6ZSwgdXB3YXJkcyB9ID0gdGhpcy5wcm9wczsgXG5cbiAgICBsZXQgbWVudUNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXG4gICAgICAnZGQtbWVudScsXG4gICAgICAnZGQtbWVudS0nICsgKG1lbnVBbGlnbiB8fCBhbGlnbiksXG4gICAgICB7ICdkZC1tZW51LWludmVyc2UnOiBpbnZlcnNlIH0sXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzaXplID8gKCdkZC1tZW51LScgKyBzaXplKSA6IG51bGxcbiAgICApXG5cbiAgICBsZXQgbGlzdENsYXNzTmFtZSA9ICdkZC1pdGVtcy0nICsgKHRleHRBbGlnbiB8fCBhbGlnbik7XG4gICAgbGV0IHRyYW5zaXRpb25Qcm9wcyA9IHtcbiAgICAgIHRyYW5zaXRpb25OYW1lOiAnZ3Jvdy1mcm9tLScgKyAodXB3YXJkcyA/ICd1cC0nIDogJycpICsgKGFuaW1BbGlnbiB8fCBhbGlnbiksXG4gICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCdkZC1tZW51LWl0ZW1zJywgeyAnZGQtaXRlbXMtdXB3YXJkcyc6IHVwd2FyZHMgfSksXG4gICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuICAgICAgcmVmOiAnbWVudUl0ZW1zJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXttZW51Q2xhc3NOYW1lfT5cbiAgICAgICAge3RvZ2dsZX1cbiAgICAgICAgPENTU1RyYW5zaXRpb25Hcm91cCB7Li4udHJhbnNpdGlvblByb3BzfT5cbiAgICAgICAgICB7aXNPcGVuICYmIDx1bCBjbGFzc05hbWU9e2xpc3RDbGFzc05hbWV9PntjaGlsZHJlbn08L3VsPn1cbiAgICAgICAgPC9DU1NUcmFuc2l0aW9uR3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRyb3Bkb3duTWVudS5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRvZ2dsZTogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgaW52ZXJzZTogUHJvcFR5cGVzLmJvb2wsXG4gIGFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgYW5pbUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgdGV4dEFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgbWVudUFsaWduOiBQcm9wVHlwZXMub25lT2YoWydjZW50ZXInLCAncmlnaHQnLCAnbGVmdCddKSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzaXplOiBQcm9wVHlwZXMub25lT2YoWydzbScsICdtZCcsICdsZycsICd4bCddKSxcbiAgdXB3YXJkczogUHJvcFR5cGVzLmJvb2wsXG59XG5cbkRyb3Bkb3duTWVudS5kZWZhdWx0UHJvcHMgPSB7XG4gIGludmVyc2U6IGZhbHNlLFxuICBhbGlnbjogJ2NlbnRlcicsXG4gIGFuaW1BbGlnbjogbnVsbCxcbiAgdGV4dEFsaWduOiBudWxsLFxuICBtZW51QWxpZ246IG51bGwsXG4gIGNsYXNzTmFtZTogbnVsbCxcbiAgc2l6ZTogbnVsbCxcbiAgdXB3YXJkczogZmFsc2UsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3Bkb3duTWVudVxuXG5cbmNsYXNzIE5lc3RlZERyb3Bkb3duTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0geyBpc09wZW46IGZhbHNlIH1cbiAgfVxuXG4gIHNldE9wZW4oaXNPcGVuKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogaXNPcGVuIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgdG9nZ2xlLCBjaGlsZHJlbiwgbmVzdGVkLCBhbmltYXRlLCBkaXJlY3Rpb24sIHVwd2FyZHMgfSA9IHRoaXMucHJvcHNcbiAgICBsZXQgeyBpc09wZW4gfSA9IHRoaXMuc3RhdGVcblxuICAgIGxldCBpdGVtUHJvcHMgPSB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzbmFtZXMoJ25lc3RlZC1kZC1tZW51JywgYG5lc3RlZC0ke25lc3RlZH1gKSxcbiAgICAgIG9uTW91c2VPdmVyOiB0aGlzLnNldE9wZW4uYmluZCh0aGlzLCB0cnVlKSxcbiAgICAgIG9uTW91c2VMZWF2ZTogdGhpcy5zZXRPcGVuLmJpbmQodGhpcywgZmFsc2UpLFxuICAgICAgb25Gb2N1czogdGhpcy5zZXRPcGVuLmJpbmQodGhpcywgdHJ1ZSksXG4gICAgICBvbkJsdXI6IHRoaXMuc2V0T3Blbi5iaW5kKHRoaXMsIGZhbHNlKSxcbiAgICB9XG5cbiAgICBsZXQgcHJlZml4ID0gdXB3YXJkcyA/ICd1cC0nIDogJydcbiAgICBsZXQgdHJhbnNpdGlvblByb3BzID0ge1xuICAgICAgY2xhc3NOYW1lOiAnZGQtaXRlbS1pZ25vcmUnLFxuICAgICAgdHJhbnNpdGlvbkVudGVyOiBhbmltYXRlLFxuICAgICAgdHJhbnNpdGlvbkxlYXZlOiBhbmltYXRlLFxuICAgICAgdHJhbnNpdGlvbk5hbWU6IGBncm93LWZyb20tJHtwcmVmaXh9JHtkaXJlY3Rpb259YCxcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIHsuLi5pdGVtUHJvcHN9PlxuICAgICAgICB7dG9nZ2xlfVxuICAgICAgICA8Q1NTVHJhbnNpdGlvbkdyb3VwIHsuLi50cmFuc2l0aW9uUHJvcHN9PlxuICAgICAgICAgIHtpc09wZW4gPyA8dWwga2V5PVwiaXRlbXNcIj57Y2hpbGRyZW59PC91bD4gOiBudWxsfVxuICAgICAgICA8L0NTU1RyYW5zaXRpb25Hcm91cD5cbiAgICAgIDwvbGk+XG4gICAgKVxuICB9XG59XG5cbk5lc3RlZERyb3Bkb3duTWVudS5wcm9wVHlwZXMgPSB7XG4gIHRvZ2dsZTogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgbmVzdGVkOiBQcm9wVHlwZXMub25lT2YoWydpbmhlcml0JywgJ3JldmVyc2UnLCAnbGVmdCcsICdyaWdodCddKSxcbiAgYW5pbWF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gIGRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbiAgdXB3YXJkczogUHJvcFR5cGVzLmJvb2wsXG59XG5cbk5lc3RlZERyb3Bkb3duTWVudS5kZWZhdWx0UHJvcHMgPSB7XG4gIG5lc3RlZDogJ3JldmVyc2UnLFxuICBhbmltYXRlOiBmYWxzZSxcbiAgZGlyZWN0aW9uOiAncmlnaHQnLFxuICB1cHdhcmRzOiBmYWxzZSxcbn1cblxubW9kdWxlLmV4cG9ydHMuTmVzdGVkRHJvcGRvd25NZW51ID0gTmVzdGVkRHJvcGRvd25NZW51XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuXG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgRHJvcGRvd25NZW51LCB7IE5lc3RlZERyb3Bkb3duTWVudSB9IGZyb20gJy4uL2luZGV4J1xuXG5jbGFzcyBFeGFtcGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4YW1wbGVcIj5cbiAgICAgICAgPGhlYWRlcj48aDE+UmVhY3QgRHJvcGRvd24gTWVudSBFeGFtcGxlPC9oMT48L2hlYWRlcj5cbiAgICAgICAgPG1haW4+XG4gICAgICAgICAge09wdGlvbnMubWFwKG9wdHMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDxNZW51IHsuLi5vcHRzfSBrZXk9e29wdHMudGV4dH0gLz5cbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9tYWluPlxuICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgIDxhIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9tbGF1cnNlbi9yZWFjdC1kZC1tZW51XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1naXRodWIgZmEtNHhcIiAvPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhhbXBsZVxuXG5jbGFzcyBNZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0geyBpc09wZW46IGZhbHNlIH1cbiAgfVxuXG4gIHRvZ2dsZU1lbnUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogIXRoaXMuc3RhdGUuaXNPcGVuIH0pXG4gIH1cblxuICBjbG9zZU1lbnUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogZmFsc2UgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgeyBpc09wZW4gfSA9IHRoaXMuc3RhdGVcbiAgICBsZXQgeyB0ZXh0LCBhZGRpdGlvbmFsSXRlbXMsIG5lc3RlZFByb3BzLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wc1xuICAgIGxldCBvcHRzID0ge1xuICAgICAgY2xvc2U6IHRoaXMuY2xvc2VNZW51LmJpbmQodGhpcyksXG4gICAgICBpc09wZW46IGlzT3BlbixcbiAgICAgIHRvZ2dsZTogKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygndGFiJywgeyAnYWN0aXZlJzogaXNPcGVuIH0pfT5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKX0+e3RleHR9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cblxuICAgIGxldCB0b2dnbGUgPSBudWxsXG4gICAgaWYobmVzdGVkUHJvcHMpIHtcbiAgICAgIGxldCBuZXN0ZWQgPSBudWxsXG4gICAgICBzd2l0Y2gobmVzdGVkUHJvcHMubmVzdGVkKSB7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgbmVzdGVkID0gbmVzdGVkUHJvcHMubmVzdGVkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdpbmhlcml0JzpcbiAgICAgICAgICBuZXN0ZWQgPSBwcm9wcy5hbGlnbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXN0ZWQgPSBwcm9wcy5hbGlnbiA9PSAnbGVmdCcgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgfVxuXG4gICAgICBsZXQgaWNvbiA9IDxzcGFuIGNsYXNzTmFtZT17YGZhIGZhLWNoZXZyb24tJHtuZXN0ZWR9YH0gLz5cbiAgICAgIHRvZ2dsZSA9IChcbiAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICB7bmVzdGVkID09PSAnbGVmdCcgJiYgaWNvbn1cbiAgICAgICAgICBIb3ZlciBmb3IgTmVzdGVkIG1lbnVcbiAgICAgICAgICB7bmVzdGVkID09PSAncmlnaHQnICYmIGljb259XG4gICAgICAgIDwvYT5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxEcm9wZG93bk1lbnUgey4uLnByb3BzfSB7Li4ub3B0c30+XG4gICAgICAgIDxsaT48YSBocmVmPVwiI1wiPkxpbmsgRXhhbXBsZTwvYT48L2xpPlxuICAgICAgICA8bGk+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5vbkNsaWNrfT5CdXR0b24gRXhhbXBsZTwvYnV0dG9uPjwvbGk+XG4gICAgICAgIHthZGRpdGlvbmFsSXRlbXN9XG4gICAgICAgIHtuZXN0ZWRQcm9wcyAmJlxuICAgICAgICA8TmVzdGVkRHJvcGRvd25NZW51IHRvZ2dsZT17dG9nZ2xlfSB7Li4ubmVzdGVkUHJvcHN9PlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldvb3AgV29vcDwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPlRoYXRzIHRoZSBTb3VuZCBvZjwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPlRoZSBQb2xpY2U8L2E+PC9saT5cbiAgICAgICAgPC9OZXN0ZWREcm9wZG93bk1lbnU+XG4gICAgICAgIH1cbiAgICAgIDwvRHJvcGRvd25NZW51PlxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTmVzdGVkRHJvcGRvd25NZW51IH0gZnJvbSAnLi4vaW5kZXgnXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHRleHQ6ICdEZWZhdWx0IHNldHRpbmdzJyxcbiAgfSxcbiAge1xuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ0FsaWduIExlZnQnLFxuICB9LFxuICB7XG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0FsaWduIFJpZ2h0JyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHRleHQ6ICdJbnZlcnNlIFdpdGggQWxpZ24gQ2VudGVyJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBXaXRoIEFsaWduIExlZnQgTXVsdGktTmVzdGVkIE1lbnVzJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IChcbiAgICAgIDxOZXN0ZWREcm9wZG93bk1lbnUgdG9nZ2xlPXs8YSBocmVmPVwiI1wiPk11bHRpLWxldmVsIE1lbnU8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgLz48L2E+fT5cbiAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+V2VlIHdvb288L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+V2VlIHdvb288L2E+PC9saT5cbiAgICAgICAgPGxpIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJzZXBhcmF0b3JcIiAvPlxuICAgICAgICA8TmVzdGVkRHJvcGRvd25NZW51IHRvZ2dsZT17PGEgaHJlZj1cIiNcIj5NdWx0aS1sZXZlbCBNZW51PHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiIC8+PC9hPn0+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+V2VlIHdvb28gMTwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vIDI8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5XZWUgd29vbyAzPC9hPjwvbGk+XG4gICAgICAgICAgPE5lc3RlZERyb3Bkb3duTWVudSB0b2dnbGU9ezxhIGhyZWY9XCIjXCI+TXVsdGktbGV2ZWwgTWVudTxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tcmlnaHRcIiAvPjwvYT59PlxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+SSBUaGluayBZb3UgR290IEl0PC9hPjwvbGk+XG4gICAgICAgICAgPC9OZXN0ZWREcm9wZG93bk1lbnU+XG4gICAgICAgIDwvTmVzdGVkRHJvcGRvd25NZW51PlxuICAgICAgPC9OZXN0ZWREcm9wZG93bk1lbnU+XG4gICAgKSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2UgV2l0aCBBbGlnbiBSaWdodCBBbmlhbXRlZCBNdWx0aS1OZXN0ZWQgTWVudXMnLFxuICAgIGFkZGl0aW9uYWxJdGVtczogKFxuICAgICAgPE5lc3RlZERyb3Bkb3duTWVudSBhbmltYXRlPXt0cnVlfSB0b2dnbGU9ezxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1sZWZ0XCIgLz5NdWx0aS1sZXZlbCBNZW51PC9hPn0+XG4gICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vPC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vPC9hPjwvbGk+XG4gICAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz5cbiAgICAgICAgPE5lc3RlZERyb3Bkb3duTWVudSBhbmltYXRlPXt0cnVlfSB0b2dnbGU9ezxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1sZWZ0XCIgLz5NdWx0aS1sZXZlbCBNZW51PC9hPn0+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+V2VlIHdvb28gMTwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vIDI8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5XZWUgd29vbyAzPC9hPjwvbGk+XG4gICAgICAgICAgPE5lc3RlZERyb3Bkb3duTWVudSBhbmltYXRlPXt0cnVlfSB0b2dnbGU9ezxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1sZWZ0XCIgLz5NdWx0aS1sZXZlbCBNZW51PC9hPn0+XG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5JIFRoaW5rIFlvdSBHb3QgSXQ8L2E+PC9saT5cbiAgICAgICAgICA8L05lc3RlZERyb3Bkb3duTWVudT5cbiAgICAgICAgPC9OZXN0ZWREcm9wZG93bk1lbnU+XG4gICAgICA8L05lc3RlZERyb3Bkb3duTWVudT5cbiAgICApLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgYW5pbUFsaWduOiAnbGVmdCcsXG4gICAgbWVudUFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIEFuaW0gTGVmdCwgTWVudSBSaWdodCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICBzaXplOiAnc20nLFxuICAgIHRleHQ6ICdMZWZ0IEFsaWduLCBUZXh0IFJpZ2h0IFNtYWxsJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgc2l6ZTogJ21kJyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBSaWdodCBNZWRpdW0nLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICBzaXplOiAnbGcnLFxuICAgIHRleHQ6ICdMZWZ0IEFsaWduIExhcmdlJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICBhbmltQWxpZ246IG51bGwsXG4gICAgdGV4dEFsaWduOiBudWxsLFxuICAgIG1lbnVBbGlnbjogbnVsbCxcbiAgICBzaXplOiBudWxsLFxuICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICB0ZXh0OiAnRGVmYXVsdCB3aXRoIFNvbWUgXFwnSXBzdW1cXCcnLFxuICAgIGFkZGl0aW9uYWxJdGVtczogPGxpPjxhIGhyZWY9XCIjXCI+TG9yZW0gSXBzdW0gUHJldGVuZCBUaGlzIGlzIEFjdHVhbGx5IGlwc3VtPC9hPjwvbGk+XG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnRGVmYXVsdCB3aXRoIGEgZmV3IHNlcGFyYXRvcnMnLFxuICAgIGFkZGl0aW9uYWxJdGVtczogW1xuICAgICAgPGxpIGtleT1cInNlcDFcIiByb2xlPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwid29vcFwiPjxhIGhyZWY9XCIjXCI+V29vcCBXb29wPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cInNlcDJcIiBjbGFzc05hbWU9XCJzZXBhcmF0b3JcIiAvPixcbiAgICAgIDxsaSBrZXk9XCJmcmVkXCI+PGEgaHJlZj1cIiNcIj5GcmVkIEZsaW5zdG9uZTwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJndWFjXCI+PGEgaHJlZj1cIiNcIj5HdWFjYW1vbGU8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwic2VwM1wiIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJzZXBhcmF0b3JcIiAvPixcbiAgICAgIDxsaSBrZXk9XCJzb21lXCI+PGEgaHJlZj1cIiNcIj5Tb21ldGhpbmc8L2E+PC9saT5cbiAgICBdLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnSW52ZXJzZSB3aXRoIGEgZmV3IHNlcGFyYXRvcnMnLFxuICAgIGFkZGl0aW9uYWxJdGVtczogW1xuICAgICAgPGxpIGtleT1cInNlcDFcIiByb2xlPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwid29vcFwiPjxhIGhyZWY9XCIjXCI+V29vcCBXb29wPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cInNlcDJcIiBjbGFzc05hbWU9XCJzZXBhcmF0b3JcIiAvPixcbiAgICAgIDxsaSBrZXk9XCJmcmVkXCI+PGEgaHJlZj1cIiNcIj5GcmVkIEZsaW5zdG9uZTwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJndWFjXCI+PGEgaHJlZj1cIiNcIj5HdWFjYW1vbGU8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwic2VwM1wiIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJzZXBhcmF0b3JcIiAvPixcbiAgICAgIDxsaSBrZXk9XCJzb21lXCI+PGEgaHJlZj1cIiNcIj5Tb21ldGhpbmc8L2E+PC9saT5cbiAgICBdLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0OiAnVXB3YXJkcyBMZWZ0IEFsaWduJyxcbiAgICB1cHdhcmRzOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgdGV4dDogJ0ludmVyc2UgVXB3YXJkcyBDZW50ZXIgQWxpZ24nLFxuICAgIHVwd2FyZHM6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnVXB3YXJkcyBSaWdodCBBbGlnbicsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ0RlZmF1bHQgTGVmdCBOZXN0ZWQgTWVudScsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgICBuZXN0ZWRQcm9wczoge1xuICAgICAgYW5pbWF0ZTogZmFsc2UsXG4gICAgfVxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBSaWdodCBOZXN0ZWQgTWVudSBBbmltYXRlZCcsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgICBuZXN0ZWRQcm9wczoge1xuICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgIHVwd2FyZHM6IHRydWUsXG4gICAgfVxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHQ6ICdEZWZhdWx0IE5lc3RlZCBNZW51IE5lc3RlZCBJbmhlcml0JyxcbiAgICB1cHdhcmRzOiB0cnVlLFxuICAgIG5lc3RlZFByb3BzOiB7XG4gICAgICBuZXN0ZWQ6ICdpbmhlcml0JyxcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdEZWZhdWx0IE5lc3RlZCBNZW51IEFuaW1hdGUgTGVmdCcsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgICBuZXN0ZWRQcm9wczoge1xuICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgIGRpcmVjdGlvbjogJ2xlZnQnLFxuICAgICAgdXB3YXJkczogdHJ1ZSxcbiAgICB9XG4gIH0sXG4vL3tcbi8vICBpbnZlcnNlOiBmYWxzZSxcbi8vICBhbGlnbjogJ2NlbnRlcicsXG4vLyAgYW5pbUFsaWduOiBudWxsLFxuLy8gIHRleHRBbGlnbjogbnVsbCxcbi8vICBtZW51QWxpZ246IG51bGwsXG4vLyAgc2l6ZTogbnVsbCxcbi8vICBjbGFzc05hbWU6IG51bGwsXG4vLyAgdGV4dDogJ0RlZmF1bHQgd2l0aCBTb21lIFxcJ0lwc3VtXFwnJyxcbi8vICBhZGRpdGlvbmFsSXRlbXM6IDxsaT48YSBocmVmPVwiI1wiPkxvcmVtIElwc3VtIFByZXRlbmQgVGhpcyBpcyBBY3R1YWxseSBpcHN1bTwvYT48L2xpPlxuLy99LFxuXVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgRXhhbXBsZSBmcm9tICcuL0V4YW1wbGUnXG5cblJlYWN0LnJlbmRlcig8RXhhbXBsZSAvPiwgZG9jdW1lbnQuYm9keSk7XG4iXX0=
