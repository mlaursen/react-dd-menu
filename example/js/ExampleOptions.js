import React from 'react';

const defaultItems = [{
  onClick: (e) => { console.log('Clicked', e.target); },
  children: 'Woop Woop',
}, {
  onClick: (e) => { console.log('Clicked', e.target); },
  children: 'That\'s the Sound',
}, { isSeparator: true }, {
  onClick: (e) => { console.log('Clicked', e.target); },
  children: 'Of the Police',
}];

export const options = [{
  toggleText: 'Default Settings',
  items: defaultItems,
}, {
  toggleText: 'Align Left Inversed No Animation',
  align: 'left',
  inverse: true,
  animate: false,
  items: defaultItems,
}, {
  toggleText: 'Align Right with Nested Menu',
  align: 'right',
  items: defaultItems.concat([{
    children: <span><i className="fa fa-chevron-left" />Hover or Click for Reverse Nested Menu</span>,
    items: defaultItems.concat([{
      children: <span>Click only for Right Nested Menu<i className="fa fa-chevron-right" /></span>,
      nested: 'right',
      openOnMouseOver: false,
      items: defaultItems.concat([{
        children: <span><i className="fa fa-chevron-left" />Hover or Click for Left Nested Upwards Menu</span>,
        nested: 'left',
        upwards: true,
        items: defaultItems,
      }]),
    }]),
  }]),
}, {
  toggleText: 'Left Aligned Upwards Menu',
  animAlign: 'center',
  menuAlign: 'left',
  upwards: true,
  items: defaultItems,
}];
