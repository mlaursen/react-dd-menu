'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
      if (!_this.props.closeOnOutsideClick) {
        return;
      }

      var node = _reactDom2['default'].findDOMNode(_this);
      var target = e.target;

      while (target.parentNode) {
        if (target === node) {
          return;
        }

        target = target.parentNode;
      }

      _this.props.close(e);
    };

    this.handleKeyDown = function (e) {
      var key = e.which || e.keyCode;
      if (key !== TAB) {
        return;
      }

      var items = _reactDom2['default'].findDOMNode(_this).querySelectorAll('button,a');
      var id = e.shiftKey ? 1 : items.length - 1;

      if (e.target === items[id]) {
        _this.props.close(e);
      }
    };

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
    this.lastWindowClickEvent = null;
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen === prevProps.isOpen) {
        return;
      }

      var menuItems = _reactDom2['default'].findDOMNode(this).querySelector('.dd-menu > .dd-menu-items');
      if (this.props.isOpen && !prevProps.isOpen) {
        this.lastWindowClickEvent = this.handleClickOutside;
        document.addEventListener('click', this.lastWindowClickEvent);
        if (this.props.closeOnInsideClick) {
          menuItems.addEventListener('click', this.props.close);
        }
        menuItems.addEventListener('onkeydown', this.close);
      } else if (!this.props.isOpen && prevProps.isOpen) {
        document.removeEventListener('click', this.lastWindowClickEvent);
        if (prevProps.closeOnInsideClick) {
          menuItems.removeEventListener('click', this.props.close);
        }
        menuItems.removeEventListener('onkeydown', this.close);

        this.lastWindowClickEvent = null;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.lastWindowClickEvent) {
        document.removeEventListener('click', this.lastWindowClickEvent);
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
      var enterTimeout = _props2.enterTimeout;
      var leaveTimeout = _props2.leaveTimeout;

      var listClassName = 'dd-items-' + (textAlign || align);
      var transitionProps = {
        transitionName: 'grow-from-' + (upwards ? 'up-' : '') + (animAlign || align),
        component: 'div',
        className: (0, _classnames2['default'])('dd-menu-items', { 'dd-items-upwards': upwards }),
        onKeyDown: this.handleKeyDown,
        transitionEnter: animate,
        transitionLeave: animate,
        transitionEnterTimeout: enterTimeout,
        transitionLeaveTimeout: leaveTimeout
      };

      return _react2['default'].createElement(
        'div',
        { className: menuClassName },
        this.props.toggle,
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          transitionProps,
          this.props.isOpen && _react2['default'].createElement(
            'ul',
            { key: 'items', className: listClassName },
            this.props.children
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      isOpen: _react.PropTypes.bool.isRequired,
      close: _react.PropTypes.func.isRequired,
      toggle: _react.PropTypes.node.isRequired,
      children: _react.PropTypes.node,
      inverse: _react.PropTypes.bool,
      align: _react.PropTypes.oneOf(ALIGNMENTS),
      animAlign: _react.PropTypes.oneOf(ALIGNMENTS),
      textAlign: _react.PropTypes.oneOf(ALIGNMENTS),
      menuAlign: _react.PropTypes.oneOf(ALIGNMENTS),
      className: _react.PropTypes.string,
      size: _react.PropTypes.oneOf(MENU_SIZES),
      upwards: _react.PropTypes.bool,
      animate: _react.PropTypes.bool,
      enterTimeout: _react.PropTypes.number,
      leaveTimeout: _react.PropTypes.number,
      closeOnInsideClick: _react.PropTypes.bool,
      closeOnOutsideClick: _react.PropTypes.bool
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
      enterTimeout: 150,
      leaveTimeout: 150,
      closeOnInsideClick: true,
      closeOnOutsideClick: true
    },
    enumerable: true
  }, {
    key: 'MENU_SIZES',
    value: MENU_SIZES,
    enumerable: true
  }, {
    key: 'ALIGNMENTS',
    value: ALIGNMENTS,
    enumerable: true
  }]);

  return DropdownMenu;
})(_react.Component);

module.exports = DropdownMenu; // eslint-disable-line no-undef

var NestedDropdownMenu = (function (_Component2) {
  _inherits(NestedDropdownMenu, _Component2);

  function NestedDropdownMenu(props) {
    var _this2 = this;

    _classCallCheck(this, NestedDropdownMenu);

    _get(Object.getPrototypeOf(NestedDropdownMenu.prototype), 'constructor', this).call(this, props);

    this.handleToggleComponentClick = function (e) {
      e.stopPropagation();
      _this2.setState({ isClickOpen: !_this2.state.isClickOpen });
    };

    this.handleMouseOver = function () {
      if (_this2.closeCallback) {
        clearTimeout(_this2.closeCallback);
        _this2.closeCallback = null;
      }
      _this2.setState({ isHoverOpen: true });
    };

    this.handleMouseLeave = function () {
      _this2.closeCallback = setTimeout(function () {
        _this2.setState({ isHoverOpen: false });
      }, _this2.props.delay);
    };

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
    this.toggleComponent = null;
    this.closeCallback = null;
    this.state = {
      isHoverOpen: false,
      isClickOpen: false
    };
  }

  _createClass(NestedDropdownMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.toggleComponent = _reactDom2['default'].findDOMNode(this).querySelector('*');
      this.toggleComponent.addEventListener('click', this.handleToggleComponentClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.closeCallback && clearTimeout(this.closeCallback);
      this.toggleComponent.removeEventListener('click', this.handleToggleComponentClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var toggle = _props3.toggle;
      var children = _props3.children;
      var nested = _props3.nested;
      var animate = _props3.animate;
      var direction = _props3.direction;
      var upwards = _props3.upwards;
      var enterTimeout = _props3.enterTimeout;
      var leaveTimeout = _props3.leaveTimeout;

      var isOpen = this.state.isHoverOpen || this.state.isClickOpen;

      var itemProps = {
        className: (0, _classnames2['default'])('nested-dd-menu', 'nested-' + nested)
      };
      if (this.props.openOnMouseover) {
        itemProps.onMouseOver = this.handleMouseOver;
        itemProps.onMouseLeave = this.handleMouseLeave;
      }

      var prefix = upwards ? 'up-' : '';
      var transitionProps = {
        className: 'dd-item-ignore',
        transitionEnter: animate,
        transitionLeave: animate,
        transitionName: 'grow-from-' + prefix + direction,
        transitionEnterTimeout: enterTimeout,
        transitionLeaveTimeout: leaveTimeout
      };

      return _react2['default'].createElement(
        'li',
        itemProps,
        toggle,
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          transitionProps,
          isOpen ? _react2['default'].createElement(
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
      toggle: _react.PropTypes.node.isRequired,
      children: _react.PropTypes.node,
      nested: _react.PropTypes.oneOf(['inherit', 'reverse', 'left', 'right']),
      animate: _react.PropTypes.bool,
      direction: _react.PropTypes.oneOf(['left', 'right']),
      upwards: _react.PropTypes.bool,
      delay: _react.PropTypes.number,
      enterTimeout: _react.PropTypes.number,
      leaveTimeout: _react.PropTypes.number,
      openOnMouseover: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      nested: 'reverse',
      animate: false,
      direction: 'right',
      upwards: false,
      delay: 500,
      enterTimeout: 150,
      leaveTimeout: 150,
      openOnMouseover: true
    },
    enumerable: true
  }]);

  return NestedDropdownMenu;
})(_react.Component);

module.exports.NestedDropdownMenu = NestedDropdownMenu; // eslint-disable-line no-undef