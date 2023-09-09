import React from 'react'
import './DisplaySelection.css'
import { useEffect, useState } from 'react';

const DisplaySelection = ({selectedDisplay, setSelectedDisplay, distributedData, filteredData, setFilteredData, selectedDistribution}) => {

  const [uniqueValues, setUniqueValues] = useState([])

  const ageDataDisplay = (data, selectedDisplay) => {
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



  // const DataDisplay = (data, selectedDistribution, selectedDisplay) => {
  //   const filteredData = data.map(yearEntry => ({
  //     year: yearEntry.year,
  //     data: yearEntry.data.filter(item => item[selectedDistribution] === selectedDisplay)
  //   }));
  //   console.log(selectedDistribution, selectedDisplay)
  //   return filteredData;
  // };

  const DataDisplay = (data, selectedDistribution, selectedDisplay) => {
    if (selectedDistribution === "None") {
      return data
    }
    const filteredData = data.map(yearEntry => {
      const filteredYearData = yearEntry.data.filter(item => {
        return item[selectedDistribution] == selectedDisplay;
      });

      return {
        year: yearEntry.year,
        data: filteredYearData
      };
    });

    console.log("filteredData:", filteredData);

    return filteredData;
  };



  const handleDisplayChange = (event) => {
    const selectedOptions = Array.from(event.target.options)
      .filter(option => option.selected)
      .map(option => option.value);

    setSelectedDisplay(selectedOptions);
  }

    useEffect(() => {
    const newfilteredData = DataDisplay(distributedData, selectedDistribution, selectedDisplay);
    setFilteredData(newfilteredData)
    console.log("filteredData:", newfilteredData, selectedDisplay)
  }, [distributedData, selectedDisplay]);




  // function extractUniqueValues(data, property) {
  //   const uniqueValues = [...new Set(data.flatMap(entry => entry.data.map(item => item[property])))];
  // return uniqueValues;
  // }

  function extractUniqueValues(data, property) {
    if (property === "None") {
      return ["None"];
    }
    
    const uniqueValues = [...new Set(data.flatMap(entry => entry.data.map(item => item[property])))];
    return uniqueValues;
  }
  

  useEffect(() => {
    if (distributedData.length > 0) {
      const newUniqueValues = extractUniqueValues(distributedData, selectedDistribution);
      setUniqueValues(newUniqueValues);
      console.log("uniquevalues:", newUniqueValues);
    }
  }, [distributedData, selectedDistribution]);


  // useEffect(() => {
  //   console.log("uniquevalues:", uniqueValues);
  // }, [uniqueValues]);


  return (
    <div className='display_container'>
        <label htmlFor='Display'>Display</label>
        <select id='Display' className='Display' value={selectedDisplay} onChange={handleDisplayChange}>
    {uniqueValues.map(value => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
        </select>
        </div>
  )
}

export default DisplaySelection