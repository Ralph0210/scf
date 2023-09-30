import React, {useRef} from 'react'
import './Home.css'
import Hero from '../Hero/Hero'
import Instruction1 from '../Instruction1/Instruction1'
import Interests from '../Interests/Interests'
import DiscoverButton from '../DiscoverButton/DiscoverButton'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Home = () => {
  const InstructionRef = useRef(null)
  return (
    <>
      <Hero InstructionRef={InstructionRef}/>
      <Instruction1 ref={InstructionRef}/>
      <Interests />
      <DiscoverButton />
      <Footer />
    </>
  )
}

export default Home