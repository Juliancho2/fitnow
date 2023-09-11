import React from 'react'
import HeaderApp from '../components/HeaderApp'
import BmiCalculator from '../components/BmiCalculator'

const CalculatorPage = () => {
  return (
    <div className='min-h-screen pt-20'>
      <HeaderApp/>
      <BmiCalculator color='white'/>
    </div>
  )
}

export default CalculatorPage
