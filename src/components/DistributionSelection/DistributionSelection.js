import React from 'react'
import './DistributionSelection.css'
import { useEffect } from 'react';

const DistributionSelection = ({ selectedDistribution, setSelectedDistribution, data, distributedData, setDistributedData }) => {
  const DataDistribution = (data) => {
    const selectedData = data.map(yearEntry => ({
      year: yearEntry.year,
      data: yearEntry.data.map(item => ({
        income: item.income,
        age: item.age
      }))
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
    const newDistributionData = DataDistribution(data);
    setDistributedData(newDistributionData)
    console.log("distributedData:", newDistributionData)
  }, [setDistributedData, selectedDistribution]);


  return (
    <div className='distribution_container'>
        <label htmlFor='Distribution'>Distributed by</label>
        <select id='Distribution'
        className='Distribution' value={selectedDistribution} onChange={handleDistributionChange}>
          <option>Age</option>
          <option>Education</option>
        </select>
        </div>
  )
}

export default DistributionSelection