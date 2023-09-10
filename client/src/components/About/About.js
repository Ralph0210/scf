// About.js in your frontend
import React, { useState, useEffect } from 'react';
// import { getWeightedMeanIncome } from '../api'; // Import the API function

import axios from 'axios';
const About = () => {
    const [selectedYear, setSelectedYear] = useState('2019');
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    // Function to fetch data when the selected year changes
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/survey/${selectedYear}`);
        setSurveyData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Initial fetch when component mounts
  }, [selectedYear]); // Re-fetch when selectedYear changes

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <h1>Survey Data</h1>
      <label>
        Select Year:
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="2019">2019</option>
          <option value="2016">2016</option>
          <option value="2013">2013</option>
          <option value="2010">2010</option>
        </select>
      </label>
      <ul>
        {surveyData.map((item, index) => (
          <li key={index}>{item.HHSEX}</li>
          // Render other fields from your data as needed
        ))}
      </ul>
    </div>
  );
};

export default About;
