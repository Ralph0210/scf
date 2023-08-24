import React from 'react'
import './DistributionSelection.css'
import { useEffect } from 'react';

const DistributionSelection = ({ selectedDistribution, setSelectedDistribution, data, distributedData, setDistributedData, selectedData }) => {
  const DataDistribution = (data, properties) => {
    const selectedData = data.map(yearEntry => ({
      year: yearEntry.year,
      data: yearEntry.data.map(item => {
        const extractedData = {}
        properties.forEach(property => {
          extractedData[property] = item[property]
        })
        return extractedData
      })
    }));

    // console.log("selectedData:", selectedData); // Log the selected data

  // You can return the selectedData array if needed
  return selectedData;
  }

  const handleDistributionChange = (e) => {
    setSelectedDistribution(e.target.value);
    // const selectedData = DataDistribution(data2);
  }

  useEffect(() => {
    const newDistributionData = DataDistribution(data, [selectedData, selectedDistribution]);
    setDistributedData(newDistributionData)
    console.log("distributedData:", newDistributionData, selectedDistribution, selectedData)
  }, [setDistributedData, selectedDistribution, selectedData]);


  return (
    <div className='distribution_container'>
        <label htmlFor='Distribution'>Distributed by</label>
        <select id='Distribution'
        className='Distribution' value={selectedDistribution} onChange={handleDistributionChange}>
          <option value={"age"}>Age</option>
          <option value={"EDCU"}>Education</option>
        </select>
        </div>
  )
}

export default DistributionSelection