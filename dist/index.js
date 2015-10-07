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
var ALIGNMENTS = ['center', 'right', 'left'];
var MENU_SIZES = ['sm', 'md', 'lg', 'xl'];

var DropdownMenu = (function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    var _this = this;

    _classCallCheck(this, DropdownMenu);

    _get(Object.getPrototypeOf(DropdownMenu.prototype), 'constructor', this).call(this, props);

    this.close = function (e) {
      var key = e.which || e.keyCode;
      if (key === SPACEBAR) {
        _this.props.close();
        e.preventDefault();
      }
    };

    this.handleClickOutside = function (e) {
      if (_this.props.closeOnOutsideClick) {
        var node = _reactAddons2['default'].findDOMNode(_this);
        var target = e.target;

        while (target.parentNode) {
          if (target === node) {
            return;
          }

          target = target.parentNode;
        }

        _this.props.close(e);
      }
    };

    this.handleKeyDown = function (e) {
      var key = e.which || e.keyCode;
      if (key !== TAB) {
        return;
      }

      var items = _reactAddons2['default'].findDOMNode(_this).querySelectorAll('button,a');
      var id = e.shiftKey ? 1 : items.length - 1;

      if (e.target == items[id]) {
        _this.props.close(e);
      }
    };

    this._lastWindowClickEvent = null;
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var menuItems = _reactAddons2['default'].findDOMNode(this.refs.menuItems);
      if (this.props.isOpen && !prevProps.isOpen) {
        this._lastWindowClickEvent = this.handleClickOutside;
        document.addEventListener('click', this._lastWindowClickEvent);
        if (this.props.closeOnInsideClick) {
          menuItems.addEventListener('click', this.props.close);
        }
        menuItems.addEventListener('onkeydown', this.close);
      } else if (!this.props.isOpen && prevProps.isOpen) {
        document.removeEventListener('click', this._lastWindowClickEvent);
        if (this.props.closeOnOutsideClick) {
          menuItems.removeEventListener('click', this.props.close);
        }
        menuItems.removeEventListener('onkeydown', this.close);

        this._lastWindowClickEvent = null;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._lastWindowClickEvent) {
        document.removeEventListener('click', this._lastWindowClickEvent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var menuAlign = _props.menuAlign;
      var align = _props.align;
      var inverse = _props.inverse;
      var size = _props.size;
      var className = _props.className;

      var menuClassName = (0, _classnames2['default'])('dd-menu', 'dd-menu-' + (menuAlign || align), { 'dd-menu-inverse': inverse }, className, size ? 'dd-menu-' + size : null);

      var _props2 = this.props;
      var textAlign = _props2.textAlign;
      var upwards = _props2.upwards;
      var animAlign = _props2.animAlign;
      var animate = _props2.animate;

      var listClassName = 'dd-items-' + (textAlign || align);
      var transitionProps = {
        transitionName: 'grow-from-' + (upwards ? 'up-' : '') + (animAlign || align),
        component: 'div',
        className: (0, _classnames2['default'])('dd-menu-items', { 'dd-items-upwards': upwards }),
        onKeyDown: this.handleKeyDown,
        ref: 'menuItems',
        transitionEnter: animate,
        transitionLeave: animate
      };

      return _reactAddons2['default'].createElement(
        'div',
        { className: menuClassName },
        this.props.toggle,
        _reactAddons2['default'].createElement(
          CSSTransitionGroup,
          transitionProps,
          this.props.isOpen && _reactAddons2['default'].createElement(
            'ul',
            { className: listClassName },
            this.props.children
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      isOpen: _reactAddons.PropTypes.bool.isRequired,
      close: _reactAddons.PropTypes.func.isRequired,
      toggle: _reactAddons.PropTypes.node.isRequired,
      inverse: _reactAddons.PropTypes.bool,
      align: _reactAddons.PropTypes.oneOf(ALIGNMENTS),
      animAlign: _reactAddons.PropTypes.oneOf(ALIGNMENTS),
      textAlign: _reactAddons.PropTypes.oneOf(ALIGNMENTS),
      menuAlign: _reactAddons.PropTypes.oneOf(ALIGNMENTS),
      className: _reactAddons.PropTypes.string,
      size: _reactAddons.PropTypes.oneOf(MENU_SIZES),
      upwards: _reactAddons.PropTypes.bool,
      animate: _reactAddons.PropTypes.bool,
      closeOnInsideClick: _reactAddons.PropTypes.bool,
      closeOnOutsideClick: _reactAddons.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      inverse: false,
      align: 'center',
      animAlign: null,
      textAlign: null,
      menuAlign: null,
      className: null,
      size: null,
      upwards: false,
      animate: true,
      closeOnInsideClick: true,
      closeOnOutsideClick: true
    },
    enumerable: true
  }]);

  return DropdownMenu;
})(_reactAddons.Component);

module.exports = DropdownMenu;

var NestedDropdownMenu = (function (_Component2) {
  _inherits(NestedDropdownMenu, _Component2);

  function NestedDropdownMenu(props) {
    var _this2 = this;

    _classCallCheck(this, NestedDropdownMenu);

    _get(Object.getPrototypeOf(NestedDropdownMenu.prototype), 'constructor', this).call(this, props);

    this.open = function () {
      if (_this2._closeCallback) {
        clearTimeout(_this2._closeCallback);
        _this2._closeCallback = null;
      }
      _this2.setState({ isOpen: true });
    };

    this.close = function () {
      _this2._closeCallback = setTimeout((function (_) {
        _this2.setState({ isOpen: false });
      }).bind(_this2), _this2.props.delay);
    };

    this.state = { isOpen: false };
    this._closeCallback = null;
  }

  _createClass(NestedDropdownMenu, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var toggle = _props3.toggle;
      var children = _props3.children;
      var nested = _props3.nested;
      var animate = _props3.animate;
      var direction = _props3.direction;
      var upwards = _props3.upwards;
      var isOpen = this.state.isOpen;

      var itemProps = {
        className: (0, _classnames2['default'])('nested-dd-menu', 'nested-' + nested),
        onMouseOver: this.open,
        onMouseLeave: this.close,
        onFocus: this.open,
        onBlur: this.close
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
  }], [{
    key: 'propTypes',
    value: {
      toggle: _reactAddons.PropTypes.node.isRequired,
      nested: _reactAddons.PropTypes.oneOf(['inherit', 'reverse', 'left', 'right']),
      animate: _reactAddons.PropTypes.bool,
      direction: _reactAddons.PropTypes.oneOf(['left', 'right']),
      upwards: _reactAddons.PropTypes.bool,
      delay: _reactAddons.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      nested: 'reverse',
      animate: false,
      direction: 'right',
      upwards: false,
      delay: 500
    },
    enumerable: true
  }]);

  return NestedDropdownMenu;
})(_reactAddons.Component);

module.exports.NestedDropdownMenu = NestedDropdownMenu;