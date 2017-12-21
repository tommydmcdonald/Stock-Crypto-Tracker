import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './containers/App';

const middlewares = [promise, reduxThunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const storeEnhancers = [middlewareEnhancer];

const composedEnhancer = composeWithDevTools(...storeEnhancers);

const store = createStore(reducers, composedEnhancer)

ReactDOM.render( //most specific routes first in <Switch>
   <Provider store={store}>
      <App />
   </Provider>
, document.querySelector('#root'));;
