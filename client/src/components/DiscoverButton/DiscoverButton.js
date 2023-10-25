import React from 'react'
import './DiscoverButton.css'
import { Link } from 'react-router-dom'

const DiscoverButton = ({topics}) => {
  return (
    <div>
        <Link to='/analyticsPage'><button className='discoverbutton'>Discover with {topics} Topics</button></Link>
    </div>
  )
}

export default DiscoverButton