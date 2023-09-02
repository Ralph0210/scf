import React from 'react'
import './DataPipeline.css'
import DataSelection from '../DataSelection/DataSelection'
import DistributionSelection from '../DistributionSelection/DistributionSelection'
import DisplaySelection from '../DisplaySelection/DisplaySelection'
import { useState } from 'react'

const DataPipeline = ({uniqueValues, setUniqueValues, dataSelections, setDataSelections, selectedData, setSelectedData, dataL, setOutputSelectedData, selectedDistribution, setSelectedDistribution, distributedData, setDistributedData, selectedDisplay, setSelectedDisplay, filteredData, setFilteredData, data, setData}) => {

    // const [additionalDataSelections, setAdditionalDataSelections] = useState([]);
    const [additionalDistributionSelections, setAdditionalDistributionSelections] = useState([]);
    const [additionalDisplaySelections, setAdditionalDisplaySelections] = useState([]);
    const [additionalUniqueValues, setAdditionalUniqueValues] = useState([]);

    const addAdditionalElement = () => {
      // setAdditionalDataSelections(prevElements => [...prevElements, { selectedData: '' }]);
      setAdditionalDistributionSelections(prevElements => [...prevElements, { selectedDistribution: '' }]);
      setAdditionalDisplaySelections(prevElements => [...prevElements, { selectedDisplay: '' }]);
      setAdditionalUniqueValues(prevValues => [...prevValues, []]);
    };

    // const handleDataChange = (newData, index) => {
    //   const updatedSelections = [...dataSelections]
    //   updatedSelections[index].selectedData = newData
    //   setDataSelections(updatedSelections)
    //   console.log(updatedSelections)
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


  return (
    <div className='source'>


        <DataSelection
        uniqueValues={uniqueValues}
        setUniqueValues={setUniqueValues}
        // key={index}
        // selectedData={selection.selectedData}
        // setSelectedData={newData => handleDataChange(newData, index)}
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        dataL={dataL}
        data={data}
        setData={setData}
        DataDistribution={DataDistribution}
        // setOutputSelectedData={setOutputSelectedData}
        // additionalDataSelections={additionalDataSelections}
        // setAdditionalDataSelections={setAdditionalDataSelections}
        // addAdditionalElement={addAdditionalElement}
        />

        <DistributionSelection
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        // selectedDistribution={selectedDistribution}
        // setSelectedDistribution={setSelectedDistribution}
        dataL={dataL}
        data={data}
        setData={setData}
        DataDistribution={DataDistribution}
        // distributedData={distributedData}
        // setDistributedData={setDistributedData}
        // selectedData={selectedData}
        // additionalDistributionSelections={additionalDistributionSelections}
        // setAdditionalDistributionSelections={setAdditionalDistributionSelections}
        />

        <DisplaySelection
        uniqueValues={uniqueValues}
        setUniqueValues={setUniqueValues}
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        data={data}
        setData={setData}
        DataDistribution={DataDistribution}
        dataL={dataL}
        // selectedDisplay={selectedDisplay}
        // setSelectedDisplay={setSelectedDisplay}
        // distributedData={distributedData}
        // filteredData={filteredData}
        // setFilteredData={setFilteredData}
        // selectedData={selectedData}
        selectedDistribution={selectedDistribution}
        setSelectedDistribution={setSelectedDistribution}
        // additionalDisplaySelections={additionalDisplaySelections}
        // setAdditionalDisplaySelections={setAdditionalDisplaySelections}
        // additionalUniqueValues={additionalUniqueValues}
        // setAdditionalUniqueValues={setAdditionalUniqueValues}
        />
      </div>
  )
}

export default DataPipeline