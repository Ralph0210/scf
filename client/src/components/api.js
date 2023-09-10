import axios from 'axios';

const baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL: baseURL,
});

export async function retrieve(selectedYear, selectedData, selectedDistribution, selectedDisplay, selectedUnit) {
  try {
    const queryParams = {
      selectedYear: selectedYear,
      selectedData: selectedData,
      selectedDistribution: selectedDistribution,
      selectedDisplay: selectedDisplay,
      selectedUnit: selectedUnit,
    };

    // Use the `params` option to include the query parameters and await the response
    const response = await api.get('/api/survey', {
      params: queryParams
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    console.error('Error in retrieve function:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

