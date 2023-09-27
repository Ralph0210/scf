import React from 'react'
import './DataInfoCard.css'

const DataInfoCard = (props) => {
    const { data, setShouldRenderDataInfoCard} = props

  return (
    <div className='dataCard'>
        <div className='hid-box'>
        {data.description}
        <button onClick={() => setShouldRenderDataInfoCard(false)}>X</button>
        </div>
        </div>
  )
}

export default DataInfoCard