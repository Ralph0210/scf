// api.js

import axios from 'axios';

// Define the base URL for your server
const baseURL = 'http://localhost:3001';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: baseURL,
});

// Function to retrieve weighted mean income for a specific year
export async function retrieve(selectedYear, selectedData, selectedDistribution, selectedDisplay, selectedUnit) {
  
    // Define the query parameters as an object
  const queryParams = {
    selectedYear: selectedYear,
    selectedData: selectedData,
    selectedDistribution: selectedDistribution,
    selectedDisplay: selectedDisplay,
    selectedUnit: selectedUnit,
  };
  
  // Use the `params` option to include the query parameters
  api.get('/api/survey', {
    params: queryParams
  })
    .then((response) => {
      // Handle the response data here
      console.log(response.data);
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error);
    });
}
