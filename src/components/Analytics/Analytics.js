import React from 'react'
import './Analytics.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import YearRangeSelection from '../YearRangeSelection/YearRangeSelection';
import DistributionSelection from '../DistributionSelection/DistributionSelection';
import DisplaySelection from '../DisplaySelection/DisplaySelection';
import UnitSelection from '../UnitSelection/UnitSelection';
import DataSelection from '../DataSelection/DataSelection';


const Analytics = () => {
  const [selectedData, setSelectedData] = useState('income')
  const [outputSelectedData, setOutputSelectedData] = useState([])

  const [selectedDistribution, setSelectedDistribution] = useState('EDCU');
  const [distributedData, setDistributedData] = useState([])

  const [selectedDisplay, setSelectedDisplay] = useState("1")
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
      {age: 54,
        EDCU: 1,
        income: 1,
        wage: 56000},
      {age: 54,
        EDCU: 2,
        income: 1,wage: 35000},
      {age: 28,
        EDCU: 2,
        income: 2,wage: 82000},
      {age: 23,
        EDCU: 3,
        income: 3,wage: 56000}
      ],
    },
    {
      year: 2013,
      data: [
        {age: 34,
          EDCU: 3,
          income: 1, wage: 36000},
        {age: 48,
          EDCU: 4,
          income: 3, wage: 46000 },
        {age: 28,
          EDCU: 3,
          income: 4, wage: 92000},
        {age: 23,
          EDCU: 1,
          income: 5, wage: 70000}
      ]
    },
    {
      year: 2016,
      data: [
        {age: 60,
          EDCU: 2,
          income: 3, wage: 56000},
        {age: 54,
          EDCU: 3,
          income: 4, wage: 65000},
        {age: 28,
          EDCU: 1,
          income: 1, wage: 120000},
        {age: 49,
          EDCU: 2,
          income: 1, wage: 60000}
      ]
    },
    {
      year: 2019,
      data: [
        {age: 76,
          EDCU: 3,
          income: 1, wage: 56000},
        {age: 54,
          EDCU: 4,
          income: 5, wage: 66000},
        {age: 41,
          EDCU: 1,
          income: 2, wage: 90000},
        {age: 23,
          EDCU: 1,
          income: 1, wage: 59000}
      ]
    },
  ]

  const changeYear = (data, value) => {
    const newYearData = []

    for (const dataEntry of data) {
      if (dataEntry.year >= value[0] && dataEntry.year <= value[1]){
        newYearData.push({
          year: dataEntry.year,
          income: dataEntry.income
        })
      }
    }

    console.log("YearData: ", newYearData)
    return newYearData
  }

  useEffect(() => {
    const newData = changeYear(UnitData, value)
    setYearData(newData)
  }, [value, distributedData, filteredData, selectedUnit])

  return (
    <div className='analytics_container'>
      <div className='source'>

        <DataSelection
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        data={data2}
        setOutputSelectedData={setOutputSelectedData}
        />

        <DistributionSelection 
        selectedDistribution={selectedDistribution}
        setSelectedDistribution={setSelectedDistribution}
        data={data2}
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
        dataKey="income"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="age" stroke="#82ca9d" /> */}
    </LineChart>
    </div>
  )
}

export default Analytics