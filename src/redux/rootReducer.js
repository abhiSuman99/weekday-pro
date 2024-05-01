import { combineReducers } from 'redux';
import jobReducer from './reducers/jobReducer'; // Update this path with the correct path to your job reducer file

// Combine all reducers
const rootReducer = combineReducers({
  job: jobReducer  // Assigning jobReducer to the 'job' key in the store state
});

export default rootReducer;
