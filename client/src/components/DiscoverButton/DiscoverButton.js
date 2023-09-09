import React from 'react'
import './DiscoverButton.css'
import { Link } from 'react-router-dom'

const DiscoverButton = () => {
  return (
    <div>
        <Link to='/analyticsPage'><button className='discoverbutton'>Discover with 5 Topics</button></Link>
    </div>
  )
}

export default DiscoverButton