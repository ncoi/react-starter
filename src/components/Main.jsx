import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../actions/testActions';

require('./main.scss');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      greeting: ''
    }
  }

  onGreetingUpdate = (e) => {
    this.setState({ greeting: e.target.value });
  }

  updateGreeting = () => {
    this.props.testActions.setGreeting(this.state.greeting);
    this.setState({ greeting: '' });
  }

  render() {
    let { greeting } = this.props;

    return (
      <div>
        <input onChange={this.onGreetingUpdate} value={this.state.greeting}/>
        <button onClick={this.updateGreeting}>Update Greeting</button>
        <div className="greeting-text">{ greeting }</div>
      </div>
    );
  };
}

export default connect(
  state => {
    return {
      greeting: state.textState.get('greeting')
    }
  },
  dispatch => {
    return {
      testActions: bindActionCreators(testActions, dispatch)
    }
  }
)(Main);
