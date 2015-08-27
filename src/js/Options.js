import React from 'react'

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
    text: 'Inverse With Align Left',
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse With Align Right',
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
      <li role="separator" />,
      <li><a href="#">Woop Woop</a></li>,
      <li className="separator" />,
      <li><a href="#">Fred Flinstone</a></li>,
      <li><a href="#">Guacamole</a></li>,
      <li role="separator" className="separator" />,
      <li><a href="#">Something</a></li>
    ],
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse with a few separators',
    additionalItems: [
      <li role="separator" />,
      <li><a href="#">Woop Woop</a></li>,
      <li className="separator" />,
      <li><a href="#">Fred Flinstone</a></li>,
      <li><a href="#">Guacamole</a></li>,
      <li role="separator" className="separator" />,
      <li><a href="#">Something</a></li>
    ],
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
