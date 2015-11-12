import React from 'react';

const defaultItems = [{
  onClick: (e) => { console.log('Clicked', e.target); },
  children: 'Woop Woop',
}, {
  onClick: (e) => { console.log('Clicked', e.target); },
  children: 'That\'s the Sound',
}, {
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
    children: <span><i className="fa fa-chevron-left" />Hover for Reverse Nested Menu</span>,
    openOnMouseOver: true,
    items: defaultItems.concat([{
      children: <span>Click for Right Nested Menu<i className="fa fa-chevron-right" /></span>,
      nested: 'right',
      items: defaultItems.concat([{
        children: <span><i className="fa fa-chevron-left" />Click for Left Nested Upwards Menu</span>,
        nested: 'left',
        upwards: true,
        items: defaultItems,
      }]),
    }]),
  }]),
}];
