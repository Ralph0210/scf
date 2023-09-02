import React from 'react'
import './UnitSelection.css'
import { useEffect } from 'react'
import DataSelection from '../DataSelection/DataSelection'

const UnitSelection = ({propertiesToPlot, setPropertiesToPlot, dataSelections, data, setData, selectedUnit, setSelectedUnit, distributedData, filteredData, UnitData, setUnitData, selectedDistribution, selectedData, selectedDisplay}) => {


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
      });

    } else if (selectedUnit === "Median") {
      // Extract the selectedData values
      const selectedDataValues = yearDataArray.map(person => person[selectedData]);

      // Sort the values in ascending order
      selectedDataValues.sort((a, b) => a - b);

      let median;

      if (selectedDataValues.length % 2 === 0) {
        // If the array length is even, take the average of the two middle values
        const middleIndex1 = selectedDataValues.length / 2 - 1;
        const middleIndex2 = selectedDataValues.length / 2;
        median = (selectedDataValues[middleIndex1] + selectedDataValues[middleIndex2]) / 2;
      } else {
        // If the array length is odd, take the middle value
        const middleIndex = Math.floor(selectedDataValues.length / 2);
        median = selectedDataValues[middleIndex];
      }

      calculated.push({
        year: year,
        [selectedData]: median,
      });
    }
  }
  return calculated
  }



  useEffect(() => {
    const newUnitData = data.map((array, index) => {
      const { selectedData, selectedDistribution, selectedDisplay } = dataSelections[index];
      const newCalculated = calculateByUnit(array, selectedUnit, selectedData, selectedDistribution, selectedDisplay);
      return newCalculated || []; // Ensure it's an array or provide a default empty array
    });
      setUnitData(newUnitData);
      console.log("unitData:", newUnitData, selectedUnit, selectedData, selectedDisplay);
    
  }, [selectedUnit]);
  

    useEffect(() => {
      const newUnitData = data.map((array, index) => {
        const {selectedData, selectedDistribution, selectedDisplay} = dataSelections[index]
        const newCalculated = calculateByUnit(array, selectedUnit, selectedData, selectedDistribution, selectedDisplay)
        return newCalculated
      })
      setUnitData(newUnitData)
      console.log("unitData:", newUnitData, selectedUnit, selectedData, selectedDisplay)
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