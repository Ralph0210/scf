import React from 'react'
import './Home.css'
import Hero from '../Hero/Hero'
import Instruction1 from '../Instruction1/Instruction1'
import Interests from '../Interests/Interests'
import DiscoverButton from '../DiscoverButton/DiscoverButton'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <>
      <Hero />
      <Instruction1 />
      <Interests />
      <DiscoverButton />
      <Footer />
    </>
  )
}

export default Home