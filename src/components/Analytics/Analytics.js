import React from 'react'
import './Analytics.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import YearRangeSelection from '../YearRangeSelection/YearRangeSelection';
// import DistributionSelection from '../DistributionSelection/DistributionSelection';
// import DisplaySelection from '../DisplaySelection/DisplaySelection';
import UnitSelection from '../UnitSelection/UnitSelection';
// import DataSelection from '../DataSelection/DataSelection';
import dataL from '/Users/ralph/Desktop/dataL.json'
import DataPipeline from '../DataPipeline/DataPipeline';


const Analytics = () => {
  const [selectedData, setSelectedData] = useState('INCOME')
  const [outputSelectedData, setOutputSelectedData] = useState([])

  const [selectedDistribution, setSelectedDistribution] = useState('EDCL');
  const [distributedData, setDistributedData] = useState([])

  const [selectedDisplay, setSelectedDisplay] = useState("2")
  const [filteredData, setFilteredData] = useState([])

  const [UnitData, setUnitData] = useState([])
  const [selectedUnit, setSelectedUnit] = useState('Mean'); // Set initial selected option


  const [value, setValue] = useState([2010, 2019]);
  const [yearData, setYearData] = useState([])

  // initialize the data
  const [currentData, setCurrentData] = useState([]);



  const data2 = [
    {
      year: 2010,
      data: [
      {HHSEX: 2,
        EDCL: 1,
        income: 67195.781504,
        Rent: 0},
      {HHSEX: 2,
        EDCL: 3,
        income: 57014.602488,
        Rent: 1100},
      {HHSEX: 1,
        EDCL: 4,
        income: 51924.01298,
        Rent: 1000},
      {HHSEX: 2,
        EDCL: 2,
        income: 41742.833964,
        Rent: 0}
      ],
    },
    {
      year: 2013,
      data: [
        {HHSEX: 1,
          EDCL: 1,
          income: 50905.895078,
          Rent: 500,},
        {HHSEX: 1,
          EDCL: 1,
          income: 38688.48026,
          Rent: 600},
        {HHSEX: 2,
          EDCL: 4,
          income: 37670.362358,
          Rent: 0},
        {HHSEX: 2,
          EDCL: 2,
          income: 38688.48026,
          Rent: 627.50773558}
      ]
    },
    {
      year: 2016,
      data: [
        {HHSEX: 1,
          EDCL: 2,
          income: 104866.14386,
          Rent: 0},
        {HHSEX: 1,
          EDCL: 1,
          income: 14004.770629,
          Rent: 0},
        {HHSEX: 1,
          EDCL: 3,
          income: 23700.381065,
          Rent: 542.42194093},
        {HHSEX: 2,
          EDCL: 2,
          income: 121733.77547,
          Rent: 197.67063607}
      ]
    },
    {
      year: 2019,
      data: [
        {HHSEX: 1,
          EDCL: 3,
          income: 124210.38399,
          Rent: 0},
        {HHSEX: 2,
          EDCL: 1,
          income: 29525.419145,
          Rent: 0},
        {HHSEX: 2,
          EDCL: 1,
          income: 30543.537047,
          Rent: 0},
        {HHSEX: 2,
          EDCL: 4,
          income: 27489.183342,
          Rent: 197.67063607}
      ]
    },
  ]

  const changeYear = (data, value, property) => {
    const newYearData = []

    for (const dataEntry of data) {
      if (dataEntry.year >= value[0] && dataEntry.year <= value[1]){
        newYearData.push({
          year: dataEntry.year,
          [property]: dataEntry[property]
        })
      }
    }
    return newYearData
  }

  useEffect(() => {
    const newData = changeYear(UnitData, value, selectedData)
    setYearData(newData)
    console.log("year:", newData)
  }, [value, distributedData, filteredData, selectedUnit, UnitData])

  return (
    <div className='analytics_container'>
      <DataPipeline
      selectedData={selectedData}
      setSelectedData={setSelectedData}
      data={dataL}
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
      <Line
        type="monotone"
        dataKey={selectedData}
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="age" stroke="#82ca9d" /> */}
    </LineChart>
    </div>
  )
}

export default Analytics