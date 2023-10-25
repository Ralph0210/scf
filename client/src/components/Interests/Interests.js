import React from 'react'
import './Interests.css'
import Interest from '../Interest/Interest'


const Interests = ({setInterests, setTopics}) => {
  return (
    <div className='interests_container'>
        <div className='title_description'>
            <h1>What interests you?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit 
amet sem dignissim, rhoncus dolor eu, maximus justo. </p>
        </div>
        <Interest setInterests={setInterests} setTopics={setTopics}/>
    </div>
  )
}

export default Interests