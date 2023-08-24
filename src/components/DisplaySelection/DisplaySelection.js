import React from 'react'
import './DisplaySelection.css'
import { useEffect } from 'react';

const DisplaySelection = ({selectedDisplay, setSelectedDisplay, distributedData, filteredData, setFilteredData}) => {
  const DataDisplay = (data, selectedDisplay) => {
    const filteredData = data.map(yearEntry => ({
      year: yearEntry.year,
      data: yearEntry.data.filter(item => {
        const age = item.age;
        if (selectedDisplay === "25-45") {
          return age >= 25 && age <= 45;
        }
        else if (selectedDisplay === "19-24") {
          return age >= 19 && age <= 24;
        }
        else if (selectedDisplay === "0-18") {
          return age <= 18;
        }
        else if (selectedDisplay === "45+") {
          return age > 45;
        }

        else {
          return age > 45;
        }
        // Add more conditions for other age groups if needed
        return false; // Return true by default if no conditions match
      })
    }));
    return filteredData;
  };

  const handleDisplayChange = (e) => {
    setSelectedDisplay(e.target.value);
  }

    useEffect(() => {
    const newfilteredData = DataDisplay(distributedData, selectedDisplay);
    setFilteredData(newfilteredData)
    console.log("filteredData:", newfilteredData, selectedDisplay)
  }, [distributedData, selectedDisplay]);

  return (
    <div className='display_container'>
        <label htmlFor='Display'>Display</label>
        <select id='Display' className='Display' value={selectedDisplay} onChange={handleDisplayChange} >
            <option value="0-18">0-18</option>
            <option value="19-24">19-24</option>
            <option value="25-45">25-45</option>
            <option value="45+">45+</option>
        </select>
        </div>
  )
}

export default DisplaySelection