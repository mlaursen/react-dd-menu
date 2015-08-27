import React from 'react'
import { NestedDropdownMenu } from '../index'

export default [
  {
    text: 'Default settings',
  },
  {
    align: 'left',
    text: 'Align Left',
  },
  {
    align: 'right',
    text: 'Align Right',
  },
  {
    inverse: true,
    align: 'center',
    text: 'Inverse With Align Center',
  },
  {
    inverse: true,
    align: 'left',
    text: 'Inverse With Align Left Multi-Nested Menus',
    additionalItems: (
      <NestedDropdownMenu toggle={<a href="#">Multi-level Menu<span className="fa fa-chevron-right" /></a>}>
        <li><a href="#">Wee wooo</a></li>
        <li><a href="#">Wee wooo</a></li>
        <li role="separator" className="separator" />
        <NestedDropdownMenu toggle={<a href="#">Multi-level Menu<span className="fa fa-chevron-right" /></a>}>
          <li><a href="#">Wee wooo 1</a></li>
          <li><a href="#">Wee wooo 2</a></li>
          <li><a href="#">Wee wooo 3</a></li>
          <NestedDropdownMenu toggle={<a href="#">Multi-level Menu<span className="fa fa-chevron-right" /></a>}>
            <li><a href="#">I Think You Got It</a></li>
          </NestedDropdownMenu>
        </NestedDropdownMenu>
      </NestedDropdownMenu>
    ),
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse With Align Right Aniamted Multi-Nested Menus',
    additionalItems: (
      <NestedDropdownMenu animate={true} toggle={<a href="#"><span className="fa fa-chevron-left" />Multi-level Menu</a>}>
        <li><a href="#">Wee wooo</a></li>
        <li><a href="#">Wee wooo</a></li>
        <li role="separator" className="separator" />
        <NestedDropdownMenu animate={true} toggle={<a href="#"><span className="fa fa-chevron-left" />Multi-level Menu</a>}>
          <li><a href="#">Wee wooo 1</a></li>
          <li><a href="#">Wee wooo 2</a></li>
          <li><a href="#">Wee wooo 3</a></li>
          <NestedDropdownMenu animate={true} toggle={<a href="#"><span className="fa fa-chevron-left" />Multi-level Menu</a>}>
            <li><a href="#">I Think You Got It</a></li>
          </NestedDropdownMenu>
        </NestedDropdownMenu>
      </NestedDropdownMenu>
    ),
  },
  {
    inverse: true,
    align: 'center',
    animAlign: 'left',
    menuAlign: 'right',
    text: 'Inverse Anim Left, Menu Right',
  },
  {
    inverse: false,
    align: 'left',
    textAlign: 'right',
    size: 'sm',
    text: 'Left Align, Text Right Small',
  },
  {
    inverse: true,
    align: 'right',
    size: 'md',
    text: 'Inverse Right Medium',
  },
  {
    inverse: false,
    align: 'left',
    size: 'lg',
    text: 'Left Align Large',
  },
  {
    inverse: false,
    align: 'center',
    animAlign: null,
    textAlign: null,
    menuAlign: null,
    size: null,
    className: null,
    text: 'Default with Some \'Ipsum\'',
    additionalItems: <li><a href="#">Lorem Ipsum Pretend This is Actually ipsum</a></li>
  },
  {
    inverse: false,
    align: 'right',
    text: 'Default with a few separators',
    additionalItems: [
      <li key="sep1" role="separator" />,
      <li key="woop"><a href="#">Woop Woop</a></li>,
      <li key="sep2" className="separator" />,
      <li key="fred"><a href="#">Fred Flinstone</a></li>,
      <li key="guac"><a href="#">Guacamole</a></li>,
      <li key="sep3" role="separator" className="separator" />,
      <li key="some"><a href="#">Something</a></li>
    ],
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse with a few separators',
    additionalItems: [
      <li key="sep1" role="separator" />,
      <li key="woop"><a href="#">Woop Woop</a></li>,
      <li key="sep2" className="separator" />,
      <li key="fred"><a href="#">Fred Flinstone</a></li>,
      <li key="guac"><a href="#">Guacamole</a></li>,
      <li key="sep3" role="separator" className="separator" />,
      <li key="some"><a href="#">Something</a></li>
    ],
  },
  {
    inverse: false,
    align: 'left',
    text: 'Upwards Left Align',
    upwards: true,
  },
  {
    inverse: true,
    align: 'center',
    text: 'Inverse Upwards Center Align',
    upwards: true,
  },
  {
    inverse: false,
    align: 'right',
    text: 'Upwards Right Align',
    upwards: true,
  },
  {
    inverse: false,
    align: 'left',
    text: 'Default Left Nested Menu',
    upwards: true,
    nestedProps: {
      animate: false,
    }
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse Right Nested Menu Animated',
    upwards: true,
    nestedProps: {
      animate: true,
      upwards: true,
    }
  },
  {
    inverse: true,
    align: 'left',
    text: 'Default Nested Menu Nested Inherit',
    upwards: true,
    nestedProps: {
      nested: 'inherit',
    }
  },
  {
    inverse: true,
    align: 'right',
    text: 'Default Nested Menu Animate Left',
    upwards: true,
    nestedProps: {
      animate: true,
      direction: 'left',
      upwards: true,
    }
  },
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
]
