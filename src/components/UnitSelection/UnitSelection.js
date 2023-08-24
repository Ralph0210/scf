import React from 'react'
import './UnitSelection.css'
import { useEffect } from 'react'

const UnitSelection = ({selectedUnit, setSelectedUnit, distributedData, filteredData, UnitData, setUnitData}) => {
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