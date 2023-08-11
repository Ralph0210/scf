import Map from '../Map/Map'
import Analytics from '../Analytics/Analytics'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Analytics_page.css'

const Analytics_page = () => {
  return (
    <>
    <div className='analytics_page_container'>
        <div className='left_container'>
            <Map />
            </div>
        <div className='right_container'>
            <Analytics />
            </div>
    </div>
    <Footer />
    </>
  )
}

export default Analytics_page