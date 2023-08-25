import React from 'react'
import { useEffect } from 'react';

const DataSelection = ({selectedData, setSelectedData, data, setOutputSelectedData}) => {

    // const dataselect = (data, property) => {
    //     const selectedData = data.map(yearEntry => ({
    //       year: yearEntry.year,
    //       data: yearEntry.data.map(item => ({
    //         [property]: item[property],
    //       }))
    //     }));

    //     // console.log("selectedData:", selectedData); // Log the selected data

    //   // You can return the selectedData array if needed
    //   return selectedData;
    //   }

const handleDataChange =(e) => {
    setSelectedData(e.target.value)
}

useEffect(()=>{
    console.log(selectedData)
},[selectedData])

// useEffect(() => {
//     const newSelectedData = dataselect(data, selectedData)
//     setOutputSelectedData(newSelectedData)
//     console.log("selectedData:", newSelectedData, selectedData)
// },[setSelectedData, selectedData])

  return (
    <div className='data_container'>
        <label htmlFor='Data'>Data</label>
        <select id='Data' className='Data' value={selectedData} onChange={handleDataChange}>
          <option value={"EDCL"}>Education</option>
          <option value={"HHSEX"}>Sex</option>
          <option value={"INCOME"}>Income</option>
          <option value={"RENT"}>Rent</option>
        </select>
        </div>
  )
}

export default DataSelection