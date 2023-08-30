import React from 'react'
import './DistributionSelection.css'
import { useEffect } from 'react';

const DistributionSelection = ({ selectedDistribution, setSelectedDistribution, data, distributedData, setDistributedData, selectedData, additionalDistributionSelections, setAdditionalDistributionSelections }) => {
  
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

  const DataDistribution = (data, properties) => {
    const selectedData = data.map(yearEntry => ({
      year: yearEntry.year,
      data: yearEntry.data.map(item => {
        const extractedData = { "WGT": item["WGT"] };

        for (const property of properties) {
          if (property !== "None") {
            extractedData[property] = item[property];
          }
        }

        return extractedData;
      })
    }));

    // console.log("selectedData:", selectedData); // Log the selected data

    // You can return the selectedData array if needed
    return selectedData;
  }


  const handleDistributionChange = (e) => {
    setSelectedDistribution(e.target.value);
  }

  useEffect(() => {
    const newDistributionData = DataDistribution(data, [selectedData, selectedDistribution]);
    setDistributedData(newDistributionData)
    console.log("distributedData:", newDistributionData, selectedDistribution, selectedData)
  }, [setDistributedData, selectedDistribution, selectedData]);

  useEffect(() => {
    const newDistributionData = DataDistribution(data, [selectedData, selectedDistribution]);
    setDistributedData(newDistributionData)
    console.log("distributedData:", newDistributionData, selectedDistribution, selectedData)
  }, []);
  
  const handleAdditionalDataChange = (event, index) => {
    const selectedDistribution = event.target.value;
    const updatedElements = [...additionalDistributionSelections];
    updatedElements[index].selectedDistribution = selectedDistribution;
    setAdditionalDistributionSelections(updatedElements);
  };

  return (
    <div className='distribution_container'>
        <label htmlFor='Distribution'>Distributed by</label>
        <select id='Distribution'
        className='Distribution' value={selectedDistribution} onChange={handleDistributionChange}>
          <option value={"None"}>None</option>
          <option value={"HHSEX"}>Sex</option>
          <option value={"EDCL"}>Education</option>
          <option value={"MARRIED"}>Married</option>
          <option value={"RACE"}>Race</option>
        </select>


        {additionalDistributionSelections.map((element, index) => (
    <div key={index}>
      {/* Additional elements */}
      <select
        id={`Data${index + 2}`}
        className='Data'
        value={element.selectedDistribution}
        onChange={event => handleAdditionalDataChange(event, index)}
      >
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