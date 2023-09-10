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
  useEffect(() => {
    // Add an async function for the API call and await the result
    const fetchData = async () => {
      try {
        const retrievedData = await retrieve("2010-2019", "FIN", "HHSEX", "1", "Mean");
        console.log("retrievedData:", retrievedData)
        setData(retrievedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); // Call the async function to retrieve data
  }, [dataSelections]);

  useEffect(() => {
    console.log("data", data)
  },[data])

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
      selectedUnit: "Mean",
      selectedYear: ["2010", "2019"], // Corrected year format to strings
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
