import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, initialState, composeEnhancers(middleware));

  return store;
}
