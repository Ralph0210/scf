import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <div className='cta_container'>
        <div className='cta_left_container'>
        <div className='header'>
            <h1>Unlock Financial Insights</h1>
        </div>
        <div className='intro'>
            <p>Discover the Power of the Survey of Consumer Finance (SCF) and Make Informed Financial Decisions. Access a Wealth of Data on Income, Wealth, Debt, and more. Gain Deep Understanding, Identify Trends, and Plan for a Strong Financial Future.</p>
        </div>
        <div className='cta_button'>
            <button>Learn More</button>
        </div>
        </div>

        <div className='right_container'>
            <img src='/cta.png' />
            <div className='background'></div>
        </div>
    </div>
  )
}

export default Hero