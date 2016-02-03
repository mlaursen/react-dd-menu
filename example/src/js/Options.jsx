import React from 'react';
import { NestedDropdownMenu } from 'react-dd-menu';

export default [
  {
    text: 'Default settings',
  },
  {
    align: 'left',
    inverse: true,
    text: 'Align Left Inversed No animation',
    animate: false,
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse With Align Right Multi-Nested Menus',
    additionalItems: (
      <NestedDropdownMenu toggle={<button type="button"><span className="fa fa-chevron-left" />Multi-level Menu</button>}>
        <li><a href="#">Wee wooo</a></li>
        <li><a href="#">Wee wooo</a></li>
        <li role="separator" className="separator" />
        <NestedDropdownMenu nested="right" align="left" toggle={<button type="button">Multi-level Menu<span className="fa fa-chevron-right" /></button>}>
          <li><a href="#">Wee wooo 1</a></li>
          <li><a href="#">Wee wooo 2</a></li>
          <li><a href="#">Wee wooo 3</a></li>
          <NestedDropdownMenu toggle={<button type="button"><span className="fa fa-chevron-left" />Multi-level Menu</button>}>
            <li><a href="#">I Think You Got It</a></li>
          </NestedDropdownMenu>
        </NestedDropdownMenu>
      </NestedDropdownMenu>
    ),
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse With Align Right Animated Multi-Nested Menus',
    additionalItems: (
      <NestedDropdownMenu animate={true} toggle={<button type="button"><span className="fa fa-chevron-left" />Multi-level Menu</button>}>
        <li><a href="#">Wee wooo</a></li>
        <li><a href="#">Wee wooo</a></li>
        <li role="separator" className="separator" />
        <NestedDropdownMenu animate={true} toggle={<button type="button"><span className="fa fa-chevron-left" />Multi-level Menu</button>}>
          <li><a href="#">Wee wooo 1</a></li>
          <li><a href="#">Wee wooo 2</a></li>
          <li><a href="#">Wee wooo 3</a></li>
          <NestedDropdownMenu animate={true} toggle={<button type="button"><span className="fa fa-chevron-left" />Multi-level Menu</button>}>
            <li><a href="#">I Think You Got It</a></li>
          </NestedDropdownMenu>
        </NestedDropdownMenu>
      </NestedDropdownMenu>
    ),
  },
  {
    inverse: false,
    align: 'left',
    textAlign: 'right',
    size: 'sm',
    text: 'Left Align, Text Right Small Size Forced With Separators',
    additionalItems: [
      <li key="sep1" role="separator" />,
      <li key="woop"><a href="#">Woop Woop</a></li>,
      <li key="sep2" className="separator" />,
      <li key="fred"><a href="#">Fred Flinstone</a></li>,
      <li key="guac"><a href="#">Guacamole</a></li>,
      <li key="sep3" role="separator" className="separator" />,
      <li key="some"><a href="#">Something</a></li>,
    ],
  },
  {
    inverse: true,
    align: 'right',
    size: 'md',
    text: 'Inverse Right Medium Size Forced With Separators',
    additionalItems: [
      <li key="sep1" role="separator" />,
      <li key="woop"><a href="#">Woop Woop</a></li>,
      <li key="sep2" className="separator" />,
      <li key="fred"><a href="#">Fred Flinstone</a></li>,
      <li key="guac"><a href="#">Guacamole</a></li>,
      <li key="sep3" role="separator" className="separator" />,
      <li key="some"><a href="#">Something</a></li>,
    ],
  },
  {
    inverse: false,
    align: 'left',
    size: 'lg',
    text: 'Left Align Large Size Forced Upwards',
    upwards: true,
  },
  {
    inverse: false,
    align: 'left',
    text: 'Default Left Nested Menu Upwards No Animation',
    upwards: true,
    animate: false,
    nestedProps: {
      animate: false,
    },
  },
  {
    inverse: true,
    align: 'right',
    text: 'Inverse Right Nested Menu Animated Upwards',
    upwards: true,
    nestedProps: {
      animate: true,
      upwards: true,
    },
  },
];
