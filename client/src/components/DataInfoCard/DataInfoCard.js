import React from 'react'
import './DataInfoCard.css'

const DataInfoCard = (props) => {
    const { data, setShouldRenderDataInfoCard} = props

  return (
    <div className='dataCard'>
        Helo
        {props.data.description}
        <button onClick={() => setShouldRenderDataInfoCard(false)}>X</button>
        </div>
  )
}

export default DataInfoCard