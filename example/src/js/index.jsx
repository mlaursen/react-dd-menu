import 'babel-polyfill';
import '../scss/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Example from './Example';

ReactDOM.render(<Example />, document.getElementById('app'));
