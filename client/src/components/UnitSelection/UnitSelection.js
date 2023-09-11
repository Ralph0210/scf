import React from 'react'
import './UnitSelection.css'
import { useEffect } from 'react'
import DataSelection from '../DataSelection/DataSelection'

const UnitSelection = ({dataSelections, data, setData, selectedUnit, setSelectedUnit, }) => {

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