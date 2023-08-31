import React from 'react'
import { useEffect, useState } from 'react';

const DataSelection = ({dataSelections, setDataSelections, selectedData, setSelectedData, data, setOutputSelectedData, additionalDataSelections, setAdditionalDataSelections, addAdditionalElement}) => {

const handleDataChange =(e, index) => {
  const selectedData = e.target.value
    const updatedValue = [...dataSelections]
    updatedValue[index].selectedData = selectedData
    setDataSelections(updatedValue)
    console.log(updatedValue)
}

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
}


useEffect(()=>{
    console.log(selectedData)
},[selectedData])


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