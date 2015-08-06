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

'use strint';

var CSSTransitionGroup = _reactAddons2['default'].addons.CSSTransitionGroup;
var TAB = 9;
var SPACEBAR = 32;

var DropdownMenu = (function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    _get(Object.getPrototypeOf(DropdownMenu.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.isOpen && !prevProps.isOpen) {
        window.addEventListener('click', this.handleClickOutside.bind(this));
      } else if (!this.props.isOpen && prevProps.isOpen) {
        window.removeEventListener('click', this.handleClickOutside.bind(this));
      }
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

      if (e.target == items[id]) {
        this.props.close(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _reactAddons2['default'].createElement(
        'div',
        { className: 'dd-menu' + (this.props.className ? ' ' + this.props.className : '') },
        this.props.toggle,
        _reactAddons2['default'].createElement(
          CSSTransitionGroup,
          { transitionName: 'grow-from-' + this.props.direction, component: 'div',
            className: 'dd-menu-items', onKeyDown: this.handleKeyDown.bind(this) },
          this.props.isOpen && this.props.children
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
  direction: _reactAddons.PropTypes.oneOf(['center', 'right', 'left']),
  className: _reactAddons.PropTypes.string,
  component: _reactAddons.PropTypes.oneOf(['div', 'span', 'li'])
};

DropdownMenu.defaultProps = {
  isOpen: false,
  direction: 'center',
  className: '',
  component: 'div'
};

var DropdownMenuItem = (function (_Component2) {
  _inherits(DropdownMenuItem, _Component2);

  function DropdownMenuItem(props) {
    _classCallCheck(this, DropdownMenuItem);

    _get(Object.getPrototypeOf(DropdownMenuItem.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DropdownMenuItem, [{
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var key = e.which || e.keyCode;
      if (key === SPACEBAR) {
        e.preventDefault();
        this.props.action && this.props.action();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = _reactAddons2['default'].createElement(this.props.component, this.props.childrenProps, this.props.children);
      return _reactAddons2['default'].createElement(
        'li',
        { className: this.props.className, onClick: this.props.action, onKeyDown: this.handleKeyDown.bind(this) },
        children
      );
    }
  }]);

  return DropdownMenuItem;
})(_reactAddons.Component);

DropdownMenuItem.propTypes = {
  action: _reactAddons.PropTypes.func,
  childrenProps: _reactAddons.PropTypes.object,
  tabIndex: _reactAddons.PropTypes.number,
  component: _reactAddons.PropTypes.oneOf(['button', 'a']),
  className: _reactAddons.PropTypes.string
};

DropdownMenuItem.defaultProps = {
  tabIndex: 0,
  component: 'button',
  className: '',
  childrenProps: {}
};

DropdownMenu.DropdownMenuItem = DropdownMenuItem;

exports['default'] = DropdownMenu;
module.exports = exports['default'];

