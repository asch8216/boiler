import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import Reducer from './reducers/reducer';

const reducer = combineReducers({
  reducer: Reducer
  // country: countryReducer
});
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggingMiddleware)
);

export default store;
