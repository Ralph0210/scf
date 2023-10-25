import React, {useRef, useState} from 'react'
import './Home.css'
import Hero from '../Hero/Hero'
import Instruction1 from '../Instruction1/Instruction1'
import Interests from '../Interests/Interests'
import DiscoverButton from '../DiscoverButton/DiscoverButton'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Home = ({topics, setTopics, isDataLoaded}) => {
  const InstructionRef = useRef(null)
  return (
    <>
      <Hero InstructionRef={InstructionRef}/>
      <Instruction1 ref={InstructionRef}/>
      <Interests topics={topics}  setTopics={setTopics} isDataLoaded={isDataLoaded}/>
      <DiscoverButton topics={topics}/>
      <Footer />
    </>
  )
}

export default Home