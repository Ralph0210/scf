import React from 'react'
import './DataInfoCard.css'

const DataInfoCard = (props) => {
    const { data, setShouldRenderDataInfoCard} = props
    console.log(data)

  return (
    <div className='dataCard'>
        <div className='hid-box'>
          <h4>{data.name}</h4>
        {data.description}
        <button onClick={() => setShouldRenderDataInfoCard(false)}>X</button>
        <button >add</button>
        </div>
        </div>
  )
}

export default DataInfoCard