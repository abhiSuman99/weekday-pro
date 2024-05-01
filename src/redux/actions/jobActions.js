export const fetchJobs = (limit, offset) => {
  return (dispatch) => {
      // Dispatch an action to indicate that job fetching is in progress
      dispatch({ type: 'FETCH_JOBS_REQUEST' });

      // Make a POST request to the API endpoint
      fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ limit, offset }) // Send the limit and offset in the request body
      })
      .then(response => response.json()) // Parse the response as JSON
      
      .then(data => {
          // Log the fetched data
          console.log("Fetched data:", data);
          
          // Dispatch an action with the fetched data on success
          dispatch({
              type: 'FETCH_JOBS_SUCCESS',
              payload: data
          });
      })
      .catch(error => {
          // Dispatch an action with the error message on failure
          dispatch({
              type: 'FETCH_JOBS_FAILURE',
              payload: error.message
          });
      });
  };
};
