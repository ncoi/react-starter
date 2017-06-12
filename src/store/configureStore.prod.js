import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk);
  const store = createStore(reducers, initialState, middleware);

  return store;
}
