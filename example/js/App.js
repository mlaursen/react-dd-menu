import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ExampleMenu from './ExampleMenu';
import { options } from './ExampleOptions';

const items = [
  'Suspendisse sit amet odio eget purus porta efficitur.',
  'Donec quis libero nec velit volutpat hendrerit.',
  'Ut id libero quis urna aliquam commodo.',
  'Morbi a ipsum suscipit, sollicitudin dui a, porttitor dui.',
  'Cras venenatis massa cursus augue pretium vestibulum.',
  'Donec in orci non dui pharetra accumsan non sed ligula.',
  'Quisque eu est ut nisl fringilla condimentum convallis sit amet leo.',
];
export default class App extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      dropdownValue: items[0],
    };
  }

  handleItemClick = (item) => {
    this.setState({ dropdownValue: item });
  }

  createItemsProp = () => {
    return items.map(item => {
      return {
        onClick: this.handleItemClick.bind(this, item),
        children: item,
      };
    });
  }

  render() {
    return (
      <div className="example">
        <header><h1>React Dropdown Menu Example</h1></header>
        <main>
          {options.map((menuProps, i) => {
            return <ExampleMenu key={'dd-menu' + i} {...menuProps} />;
          })}
        </main>
        <footer>
          <a href="http://github.com/mlaursen/react-dd-menu">
            <span className="fa fa-github fa-4x" />
          </a>
        </footer>
      </div>
    );
  }
}
