import React from 'react';

require('src/scss/main.scss');

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="greeting-text">Hello there</div>
      </div>
    );
  };
}

export default Main;
