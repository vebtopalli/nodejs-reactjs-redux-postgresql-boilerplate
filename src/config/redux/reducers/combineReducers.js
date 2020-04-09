import {combineReducers} from 'redux';
import {routerReducer } from 'react-router-redux';

import loggedInRedurec from './reduc/currUserInfoReducer';
import currentUserInfo from './reduc/currUserInfoReducer';
import languageReducer from './reduc/languageReducer';
import currentRouteReducer from './reduc/currentRouteReducer';
const allReducers = combineReducers({
    routing: routerReducer,
    loggedInRedurec,
    currentUserInfo,
    languageReducer,
    currentRouteReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return allReducers(state, action)
}

export default rootReducer;
