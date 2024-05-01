// Import the configureStore utility from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import your rootReducer; make sure the path is correct
import rootReducer from './rootReducer';

// Create the Redux store using configureStore
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== 'production', // DevTools enabled conditionally based on environment
});

// Export the configured store
export default store;
