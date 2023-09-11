import React from "react";
import "./Analytics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import YearRangeSelection from "../YearRangeSelection/YearRangeSelection";
// import DistributionSelection from '../DistributionSelection/DistributionSelection';
// import DisplaySelection from '../DisplaySelection/DisplaySelection';
import UnitSelection from "../UnitSelection/UnitSelection";
// import DataSelection from '../DataSelection/DataSelection';
// import dataL from '../../dataL.json'
import DataPipeline from "../DataPipeline/DataPipeline";
import { retrieve } from "../api";

const Analytics = () => {
  const [propertiesToPlot, setPropertiesToPlot] = useState(["WeightedMean"]);
  const [uniqueValues, setUniqueValues] = useState([
    [
      {
        label: 4,
        value: 4,
      },
      {
        label: 2,
        value: 2,
      },
      {
        label: 3,
        value: 3,
      },
      {
        label: 1,
        value: 1,
      },
    ],
  ]);
  const [dataSelections, setDataSelections] = useState([
    {
      selectedData: "INCOME",
      selectedDistribution: "EDCL",
      selectedDisplay: [
        {
          label: 1,
          value: 1,
        },
      ],
    },
  ]);
  const [selectedData, setSelectedData] = useState("INCOME");
  const [outputSelectedData, setOutputSelectedData] = useState([]);

  const [selectedDistribution, setSelectedDistribution] = useState("EDCL");
  const [distributedData, setDistributedData] = useState([]);

  const [selectedDisplay, setSelectedDisplay] = useState("2");
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]);
  const [dataForGraphing, setDataForGraphing] = useState([])

  const [UnitData, setUnitData] = useState([
    [
      { year: 2010, INCOME: 56638.91776678539 },
      { year: 2013, INCOME: 55691.86413389803 },
      { year: 2016, INCOME: 60874.0068536714 },
      { year: 2019, INCOME: 63701.10821184536 },
    ],
  ]);
  const [selectedUnit, setSelectedUnit] = useState("Mean"); // Set initial selected option

  const [value, setValue] = useState([2010, 2019]);
  const [yearData, setYearData] = useState([]);

  // initialize the data
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    // Create a function to fetch data for a single item in dataSelections
    const fetchDataForItem = async (
      dataSelection,
      selectedUnit,
      value,
      index
    ) => {
      try {
        const apiParams = {
          selectedYear: value.join("-"),
          selectedData: dataSelection.selectedData,
          selectedDistribution: dataSelection.selectedDistribution,
          selectedUnit: selectedUnit,
        };

        // Loop through selectedDisplay values and fetch data for each
        const retrievedData = await Promise.all(
          dataSelection.selectedDisplay.map(async (displayValue, index) => {
            const data = await retrieve(
              apiParams.selectedYear,
              apiParams.selectedData,
              apiParams.selectedDistribution,
              displayValue.value, // Use the current displayValue from the map
              apiParams.selectedUnit
            );
            return data;
          })
        );

        // console.log(`Data for Item ${index}:`, retrievedData);
        // Update the data state with the retrieved data for the specific item
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = retrievedData;
          return updatedData;
        });
      } catch (error) {
        console.error(error);
      }
    };

    // Loop through dataSelections and fetch data for each item
    dataSelections.forEach((dataSelection, index) => {
      fetchDataForItem(dataSelection, selectedUnit, value, index);
    });
  }, [dataSelections, setData, setSelectedUnit, setValue, value]);

  console.log("data", JSON.stringify(data))

  function mergeDataByYear(data) {
    const mergedData = {};
  
    data.forEach(dataArray => {
      dataArray.forEach(dataArray2 => {
        dataArray2.forEach(item => {
        const year = item.year;
        if (!mergedData[year]) {
          mergedData[year] = {};
        }
        Object.keys(item).forEach(key => {
          mergedData[year][key] = item[key];})
        });
      });
    });

    const mergedDataArray = Object.values(mergedData);
    return mergedDataArray;
  }

  useEffect(() => {
    const newData = mergeDataByYear(data)
    setDataForGraphing(newData)
    console.log("dataforgraphing", newData)
  }, [data])

  let lines = null;

  if (dataForGraphing.length > 0) {
    lines = Object.keys(dataForGraphing[0])
      .filter(key => key !== 'year')
      .map((key, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={key}
          stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
          activeDot={{ r: 8 }}
        />
      ));
      }

  return (
    <div className="analytics_container">
      <DataPipeline
        uniqueValues={uniqueValues}
        setUniqueValues={setUniqueValues}
        dataSelections={dataSelections}
        setDataSelections={setDataSelections}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
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

      <div className="adjustment">
        <UnitSelection
          propertiesToPlot={propertiesToPlot}
          setPropertiesToPlot={setPropertiesToPlot}
          dataSelections={dataSelections}
          data={data}
          setData={setData}
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
          distributedData={distributedData}
          filteredData={filteredData}
          UnitData={UnitData}
          setUnitData={setUnitData}
          selectedDistribution={selectedDistribution}
          selectedData={selectedData}
          selectedDisplay={selectedDisplay}
        />

        <div className="year_range_container">
          <label htmlFor="year_range">Year range</label>
          <div className="year_range">
            <YearRangeSelection
              id="year_range"
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
      </div>

      <LineChart
        width={900}
        height={300}
        data={dataForGraphing}
        margin={{
          top: 5,
          right: 30,
          left: 65,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines}
        
      </LineChart>
    </div>
  );
};

export default Analytics;
