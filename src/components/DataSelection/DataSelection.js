import React from 'react'
import { useEffect } from 'react';

const DataSelection = ({selectedData, setSelectedData, data, setOutputSelectedData}) => {

    const dataselect = (data, property) => {
        const selectedData = data.map(yearEntry => ({
          year: yearEntry.year,
          data: yearEntry.data.map(item => ({
            [property]: item[property],
          }))
        }));

        // console.log("selectedData:", selectedData); // Log the selected data

      // You can return the selectedData array if needed
      return selectedData;
      }

const handleDataChange =(e) => {
    setSelectedData(e.target.value)
}

useEffect(() => {
    const newSelectedData = dataselect(data, selectedData)
    setOutputSelectedData(newSelectedData)
    console.log("selectedData:", newSelectedData, selectedData)
},[setSelectedData, selectedData])
  return (
    <div className='data_container'>
        <label htmlFor='Data'>Data</label>
        <select id='Data' className='Data' value={selectedData} onChange={handleDataChange}>
          <option>Asset</option>
          <option>Debt</option>
          <option value={"income"}>Income</option>
          <option value={"wage"}>Wage</option>
        </select>
        </div>
  )
}

export default DataSelection