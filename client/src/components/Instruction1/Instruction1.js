import React from 'react'
import './Instruction1.css'
import { motion, useScroll } from "framer-motion"
import InstructionMap from '../InstructionMap/InstructionMap'

const Instruction1 = () => {

  return (
    <div className='container'>
        <div className='title'>
            <h1>What is the SCF</h1>
        </div>
        <InstructionMap />
    </div>
  )
}

export default Instruction1