import React from 'react'
import './DataPipeline.css'
import DataSelection from '../DataSelection/DataSelection'
import DistributionSelection from '../DistributionSelection/DistributionSelection'
import DisplaySelection from '../DisplaySelection/DisplaySelection'
import { useState } from 'react'

const DataPipeline = ({selectedData, setSelectedData, data, setOutputSelectedData, selectedDistribution, setSelectedDistribution, distributedData, setDistributedData, selectedDisplay, setSelectedDisplay, filteredData, setFilteredData}) => {

    const [additionalDataSelections, setAdditionalDataSelections] = useState([]);
    const [additionalDistributionSelections, setAdditionalDistributionSelections] = useState([]);
    const [additionalDisplaySelections, setAdditionalDisplaySelections] = useState([]);

    const addAdditionalElement = () => {
      setAdditionalDataSelections(prevElements => [...prevElements, { selectedData: '' }]);
      setAdditionalDistributionSelections(prevElements => [...prevElements, { selectedDistribution: '' }]);
      setAdditionalDisplaySelections(prevElements => [...prevElements, { selectedDisplay: '' }]);
    };


  return (
    <div className='source'>

        <DataSelection
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        data={data}
        setOutputSelectedData={setOutputSelectedData}
        additionalDataSelections={additionalDataSelections}
        setAdditionalDataSelections={setAdditionalDataSelections}
        addAdditionalElement={addAdditionalElement}
        />

        <DistributionSelection
        selectedDistribution={selectedDistribution}
        setSelectedDistribution={setSelectedDistribution}
        data={data}
        distributedData={distributedData}
        setDistributedData={setDistributedData}
        selectedData={selectedData}
        additionalDistributionSelections={additionalDistributionSelections}
        setAdditionalDistributionSelections={setAdditionalDistributionSelections}
        />

        <DisplaySelection
        selectedDisplay={selectedDisplay}
        setSelectedDisplay={setSelectedDisplay}
        distributedData={distributedData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        selectedData={selectedData}
        selectedDistribution={selectedDistribution}
        additionalDisplaySelections={additionalDisplaySelections}
        setAdditionalDisplaySelections={setAdditionalDisplaySelections}
        />
      </div>
  )
}

export default DataPipeline