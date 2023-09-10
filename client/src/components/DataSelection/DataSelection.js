import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getWeightedMeanIncome } from '../api';

const DataSelection = ({uniqueValues, setUniqueValues, DataDistribution, data, setData, dataSelections, setDataSelections, selectedData, setSelectedData, dataL, setOutputSelectedData, additionalDataSelections, setAdditionalDataSelections, addAdditionalElement}) => {

  // Function to retrieve weighted mean income for a specific year
async function getWeightedMeanIncome(year) {
  try {
    const response = await axios.get(`http://localhost:3001/getWeightedMeanIncome?year=${year}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null; // Handle the error gracefully
  }
}

// Example usage:
const year = 2016;
getWeightedMeanIncome(year)
  .then((data) => {
    if (data !== null) {
      console.log(`Weighted Mean Income for ${year}: ${data}`);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const handleDataChange =(e, index) => {
  const selectedData = e.target.value
    const updatedValue = [...dataSelections]
    updatedValue[index].selectedData = selectedData
    setDataSelections(updatedValue)

    const selectedDistribution = updatedValue[index].selectedDistribution

    const SelectedDistributionData = DataDistribution(dataL, [selectedData, selectedDistribution])
    const updatedData = [...data];
    updatedData[index] = SelectedDistributionData
    setData(updatedData)
    console.log("list of distributed data", updatedData)
}

useEffect(() => {
  const values = [...dataSelections]
  const selectedData = values[0].selectedData
  const selectedDistribution = values[0].selectedDistribution

  const SelectedDistributionData = DataDistribution(dataL, [selectedData, selectedDistribution])
  const updatedData = [...data];
    updatedData[0] = SelectedDistributionData
    setData(updatedData)
    // console.log("list of distributed data initial", updatedData)
},[])

// const handleAdditionalDataChange = (event, index) => {
//   const selectedData = event.target.value;
//   const updatedElements = [...additionalDataSelections];
//   updatedElements[index].selectedData = selectedData;
//   setAdditionalDataSelections(updatedElements);
// };

const handleAddition = () => {
  const updatedElements = [...dataSelections]
  updatedElements.push({selectedData: "INCOME",
  selectedDistribution: "EDCL",
  selectedDisplay: '2'})
  setDataSelections(updatedElements)

  const updatedData = [...data]
  updatedData.push([])
  setData(updatedData)

  const updatedUniqueValues = [...uniqueValues]
  updatedUniqueValues.push([])
  setUniqueValues(updatedUniqueValues)
}
  return (
<div className='data_container' >
<label >Data</label>
    {dataSelections.map((data, index) => (
    <div key={index}>
  <select id={`Data_${index}`} className='Data' value={data.selectedData} onChange={(event) => handleDataChange(event, index)}>
    <option value={"EDCL"}>Education</option>
    <option value={"HHSEX"}>Sex</option>
    <option value={"INCOME"}>Income</option>
    <option value={"RENT"}>Rent</option>
    <option value={"FIN"}>FIN</option>
  </select>
  </div>))}

  <p onClick={handleAddition}>+</p>
</div>

  )
}

export default DataSelection