import { createReducer } from '../lib/createReducer';
import { Map } from 'immutable';
import * as testActions from '../actions/testActions';

const initialState = Map({
  greeting: 'Hello World'
});

export default createReducer(initialState, {
  [testActions.UPDATE_GREETING](state, action) {
    return state.set('greeting', action.greeting);
  }
});
