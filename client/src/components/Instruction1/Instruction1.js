import React from 'react'
import './Instruction1.css'

const Instruction1 = () => {
  return (
    <div className='container'>
        <div className='title'>
            <h1>What is the SCF</h1>
        </div>

        <div className='content'>
            <div className='instruction_map'></div>
            <div className='description'>
                <h2>Comprehensive <span className='new-line'>Financial Survey.</span></h2>
                <div className='details'>
                    <p>The SCF, conducted by the Federal Reserve System, is a nationwide survey that provides a comprehensive view of income, wealth, debt, and various financial factors.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Instruction1