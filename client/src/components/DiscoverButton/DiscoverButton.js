import React from 'react'
import './DiscoverButton.css'
import { Link } from 'react-router-dom'

const DiscoverButton = ({topics}) => {
  const n = topics.size

  return (
    <div>
        <Link to='/analyticsPage'><button className='discoverbutton'>Discover with {n} Topics</button></Link>
    </div>
  )
}

export default DiscoverButton