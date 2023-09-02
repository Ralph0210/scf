import React from 'react'
import './DisplaySelection.css'
import { useEffect, useState } from 'react';

const DisplaySelection = ({setSelectedDistribution, dataL, DataDistribution, data, setData, dataSelections, setDataSelections, selectedDisplay, setSelectedDisplay, distributedData, filteredData, setFilteredData, selectedDistribution, additionalDisplaySelections, setAdditionalDisplaySelections, additionalUniqueValues, setAdditionalUniqueValues}) => {

  const [uniqueValues, setUniqueValues] = useState([[1,2,3,5]])
  // const DataDisplay = (data, selectedDistribution, selectedDisplay) => {
  //   if (selectedDistribution === "None") {
  //     return data
  //   }
  //   const filteredData = data.map(yearEntry => {
  //     const filteredYearData = yearEntry.data.filter(item => {
  //       return item[selectedDistribution] == selectedDisplay;
  //     });

  //     return {
  //       year: yearEntry.year,
  //       data: filteredYearData
  //     };
  //   });

  //   console.log("filteredData:", filteredData);

  //   return filteredData;
  // };


  // useEffect(() => {
  //   const values = [...dataSelections];
  //   const selectedData = values[0].selectedData;
  //   const selectedDistribution = values[0].selectedDistribution;
  
  //   const SelectedDistributionData = DataDistribution(dataL, [selectedData, selectedDistribution]);
  //   const updatedData = [...data];
  //   updatedData[0] = SelectedDistributionData;
  //   setData(updatedData);
  //   console.log("list of distributed data initial", updatedData);
  // }, []);
  
  useEffect(() => {
    // Define a function to process data
    const processData = () => {
      if (data.length === 0 || data.some(list => list.length === 0)) {
        // Skip processing when 'data' is empty or any of the lists are empty
        return;
      }
  
      const extractUniqueValues = (data, property) => {
        const uniqueValues = [...new Set(data.flatMap(entry => entry.data.map(item => item[property])))];
        return uniqueValues;
      };
  
      console.log("unique process", data);
  
      const unique = data.map((array, index) => {
        const selectedDistribution = dataSelections[index]?.selectedDistribution || ''; // Handle potential undefined
        const newUniqueValues = extractUniqueValues(array, selectedDistribution);
        return newUniqueValues;
      });
  
      // Update uniqueValues using setUniqueValues
      setUniqueValues(unique);
      console.log("uniquedata:", unique);
    };
  
    // Call the data processing function whenever 'data' changes
    processData();
  }, [data]);
  
  


  // function extractUniqueValues(data, property, index) {
  //   if (property === "None") {
  //     return ["None"];
  //   }
    
  //   const uniqueValues = [...new Set(data.flatMap(entry => entry.data.map(item => item[property])))];
    
  //   // Update the specific array of unique values
  //   setAdditionalUniqueValues(prevValues => {
  //     const updatedValues = [...prevValues];
  //     updatedValues[index] = uniqueValues;
  //     return updatedValues;
  //   });
    
  //   return uniqueValues;
  // }

  const handleDataChange =(e, index) => {
    const selectedDisplay = e.target.value
      const updatedValue = [...dataSelections]
      updatedValue[index].selectedDisplay = selectedDisplay
      setDataSelections(updatedValue)
  }

  const handleDeletion = (index) => {
    const updatedElements = dataSelections.filter((_, i) => i !== index)
    setDataSelections(updatedElements)
    console.log(updatedElements)

    const updatedData = data.filter((_, i) => i !== index)
    setData(updatedData)
    console.log("data deletion", updatedData)
  }
  
  return (
    <div className='display_container'>
      <label htmlFor='Display'>Display</label>
  
      {dataSelections.map((data, index) => (
        <div key={index} className='display_container_components'>
          <select id={`Display_${index}`} className='Display' value={data.selectedDisplay} onChange={(event) => handleDataChange(event, index)}>
            {uniqueValues[index] && uniqueValues[index].length > 0 && (
              uniqueValues[index].map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))
            )}
          </select>
          <div className='deletion_container'>
            <p onClick={() => handleDeletion(index)}>X</p>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default DisplaySelection