import React from 'react'
import './DataPipeline.css'
import DataSelection from '../DataSelection/DataSelection'
import DistributionSelection from '../DistributionSelection/DistributionSelection'
import DisplaySelection from '../DisplaySelection/DisplaySelection'
import { useState } from 'react'

const DataPipeline = ({dataSelections, setDataSelections, selectedData, setSelectedData, dataL, setOutputSelectedData, selectedDistribution, setSelectedDistribution, distributedData, setDistributedData, selectedDisplay, setSelectedDisplay, filteredData, setFilteredData, data, setData}) => {

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


  return (
    <div className='source'>


        <DataSelection
        // key={index}
        // selectedData={selection.selectedData}
        // setSelectedData={newData => handleDataChange(newData, index)}
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        dataL={dataL}
        data={data}
        setData={setData}
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
        // distributedData={distributedData}
        // setDistributedData={setDistributedData}
        // selectedData={selectedData}
        // additionalDistributionSelections={additionalDistributionSelections}
        // setAdditionalDistributionSelections={setAdditionalDistributionSelections}
        />

        <DisplaySelection
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        data={data}
        setData={setData}
        // selectedDisplay={selectedDisplay}
        // setSelectedDisplay={setSelectedDisplay}
        // distributedData={distributedData}
        // filteredData={filteredData}
        // setFilteredData={setFilteredData}
        // selectedData={selectedData}
        // selectedDistribution={selectedDistribution}
        // additionalDisplaySelections={additionalDisplaySelections}
        // setAdditionalDisplaySelections={setAdditionalDisplaySelections}
        // additionalUniqueValues={additionalUniqueValues}
        // setAdditionalUniqueValues={setAdditionalUniqueValues}
        />
      </div>
  )
}

export default DataPipeline