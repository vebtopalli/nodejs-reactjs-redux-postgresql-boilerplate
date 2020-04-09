import React from "react";
import ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router,} from 'react-router-dom';

import rootReducer from 'config/redux/reducers/combineReducers';
import IndexWrapperComponent from 'index-wrapper';


//Redux reducer
const store=createStore(rootReducer);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <IndexWrapperComponent/>
    </Router>
  </Provider>,
  document.getElementById("root")
);
