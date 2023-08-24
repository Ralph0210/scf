import React from 'react'
import './Analytics.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import YearRangeSelection from '../YearRangeSelection/YearRangeSelection';
import DistributionSelection from '../DistributionSelection/DistributionSelection';
import DisplaySelection from '../DisplaySelection/DisplaySelection';
import UnitSelection from '../UnitSelection/UnitSelection';


const Analytics = () => {
  const [selectedDistribution, setSelectedDistribution] = useState('Age');
  const [distributedData, setDistributedData] = useState([])

  const [selectedDisplay, setSelectedDisplay] = useState("45+")
  const [filteredData, setFilteredData] = useState([])

  const [UnitData, setUnitData] = useState([])
  const [selectedUnit, setSelectedUnit] = useState('Mean'); // Set initial selected option


  const [value, setValue] = useState([2010, 2019]);
  const [yearData, setYearData] = useState([])

  const [currentData, setCurrentData] = useState([]);

  const data2 = [
    {
      year: 2010,
      data: [
      {age: 54, EDCU: "no high school diploma/GED", income: 148534.91704, wage: 56000},
      {age: 54,
        EDCU: "high school diploma or GED",
        income: 22288.787771,wage: 35000},
      {age: 28,
        EDCU: "Ph.D",
        income: 64675.086566,wage: 82000},
      {age: 23,
        EDCU: "bachelors degree or higher",
        income: 14004.770629,wage: 56000}
      ],
    },
    {
      year: 2013,
      data: [
        {age: 34,
          EDCU: "high school diploma or GED",
          income: 148534.91704, wage: 36000},
        {age: 48,
          EDCU: "high school diploma or GED",
          income: 64675.086566, wage: 46000 },
        {age: 28,
          EDCU: "Ph.D",
          income: 22288.787771, wage: 92000},
        {age: 23,
          EDCU: "bachelors degree or higher",
          income: 14004.770629, wage: 70000}
      ]
    },
    {
      year: 2016,
      data: [
        {age: 60,
          EDCU: "no high school diploma/GED",
          income: 148534.91704, wage: 56000},
        {age: 54,
          EDCU: "MA/MS/MBA",
          income: 64675.086566, wage: 65000},
        {age: 28,
          EDCU: "Ph.D",
          income: 22288.787771, wage: 120000},
        {age: 49,
          EDCU: "Associate degree in college - occupation/vocation program",
          income: 14004.770629, wage: 60000}
      ]
    },
    {
      year: 2019,
      data: [
        {age: 76,
          EDCU: "high school diploma or GED",
          income: 148534.91704, wage: 56000},
        {age: 54,
          EDCU: "high school diploma or GED",
          income: 64675.086566, wage: 66000},
        {age: 41,
          EDCU: "Ph.D",
          income: 22288.787771, wage: 90000},
        {age: 23,
          EDCU: "achelors degree or higher",
          income: 14004.770629, wage: 59000}
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
        <div className='data_container'>
        <label htmlFor='Data'>Data</label>
        <select id='Data' className='Data' value={"Income"} >
          <option>Asset</option>
          <option>Debt</option>
          <option>Income</option>
          <option>Wage</option>
        </select>
        </div>

        <DistributionSelection 
        selectedDistribution={selectedDistribution}
        setSelectedDistribution={setSelectedDistribution}
        data={data2}
        distributedData={distributedData}
        setDistributedData={setDistributedData}
        />

        <DisplaySelection 
        selectedDisplay={selectedDisplay}
        setSelectedDisplay={setSelectedDisplay}
        distributedData={distributedData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}/>
      </div>

      <div className='adjustment'>

      <UnitSelection
      selectedUnit= {selectedUnit}
      setSelectedUnit={setSelectedUnit}
      distributedData={distributedData}
      filteredData={filteredData}
      UnitData={UnitData}
      setUnitData={setUnitData}
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