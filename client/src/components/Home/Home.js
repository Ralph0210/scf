import React, {useRef, useState} from 'react'
import './Home.css'
import Hero from '../Hero/Hero'
import Instruction1 from '../Instruction1/Instruction1'
import Interests from '../Interests/Interests'
import DiscoverButton from '../DiscoverButton/DiscoverButton'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Home = ({setInterests}) => {
  const InstructionRef = useRef(null)
  const [topics, setTopics]= useState(0)
  return (
    <>
      <Hero InstructionRef={InstructionRef}/>
      <Instruction1 ref={InstructionRef}/>
      <Interests setInterests={setInterests} setTopics={setTopics} />
      <DiscoverButton topics={topics}/>
      <Footer />
    </>
  )
}

export default Home