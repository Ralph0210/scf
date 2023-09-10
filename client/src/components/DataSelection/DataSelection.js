import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { retrieve } from '../api';

const DataSelection = ({uniqueValues, setUniqueValues, DataDistribution, data, setData, dataSelections, setDataSelections, selectedData, setSelectedData, dataL, setOutputSelectedData, additionalDataSelections, setAdditionalDataSelections, addAdditionalElement}) => {



useEffect(() => {
  retrieve("2013-2019", "FIN", "HHSEX", "1", "Mean")


}, [dataSelections])

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