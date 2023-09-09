import React from 'react'
import './Analytics.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import YearRangeSelection from '../YearRangeSelection/YearRangeSelection';
// import DistributionSelection from '../DistributionSelection/DistributionSelection';
// import DisplaySelection from '../DisplaySelection/DisplaySelection';
import UnitSelection from '../UnitSelection/UnitSelection';
// import DataSelection from '../DataSelection/DataSelection';
import dataL from '../../dataL.json'
import DataPipeline from '../DataPipeline/DataPipeline';


const Analytics = () => {
  const [propertiesToPlot, setPropertiesToPlot] = useState([])
  const [uniqueValues, setUniqueValues] = useState([[1,2,3,5]])
  const [dataSelections, setDataSelections] = useState([
    {selectedData: "INCOME",
      selectedDistribution: "EDCL",
      selectedDisplay: '2'
    },
  ])
  const [selectedData, setSelectedData] = useState('INCOME')
  const [outputSelectedData, setOutputSelectedData] = useState([])

  const [selectedDistribution, setSelectedDistribution] = useState('EDCL');
  const [distributedData, setDistributedData] = useState([])

  const [selectedDisplay, setSelectedDisplay] = useState("2")
  const [filteredData, setFilteredData] = useState([])

  const [data, setData] = useState([
    []
  ])

  const [UnitData, setUnitData] = useState([
    [{year: 2010, INCOME: 56638.91776678539},
      {year: 2013, INCOME: 55691.86413389803},
      {year: 2016, INCOME: 60874.0068536714},
      {year: 2019, INCOME: 63701.10821184536}]
  ])
  const [selectedUnit, setSelectedUnit] = useState('Mean'); // Set initial selected option


  const [value, setValue] = useState([2010, 2019]);
  const [yearData, setYearData] = useState([])

  // initialize the data
  const [currentData, setCurrentData] = useState([]);

  const changeYear = (data, value) => {
    const newYearData = [];
  
    for (const dataEntry of data) {
      if (dataEntry.year >= value[0] && dataEntry.year <= value[1]) {
        newYearData.push({ ...dataEntry });
      }
    }
  
    return newYearData;
  };

  useEffect(() => {
      const updataedYearData = changeYear(UnitData, value)

    setYearData(updataedYearData)
    console.log("year:", updataedYearData)
  }, [value, distributedData, filteredData, selectedUnit, UnitData])

  return (
    <div className='analytics_container'>
      <DataPipeline
      uniqueValues={uniqueValues}
      setUniqueValues={setUniqueValues}
      dataSelections={dataSelections}
      setDataSelections={setDataSelections}
      selectedData={selectedData}
      setSelectedData={setSelectedData}
      dataL={dataL}
      data={data}
      setData={setData}
      setOutputSelectedData={setOutputSelectedData}
      selectedDistribution={selectedDistribution}
      setSelectedDistribution={setSelectedDistribution}
      distributedData={distributedData}
      setDistributedData={setDistributedData}
      selectedDisplay={selectedDisplay}
        setSelectedDisplay={setSelectedDisplay}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />

      <div className='adjustment'>

      <UnitSelection
      propertiesToPlot={propertiesToPlot}
      setPropertiesToPlot={setPropertiesToPlot}
      dataSelections={dataSelections}
      data={data}
      setData={setData}
      selectedUnit= {selectedUnit}
      setSelectedUnit={setSelectedUnit}
      distributedData={distributedData}
      filteredData={filteredData}
      UnitData={UnitData}
      setUnitData={setUnitData}
      selectedDistribution={selectedDistribution}
      selectedData={selectedData}
      selectedDisplay={selectedDisplay}
      />

        <div className='year_range_container'>
            <label htmlFor='year_range'>Year range</label>
            <div className='year_range'>
          <YearRangeSelection id='year_range' value={value} setValue={setValue}/>
    </div>
        </div>
      </div>



      <LineChart
      width={900}
      height={300}
      data={yearData}
      margin={{
        top: 5,
        right: 30,
        left: 65,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      {propertiesToPlot.map((property, index) => (
        <Line
          key={property}
          type="monotone"
          dataKey={property}
          stroke={`#${(Math.floor(Math.random() * 16777215)).toString(16)}`} // Generate a random color
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
    </div>
  )
}

export default Analytics