import React, { useEffect, useState } from 'react'; // Import useEffect and useState from 'react'
import { retrieve } from '../api';

const DataSelection = ({
  uniqueValues,
  setUniqueValues,
  data,
  setData,
  dataSelections,
  setDataSelections,
}) => {

  // useEffect(() => {
    // Add an async function for the API call and await the result
    
  
    // Call the fetchData function with the desired index
    // fetchData(0); // For the first element in dataSelections
  
    // You can call fetchData with a different index when needed
    // fetchData(1); // For the second element in dataSelections
  
  // }, [dataSelections]);
  

  const handleDataChange = (e, index) => {
    const selectedData = e.target.value;
    const updatedValue = [...dataSelections];
    updatedValue[index].selectedData = selectedData;
    setDataSelections(updatedValue);
  };

  const handleAddition = () => {
    const updatedElements = [...dataSelections];
    updatedElements.push({
      selectedData: "INCOME",
      selectedDistribution: "EDCL",
      selectedDisplay: ['1'],
      selectedYear: ["2010", "2019"],
      selectedUnit: "Mean",
    });
    setDataSelections(updatedElements);

    const updatedData = [...data];
    updatedData.push([]);
    setData(updatedData);

    const updatedUniqueValues = [...uniqueValues];
    updatedUniqueValues.push([]);
    setUniqueValues(updatedUniqueValues);
  };

  return (
    <div className='data_container'>
      <label>Data</label>
      {dataSelections.map((data, index) => (
        <div key={index}>
          <select
            id={`Data_${index}`}
            className='Data'
            value={data.selectedData} // Fixed property name
            onChange={(event) => handleDataChange(event, index)}
          >
            <option value={"EDCL"}>Education</option>
            <option value={"HHSEX"}>Sex</option>
            <option value={"INCOME"}>Income</option>
            <option value={"RENT"}>Rent</option>
            <option value={"FIN"}>FIN</option>
          </select>
        </div>
      ))}
      <p onClick={handleAddition}>+</p>
    </div>
  );
};

export default DataSelection;
