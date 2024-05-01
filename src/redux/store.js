import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import rootReducer from './rootReducer'; // Update this path with the correct path to your rootReducer file

// Create the Redux store with thunk middleware applied
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
