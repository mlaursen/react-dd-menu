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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9tbGF1cnNlbi9jb2RlL3JlYWN0LWRkLW1lbnUvc3JjL2luZGV4LmpzIiwiL2hvbWUvbWxhdXJzZW4vY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9FeGFtcGxlLmpzIiwiL2hvbWUvbWxhdXJzZW4vY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9PcHRpb25zLmpzIiwiL2hvbWUvbWxhdXJzZW4vY29kZS9yZWFjdC1kZC1tZW51L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUVnQyxjQUFjOzs7OzBCQUNuQyxZQUFZOzs7O0FBR25DLElBQU0sa0JBQWtCLEdBQUcseUJBQU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQzNELElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7O0lBRTNCLFlBQVk7WUFBWixZQUFZOztBQUNMLFdBRFAsWUFBWSxDQUNKLEtBQUssRUFBRTswQkFEZixZQUFZOztBQUVkLCtCQUZFLFlBQVksNkNBRVIsS0FBSyxFQUFFO0dBQ2Q7O2VBSEcsWUFBWTs7V0FLRSw0QkFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO0FBQ3ZDLFVBQUksU0FBUyxHQUFHLHlCQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZELFVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3pDLDZCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTNELGdCQUFRLENBQUMsZ0JB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QVMsRUFBRSxJQUFJO0FBQ2YsV0FBUyxFQUFFLElBQUk7QUFDZixNQUFJLEVBQUUsSUFBSTtBQUNWLFdBQVMsRUFBRSxJQUFJO0FBQ2YsTUFBSSxFQUFFLDZCQUE2QjtBQUNuQyxpQkFBZSxFQUFFOzs7SUFBSTs7UUFBRyxJQUFJLEVBQUMsR0FBRzs7S0FBK0M7R0FBSztDQUNyRixDQVlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkM3RWlCLE9BQU87Ozs7dUJBRUwsV0FBVzs7OztBQUUvQixtQkFBTSxNQUFNLENBQUMsNERBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0L2FkZG9ucydcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5cblxuY29uc3QgQ1NTVHJhbnNpdGlvbkdyb3VwID0gUmVhY3QuYWRkb25zLkNTU1RyYW5zaXRpb25Hcm91cDtcbmNvbnN0IFRBQiA9IDk7XG5jb25zdCBTUEFDRUJBUiA9IDMyO1xuXG5sZXQgX2xhc3RXaW5kb3dDbGlja0V2ZW50ID0gbnVsbDtcblxuY2xhc3MgRHJvcGRvd25NZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICB2YXIgbWVudUl0ZW1zID0gUmVhY3QuZmluZERPTU5vZGUodGhpcy5yZWZzLm1lbnVJdGVtcyk7XG4gICAgaWYodGhpcy5wcm9wcy5pc09wZW4gJiYgIXByZXZQcm9wcy5pc09wZW4pIHtcbiAgICAgIF9sYXN0V2luZG93Q2xpY2tFdmVudCA9IHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlLmJpbmQodGhpcyk7XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2xhc3RXaW5kb3dDbGlja0V2ZW50KTtcbiAgICAgIG1lbnVJdGVtcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJvcHMuY2xvc2UpO1xuICAgICAgbWVudUl0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ29ua2V5ZG93bicsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIGlmKCF0aGlzLnByb3BzLmlzT3BlbiAmJiBwcmV2UHJvcHMuaXNPcGVuKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9sYXN0V2luZG93Q2xpY2tFdmVudCk7XG4gICAgICBtZW51SXRlbXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByb3BzLmNsb3NlKTtcbiAgICAgIG1lbnVJdGVtcy5yZW1vdmVFdmVudExpc3RlbmVyKCdvbmtleWRvd24nLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuXG4gICAgICBfbGFzdFdpbmRvd0NsaWNrRXZlbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIF9sYXN0V2luZG93Q2xpY2tFdmVudCAmJiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9sYXN0V2luZG93Q2xpY2tFdmVudCk7XG4gIH1cblxuICBjbG9zZShlKSB7XG4gICAgbGV0IGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGtleSA9PT0gU1BBQ0VCQVIgJiYgdGhpcy5wcm9wcy5jbG9zZSgpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBcbiAgaGFuZGxlQ2xpY2tPdXRzaWRlKGUpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuICAgIGZvcih2YXIgeCBpbiBjaGlsZHJlbikge1xuICAgICAgaWYoZS50YXJnZXQgPT0gY2hpbGRyZW5beF0pIHsgcmV0dXJuOyB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5jbG9zZShlKTtcbiAgfVxuXG4gIGhhbmRsZUtleURvd24oZSkge1xuICAgIGxldCBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZihrZXkgIT09IFRBQikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpdGVtcyA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbixhJyk7XG4gICAgbGV0IGlkID0gZS5zaGlmdEtleSA/IDEgOiBpdGVtcy5sZW5ndGggLSAxO1xuICAgIFxuICAgIGUudGFyZ2V0ID09IGl0ZW1zW2lkXSAmJiB0aGlzLnByb3BzLmNsb3NlKGUpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgaXNPcGVuLCB0b2dnbGUsIGNsYXNzTmFtZSwgaW52ZXJzZSwgYWxpZ24sIGFuaW1BbGlnbiwgdGV4dEFsaWduLCBtZW51QWxpZ24sIGNoaWxkcmVuLCBzaXplIH0gPSB0aGlzLnByb3BzOyBcblxuICAgIGxldCBtZW51Q2xhc3NOYW1lID0gY2xhc3NuYW1lcyhcbiAgICAgICdkZC1tZW51JyxcbiAgICAgICdkZC1tZW51LScgKyAobWVudUFsaWduIHx8IGFsaWduKSxcbiAgICAgIHsgJ2RkLW1lbnUtaW52ZXJzZSc6IGludmVyc2UgfSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHNpemUgPyAoJ2RkLW1lbnUtJyArIHNpemUpIDogbnVsbFxuICAgIClcblxuICAgIGxldCBsaXN0Q2xhc3NOYW1lID0gJ2RkLWl0ZW1zLScgKyAodGV4dEFsaWduIHx8IGFsaWduKTtcbiAgICBsZXQgdHJhbnNpdGlvblByb3BzID0ge1xuICAgICAgdHJhbnNpdGlvbk5hbWU6ICdncm93LWZyb20tJyArIChhbmltQWxpZ24gfHwgYWxpZ24pLFxuICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICAgIGNsYXNzTmFtZTogJ2RkLW1lbnUtaXRlbXMnLFxuICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKSxcbiAgICAgIHJlZjogJ21lbnVJdGVtcycsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bWVudUNsYXNzTmFtZX0+XG4gICAgICAgIHt0b2dnbGV9XG4gICAgICAgIDxDU1NUcmFuc2l0aW9uR3JvdXAgey4uLnRyYW5zaXRpb25Qcm9wc30+XG4gICAgICAgICAge2lzT3BlbiAmJiA8dWwgY2xhc3NOYW1lPXtsaXN0Q2xhc3NOYW1lfT57Y2hpbGRyZW59PC91bD59XG4gICAgICAgIDwvQ1NTVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ecm9wZG93bk1lbnUucHJvcFR5cGVzID0ge1xuICBpc09wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0b2dnbGU6IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGludmVyc2U6IFByb3BUeXBlcy5ib29sLFxuICBhbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIGFuaW1BbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIHRleHRBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIG1lbnVBbGlnbjogUHJvcFR5cGVzLm9uZU9mKFsnY2VudGVyJywgJ3JpZ2h0JywgJ2xlZnQnXSksXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2l6ZTogUHJvcFR5cGVzLm9uZU9mKFsnc20nLCAnbWQnLCAnbGcnLCAneGwnXSksXG59XG5cbkRyb3Bkb3duTWVudS5kZWZhdWx0UHJvcHMgPSB7XG4gIGludmVyc2U6IGZhbHNlLFxuICBhbGlnbjogJ2NlbnRlcicsXG4gIGFuaW1BbGlnbjogbnVsbCxcbiAgdGV4dEFsaWduOiBudWxsLFxuICBtZW51QWxpZ246IG51bGwsXG4gIGNsYXNzTmFtZTogbnVsbCxcbiAgc2l6ZTogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duTWVudTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5cbmltcG9ydCBPcHRpb25zIGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCBEcm9wZG93bk1lbnUgZnJvbSAnLi4vaW5kZXgnXG5cbmNsYXNzIEV4YW1wbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhhbXBsZVwiPlxuICAgICAgICA8aGVhZGVyPjxoMT5SZWFjdCBEcm9wZG93biBNZW51IEV4YW1wbGU8L2gxPjwvaGVhZGVyPlxuICAgICAgICA8bWFpbj5cbiAgICAgICAgICB7T3B0aW9ucy5tYXAob3B0cyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPE1lbnUgey4uLm9wdHN9IGtleT17b3B0cy50ZXh0fSAvPlxuICAgICAgICAgIH0pfVxuICAgICAgICA8L21haW4+XG4gICAgICAgIDxmb290ZXI+XG4gICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL21sYXVyc2VuL3JlYWN0LWRkLW1lbnVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWdpdGh1YiBmYS00eFwiIC8+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeGFtcGxlXG5cbmNsYXNzIE1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7IGlzT3BlbjogZmFsc2UgfVxuICB9XG5cbiAgdG9nZ2xlTWVudSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNPcGVuOiAhdGhpcy5zdGF0ZS5pc09wZW4gfSlcbiAgfVxuXG4gIGNsb3NlTWVudSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNPcGVuOiBmYWxzZSB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCB7IGlzT3BlbiB9ID0gdGhpcy5zdGF0ZVxuICAgIGxldCB7IHRleHQsIGFkZGl0aW9uYWxJdGVtcywgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgIGNsb3NlOiB0aGlzLmNsb3NlTWVudS5iaW5kKHRoaXMpLFxuICAgICAgaXNPcGVuOiBpc09wZW4sXG4gICAgICB0b2dnbGU6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3RhYicsIHsgJ2FjdGl2ZSc6IGlzT3BlbiB9KX0+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy50b2dnbGVNZW51LmJpbmQodGhpcyl9Pnt0ZXh0fTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxEcm9wZG93bk1lbnUgey4uLnByb3BzfSB7Li4ub3B0c30+XG4gICAgICAgIDxsaT48YSBocmVmPVwiI1wiPkxpbmsgRXhhbXBsZTwvYT48L2xpPlxuICAgICAgICA8bGk+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5vbkNsaWNrfT5CdXR0b24gRXhhbXBsZTwvYnV0dG9uPjwvbGk+XG4gICAgICAgIHthZGRpdGlvbmFsSXRlbXN9XG4gICAgICA8L0Ryb3Bkb3duTWVudT5cbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgdGV4dDogJ0RlZmF1bHQgc2V0dGluZ3MnLFxuICB9LFxuICB7XG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICB0ZXh0OiAnQWxpZ24gTGVmdCcsXG4gIH0sXG4gIHtcbiAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICB0ZXh0OiAnQWxpZ24gUmlnaHQnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgdGV4dDogJ0ludmVyc2UgV2l0aCBBbGlnbiBDZW50ZXInLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIFdpdGggQWxpZ24gTGVmdCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiB0cnVlLFxuICAgIGFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIFdpdGggQWxpZ24gUmlnaHQnLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogdHJ1ZSxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgYW5pbUFsaWduOiAnbGVmdCcsXG4gICAgbWVudUFsaWduOiAncmlnaHQnLFxuICAgIHRleHQ6ICdJbnZlcnNlIEFuaW0gTGVmdCwgTWVudSBSaWdodCcsXG4gIH0sXG4gIHtcbiAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICBhbGlnbjogJ2xlZnQnLFxuICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICBzaXplOiAnc20nLFxuICAgIHRleHQ6ICdMZWZ0IEFsaWduLCBUZXh0IFJpZ2h0IFNtYWxsJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IHRydWUsXG4gICAgYWxpZ246ICdyaWdodCcsXG4gICAgc2l6ZTogJ21kJyxcbiAgICB0ZXh0OiAnSW52ZXJzZSBSaWdodCBNZWRpdW0nLFxuICB9LFxuICB7XG4gICAgaW52ZXJzZTogZmFsc2UsXG4gICAgYWxpZ246ICdsZWZ0JyxcbiAgICBzaXplOiAnbGcnLFxuICAgIHRleHQ6ICdMZWZ0IEFsaWduIExhcmdlJyxcbiAgfSxcbiAge1xuICAgIGludmVyc2U6IGZhbHNlLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICBhbmltQWxpZ246IG51bGwsXG4gICAgdGV4dEFsaWduOiBudWxsLFxuICAgIG1lbnVBbGlnbjogbnVsbCxcbiAgICBzaXplOiBudWxsLFxuICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICB0ZXh0OiAnRGVmYXVsdCB3aXRoIFNvbWUgXFwnSXBzdW1cXCcnLFxuICAgIGFkZGl0aW9uYWxJdGVtczogPGxpPjxhIGhyZWY9XCIjXCI+TG9yZW0gSXBzdW0gUHJldGVuZCBUaGlzIGlzIEFjdHVhbGx5IGlwc3VtPC9hPjwvbGk+XG4gIH0sXG4vL3tcbi8vICBpbnZlcnNlOiBmYWxzZSxcbi8vICBhbGlnbjogJ2NlbnRlcicsXG4vLyAgYW5pbUFsaWduOiBudWxsLFxuLy8gIHRleHRBbGlnbjogbnVsbCxcbi8vICBtZW51QWxpZ246IG51bGwsXG4vLyAgc2l6ZTogbnVsbCxcbi8vICBjbGFzc05hbWU6IG51bGwsXG4vLyAgdGV4dDogJ0RlZmF1bHQgd2l0aCBTb21lIFxcJ0lwc3VtXFwnJyxcbi8vICBhZGRpdGlvbmFsSXRlbXM6IDxsaT48YSBocmVmPVwiI1wiPkxvcmVtIElwc3VtIFByZXRlbmQgVGhpcyBpcyBBY3R1YWxseSBpcHN1bTwvYT48L2xpPlxuLy99LFxuXVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgRXhhbXBsZSBmcm9tICcuL0V4YW1wbGUnXG5cblJlYWN0LnJlbmRlcig8RXhhbXBsZSAvPiwgZG9jdW1lbnQuYm9keSk7XG4iXX0=
