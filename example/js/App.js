import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ExampleMenu from './ExampleMenu';
import { options } from './ExampleOptions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
