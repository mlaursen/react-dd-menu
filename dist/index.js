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