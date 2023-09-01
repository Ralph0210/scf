import React from 'react'
import './DistributionSelection.css'
import { useEffect } from 'react';

const DistributionSelection = ({DataDistribution, data, setData, dataSelections, setDataSelections, selectedDistribution, setSelectedDistribution, dataL, distributedData, setDistributedData, selectedData, additionalDistributionSelections, setAdditionalDistributionSelections }) => {
  
  // const DataDistribution = (data, properties) => {
  //   const selectedData = data.map(yearEntry => ({
  //     year: yearEntry.year,
  //     data: yearEntry.data.map(item => {
  //       const extractedData = {}
  //       properties.forEach(property => {
  //         extractedData["WGT"] = item["WGT"]
  //         extractedData[property] = item[property]
  //       })
  //       return extractedData
  //     })
  //   }));

  //   // console.log("selectedData:", selectedData); // Log the selected data

  // // You can return the selectedData array if needed
  // return selectedData;
  // }




  // const handleDistributionChange = (e) => {
  //   setSelectedDistribution(e.target.value);
  // }

  // useEffect(() => {
  //   const newDistributionData = DataDistribution(dataL, [selectedData, selectedDistribution]);
  //   setDistributedData(newDistributionData)
  //   console.log("distributedData:", newDistributionData, selectedDistribution, selectedData)
  // }, [setDistributedData, selectedDistribution, selectedData]);

  // useEffect(() => {
  //   const newDistributionData = DataDistribution(dataL, [selectedData, selectedDistribution]);
  //   setDistributedData(newDistributionData)
  //   console.log("distributedData:", newDistributionData, selectedDistribution, selectedData)
  // }, []);

  // const handleAdditionalDataChange = (event, index) => {
  //   const selectedDistribution = event.target.value;
  //   const updatedElements = [...additionalDistributionSelections];
  //   updatedElements[index].selectedDistribution = selectedDistribution;
  //   setAdditionalDistributionSelections(updatedElements);
  // };

  const handleDataChange =(e, index) => {
    const selectedDistribution = e.target.value
      const updatedValue = [...dataSelections]
      updatedValue[index].selectedDistribution = selectedDistribution
      setDataSelections(updatedValue)
      const selectedData = updatedValue[index].selectedData

    const SelectedDistributionData = DataDistribution(dataL, [selectedData, selectedDistribution])
    const updatedData = [...data];
    updatedData[index] = SelectedDistributionData
    setData(updatedData)
    console.log("list of distributed data", updatedData)

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