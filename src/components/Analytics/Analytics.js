import React from 'react'
import './Analytics.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import YearRangeSelection from '../YearRangeSelection/YearRangeSelection';


const Analytics = () => {
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
        <select className='Data' value={"Debt"} >
          <option>Asset</option>
          <option>Debt</option>
        </select>
        </div>

        <div className='distribution_container'>
        <label htmlFor='Distribution'>Distributed by</label>
        <select className='Distribution' value={"Age"} >
          <option>Age</option>
          <option>Education</option>
        </select>
        </div>

        <div className='display_container'>
        <label htmlFor='Display'>Display</label>
        <select className='Display' value={"35 - 44"} >
          <option>0 - 18</option>
          <option>19 - 24</option>
        </select>
        </div>
      </div>

      <div className='adjustment'>
        <div className='unit'>
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

      <label htmlFor='year_range'>Year range</label>
        <div className='year_range'>
      <YearRangeSelection />
    </div>
      
      
      
      
      
      </div>
      <LineChart
      width={900}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 65,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
    </div>
  )
}

export default Analytics