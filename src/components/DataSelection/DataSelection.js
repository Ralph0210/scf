import React from 'react'
import { useEffect, useState } from 'react';

const DataSelection = ({selectedData, setSelectedData, data, setOutputSelectedData, additionalDataSelections, setAdditionalDataSelections, addAdditionalElement}) => {

const handleDataChange =(e) => {
    setSelectedData(e.target.value)
}

const handleAdditionalDataChange = (event, index) => {
  const selectedData = event.target.value;
  const updatedElements = [...additionalDataSelections];
  updatedElements[index].selectedData = selectedData;
  setAdditionalDataSelections(updatedElements);
};


useEffect(()=>{
    console.log(selectedData)
},[selectedData])


  return (
    <div className='data_container'>
  <label htmlFor='Data'>Data</label>
  <select id='Data' className='Data' value={selectedData} onChange={handleDataChange}>
    <option value={"EDCL"}>Education</option>
    <option value={"HHSEX"}>Sex</option>
    <option value={"INCOME"}>Income</option>
    <option value={"RENT"}>Rent</option>
    <option value={"FIN"}>FIN</option>
  </select>

  {additionalDataSelections.map((element, index) => (
    <div key={index}>
      {/* Additional elements */}
      <select
        id={`Data${index + 2}`}
        className='Data'
        value={element.selectedData}
        onChange={event => handleAdditionalDataChange(event, index)}
      >
        <option value={"EDCL"}>Education</option>
    <option value={"HHSEX"}>Sex</option>
    <option value={"INCOME"}>Income</option>
    <option value={"RENT"}>Rent</option>
    <option value={"FIN"}>FIN</option>
      </select>
    </div>
  ))}

  <p onClick={addAdditionalElement}>+</p>
</div>

  )
}

export default DataSelection