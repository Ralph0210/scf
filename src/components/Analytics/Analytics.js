import React from 'react'
import './Analytics.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import YearRangeSelection from '../YearRangeSelection/YearRangeSelection';


const Analytics = () => {
  const [selectedDistribution, setSelectedDistribution] = useState('Age');
  const [selectedDisplay, setSelectedDisplay] = useState("0-18")
  const [filteredData, setFilteredData] = useState([])

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
      year: 2013,
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

  const DataDistribution = (data) => {
    const selectedData = data.map(yearEntry => ({
      year: yearEntry.year,
      data: yearEntry.data.map(item => ({
        income: item.income,
        age: item.age
      }))
    }));

    // console.log("selectedData:", selectedData); // Log the selected data

  // You can return the selectedData array if needed
  return selectedData;
  }

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

        else {
          return age > 45;
        }
        // Add more conditions for other age groups if needed
        return false; // Return true by default if no conditions match
      })
    }));
    return filteredData;
  };


  const selectedData = DataDistribution(data2)
  // const filteredData = DataDisplay(selectedData)



  const handleDistributionChange = (e) => {
    setSelectedDistribution(e.target.value);
    const selectedData = DataDistribution(data2);
  }

  useEffect(() => {
    const selectedData = DataDistribution(data2);
  }, [selectedData]);



  const handleDisplayChange = (e) => {
    setSelectedDisplay(e.target.value);
  }

  useEffect(() => {
    const filteredData = DataDisplay(selectedData, selectedDisplay);
    console.log("filteredData:", filteredData, selectedDisplay)
  }, [selectedDisplay, selectedData]);

  const [selectedOption, setSelectedOption] = useState('Mean'); // Set initial selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState(50); // Set initial selected value

  const handleRangeChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];



 








  return (
    <div className='analytics_container'>
      <div className='source'>
        <div className='data_container'>
        <label htmlFor='Data'>Data</label>
        <select className='Data' value={"Income"} >
          <option>Asset</option>
          <option>Debt</option>
          <option>Income</option>
          <option>Wage</option>
        </select>
        </div>

        <div className='distribution_container'>
        <label htmlFor='Distribution'>Distributed by</label>
        <select className='Distribution' value={selectedDistribution} onChange={handleDistributionChange}>
          <option>Age</option>
          <option>Education</option>
        </select>
        </div>

        <div className='display_container'>
        <label htmlFor='Display'>Display</label>
        <select className='Display' value={selectedDisplay} onChange={handleDisplayChange} >
            <option value="0-18">0-18</option>
            <option value="19-24">19-24</option>
            <option value="25-45">25-45</option>
        </select>
        </div>
      </div>

      <div className='adjustment'>
        <div className='unit'>
          <label htmlFor='units'>Unit</label>
        <div className='units'>
        <label>
          <input
          type="radio"
          value="Mean"
          checked={selectedOption === 'Mean'}
          onChange={handleOptionChange}
          />
          Mean
        </label>

        <label>
          <input
          type="radio"
          value="Median"
          checked={selectedOption === 'Median'}
          onChange={handleOptionChange}
          />
          Median
       </label>
        </div>
        </div>
        
        <div className='year_range_container'>
            <label htmlFor='year_range'>Year range</label>
            <div className='year_range'>
          <YearRangeSelection />
    </div>
        </div>
      </div>



      <LineChart
      width={900}
      height={300}
      data={data2}
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