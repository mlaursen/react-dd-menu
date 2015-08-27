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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvY29kZS9yZWFjdC1kZC1tZW51L3NyYy9pbmRleC5qcyIsIi9jb2RlL3JlYWN0LWRkLW1lbnUvc3JjL2pzL0V4YW1wbGUuanMiLCIvY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9PcHRpb25zLmpzIiwiL2NvZGUvcmVhY3QtZGQtbWVudS9zcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OzsyQkFFZ0MsY0FBYzs7OzswQkFDbkMsWUFBWTs7OztBQUduQyxJQUFNLGtCQUFrQixHQUFHLHlCQUFNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztBQUMzRCxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDZCxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRXBCLElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDOztJQUUzQixZQUFZO1lBQVosWUFBWTs7QUFDTCxXQURQLFlBQVksQ0FDSixLQUFLLEVBQUU7MEJBRGYsWUFBWTs7QUFFZCwrQkFGRSxZQUFZLDZDQUVSLEtBQUssRUFBRTtHQUNkOztlQUhHLFlBQVk7O1dBS0UsNEJBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUN2QyxVQUFJLFNBQVMsR0FBRyx5QkFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2RCxVQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUN6Qyw2QkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUzRCxnQkFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0FBQzFELGlCQUFTLENBQUMsZ0JB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U0FBTyxFQUFFLElBQUk7QUFDYixPQUFLLEVBQUUsT0FBTztBQUNkLE1BQUksRUFBRSxvQ0FBb0M7QUFDMUMsU0FBTyxFQUFFLElBQUk7QUFDYixhQUFXLEVBQUU7QUFDWCxXQUFPLEVBQUUsSUFBSTtBQUNiLFdBQU8sRUFBRSxJQUFJO0dBQ2Q7Q0FDRixFQUNEO0FBQ0UsU0FBTyxFQUFFLElBQUk7QUFDYixPQUFLLEVBQUUsTUFBTTtBQUNiLE1BQUksRUFBRSxvQ0FBb0M7QUFDMUMsU0FBTyxFQUFFLElBQUk7QUFDYixhQUFXLEVBQUU7QUFDWCxVQUFNLEVBQUUsU0FBUztHQUNsQjtDQUNGLEVBQ0Q7QUFDRSxTQUFPLEVBQUUsSUFBSTtBQUNiLE9BQUssRUFBRSxPQUFPO0FBQ2QsTUFBSSxFQUFFLGtDQUFrQztBQUN4QyxTQUFPLEVBQUUsSUFBSTtBQUNiLGFBQVcsRUFBRTtBQUNYLFdBQU8sRUFBRSxJQUFJO0FBQ2IsYUFBUyxFQUFFLE1BQU07QUFDakIsV0FBTyxFQUFFLElBQUk7R0FDZDtDQUNGLENBWUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ2pNaUIsT0FBTzs7Ozt1QkFFTCxXQUFXOzs7O0FBRS9CLG1CQUFNLE1BQU0sQ0FBQyw0REFBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QvYWRkb25zJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuXG5jb25zdCBDU1NUcmFuc2l0aW9uR3JvdXAgPSBSZWFjdC5hZGRvbnMuQ1NTVHJhbnNpdGlvbkdyb3VwO1xuY29uc3QgVEFCID0gOTtcbmNvbnN0IFNQQUNFQkFSID0gMzI7XG5cbmxldCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgPSBudWxsO1xuXG5jbGFzcyBEcm9wZG93bk1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIHZhciBtZW51SXRlbXMgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWVudUl0ZW1zKTtcbiAgICBpZih0aGlzLnByb3BzLmlzT3BlbiAmJiAhcHJldlByb3BzLmlzT3Blbikge1xuICAgICAgX2xhc3RXaW5kb3dDbGlja0V2ZW50ID0gdGhpcy5oYW5kbGVDbGlja091dHNpZGUuYmluZCh0aGlzKTtcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfbGFzdFdpbmRvd0NsaWNrRXZlbnQpO1xuICAgICAgbWVudUl0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcm9wcy5jbG9zZSk7XG4gICAgICBtZW51SXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignb25rZXlkb3duJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYoIXRoaXMucHJvcHMuaXNPcGVuICYmIHByZXZQcm9wcy5pc09wZW4pIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2xhc3RXaW5kb3dDbGlja0V2ZW50KTtcbiAgICAgIG1lbnVJdGVtcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJvcHMuY2xvc2UpO1xuICAgICAgbWVudUl0ZW1zLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29ua2V5ZG93bicsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG5cbiAgICAgIF9sYXN0V2luZG93Q2xpY2tFdmVudCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgX2xhc3RXaW5kb3dDbGlja0V2ZW50ICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2xhc3RXaW5kb3dDbGlja0V2ZW50KTtcbiAgfVxuXG4gIGNsb3NlKGUpIHtcbiAgICBsZXQga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAga2V5ID09PSBTUEFDRUJBUiAmJiB0aGlzLnByb3BzLmNsb3NlKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIFxuICBoYW5kbGVDbGlja091dHNpZGUoZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldCxcbiAgICAgIG5vZGUgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgIHdoaWxlKHRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICBpZih0YXJnZXQgPT09IG5vZGUpIHsgcmV0dXJuIH1cblxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLmNsb3NlKGUpO1xuICB9XG5cbiAgaGFuZGxlS2V5RG93bihlKSB7XG4gICAgbGV0IGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmKGtleSAhPT0gVEFCKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGl0ZW1zID0gUmVhY3QuZmluZERPTU5vZGUodGhpcykucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLGEnKTtcbiAgICBsZXQgaWQgPSBlLnNoaWZ0S2V5ID8gMSA6IGl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgXG4gICAgZS50YXJnZXQgPT0gaXRlbXNbaWRdICYmIHRoaXMucHJvcHMuY2xvc2UoZSk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgeyBpc09wZW4sIHRvZ2dsZSwgY2xhc3NOYW1lLCBpbnZlcnNlLCBhbGlnbiwgYW5pbUFsaWduLCB0ZXh0QWxpZ24sIG1lbnVBbGlnbiwgY2hpbGRyZW4sIHNpemUsIHVwd2FyZHMgfSA9IHRoaXMucHJvcHM7IFxuXG4gICAgbGV0IG1lbnVDbGFzc05hbWUgPSBjbGFzc25hbWVzKFxuICAgICAgJ2RkLW1lbnUnLFxuICAgICAgJ2RkLW1lbnUtJyArIChtZW51QWxpZ24gfHwgYWxpZ24pLFxuICAgICAgeyAnZGQtbWVudS1pbnZlcnNlJzogaW52ZXJzZSB9LFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgc2l6ZSA/ICgnZGQtbWVudS0nICsgc2l6ZSkgOiBudWxsXG4gICAgKVxuXG4gICAgbGV0IGxpc3RDbGFzc05hbWUgPSAnZGQtaXRlbXMtJyArICh0ZXh0QWxpZ24gfHwgYWxpZ24pO1xuICAgIGxldCB0cmFuc2l0aW9uUHJvcHMgPSB7XG4gICAgICB0cmFuc2l0aW9uTmFtZTogJ2dyb3ctZnJvbS0nICsgKHVwd2FyZHMgPyAndXAtJyA6ICcnKSArIChhbmltQWxpZ24gfHwgYWxpZ24pLFxuICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcygnZGQtbWVudS1pdGVtcycsIHsgJ2RkLWl0ZW1zLXVwd2FyZHMnOiB1cHdhcmRzIH0pLFxuICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKSxcbiAgICAgIHJlZjogJ21lbnVJdGVtcycsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVudUNsYXNzTmFtZX0+XG4gICAgICAgIHt0b2dnbGV9XG4gICAgICAgIDxDU1NUcmFuc2l0aW9uR3JvdXAgey4uLnRyYW5zaXRpb25Qcm9wc30+XG4gICAgICAgICAge2lzT3BlbiAmJiA8dWwgY2xhc3NOYW1lPXtsaXN0Q2xhc3NOYW1lfT57Y2hpbGRyZW59PC91bD59XG4gICAgICAgIDwvQ1NTVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ecm9wZG93bk1lbnUucHJvcFR5cGVzID0ge1xuICBpc09wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0b2dnbGU6IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGludmVyc2U6IFByb3BUeXBlcy5ib29sLFxuICBhbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIGFuaW1BbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIHRleHRBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIG1lbnVBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2l6ZTogUHJvcFR5cGVzLm9uZU9mKFsnc20nLCAnbWQnLCAnbGcnLCAneGwnXSksXG4gIHVwd2FyZHM6IFByb3BUeXBlcy5ib29sLFxufVxuXG5Ecm9wZG93bk1lbnUuZGVmYXVsdFByb3BzID0ge1xuICBpbnZlcnNlOiBmYWxzZSxcbiAgYWxpZ246ICdjZW50ZXInLFxuICBhbmltQWxpZ246IG51bGwsXG4gIHRleHRBbGlnbjogbnVsbCxcbiAgbWVudUFsaWduOiBudWxsLFxuICBjbGFzc05hbWU6IG51bGwsXG4gIHNpemU6IG51bGwsXG4gIHVwd2FyZHM6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd25NZW51XG5cblxuY2xhc3MgTmVzdGVkRHJvcGRvd25NZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7IGlzT3BlbjogZmFsc2UgfVxuICB9XG5cbiAgc2V0T3Blbihpc09wZW4pIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNPcGVuOiBpc09wZW4gfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgeyB0b2dnbGUsIGNoaWxkcmVuLCBuZXN0ZWQsIGFuaW1hdGUsIGRpcmVjdGlvbiwgdXB3YXJkcyB9ID0gdGhpcy5wcm9wc1xuICAgIGxldCB7IGlzT3BlbiB9ID0gdGhpcy5zdGF0ZVxuXG4gICAgbGV0IGl0ZW1Qcm9wcyA9IHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcygnbmVzdGVkLWRkLW1lbnUnLCBgbmVzdGVkLSR7bmVzdGVkfWApLFxuICAgICAgb25Nb3VzZU92ZXI6IHRoaXMuc2V0T3Blbi5iaW5kKHRoaXMsIHRydWUpLFxuICAgICAgb25Nb3VzZUxlYXZlOiB0aGlzLnNldE9wZW4uYmluZCh0aGlzLCBmYWxzZSksXG4gICAgICBvbkZvY3VzOiB0aGlzLnNldE9wZW4uYmluZCh0aGlzLCB0cnVlKSxcbiAgICAgIG9uQmx1cjogdGhpcy5zZXRPcGVuLmJpbmQodGhpcywgZmFsc2UpLFxuICAgIH1cblxuICAgIGxldCBwcmVmaXggPSB1cHdhcmRzID8gJ3VwLScgOiAnJ1xuICAgIGxldCB0cmFuc2l0aW9uUHJvcHMgPSB7XG4gICAgICBjbGFzc05hbWU6ICdkZC1pdGVtLWlnbm9yZScsXG4gICAgICB0cmFuc2l0aW9uRW50ZXI6IGFuaW1hdGUsXG4gICAgICB0cmFuc2l0aW9uTGVhdmU6IGFuaW1hdGUsXG4gICAgICB0cmFuc2l0aW9uTmFtZTogYGdyb3ctZnJvbS0ke3ByZWZpeH0ke2RpcmVjdGlvbn1gLFxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgey4uLml0ZW1Qcm9wc30+XG4gICAgICAgIHt0b2dnbGV9XG4gICAgICAgIDxDU1NUcmFuc2l0aW9uR3JvdXAgey4uLnRyYW5zaXRpb25Qcm9wc30+XG4gICAgICAgICAge2lzT3BlbiA/IDx1bCBrZXk9XCJpdGVtc1wiPntjaGlsZHJlbn08L3VsPiA6IG51bGx9XG4gICAgICAgIDwvQ1NTVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgPC9saT5cbiAgICApXG4gIH1cbn1cblxuTmVzdGVkRHJvcGRvd25NZW51LnByb3BUeXBlcyA9IHtcbiAgdG9nZ2xlOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBuZXN0ZWQ6IFByb3BUeXBlcy5vbmVPZihbJ2luaGVyaXQnLCAncmV2ZXJzZScsICdsZWZ0JywgJ3JpZ2h0J10pLFxuICBhbmltYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgZGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxuICB1cHdhcmRzOiBQcm9wVHlwZXMuYm9vbCxcbn1cblxuTmVzdGVkRHJvcGRvd25NZW51LmRlZmF1bHRQcm9wcyA9IHtcbiAgbmVzdGVkOiAncmV2ZXJzZScsXG4gIGFuaW1hdGU6IGZhbHNlLFxuICBkaXJlY3Rpb246ICdyaWdodCcsXG4gIHVwd2FyZHM6IGZhbHNlLFxufVxuXG5leHBvcnQgeyBOZXN0ZWREcm9wZG93bk1lbnUgfVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IERyb3Bkb3duTWVudSwgeyBOZXN0ZWREcm9wZG93bk1lbnUgfSBmcm9tICcuLi9pbmRleCdcblxuY2xhc3MgRXhhbXBsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJleGFtcGxlXCI+XG4gICAgICAgIDxoZWFkZXI+PGgxPlJlYWN0IERyb3Bkb3duIE1lbnUgRXhhbXBsZTwvaDE+PC9oZWFkZXI+XG4gICAgICAgIDxtYWluPlxuICAgICAgICAgIHtPcHRpb25zLm1hcChvcHRzID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8TWVudSB7Li4ub3B0c30ga2V5PXtvcHRzLnRleHR9IC8+XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvbWFpbj5cbiAgICAgICAgPGZvb3Rlcj5cbiAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2dpdGh1Yi5jb20vbWxhdXJzZW4vcmVhY3QtZGQtbWVudVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtZ2l0aHViIGZhLTR4XCIgLz5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGVcblxuY2xhc3MgTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHsgaXNPcGVuOiBmYWxzZSB9XG4gIH1cblxuICB0b2dnbGVNZW51KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlbiB9KVxuICB9XG5cbiAgY2xvc2VNZW51KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46IGZhbHNlIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgaXNPcGVuIH0gPSB0aGlzLnN0YXRlXG4gICAgbGV0IHsgdGV4dCwgYWRkaXRpb25hbEl0ZW1zLCBuZXN0ZWRQcm9wcywgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgIGNsb3NlOiB0aGlzLmNsb3NlTWVudS5iaW5kKHRoaXMpLFxuICAgICAgaXNPcGVuOiBpc09wZW4sXG4gICAgICB0b2dnbGU6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3RhYicsIHsgJ2FjdGl2ZSc6IGlzT3BlbiB9KX0+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy50b2dnbGVNZW51LmJpbmQodGhpcyl9Pnt0ZXh0fTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG5cbiAgICBsZXQgdG9nZ2xlID0gbnVsbFxuICAgIGlmKG5lc3RlZFByb3BzKSB7XG4gICAgICBsZXQgbmVzdGVkID0gbnVsbFxuICAgICAgc3dpdGNoKG5lc3RlZFByb3BzLm5lc3RlZCkge1xuICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIG5lc3RlZCA9IG5lc3RlZFByb3BzLm5lc3RlZDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5oZXJpdCc6XG4gICAgICAgICAgbmVzdGVkID0gcHJvcHMuYWxpZ247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmVzdGVkID0gcHJvcHMuYWxpZ24gPT0gJ2xlZnQnID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgIH1cblxuICAgICAgbGV0IGljb24gPSA8c3BhbiBjbGFzc05hbWU9e2BmYSBmYS1jaGV2cm9uLSR7bmVzdGVkfWB9IC8+XG4gICAgICB0b2dnbGUgPSAoXG4gICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAge25lc3RlZCA9PT0gJ2xlZnQnICYmIGljb259XG4gICAgICAgICAgSG92ZXIgZm9yIE5lc3RlZCBtZW51XG4gICAgICAgICAge25lc3RlZCA9PT0gJ3JpZ2h0JyAmJiBpY29ufVxuICAgICAgICA8L2E+XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25NZW51IHsuLi5wcm9wc30gey4uLm9wdHN9PlxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5MaW5rIEV4YW1wbGU8L2E+PC9saT5cbiAgICAgICAgPGxpPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMub25DbGlja30+QnV0dG9uIEV4YW1wbGU8L2J1dHRvbj48L2xpPlxuICAgICAgICB7YWRkaXRpb25hbEl0ZW1zfVxuICAgICAgICB7bmVzdGVkUHJvcHMgJiZcbiAgICAgICAgPE5lc3RlZERyb3Bkb3duTWVudSB0b2dnbGU9e3RvZ2dsZX0gey4uLm5lc3RlZFByb3BzfT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5Xb29wIFdvb3A8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5UaGF0cyB0aGUgU291bmQgb2Y8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5UaGUgUG9saWNlPC9hPjwvbGk+XG4gICAgICAgIDwvTmVzdGVkRHJvcGRvd25NZW51PlxuICAgICAgICB9XG4gICAgICA8L0Ryb3Bkb3duTWVudT5cbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5lc3RlZERyb3Bkb3duTWVudSB9IGZyb20gJy4uL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB0ZXh0OiAnRGVmYXVsdCBzZXR0aW5ncycsXG4gIH0sXG4gIHtcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHQ6ICdBbGlnbiBMZWZ0JyxcbiAgfSxcbiAge1xuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdBbGlnbiBSaWdodCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBXaXRoIEFsaWduIENlbnRlcicsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ0ludmVyc2UgV2l0aCBBbGlnbiBMZWZ0IE11bHRpLU5lc3RlZCBNZW51cycsXG4gICAgYWRkaXRpb25hbEl0ZW1zOiAoXG4gICAgICA8TmVzdGVkRHJvcGRvd25NZW51IHRvZ2dsZT17PGEgaHJlZj1cIiNcIj5NdWx0aS1sZXZlbCBNZW51PHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiIC8+PC9hPn0+XG4gICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vPC9hPjwvbGk+XG4gICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vPC9hPjwvbGk+XG4gICAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz5cbiAgICAgICAgPE5lc3RlZERyb3Bkb3duTWVudSB0b2dnbGU9ezxhIGhyZWY9XCIjXCI+TXVsdGktbGV2ZWwgTWVudTxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tcmlnaHRcIiAvPjwvYT59PlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vIDE8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5XZWUgd29vbyAyPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+V2VlIHdvb28gMzwvYT48L2xpPlxuICAgICAgICAgIDxOZXN0ZWREcm9wZG93bk1lbnUgdG9nZ2xlPXs8YSBocmVmPVwiI1wiPk11bHRpLWxldmVsIE1lbnU8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgLz48L2E+fT5cbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPkkgVGhpbmsgWW91IEdvdCBJdDwvYT48L2xpPlxuICAgICAgICAgIDwvTmVzdGVkRHJvcGRvd25NZW51PlxuICAgICAgICA8L05lc3RlZERyb3Bkb3duTWVudT5cbiAgICAgIDwvTmVzdGVkRHJvcGRvd25NZW51PlxuICAgICksXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIFdpdGggQWxpZ24gUmlnaHQgQW5pYW10ZWQgTXVsdGktTmVzdGVkIE1lbnVzJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IChcbiAgICAgIDxOZXN0ZWREcm9wZG93bk1lbnUgYW5pbWF0ZT17dHJ1ZX0gdG9nZ2xlPXs8YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiIC8+TXVsdGktbGV2ZWwgTWVudTwvYT59PlxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5XZWUgd29vbzwvYT48L2xpPlxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5XZWUgd29vbzwvYT48L2xpPlxuICAgICAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cInNlcGFyYXRvclwiIC8+XG4gICAgICAgIDxOZXN0ZWREcm9wZG93bk1lbnUgYW5pbWF0ZT17dHJ1ZX0gdG9nZ2xlPXs8YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiIC8+TXVsdGktbGV2ZWwgTWVudTwvYT59PlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPldlZSB3b29vIDE8L2E+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj5XZWUgd29vbyAyPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+V2VlIHdvb28gMzwvYT48L2xpPlxuICAgICAgICAgIDxOZXN0ZWREcm9wZG93bk1lbnUgYW5pbWF0ZT17dHJ1ZX0gdG9nZ2xlPXs8YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiIC8+TXVsdGktbGV2ZWwgTWVudTwvYT59PlxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCI+SSBUaGluayBZb3UgR290IEl0PC9hPjwvbGk+XG4gICAgICAgICAgPC9OZXN0ZWREcm9wZG93bk1lbnU+XG4gICAgICAgIDwvTmVzdGVkRHJvcGRvd25NZW51PlxuICAgICAgPC9OZXN0ZWREcm9wZG93bk1lbnU+XG4gICAgKSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIGFuaW1BbGlnbjogJ2xlZnQnLFxuICAgIG1lbnVBbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBBbmltIExlZnQsIE1lbnUgUmlnaHQnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgc2l6ZTogJ3NtJyxcbiAgICB0ZXh0OiAnTGVmdCBBbGlnbiwgVGV4dCBSaWdodCBTbWFsbCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHNpemU6ICdtZCcsXG4gICAgdGV4dDogJ0ludmVyc2UgUmlnaHQgTWVkaXVtJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgc2l6ZTogJ2xnJyxcbiAgICB0ZXh0OiAnTGVmdCBBbGlnbiBMYXJnZScsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgYW5pbUFsaWduOiBudWxsLFxuICAgIHRleHRBbGlnbjogbnVsbCxcbiAgICBtZW51QWxpZ246IG51bGwsXG4gICAgc2l6ZTogbnVsbCxcbiAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgdGV4dDogJ0RlZmF1bHQgd2l0aCBTb21lIFxcJ0lwc3VtXFwnJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IDxsaT48YSBocmVmPVwiI1wiPkxvcmVtIElwc3VtIFByZXRlbmQgVGhpcyBpcyBBY3R1YWxseSBpcHN1bTwvYT48L2xpPlxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0RlZmF1bHQgd2l0aCBhIGZldyBzZXBhcmF0b3JzJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IFtcbiAgICAgIDxsaSBrZXk9XCJzZXAxXCIgcm9sZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cIndvb3BcIj48YSBocmVmPVwiI1wiPldvb3AgV29vcDwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJzZXAyXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwiZnJlZFwiPjxhIGhyZWY9XCIjXCI+RnJlZCBGbGluc3RvbmU8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwiZ3VhY1wiPjxhIGhyZWY9XCIjXCI+R3VhY2Ftb2xlPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cInNlcDNcIiByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwic29tZVwiPjxhIGhyZWY9XCIjXCI+U29tZXRoaW5nPC9hPjwvbGk+XG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2Ugd2l0aCBhIGZldyBzZXBhcmF0b3JzJyxcbiAgICBhZGRpdGlvbmFsSXRlbXM6IFtcbiAgICAgIDxsaSBrZXk9XCJzZXAxXCIgcm9sZT1cInNlcGFyYXRvclwiIC8+LFxuICAgICAgPGxpIGtleT1cIndvb3BcIj48YSBocmVmPVwiI1wiPldvb3AgV29vcDwvYT48L2xpPixcbiAgICAgIDxsaSBrZXk9XCJzZXAyXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwiZnJlZFwiPjxhIGhyZWY9XCIjXCI+RnJlZCBGbGluc3RvbmU8L2E+PC9saT4sXG4gICAgICA8bGkga2V5PVwiZ3VhY1wiPjxhIGhyZWY9XCIjXCI+R3VhY2Ftb2xlPC9hPjwvbGk+LFxuICAgICAgPGxpIGtleT1cInNlcDNcIiByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwic2VwYXJhdG9yXCIgLz4sXG4gICAgICA8bGkga2V5PVwic29tZVwiPjxhIGhyZWY9XCIjXCI+U29tZXRoaW5nPC9hPjwvbGk+XG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnbGVmdCcsXG4gICAgdGV4dDogJ1Vwd2FyZHMgTGVmdCBBbGlnbicsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHRleHQ6ICdJbnZlcnNlIFVwd2FyZHMgQ2VudGVyIEFsaWduJyxcbiAgICB1cHdhcmRzOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ1Vwd2FyZHMgUmlnaHQgQWxpZ24nLFxuICAgIHVwd2FyZHM6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHQ6ICdEZWZhdWx0IExlZnQgTmVzdGVkIE1lbnUnLFxuICAgIHVwd2FyZHM6IHRydWUsXG4gICAgbmVzdGVkUHJvcHM6IHtcbiAgICAgIGFuaW1hdGU6IGZhbHNlLFxuICAgIH1cbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgdGV4dDogJ0ludmVyc2UgUmlnaHQgTmVzdGVkIE1lbnUgQW5pbWF0ZWQnLFxuICAgIHVwd2FyZHM6IHRydWUsXG4gICAgbmVzdGVkUHJvcHM6IHtcbiAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICB1cHdhcmRzOiB0cnVlLFxuICAgIH1cbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0OiAnRGVmYXVsdCBOZXN0ZWQgTWVudSBOZXN0ZWQgSW5oZXJpdCcsXG4gICAgdXB3YXJkczogdHJ1ZSxcbiAgICBuZXN0ZWRQcm9wczoge1xuICAgICAgbmVzdGVkOiAnaW5oZXJpdCcsXG4gICAgfVxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnRGVmYXVsdCBOZXN0ZWQgTWVudSBBbmltYXRlIExlZnQnLFxuICAgIHVwd2FyZHM6IHRydWUsXG4gICAgbmVzdGVkUHJvcHM6IHtcbiAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICBkaXJlY3Rpb246ICdsZWZ0JyxcbiAgICAgIHVwd2FyZHM6IHRydWUsXG4gICAgfVxuICB9LFxuLy97XG4vLyAgaW52ZXJzZTogZmFsc2UsXG4vLyAgYWxpZ246ICdjZW50ZXInLFxuLy8gIGFuaW1BbGlnbjogbnVsbCxcbi8vICB0ZXh0QWxpZ246IG51bGwsXG4vLyAgbWVudUFsaWduOiBudWxsLFxuLy8gIHNpemU6IG51bGwsXG4vLyAgY2xhc3NOYW1lOiBudWxsLFxuLy8gIHRleHQ6ICdEZWZhdWx0IHdpdGggU29tZSBcXCdJcHN1bVxcJycsXG4vLyAgYWRkaXRpb25hbEl0ZW1zOiA8bGk+PGEgaHJlZj1cIiNcIj5Mb3JlbSBJcHN1bSBQcmV0ZW5kIFRoaXMgaXMgQWN0dWFsbHkgaXBzdW08L2E+PC9saT5cbi8vfSxcbl1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi9FeGFtcGxlJ1xuXG5SZWFjdC5yZW5kZXIoPEV4YW1wbGUgLz4sIGRvY3VtZW50LmJvZHkpO1xuIl19
