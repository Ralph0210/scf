import React from 'react'
import { useEffect, useState } from 'react';

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

const [additionalElements, setAdditionalElements] = useState([]);

  const addAdditionalElement = () => {
    setAdditionalElements(prevElements => [...prevElements, { selectedData: '' }]);
  };

  const handleAdditionalDataChange = (event, index) => {
    const updatedElements = [...additionalElements];
    updatedElements[index].selectedData = event.target.value;
    setAdditionalElements(updatedElements);
  };


  return (
    // <div className='data_container'>
    //     <label htmlFor='Data'>Data</label>
    //     <select id='Data' className='Data' value={selectedData} onChange={handleDataChange}>
    //       <option value={"EDCL"}>Education</option>
    //       <option value={"HHSEX"}>Sex</option>
    //       <option value={"INCOME"}>Income</option>
    //       <option value={"RENT"}>Rent</option>
    //       <option value={"FIN"}>FIN</option>
    //     </select>

    //     <p>+</p>
    //     </div>

    <div className='data_container'>
  <label htmlFor='Data'>Data</label>
  <select id='Data' className='Data' value={selectedData} onChange={handleDataChange}>
    <option value={"EDCL"}>Education</option>
    <option value={"HHSEX"}>Sex</option>
    <option value={"INCOME"}>Income</option>
    <option value={"RENT"}>Rent</option>
    <option value={"FIN"}>FIN</option>
  </select>

  {additionalElements.map((element, index) => (
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