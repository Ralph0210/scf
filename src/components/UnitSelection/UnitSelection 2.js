import React from 'react'
import './UnitSelection.css'
import { useEffect } from 'react'

const UnitSelection = ({selectedUnit, setSelectedUnit, distributedData, filteredData, UnitData, setUnitData, selectedDistribution, selectedData, selectedDisplay}) => {


  const calculateByUnit = (data, selectedUnit, selectedData, selectedDistribution, selectedDisplay) => {
    const calculated = [];

    for (const yearData of data) {
      const year = yearData.year;
      const yearDataArray = yearData.data;

      if (selectedUnit === "Mean") {
      let total = 0;
      let totalWeight = 0;
      for (const person of yearDataArray) {
        total += person[selectedData] * person["WGT"];
        totalWeight += person["WGT"]
      }

      const calculate = total / totalWeight;
      // console.log(calculate)
      calculated.push({
        year: year,
        [selectedData]: calculate,
        [selectedDistribution]: selectedDisplay
      });

    } else {
      console.log("median")
    }

  }
  return calculated
  }



    useEffect(() => {
      const newCalculated = calculateByUnit(filteredData, selectedUnit, selectedData, selectedDistribution, selectedDisplay)
      setUnitData(newCalculated)
      console.log("unitData:", newCalculated, selectedUnit, selectedData, selectedDisplay)
    },[selectedUnit, filteredData])

    useEffect(() => {
      const newCalculated = calculateByUnit(filteredData, selectedUnit, selectedData, selectedDistribution, selectedDisplay)
      setUnitData(newCalculated)
      console.log("unitData:", newCalculated, selectedUnit, selectedData, selectedDisplay)
    },[])




    const handleUnitChange = (event) => {
      setSelectedUnit(event.target.value);
    };

  return (
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
  )
}

export default UnitSelection