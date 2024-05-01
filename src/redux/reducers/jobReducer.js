import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
} from "../actions/types";

// Initial state
const initialState = {
  jobs: [],         // Array to store fetched jobs
  loading: false,   // Indicates if jobs are currently being fetched
  totalCount: 0,    // Total count of available jobs
  error: null,      // Stores any error occurred during fetching jobs
};

// Reducer function
const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action to handle when jobs fetching is requested
    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true,  // Set loading to true while fetching
        error: null,    // Clear any previous errors
      };
    // Action to handle successful fetching of jobs
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,                           // Set loading to false
        jobs: [...state.jobs, ...action.payload.jdList],  // Merge fetched jobs with existing ones
        totalCount: action.payload.totalCount,   // Update total count of jobs
        error: null,                             // Clear any previous errors
      };
    // Action to handle failure in fetching jobs
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,  // Set loading to false
        jobs: [],        // Clear jobs array as fetching failed
        error: action.payload,  // Store the error message
      };
    // Default case: return the current state if action type doesn't match
    default:
      return state;
  }
};

export default jobReducer;
