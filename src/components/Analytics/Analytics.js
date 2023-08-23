import React from 'react'
import './Analytics.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import YearRangeSelection from '../YearRangeSelection/YearRangeSelection';
import DistributionSelection from '../DistributionSelection/DistributionSelection';


const Analytics = () => {
  const [selectedDistribution, setSelectedDistribution] = useState('Age');
  const [selectedDisplay, setSelectedDisplay] = useState("45+")
  const [distributedData, setDistributedData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [UnitData, setUnitData] = useState([])
  const [selectedUnit, setSelectedUnit] = useState('Mean'); // Set initial selected option
  const [currentData, setCurrentData] = useState([]);
  const [value, setValue] = useState([2010, 2019]);
  const [yearData, setYearData] = useState([])

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

  const DataDisplay = (data, selectedDisplay) => {
    const filteredData = data.map(yearEntry => ({
      year: yearEntry.year,
      data: yearEntry.data.filter(item => {
        const age = item.age;
        if (selectedDisplay === "25-45") {
          return age >= 25 && age <= 45;
        }
        else if (selectedDisplay === "19-24") {
          return age >= 19 && age <= 24;
        }
        else if (selectedDisplay === "0-18") {
          return age <= 18;
        }
        else if (selectedDisplay === "45+") {
          return age > 45;
        }

        else {
          return age > 45;
        }
        // Add more conditions for other age groups if needed
        return false; // Return true by default if no conditions match
      })
    }));
    return filteredData;
  };

    useEffect(() => {
    const newfilteredData = DataDisplay(distributedData, selectedDisplay);
    setFilteredData(newfilteredData)
    console.log("filteredData:", newfilteredData, selectedDisplay)
  }, [distributedData, selectedDisplay]);

const calculateByUnit = (data, selectedUnit) => {
  const calculated = [];

  for (const yearData of data) {
    const year = yearData.year;
    const yearDataArray = yearData.data;
    
    if (selectedUnit === "Mean") {
    let total = 0;
    for (const person of yearDataArray) {
      total += person.income;
    }

    const calculate = total / yearDataArray.length;
    // console.log(calculate)
    calculated.push({
      year: year,
      income: calculate,
    });

  } else {
    console.log("median")
  }

}
return calculated
}

  useEffect(() => {
    const newCalculated = calculateByUnit(filteredData, selectedUnit)
    setUnitData(newCalculated)
    console.log("unitData:", UnitData)
  },[distributedData, filteredData, selectedUnit])



  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleDisplayChange = (e) => {
    setSelectedDisplay(e.target.value);
  }

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

        <div className='display_container'>
        <label htmlFor='Display'>Display</label>
        <select id='Display' className='Display' value={selectedDisplay} onChange={handleDisplayChange} >
            <option value="0-18">0-18</option>
            <option value="19-24">19-24</option>
            <option value="25-45">25-45</option>
            <option value="45+">45+</option>
        </select>
        </div>
      </div>

      <div className='adjustment'>

        <div className='unit'>
          <label htmlFor='units'>Unit</label>
        <div className='units' id='unit'>
        <label>
          <input
          type="radio"
          value="Mean"
          checked={selectedUnit === 'Mean'}
          onChange={handleUnitChange}
          />
          Mean
        </label>

        <label>
          <input
          type="radio"
          value="Median"
          checked={selectedUnit === 'Median'}
          onChange={handleUnitChange}
          />
          Median
       </label>
        </div>
        </div>
        
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