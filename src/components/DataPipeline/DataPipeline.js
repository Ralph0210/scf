import React from 'react'
import './DataPipeline.css'
import DataSelection from '../DataSelection/DataSelection'
import DistributionSelection from '../DistributionSelection/DistributionSelection'
import DisplaySelection from '../DisplaySelection/DisplaySelection'

const DataPipeline = ({selectedData, setSelectedData, data, setOutputSelectedData, selectedDistribution, setSelectedDistribution, distributedData, setDistributedData, selectedDisplay, setSelectedDisplay, filteredData, setFilteredData}) => {
  return (
    <div className='source'>

        <DataSelection
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        data={data}
        setOutputSelectedData={setOutputSelectedData}
        />

        <DistributionSelection 
        selectedDistribution={selectedDistribution}
        setSelectedDistribution={setSelectedDistribution}
        data={data}
        distributedData={distributedData}
        setDistributedData={setDistributedData}
        selectedData={selectedData}
        />

        <DisplaySelection 
        selectedDisplay={selectedDisplay}
        setSelectedDisplay={setSelectedDisplay}
        distributedData={distributedData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        selectedData={selectedData}
        selectedDistribution={selectedDistribution}
        />
      </div>
  )
}

export default DataPipeline