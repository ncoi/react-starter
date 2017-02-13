if (module.hot) {
  module.hot.accept()
}

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);