import React from 'react'
import './DistributionSelection.css'
import { useEffect } from 'react';

const DistributionSelection = ({DataDistribution, data, setData, dataSelections, setDataSelections }) => {

  const handleDataChange =(e, index) => {
    const selectedDistribution = e.target.value
      const updatedValue = [...dataSelections]
      updatedValue[index].selectedDistribution = selectedDistribution
      setDataSelections(updatedValue)
  }



  return (
    <div className='distribution_container'>
        <label htmlFor='Distribution'>Distributed by</label>

        {dataSelections.map((data, index) => (
        <div key={index}>
        <select id='Distribution'
        className={`Distribution_${index}`} value={data.selectedDistribution} onChange={(event) => handleDataChange(event, index)}>
          <option value={"None"}>None</option>
          <option value={"HHSEX"}>Sex</option>
          <option value={"EDCL"}>Education</option>
          <option value={"MARRIED"}>Married</option>
          <option value={"RACE"}>Race</option>
        </select>
        </div>
        ))}

        </div>
  )
}

export default DistributionSelection