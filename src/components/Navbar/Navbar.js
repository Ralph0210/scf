import React from 'react'
import './Navbar.css'
import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom';

const Navbar = () => {
    const Nav = () => (
        <ul className='nav_list'>
                <Link to='/' className='navlink'><li>Home</li></Link>
                <Link to='/analyticsPage' className='navlink'><li>Analysis</li></Link>
                <li>Explore Data</li>
                <li>About</li>
                <li>Search</li>
                <li>EN</li>
        </ul>
    )
      return (
        <nav>
            <div className='logo_container'>
            <li>SCF</li>
            </div>
            <div className='nav_list_container'>
                <Nav />
            </div>
        </nav>
      )
}

export default Navbar